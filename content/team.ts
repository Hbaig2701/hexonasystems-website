/**
 * content/team.ts — §7.4 item 4, "The Architects Behind the Engine".
 *
 * Names and roles are transcribed from the Framer design. Portraits are the
 * one thing that cannot be invented: §15 is explicit that stock photography is
 * the single clearest marker of a template, and an AI-generated portrait of a
 * real colleague is worse than stock. Every card renders a labelled placeholder
 * until a real photograph exists.
 *
 * The reference portraits are black-and-white and environmental. Keep that —
 * monochrome portraits against a near-black page are what make the grid read as
 * a masthead rather than a staff directory, and they sidestep the problem of
 * six photographs shot in six different lighting conditions.
 */

export interface TeamMember {
  name: string;
  role: string;
  /** Path to a real photograph. Empty renders the placeholder. */
  portrait: string;
  /** One-line bio. ⚠️ [ASSET NEEDED · §11 item 8] */
  bio?: string;
}

export const TEAM: TeamMember[] = [
  { name: 'Hamza Baig', role: 'Founder & CEO', portrait: '' },
  { name: 'Ayman Abdullah', role: 'CTO & Lead Developer', portrait: '' },
  { name: 'Emaan Ali', role: 'Head of Operations', portrait: '' },
  { name: 'Brandon Gebka', role: 'Director of Business Development', portrait: '' },
  { name: 'Shake Dewan', role: 'Head of AI', portrait: '' },
  { name: 'Spencer Brickman', role: 'Head of Partnerships', portrait: '' },
];

export const TEAM_PORTRAITS_PENDING = TEAM.some((m) => !m.portrait);
