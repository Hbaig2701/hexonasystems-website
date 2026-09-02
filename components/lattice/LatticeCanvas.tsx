'use client';

import { useEffect, useRef } from 'react';
import {
  AdditiveBlending,
  BufferAttribute,
  BufferGeometry,
  Color,
  DynamicDrawUsage,
  LineSegments,
  OrthographicCamera,
  Points,
  Scene,
  ShaderMaterial,
  Vector2,
  WebGLRenderer,
} from 'three';
import { buildLattice } from '@/lib/lattice/geometry';
import { PacketSystem } from '@/lib/lattice/packets';
import { latticeState } from '@/lib/lattice/state';
import {
  cellFragmentShader,
  cellVertexShader,
  packetFragmentShader,
  packetVertexShader,
} from './shaders';

/**
 * THE LATTICE — tier 1, WebGL. Spec §5.
 *
 * A single persistent canvas fixed behind the content at z-index 0, driven by
 * one normalized scroll progress value piped in from a GSAP ScrollTrigger
 * (§5.2, Moment 2). Exactly two canvas instances are permitted on the homepage
 * and this is the first; the audit panel (§5.5) is the second.
 *
 * WHY NOT react-three-fiber (a deviation from the §10.1 stack table):
 * §5.6 sets a hard budget of "< 45KB gzipped excluding three.js core" and §14
 * makes it a Phase 2 acceptance criterion. r3f alone exceeds that before a line
 * of lattice code is written, and it buys nothing here — this scene is one
 * LineSegments plus one Points, updated imperatively every frame, with zero
 * React involvement by design. Named three imports also let the bundler
 * tree-shake, which `import * as THREE` prevents. The ergonomics r3f offers are
 * ergonomics this particular scene never uses.
 *
 * Performance budget (§5.6): dpr capped at 2, powerPreference high-performance,
 * antialias off (handled in the shader), render loop paused via
 * IntersectionObserver when out of view and on visibilitychange → hidden.
 *
 * aria-hidden + role="presentation": it is decorative and screen readers must
 * skip it (§10.4).
 */

const CURSOR_LERP = 0.08; // §5.4 — "so it feels like weight, not a rubber band"
const TARGET_CELLS = 180;
const PACKET_COUNT = 120;

interface LatticeCanvasProps {
  /** Element whose visibility gates the render loop. */
  observeId?: string;
  /** Frame-time sampler for the runtime downgrade guard (§5.2). */
  onFrameSample?: (deltaMs: number) => void;
}

