// Target: "appointment reminder texts" (390/mo US, DataforSEO Nov 6, 2026),
// "how to reduce no shows", "appointment reminder template".
// Research: Cochrane review CD007458 (Gurol-Urganci et al., 2013): text
// reminders vs no reminder RR 1.14 for attendance (7 trials, 5,841 people), vs
// phone call reminders RR 0.99, texts cheaper per attendance. Boksmati et al.
// (2016), Journal of Medical Systems: pooled odds ratio 1.62 across 13 RCTs;
// timing did not significantly change the effect. Both are healthcare studies;
// the article says so and doesn't extrapolate a percentage to trades.
// TCPA: general description only (informational vs marketing, opt-outs), with
// the FCC's consumer guide as the source, and "not legal advice".

import type { Article } from '../types';

const article: Article = {
  slug: 'appointment-reminder-texts',
  category: 'playbooks',
  kind: 'Playbook',
  title: 'Appointment reminder texts that cut no-shows (with templates)',
  seoTitle: 'Appointment Reminder Texts (Templates)',
  description:
    'Send a reminder 1 to 2 days before and another 2 hours before, with a one-word way to confirm or reschedule. Timing, templates by industry, texting rules.',
  datePublished: '2026-11-06',
  dateModified: '2026-11-06',
  lastChecked: '2026-11-06',
  cover: {
    style: 'chat',
    messages: [
      { from: 'ai', text: 'Reminder: your AC tune-up is tomorrow, 9 to 11 AM. Reply C to confirm or R to reschedule.' },
      { from: 'them', text: 'C' },
      { from: 'ai', text: 'Confirmed. Mike will text when he’s on the way.' },
    ],
  },
  coverAlt: 'A text exchange where a customer gets a reminder for an AC tune-up, replies C to confirm, and gets a confirmation back.',
  intro: [
    'Appointment reminder texts work best as two messages: one a day or two before, and one about two hours before, each with a one-word way to confirm or reschedule. The research on text reminders is consistent: they raise attendance compared with no reminder, and they cost far less than phone calls.',
    'The bigger win for a service business is the reschedule. A customer who replies R the day before is a slot you can refill; a customer who just doesn’t show is a truck, a tech or a treatment room sitting empty. Below is the timing, templates for different businesses, how to handle replies, and the texting rules to stay inside.',
  ],
  tldr: [
    'Send two reminders: 24 to 48 hours before, and about 2 hours before (or "on the way" for field service).',
    'Every reminder needs an easy reply: confirm, reschedule or cancel. Reschedules are slots you can refill.',
    'In healthcare studies, text reminders raised attendance compared with no reminder and matched phone calls at a lower cost.',
    'For high-value bookings (med spa treatments, consults), a deposit at booking does more than any reminder.',
    'Reminders are informational texts, but you still need the customer’s permission to text and must honor STOP.',
  ],
  sections: [
    {
      id: 'do-they-work',
      heading: 'Do appointment reminder texts actually reduce no-shows?',
      paragraphs: [
        'Yes, and this is one of the better-studied questions in small-business operations, mostly because hospitals care a lot about missed appointments.',
        'A Cochrane review of mobile phone reminders (2013) found that text reminders increased attendance compared with no reminder, with a risk ratio of 1.14 across seven trials and 5,841 people. Against phone-call reminders, texts performed about the same (risk ratio 0.99), and two studies found the cost per attended appointment 55% and 65% lower with texts. A 2016 meta-analysis in the Journal of Medical Systems pooled 13 randomized trials and found a pooled odds ratio of 1.62 for attendance with text reminders.',
        'Two honest caveats. These are healthcare studies, so the exact effect in an HVAC company or an auto shop will differ. And the studies measure attendance, not the rescheduled slots you refill, which is where a lot of the money is for a busy service business.',
      ],
      figure: {
        kind: 'stats',
        caption: 'what the research found on text reminders, in healthcare settings',
        items: [
          { value: '1.14', label: 'risk ratio for attendance, text vs no reminder (Cochrane, 7 trials)' },
          { value: '0.99', label: 'risk ratio, text vs phone call reminder: about the same' },
          { value: '55% to 65%', label: 'lower cost per attendance with texts, in two studies' },
        ],
      },
    },
    {
      id: 'timing',
      heading: 'When should you send appointment reminders?',
      paragraphs: [
        'The 2016 meta-analysis didn’t find that timing changed the effect much, so the schedule below is built around what you need operationally: enough notice to refill the slot, and a last nudge close to the time.',
      ],
      table: {
        caption: 'A reminder schedule that works for most service businesses. These are our starting points.',
        columns: [
          { key: 'when', label: 'When' },
          { key: 'purpose', label: 'What it does' },
          { key: 'reply', label: 'Ask for' },
        ],
        rows: [
          { when: 'At booking', purpose: 'Confirms the date, time, address and what to expect', reply: 'Nothing, or a deposit link for high-value bookings' },
          { when: '24 to 48 hours before', purpose: 'Gives time to reschedule and refill the slot', reply: 'C to confirm, R to reschedule' },
          { when: '2 hours before', purpose: 'Catches the people who forgot today', reply: 'Reply if anything changed' },
          { when: '"On the way" (field service)', purpose: 'Makes sure someone is home and the dog is inside', reply: 'Nothing needed' },
          { when: 'Missed (same day)', purpose: 'Rebooks the no-show before they go elsewhere', reply: 'A link or two times to choose from' },
        ],
      },
    },
    {
      id: 'templates',
      heading: 'Appointment reminder text templates by industry',
      paragraphs: [
        'Keep them under about 160 characters where you can, name the business, give the time window and one clear reply option. These are examples to adapt:',
      ],
      table: {
        caption: 'Example reminder texts. Replace the details with your own and keep your business name in the first few words.',
        columns: [
          { key: 'industry', label: 'Industry' },
          { key: 'before', label: 'Day before' },
          { key: 'sameday', label: 'Same day' },
        ],
        rows: [
          {
            industry: 'HVAC, plumbing',
            before: 'Northside Heating: your furnace tune-up is tomorrow, 9 to 11 AM. Reply C to confirm or R to reschedule.',
            sameday: 'Northside Heating: Mike is on his way, about 25 minutes out. Reply if anything changed.',
          },
          {
            industry: 'Med spa',
            before: 'Glow Med Spa: see you tomorrow at 2:00 PM for your Botox appointment. Reply C to confirm or R to reschedule.',
            sameday: 'Glow Med Spa: see you at 2:00 today. Please arrive 10 minutes early and skip makeup on the treatment area.',
          },
          {
            industry: 'Auto shop',
            before: 'Maple Auto: your oil change and tire rotation is tomorrow at 8:30 AM. Reply C to confirm or R to reschedule.',
            sameday: 'Maple Auto: see you at 8:30. Drop-off is at the side door, keys in the box if we’re busy.',
          },
          {
            industry: 'Property showing',
            before: 'Oak Property Group: your viewing at 12 Elm St, Unit 3 is tomorrow at 5:30 PM. Reply C to confirm or R to change the time.',
            sameday: 'Oak Property Group: see you at 12 Elm St at 5:30. Park on Elm, buzz 3 at the front door.',
          },
        ],
      },
    },
    {
      id: 'replies',
      heading: 'What should happen when a customer replies?',
      paragraphs: [
        'A reminder that nobody reads the replies to is half a system. Decide in advance what happens to each answer:',
      ],
      bullets: [
        '**C (confirm):** mark the appointment confirmed in your calendar or job software. Nothing else needed.',
        '**R (reschedule):** send two or three open times, or a booking link, and release the old slot so it can be refilled.',
        '**Cancel or "can’t make it":** ask if they want to rebook, and add them to the waitlist fill for that slot.',
        '**Anything else** ("is the tech bringing the part?"): route to a person, fast. This is where an /ai-employees/ai-receptionist earns its keep, because it can answer the simple ones and hand off the rest.',
        '**STOP:** stop all texts to that number immediately.',
      ],
      callout:
        'The money is in the refill. A slot freed up the day before can go to someone on the waitlist; a no-show at 9 AM is just lost.',
    },
    {
      id: 'deposits',
      heading: 'Should you take deposits to stop no-shows?',
      paragraphs: [
        'For high-value bookings, yes. Reminders reduce forgetting; a deposit changes the decision. Med spas, injectors, consults with a doctor and long treatments are where deposits make sense, collected by a payment link at booking and credited to the treatment.',
        'Be clear and consistent about the policy (how much, how much notice to reschedule without losing it) and put it in the booking confirmation as well as on the website. For a plumber or an HVAC company a deposit is usually overkill for a service call; the "on the way" text and a quick confirm-or-reschedule do most of the work.',
        'We built this kind of booking system for a med spa where nearly a quarter of bookings were arriving after hours (/evidence/medspa-booking-system); that system is live and its results are still being measured. More on the setup at /industries/med-spas.',
      ],
    },
    {
      id: 'rules',
      heading: 'What are the rules for texting appointment reminders?',
      paragraphs: [
        'Appointment reminders are usually treated as informational messages rather than marketing under the US Telephone Consumer Protection Act (TCPA). That still means the customer has to have given you their number and permission to be texted about their appointment. If you add a promotion ("and 20% off your next visit"), the message can become marketing, which needs stronger consent.',
        'Make opting out easy and honor it right away. Customers can opt out by replying STOP or similar words, and under a 2024 FCC order businesses must honor opt-outs within ten business days at the latest; good texting platforms handle STOP automatically. If you send business texts in the US from a regular 10-digit number, your number also needs to be registered for A2P 10DLC through your texting provider, or carriers may block your messages.',
        'This is general information, not legal advice. Healthcare providers have extra rules about what a reminder can say, so keep reminders to the date, time and place, and check with your compliance advisor.',
      ],
    },
    {
      id: 'automate',
      heading: 'How do you automate appointment reminders?',
      paragraphs: [
        'Most booking and field-service tools can send a basic reminder. What they usually don’t do well is read the replies, reschedule people, refill the slot and rebook no-shows. That is the gap we fill.',
      ],
      steps: [
        { title: 'Connect to where appointments live', detail: 'Your calendar, booking tool or field-service software, so reminders always match the real schedule.' },
        { title: 'Set the schedule', detail: 'Day-before and same-day reminders, plus "on the way" for field service.' },
        { title: 'Handle replies automatically', detail: 'Confirm, offer new times, release the slot, and hand anything unusual to a person.' },
        { title: 'Refill and rebook', detail: 'Offer freed slots to a waitlist, and text no-shows the same day with times to rebook.' },
        { title: 'Report it', detail: 'Confirmations, reschedules, no-shows and refilled slots each month.' },
      ],
    },
    {
      id: 'next',
      heading: 'Where reminders fit in the bigger picture',
      paragraphs: [
        'No-shows are one of the quieter ways a service business loses revenue it already earned: the marketing worked, the customer booked, and the slot still went empty. If you want to see where else that happens, /blog/what-is-revenue-leakage walks through it.',
        'Our /ai-employees/ai-dispatcher handles reminders, reschedules and rebooking alongside the schedule itself. If you’d like to see what it would look like for your business, /book.',
      ],
    },
  ],
  faq: [
    {
      question: 'When should I send an appointment reminder text?',
      answer:
        'Send one 24 to 48 hours before the appointment, so there is time to reschedule and refill the slot, and a second about 2 hours before. For field service, an "on the way" text replaces the second one.',
    },
    {
      question: 'Do reminder texts really reduce no-shows?',
      answer:
        'In healthcare studies, yes. A Cochrane review found text reminders increased attendance compared with no reminder (risk ratio 1.14) and worked about as well as phone calls at a lower cost. Results in other industries will vary.',
    },
    {
      question: 'What should an appointment reminder text say?',
      answer:
        'Your business name, the date and time or arrival window, and one clear reply option, such as "Reply C to confirm or R to reschedule". Keep it short and leave out promotions.',
    },
    {
      question: 'Do I need permission to send appointment reminder texts?',
      answer:
        'Yes. Reminders are usually treated as informational rather than marketing, but the customer still needs to have given you their number and agreed to texts about their appointment, and you must stop when they reply STOP. This is general information, not legal advice.',
    },
    {
      question: 'Should a med spa charge a deposit to reduce no-shows?',
      answer:
        'For treatments and consults, a deposit taken by payment link at booking and credited to the treatment is usually more effective than reminders alone. State the reschedule policy clearly in the booking confirmation.',
    },
    {
      question: 'What should I do when a customer doesn’t show up?',
      answer:
        'Text them the same day with two or three times to rebook, or a booking link. The sooner you reach out, the more likely they rebook with you instead of a competitor.',
    },
  ],
  sources: [
    {
      label: 'Cochrane, Mobile phone text messaging reminders for attendance at healthcare appointments (CD007458)',
      url: 'https://www.cochrane.org/CD007458/EPOC_mobile-phone-text-messaging-reminders-attendance-healthcare-appointments',
      note: 'Gurol-Urganci et al., 2013 update: attendance and cost results. Read Nov 6, 2026.',
    },
    {
      label: 'Boksmati et al., The effectiveness of SMS reminders on appointment attendance: a meta-analysis',
      url: 'https://link.springer.com/article/10.1007/s10916-016-0452-2',
      note: 'Journal of Medical Systems, 2016: pooled odds ratio 1.62 across 13 RCTs, timing not significant. Read Nov 6, 2026.',
    },
    {
      label: 'FCC, Stop unwanted robocalls and texts',
      url: 'https://www.fcc.gov/consumers/guides/stop-unwanted-robocalls-and-texts',
      note: 'Consumer guide to TCPA consent and opt-outs for calls and texts, including informational vs commercial texts. Read Nov 6, 2026.',
    },
    {
      label: 'FCC, Report and Order FCC 24-24 on revoking consent',
      url: 'https://docs.fcc.gov/public/attachments/FCC-24-24A1.pdf',
      note: 'Opt-out words such as STOP and the ten business day deadline to honor revocations. Read Nov 6, 2026.',
    },
  ],
  related: ['how-to-get-more-google-reviews', 'what-is-an-ai-agent', 'what-is-revenue-leakage'],
  queries: ['appointment reminder texts', 'how to reduce no shows', 'appointment reminder template', 'appointment reminder text message', 'no show policy med spa'],
};

export default article;
