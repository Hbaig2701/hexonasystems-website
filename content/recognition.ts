/**
 * Recognition, origin dates, press and photos for the About page (/firm).
 *
 * Source: the "About Hamza Baig" page on the GoHighLevel hub
 * (hamzaautomates.com/gohighlevel/hamza-baig), which Hamza approved line by
 * line on Nov 2, 2026. Keep the two in step: if an award, date or interview
 * changes there, change it here.
 *
 * Deliberate differences (Hamza, Nov 7, 2026): the Tai Lopez line describes
 * the work itself, and meeting Neil Patel and visiting Acquisition.com are left
 * out because they are not achievements.
 *
 * Rules: every award is on HighLevel's public winners lists or in a photo;
 * interviews are on other people's shows (no press releases, no paid
 * placements); "worked with" lines say exactly what happened.
 */

export interface Photo {
  src: string;
  width: number;
  height: number;
  alt: string;
  caption: string;
}

const photo = (file: string, width: number, height: number, alt: string, caption: string): Photo => ({
  src: `/images/about/${file}.webp`,
  width,
  height,
  alt,
  caption,
});

export const PHOTOS = {
  diamondStage: photo(
    'hamza-baig-saaspreneur-diamond-award-levelup-stage', 1440, 961,
    'Hamza Baig on stage at HighLevel LevelUp receiving the SaaSpreneur Diamond award for Hexona Systems',
    'Accepting the SaaSpreneur Diamond award on the LevelUp stage',
  ),
  diamondPlaque: photo(
    'hamza-baig-saaspreneur-diamond-award-2025-plaque', 1200, 1600,
    'Hamza Baig unboxing the 2025 HighLevel SaaSpreneur Diamond award made out to Hexona Systems',
    'The 2025 SaaSpreneur Diamond award, made out to Hexona Systems',
  ),
  diamondWinners: photo(
    'hamza-baig-hexona-systems-saaspreneur-diamond-2025-winners', 1200, 1600,
    "Hamza Baig pointing to Hexona Systems on HighLevel's 2025 SaaSpreneur Diamond winners screen",
    'Hexona Systems on the 2025 Diamond winners list',
  ),
  badge2025: photo(
    'hamza-baig-levelup-2025-vip-award-winner-badge', 1200, 1600,
    "Hamza Baig's LevelUp 2025 badge with the SaaSpreneur award winner ribbon, Dallas",
    'LevelUp 2025 badge with the award winner ribbon, Dallas',
  ),
  platinumStage: photo(
    'hamza-baig-saaspreneur-platinum-2024-stage', 1600, 1066,
    'Hamza Baig on stage with the HighLevel SaaSpreneur Platinum 2024 award',
    'On stage for SaaSpreneur Platinum, 2024',
  ),
  platinumPlaque: photo(
    'hamza-baig-saaspreneur-platinum-award-2024', 1179, 1010,
    'Hamza Baig with the HighLevel SaaSpreneur Platinum award plaque at the 2024 Summit',
    'The SaaSpreneur Platinum plaque at the 2024 Summit',
  ),
  awardsHome: photo(
    'hamza-baig-highlevel-platinum-diamond-awards', 1200, 1600,
    'Hamza Baig with the HighLevel SaaSpreneur Platinum and Diamond plaques and Affilionaire trophies',
    "Hexona's Platinum and Diamond awards",
  ),
  speaking: photo(
    'hamza-baig-speaking-highlevel-stage', 834, 648,
    'Hamza Baig speaking on stage in front of a HighLevel backdrop',
    'Speaking at LevelUp 2026',
  ),
  speakerPage: photo(
    'hamza-baig-highlevel-levelup-2026-speaker-page', 838, 1339,
    "Hamza Baig's speaker profile on HighLevel's official LevelUp 2026 website",
    'LevelUp 2026 speaker profile',
  ),
  speaker2026: photo(
    'hamza-baig-levelup-2026-speaker', 900, 1600,
    "HighLevel's LevelUp 2026 speaker card for Hamza Baig, Oct 26 to 29, Dallas",
    'LevelUp 2026 speaker card, Dallas',
  ),
  taiLopez: photo(
    'hamza-baig-tai-lopez-podcast', 1200, 1600,
    'Hamza Baig with Tai Lopez, whose AI Automation Consultant program he contributed to',
    'With Tai Lopez',
  ),
  brandonDawson: photo(
    'hamza-baig-brandon-dawson-cardone-ventures-10x-hq', 1200, 1600,
    'Hamza Baig with Brandon Dawson, CEO of Cardone Ventures, at 10X HQ in Scottsdale',
    'With Brandon Dawson, CEO of Cardone Ventures, at 10X HQ',
  ),
  schoolOfMentors: photo(
    'hamza-baig-school-of-mentors-ai-automations-workshop', 1600, 1017,
    "Hamza Baig's AI Automations Workshop in School of Mentors, the School of Hard Knocks community",
    "The AI Automations Workshop in School of Mentors' workshop library",
  ),
} as const;