export function LatticeCanvas({ observeId, onFrameSample }: LatticeCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const sampleRef = useRef(onFrameSample);

  useEffect(() => {
    sampleRef.current = onFrameSample;
  }, [onFrameSample]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    let renderer: WebGLRenderer;
    try {
      renderer = new WebGLRenderer({
        canvas,
        antialias: false,
        alpha: true,
        powerPreference: 'high-performance',
        stencil: false,
        depth: false,
      });
    } catch {
      // The tier check already probed for WebGL2; if construction still fails,
      // leave the canvas blank. The page is complete without it.
      return;
    }

    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    renderer.setClearAlpha(0);

    const scene = new Scene();
    // Orthographic in pixel space: 1 world unit = 1 CSS px, origin at centre.
    const camera = new OrthographicCamera(-1, 1, 1, -1, 0.1, 1000);
    camera.position.z = 100;

    /* --- Scene construction, rebuilt on resize --------------------------- */
    let cells: LineSegments | null = null;
    let packets: Points | null = null;
    let cellMaterial: ShaderMaterial | null = null;
    let packetGeometry: BufferGeometry | null = null;
    let packetSystem: PacketSystem | null = null;

    const dispose = () => {
      if (cells) {
        scene.remove(cells);
        cells.geometry.dispose();
        (cells.material as ShaderMaterial).dispose();
        cells = null;
      }
      if (packets) {
        scene.remove(packets);
        packets.geometry.dispose();
        (packets.material as ShaderMaterial).dispose();
        packets = null;
      }
      cellMaterial = null;
      packetGeometry = null;
      packetSystem = null;
    };

    const build = (width: number, height: number) => {
      dispose();

      const lattice = buildLattice(width, height, { targetCells: TARGET_CELLS });
      const { cells: hexCells, vertices } = lattice;

      const vertCount = hexCells.length * 6 * 2; // 6 edges × 2 endpoints
      const position = new Float32Array(vertCount * 3);
      const aCenter = new Float32Array(vertCount * 2);
      const aScatter = new Float32Array(vertCount * 2);
      const aRot = new Float32Array(vertCount);
      const aOrder = new Float32Array(vertCount);

      let v = 0;
      for (const cell of hexCells) {
        for (let e = 0; e < 6; e++) {
          for (const p of [vertices[e], vertices[(e + 1) % 6]]) {
            position[v * 3] = p.x;
            position[v * 3 + 1] = p.y;
            position[v * 3 + 2] = 0;
            aCenter[v * 2] = cell.cx;
            aCenter[v * 2 + 1] = cell.cy;
            aScatter[v * 2] = cell.dx;
            aScatter[v * 2 + 1] = cell.dy;
            aRot[v] = cell.rot;
            aOrder[v] = cell.order;
            v++;
          }
        }
      }

      const cellGeometry = new BufferGeometry();
      cellGeometry.setAttribute('position', new BufferAttribute(position, 3));
      cellGeometry.setAttribute('aCenter', new BufferAttribute(aCenter, 2));
      cellGeometry.setAttribute('aScatter', new BufferAttribute(aScatter, 2));
      cellGeometry.setAttribute('aRot', new BufferAttribute(aRot, 1));
      cellGeometry.setAttribute('aOrder', new BufferAttribute(aOrder, 1));

      cellMaterial = new ShaderMaterial({
        vertexShader: cellVertexShader,
        fragmentShader: cellFragmentShader,
        transparent: true,
        depthTest: false,
        depthWrite: false,
        uniforms: {
          uProgress: { value: 0 },
          uTime: { value: 0 },
          uMouse: { value: new Vector2(0, 0) },
          uMouseActive: { value: 0 },
          uRadius: { value: 220 },
          uStroke: { value: new Color('#2A313D') },
          uAccent: { value: new Color('#22D3EE') },
        },
      });

      cells = new LineSegments(cellGeometry, cellMaterial);
      scene.add(cells);

      packetSystem = new PacketSystem(lattice, PACKET_COUNT);
      packetGeometry = new BufferGeometry();
      packetGeometry.setAttribute(
        'position',
        new BufferAttribute(packetSystem.positions, 3).setUsage(DynamicDrawUsage),
      );
      packetGeometry.setAttribute(
        'aColor',
        new BufferAttribute(packetSystem.colors, 3).setUsage(DynamicDrawUsage),
      );
      packetGeometry.setAttribute(
        'aAlpha',
        new BufferAttribute(packetSystem.alphas, 1).setUsage(DynamicDrawUsage),
      );
      packetGeometry.setAttribute(
        'aSize',
        new BufferAttribute(packetSystem.sizes, 1).setUsage(DynamicDrawUsage),
      );

      packets = new Points(
        packetGeometry,
        new ShaderMaterial({
          vertexShader: packetVertexShader,
          fragmentShader: packetFragmentShader,
          transparent: true,
          depthTest: false,
          depthWrite: false,
          blending: AdditiveBlending,
        }),
      );
      scene.add(packets);
    };

    const resize = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      renderer.setSize(width, height, false);
      camera.left = -width / 2;
      camera.right = width / 2;
      camera.top = height / 2;
      camera.bottom = -height / 2;
      camera.updateProjectionMatrix();
      build(width, height);
    };

    resize();

    let resizeTimer = 0;
    const onResize = () => {
      window.clearTimeout(resizeTimer);
      // Rebuilding the lattice is not cheap; debounce so a drag-resize does not
      // rebuild it sixty times.
      resizeTimer = window.setTimeout(resize, 180);
    };
    window.addEventListener('resize', onResize, { passive: true });

    /* --- The render loop ------------------------------------------------- */
    const mouse = { x: 0, y: 0, active: 0 };
    let frame = 0;
    let last = performance.now();
    let inView = true;
    let visible = !document.hidden;
    let running = false;

    const tick = (now: number) => {
      const deltaMs = now - last;
      const delta = Math.min(deltaMs / 1000, 0.05);
      last = now;
      // Raw, unclamped frame time — the downgrade guard (§5.2) needs the truth,
      // not the value clamped for simulation stability.
      sampleRef.current?.(deltaMs);

      if (cellMaterial && packetSystem && packetGeometry) {
        const uniforms = cellMaterial.uniforms;
        uniforms.uTime.value += delta;
        uniforms.uProgress.value = latticeState.progress;

        // Lerped at 0.08/frame so the field has weight (§5.4).
        mouse.x += (latticeState.mouseX - mouse.x) * CURSOR_LERP;
        mouse.y += (latticeState.mouseY - mouse.y) * CURSOR_LERP;
        mouse.active += (latticeState.mouseActive - mouse.active) * CURSOR_LERP;
        (uniforms.uMouse.value as Vector2).set(mouse.x, mouse.y);
        uniforms.uMouseActive.value = mouse.active;

        packetSystem.update(delta, latticeState.progress, latticeState);
        const attrs = packetGeometry.attributes;
        attrs.position.needsUpdate = true;
        attrs.aColor.needsUpdate = true;
        attrs.aAlpha.needsUpdate = true;
        attrs.aSize.needsUpdate = true;
      }

      renderer.render(scene, camera);
      frame = requestAnimationFrame(tick);
    };

    const sync = () => {
      const shouldRun = inView && visible;
      if (shouldRun === running) return;
      running = shouldRun;
      if (running) {
        last = performance.now();
        frame = requestAnimationFrame(tick);
      } else {
        cancelAnimationFrame(frame);
      }
    };

    sync();

    // Pause when the narrative is out of view (§5.6).
    let io: IntersectionObserver | null = null;
    const observed = observeId ? document.getElementById(observeId) : null;
    if (observed && typeof IntersectionObserver !== 'undefined') {
      io = new IntersectionObserver(
        ([entry]) => {
          inView = entry.isIntersecting;
          sync();
        },
        { rootMargin: '200px' },
      );
      io.observe(observed);
    }

    // Pause on tab blur (§5.6).
    const onVisibility = () => {
      visible = !document.hidden;
      sync();
    };
    document.addEventListener('visibilitychange', onVisibility);

    return () => {
      cancelAnimationFrame(frame);
      window.clearTimeout(resizeTimer);
      window.removeEventListener('resize', onResize);
      document.removeEventListener('visibilitychange', onVisibility);
      io?.disconnect();
      dispose();
      renderer.dispose();
    };
  }, [observeId]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      role="presentation"
      tabIndex={-1}
      style={{ position: 'fixed', inset: 0, width: '100%', height: '100%', pointerEvents: 'none' }}
    />
  );
}
