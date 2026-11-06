import { drivers, type Driver } from '@/content/drivers';

/**
 * Enterprise Value Score maths, the same rules as The Automation Institute's:
 * - each driver has two statements rated 1 to 5;
 * - driver score = (a + b - 2) * 12.5, so 0 to 100;
 * - overall = weighted average, with clean financials and owner dependence counting double;
 * - gaps = the two lowest drivers; ties go to the earlier (higher-priority) driver.
 */

export const QUESTION_COUNT = drivers.length * 2;

export type DriverScore = { driver: Driver; score: number };

export type ScoreResult = {
  overall: number;
  byDriver: DriverScore[];
  strongest: Driver;
  gaps: [Driver, Driver];
};

export function scoreAnswers(answers: number[]): ScoreResult {
  const byDriver = drivers.map((driver, i) => {
    const a = answers[i * 2] ?? 1;
    const b = answers[i * 2 + 1] ?? 1;
    // Whole numbers on screen; 12.5 steps would otherwise show as 62.5.
    return { driver, score: Math.round((a + b - 2) * 12.5) };
  });
  const totalWeight = byDriver.reduce((sum, d) => sum + d.driver.weight, 0);
  const overall = Math.round(byDriver.reduce((sum, d) => sum + d.score * d.driver.weight, 0) / totalWeight);
  const ascending = [...byDriver].sort((x, y) => x.score - y.score);
  const descending = [...byDriver].sort((x, y) => y.score - x.score);
  return { overall, byDriver, strongest: descending[0].driver, gaps: [ascending[0].driver, ascending[1].driver] };
}

/** Answers travel in the URL hash as "v1-" plus 20 digits, so a result can be shared. */
const PREFIX = 'v1-';

export function encodeAnswers(answers: number[]): string {
  return PREFIX + answers.join('');
}

export function decodeAnswers(raw: string | null | undefined): number[] | null {
  if (!raw || !raw.startsWith(PREFIX)) return null;
  const digits = raw.slice(PREFIX.length);
  if (!new RegExp(`^[1-5]{${QUESTION_COUNT}}$`).test(digits)) return null;
  return digits.split('').map(Number);
}

/** A plain-English band for the overall score. */
export function band(overall: number): { label: string; text: string } {
  if (overall >= 75) return { label: 'Buyer-ready', text: 'A buyer would see a business that runs on systems. The work now is protecting it and pushing the last few drivers higher.' };
  if (overall >= 50) return { label: 'Getting there', text: 'The foundations are in place, but a buyer would still find work that depends on you or a few key people. Your two gaps are where the value is.' };
  if (overall >= 25) return { label: 'Owner-dependent', text: 'Much of the business still runs through you. That caps what a buyer would pay, and it is also the fastest place to add value.' };
  return { label: 'Early days', text: 'Right now the business is closer to a job you own than an asset you could sell. That also means the upside from fixing it is the largest.' };
}
