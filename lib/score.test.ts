import { describe, expect, it } from 'vitest';
import { QUESTION_COUNT, decodeAnswers, encodeAnswers, scoreAnswers } from './score';

describe('Enterprise Value Score', () => {
  it('asks two questions per driver', () => {
    expect(QUESTION_COUNT).toBe(20);
  });
  it('scores all fives as 100 and all ones as 0', () => {
    expect(scoreAnswers(Array(20).fill(5)).overall).toBe(100);
    expect(scoreAnswers(Array(20).fill(1)).overall).toBe(0);
  });
  it('weights clean financials and owner dependence double', () => {
    const answers = Array(20).fill(1);
    answers[0] = answers[1] = 5; // financials to 100
    // weights sum to 12, financials carries 2 of them
    expect(scoreAnswers(answers).overall).toBe(Math.round((100 * 2) / 12));
  });
  it('round-trips answers through the share code', () => {
    const answers = Array.from({ length: 20 }, (_, i) => (i % 5) + 1);
    expect(decodeAnswers(encodeAnswers(answers))).toEqual(answers);
    expect(decodeAnswers('v1-123')).toBeNull();
  });
});
