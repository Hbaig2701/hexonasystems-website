'use client';

import { useEffect } from 'react';

/**
 * Entrances: the fade-up for every `[data-enter]` element, wired once for the
 * whole document. It sets `data-entered` as each element crosses 15%
 * visibility; the transition itself lives in globals.css, armed by the `.js`
 * class so the page renders complete with JavaScript off.
 *
 * ⚠️ IT WATCHES THE DOM, NOT THE ROUTE. It used to re-scan only when the
 * pathname changed, so a client navigation that kept the path and changed the
 * query (the industry filter on /evidence: /evidence?industry=health) rendered
 * brand-new cards that were never observed and stayed at opacity 0. The page
 * looked blank. A MutationObserver now picks up every `[data-enter]` element
 * the moment React inserts it, whatever caused the render.
 */
export function Entrances() {
  useEffect(() => {
    const reduced =
      typeof IntersectionObserver === 'undefined' ||
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const io = reduced
      ? null
      : new IntersectionObserver(
          (entries) => {
            for (const entry of entries) {
              if (!entry.isIntersecting) continue;
              entry.target.setAttribute('data-entered', 'true');
              io?.unobserve(entry.target);
            }
          },
          { threshold: 0.15 },
        );

    const arm = (el: Element) => {
      if (el.getAttribute('data-entered') === 'true') return;
      if (!io || el.getBoundingClientRect().top < window.innerHeight) {
        el.setAttribute('data-entered', 'true');
      } else {
        io.observe(el);
      }
    };

    const scan = (root: ParentNode) => {
      if (root instanceof Element && root.hasAttribute('data-enter')) arm(root);
      root.querySelectorAll('[data-enter]').forEach(arm);
    };

    scan(document);

    const mo = new MutationObserver((records) => {
      for (const r of records) {
        r.addedNodes.forEach((n) => {
          if (n.nodeType === Node.ELEMENT_NODE) scan(n as Element);
        });
      }
    });
    mo.observe(document.body, { childList: true, subtree: true });

    return () => {
      mo.disconnect();
      io?.disconnect();
    };
  }, []);

  return null;
}