/** The public dates behind "before ChatGPT". All checkable. */
export const EARLY_YEARS = [
  {
    year: '2021',
    items: ['Hamza started building automations for local businesses.'],
  },
  {
    year: '2022',
    items: [
      'Founded Hexona Systems in early 2022, and registered hexonasystems.com in June.',
      'Started the Hamza Automates YouTube channel on Sep 25 with automation builds for local businesses, two months before ChatGPT launched on Nov 30.',
    ],
  },
];

/** Awards by year, with the photos that show them. Referral (Affilionaire) awards are left off: they mean nothing to a client. */
export const AWARD_YEARS: { year: string; items: string[]; photos: Photo[] }[] = [
  {
    year: '2024',
    items: ["SaaSpreneur Platinum, for 500+ client accounts running on Hexona's platform. Our first award; we skipped Gold."],
    photos: [PHOTOS.platinumStage, PHOTOS.platinumPlaque],
  },
  {
    year: '2025',
    items: ["SaaSpreneur Diamond, for 1,000+ client accounts running on Hexona's platform. Presented in Dallas in October."],
    photos: [PHOTOS.diamondWinners, PHOTOS.diamondPlaque, PHOTOS.badge2025],
  },
  {
    year: '2026',
    items: ['SaaSpreneur Diamond again.', 'Hamza was a speaker at LevelUp 2026 in Dallas.'],
    photos: [PHOTOS.speaking, PHOTOS.speakerPage, PHOTOS.awardsHome],
  },
];

/** Nominations, kept separate so nobody mistakes one for a win. */
export const NOMINATIONS = [
  { year: '2025', title: 'Canadian Tech Business of the Year', who: 'Hexona Systems' },
  { year: '2024', title: 'Technopreneur of the Year', who: 'Hamza Baig' },
  { year: '2024', title: 'Young Entrepreneur of the Year', who: 'Hamza Baig' },
];

/** Award names for structured data. */
export const AWARD_NAMES = [
  'HighLevel SaaSpreneur Platinum (2024)',
  'HighLevel SaaSpreneur Diamond (2025)',
  'HighLevel SaaSpreneur Diamond (2026)',
];

/** Interviews on other people's shows. Press releases and paid pieces are left out on purpose. */
export const INTERVIEWS = [
  { show: 'Conversion Zoo podcast', topic: 'How to build an AI automation agency', date: 'Aug 2024', href: 'https://conversionzoo.com/ai-automation-agency-hamza-baig/' },
  { show: 'RepStack', topic: 'Graduate to AI founder', date: 'Nov 2024', href: 'https://www.youtube.com/watch?v=PzA5tg79hjU' },
  { show: 'CanadianSME Small Business Podcast', topic: 'AI and automation for small businesses', date: 'Dec 2024', href: 'https://www.youtube.com/watch?v=gnJ2Bbpc-iI' },
  { show: 'Made in the Mist (Niagara Falls Innovation Hub)', topic: 'AI education and automation', date: 'Jan 2025', href: 'https://nfinnovationhub.ca/revolutionizing-ai-education-and-automation/' },
  { show: 'NIC Faisalabad live', topic: 'Automation strategies for early-stage startups', date: 'Jun 2026', href: 'https://www.youtube.com/watch?v=MiTpfMk5nqw' },
  { show: 'The Sahas Chopra Show', topic: 'Building an AI agent business', date: 'Oct 2026', href: 'https://www.youtube.com/watch?v=7jIqAOALp4Q' },
  { show: 'RepStack Remote First Podcast, HighLevel Speaker Series', topic: 'Running a Diamond SaaS with one full-time employee and AI agents', date: 'Oct 2026', href: 'https://www.youtube.com/watch?v=Y7U2jLLA4-E' },
];

/** Worded as exactly what happened: companies, not the founders personally, where that's the truth. */
export const WORKED_WITH = {
  items: [
    "Worked directly with Tai Lopez and his team to bring AI automation to his audience, and contributed to his AI Automation Consultant program.",
    "Worked with 10X and Cardone Ventures, Grant Cardone's companies, including time at 10X HQ in Scottsdale with Brandon Dawson, CEO of Cardone Ventures.",
    'Hosted the AI Automations Workshop in School of Mentors, the School of Hard Knocks community.',
  ],
  photos: [PHOTOS.taiLopez, PHOTOS.brandonDawson, PHOTOS.schoolOfMentors],
};
