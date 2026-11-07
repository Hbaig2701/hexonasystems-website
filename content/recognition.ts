/**
 * Recognition, origin dates, press and photos for the About page (/firm).
 *
 * Source: the "About Hamza Baig" page on the GoHighLevel hub
 * (hamzaautomates.com/gohighlevel/hamza-baig), which Hamza approved line by
 * line on Nov 2, 2026. Keep the two in step: if an award, date or interview
 * changes there, change it here.
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
    "Hexona Systems on HighLevel's 2025 Diamond winners list",
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
  bronzeAffilionaire: photo(
    'hamza-baig-bronze-affilionaire-2024-stage', 1600, 1067,
    "Hamza Baig on stage receiving HighLevel's Bronze Affilionaire 2024 award",
    'Receiving Bronze Affilionaire, 2024',
  ),
  affilionaireTrophy: photo(
    'hamza-baig-affilionaire-award-2024', 1600, 1067,
    'Hamza Baig holding the HighLevel Affilionaire trophy at the 2024 Summit',
    'The Affilionaire trophy at the 2024 Summit',
  ),
  silverAffilionaire: photo(
    'hamza-baig-silver-affilionaire-award-levelup', 1600, 1200,
    "Hamza Baig on the LevelUp stage receiving HighLevel's Silver Affilionaire award",
    'Receiving Silver Affilionaire on the LevelUp stage',
  ),
  awardsHome: photo(
    'hamza-baig-highlevel-platinum-diamond-awards', 1200, 1600,
    'Hamza Baig with the HighLevel SaaSpreneur Platinum and Diamond plaques and Affilionaire trophies',
    'The Platinum and Diamond plaques with both Affilionaire trophies',
  ),
  speaking: photo(
    'hamza-baig-speaking-highlevel-stage', 834, 648,
    'Hamza Baig speaking on stage in front of a HighLevel backdrop',
    "Speaking on HighLevel's stage",
  ),
  speakerPage: photo(
    'hamza-baig-highlevel-levelup-2026-speaker-page', 838, 1339,
    "Hamza Baig's speaker profile on HighLevel's official LevelUp 2026 website",
    "Speaker profile on HighLevel's LevelUp 2026 site",
  ),
  speaker2026: photo(
    'hamza-baig-levelup-2026-speaker', 900, 1600,
    "HighLevel's LevelUp 2026 speaker card for Hamza Baig, Oct 26 to 29, Dallas",
    'LevelUp 2026 speaker card, Dallas',
  ),
  taiLopez: photo(
    'hamza-baig-tai-lopez-podcast', 1200, 1600,
    'Hamza Baig with Tai Lopez after recording a podcast together',
    'With Tai Lopez after recording a podcast',
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
  neilPatel: photo(
    'hamza-baig-neil-patel-highlevel-event', 1086, 1448,
    'Hamza Baig with Neil Patel at a HighLevel event',
    'With Neil Patel at a HighLevel event',
  ),
  acquisitionCom: photo(
    'hamza-baig-acquisition-com-hq-alex-hormozi', 1200, 1600,
    "Hamza Baig outside Acquisition.com HQ, Alex Hormozi's company",
    "At Acquisition.com HQ, Alex Hormozi's company",
  ),
} as const;

/** The public dates behind "before ChatGPT". All checkable. */
export const EARLY_YEARS = [
  {
    year: '2021',
    items: ['Hamza found HighLevel and started building automations on it for local businesses.'],
  },
  {
    year: '2022',
    items: [
      'Founded Hexona Systems in early 2022, and registered hexonasystems.com in June.',
      'Started the Hamza Automates YouTube channel on Sep 25 with automation builds for local businesses, two months before ChatGPT launched on Nov 30.',
    ],
  },
];

/** HighLevel's awards, by year, with the photos that show them. */
export const AWARD_YEARS: { year: string; items: string[]; photos: Photo[] }[] = [
  {
    year: '2024',
    items: ['SaaSpreneur Platinum (500+ client sub-accounts), our first HighLevel award. We skipped Gold.', 'Bronze Affilionaire.'],
    photos: [PHOTOS.platinumStage, PHOTOS.platinumPlaque, PHOTOS.bronzeAffilionaire],
  },
  {
    year: '2025',
    items: ['SaaSpreneur Diamond (1,000+ client sub-accounts), presented at LevelUp, Oct 13 to 16 in Dallas.', 'Silver Affilionaire.'],
    photos: [PHOTOS.diamondWinners, PHOTOS.diamondPlaque, PHOTOS.silverAffilionaire],
  },
  {
    year: '2026',
    items: ['SaaSpreneur Diamond again.', 'Hamza spoke at LevelUp 2026, Oct 26 to 29 in Dallas.', 'Bronze Affilionaire.'],
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
  'HighLevel Affilionaire, Bronze (2024) and Silver (2025)',
];

/** Quoted word for word from HighLevel's LevelUp 2026 speaker page. */
export const HIGHLEVEL_BIO = {
  quote:
    "Hamza Baig is the founder of Hexona Systems, a white-label platform built on HighLevel that powers over 1,000 agencies, and of The Automation Institute, where he's taught 45,000+ students to build agencies with AI. He won the Platinum SaaSPRENEUR Award in 2024 and the Diamond SaaSPRENEUR Award in 2025.",
  source: 'https://levelup.gohighlevel.com/speakers',
  read: 'Nov 2, 2026',
};

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
    'Recorded a podcast with Tai Lopez.',
    "Worked with 10X and Cardone Ventures, Grant Cardone's companies, including time at 10X HQ in Scottsdale with Brandon Dawson, CEO of Cardone Ventures.",
    'Hosted the AI Automations Workshop in School of Mentors, the School of Hard Knocks community.',
    'Met Neil Patel at a HighLevel event.',
    "Visited Acquisition.com HQ, Alex Hormozi's company.",
  ],
  photos: [PHOTOS.taiLopez, PHOTOS.brandonDawson, PHOTOS.schoolOfMentors, PHOTOS.neilPatel],
};
