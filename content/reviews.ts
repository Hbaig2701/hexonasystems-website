/**
 * Google reviews, quoted from the Hexona Systems Google Business Profile
 * (https://maps.google.com/?cid=3329588286767817884).
 *
 * Rules:
 *  - Quote word for word. Trim with an ellipsis, never reword. Whitespace may be
 *    normalised; spelling and punctuation stay as written.
 *  - Name as first name plus last initial, as the reviewer shows it on Google.
 *  - Pick reviews about results for a business, not about the course alone.
 *  - Update RATING when the profile changes. No AggregateRating schema: Google
 *    does not show review stars for a business's reviews of itself.
 */

export const RATING = {
  value: 4.8,
  count: 74,
  url: 'https://maps.google.com/?cid=3329588286767817884',
  checked: '2026-11-06',
} as const;

export type Review = {
  name: string;
  /** Who they are, only when the review itself says so. */
  context?: string;
  stars: 1 | 2 | 3 | 4 | 5;
  year: number;
  quote: string;
};

export const REVIEWS: Review[] = [
  {
    name: 'Khai H.',
    context: 'Owner, OutKasts Barbershop',
    stars: 5,
    year: 2024,
    quote:
      'Thanks to their platform, I’ve been able to build up over 100 reviews, which has really boosted our credibility. One feature that stands out is the missed call text-back—being able to text and communicate with customers from a single number makes it easy to respond quickly to potential leads and book appointments.',
  },
  {
    name: 'Serge N.',
    stars: 5,
    year: 2023,
    quote:
      'Hexona Systems plugged in their system into our business, replacing 7 softwares we were using to run our business, and added automations to save more time. We now have one login and one subscription instead of 7',
  },
  {
    name: 'Aom D.',
    stars: 5,
    year: 2023,
    quote:
      'They\'ve saved me hundreds of hours in work through their automations. I\'m now able to focus on what I actually like about my business.',
  },
  {
    name: 'Allan K.',
    stars: 5,
    year: 2026,
    quote:
      'Working with Hamza and his team is nothing shy of Amazing, they provide incredible service, are easy to work with and are incredibly knowledgeable when it comes to AI and automation infrastructure.',
  },
  {
    name: 'Brent H.',
    stars: 5,
    year: 2024,
    quote:
      'Hexona Systems truly is an expert in the automation workflow world. They are creative and can solve almost any scenario you throw at them.',
  },
  {
    name: 'Darsh S.',
    stars: 5,
    year: 2023,
    quote: 'Hexona has done wonders for me to scale my company, they go the extra mile that other companies don\'t!',
  },
];
