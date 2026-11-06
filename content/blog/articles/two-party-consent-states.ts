// Target: "two party consent states" (3,600/mo US, DataforSEO Nov 6, 2026), "call
// recording laws by state" (210), "all party consent states", "is it legal to
// record phone calls". State list cross-checked Nov 6, 2026 against Justia's
// 50-state survey (last reviewed Sep 2024) and the Reporters Committee's
// Reporter's Recording Guide. Where they disagree (Delaware, Michigan) the table
// says so. Federal rule from 18 U.S.C. 2511(2)(d) on Cornell LII. Ambriz v.
// Google from Goodwin's Feb 2025 client alert. General information, not legal
// advice, and the article says so twice.

import type { Article } from '../types';

const article: Article = {
  slug: 'two-party-consent-states',
  category: 'guides',
  kind: 'Guide',
  title: 'Two-party consent states: call recording laws for businesses using AI phone agents (2026)',
  seoTitle: 'Two-Party Consent States (2026 List)',
  description:
    'Eleven states require everyone on a call to agree before it is recorded, and three more split the rule. The 2026 list and what it means for an AI receptionist.',
  datePublished: '2026-11-06',
  dateModified: '2026-11-06',
  lastChecked: '2026-11-06',
  cover: {
    style: 'versus',
    left: 'All-party consent',
    right: 'One-party consent',
    rows: [
      ['California', 'New York'],
      ['Florida', 'Texas'],
      ['Pennsylvania', 'Georgia'],
      ['Washington', 'Ohio'],
    ],
  },
  coverAlt:
    'A two-column comparison: all-party consent states such as California, Florida, Pennsylvania and Washington on one side, one-party consent states such as New York, Texas, Georgia and Ohio on the other.',
  intro: [
    'Eleven states require everyone on a phone call to consent before it is recorded: California, Delaware, Florida, Illinois, Maryland, Massachusetts, Michigan, Montana, New Hampshire, Pennsylvania and Washington. Connecticut and Nevada also require all-party consent for phone calls, Oregon requires it only for in-person conversations, and the other 36 states and Washington, DC only require one party to agree.',
    'If your business records calls, or uses an AI receptionist that records and transcribes them, the safe rule is simple: tell every caller at the start of the call that it is recorded, every time, in every state. Below is the full list with the statute for each state, the places where the sources disagree, and the exact line we have AI receptionists say.',
    'This is general information as of November 2026, not legal advice. Laws change and courts read them differently, so check with a lawyer for your situation.',
  ],
  tldr: [
    'All-party consent states: California, Delaware, Florida, Illinois, Maryland, Massachusetts, Michigan, Montana, New Hampshire, Pennsylvania, Washington.',
    'Split states: Connecticut and Nevada need all-party consent for phone calls; Oregon needs it for in-person conversations only.',
    'Federal law (18 U.S.C. 2511) only needs one party, but a stricter state law still applies to calls in or into that state.',
    'If a call crosses state lines, follow the stricter state. In practice that means announcing the recording on every call.',
    'AI call tools add a newer risk: a California court let a privacy suit proceed against an AI vendor that could use call data for its own purposes.',
  ],
  sections: [
    {
      id: 'what-it-means',
      heading: 'What does two-party consent mean?',
      paragraphs: [
        'It means every person on the call has to agree before the call is recorded. The name is a little misleading: on a three-way call, all three people have to agree, which is why lawyers and the Reporters Committee for Freedom of the Press call it **all-party consent**.',
        'One-party consent means a call can be recorded as long as one person on it agrees. If you are on the call, your own consent counts. Federal law works this way: 18 U.S.C. 2511(2)(d) allows a person who is a party to the call, or who has one party’s consent, to record it, unless the recording is made to commit a crime or a tort.',
        'States are allowed to be stricter than the federal rule, and eleven are, with three more that are strict for some kinds of conversation.',
      ],
      figure: {
        kind: 'stats',
        caption: 'how US states split on call recording consent, as of Nov 2026',
        items: [
          { value: '11', label: 'states require all-party consent' },
          { value: '3', label: 'states split the rule by phone or in person' },
          { value: '36 + DC', label: 'require only one party to agree' },
        ],
      },
    },
    {
      id: 'the-list',
      heading: 'Which states are two-party consent states in 2026?',
      paragraphs: [
        'These are the states where at least some conversations need everyone’s consent. Every state not on this table is a one-party state. The statute is the main one each source cites; some states have more than one law that applies.',
      ],
      table: {
        caption:
          'All-party and split consent states, with the main statute, cross-checked against Justia and the Reporters Committee on Nov 6, 2026.',
        columns: [
          { key: 'state', label: 'State' },
          { key: 'rule', label: 'Rule for phone calls' },
          { key: 'law', label: 'Main statute' },
          { key: 'note', label: 'Worth knowing' },
        ],
        rows: [
          { state: 'California', rule: 'All-party', law: 'Cal. Penal Code 632', note: 'Covers "confidential communications". Courts have applied it to calls made into California from other states.' },
          { state: 'Delaware', rule: 'All-party (disputed)', law: '11 Del. C. 1335 and 2402', note: 'Its privacy law says all parties; its wiretap law allows one party, and a 1975 federal case read them as one-party. Sources split, so treat it as all-party.' },
          { state: 'Florida', rule: 'All-party', law: 'Fla. Stat. 934.03', note: 'One of the strictest. Recording without consent can be a felony.' },
          { state: 'Illinois', rule: 'All-party for private conversations', law: '720 ILCS 5/14-2', note: 'Rewritten in 2014 after court rulings; it applies to conversations where people expect privacy, which includes most phone calls.' },
          { state: 'Maryland', rule: 'All-party', law: 'Md. Code, Cts. & Jud. Proc. 10-402', note: 'Penalties can include prison time.' },
          { state: 'Massachusetts', rule: 'All-party', law: 'Mass. Gen. Laws ch. 272, sec. 99', note: 'Bans secret recording; a clear announcement solves it.' },
          { state: 'Michigan', rule: 'All-party (disputed)', law: 'MCL 750.539c', note: 'The Court of Appeals held in Sullivan v. Gray that a participant may record. The Michigan Supreme Court has not ruled, so most guides still list it as all-party.' },
          { state: 'Montana', rule: 'All-party', law: 'Mont. Code Ann. 45-8-213', note: 'Has exceptions for public officials and recorded warnings.' },
          { state: 'New Hampshire', rule: 'All-party', law: 'N.H. Rev. Stat. 570-A:2', note: 'Applies to phone calls and in-person conversations.' },
          { state: 'Pennsylvania', rule: 'All-party', law: '18 Pa.C.S. 5703-5704', note: 'Called the Wiretap Act; violations can be a felony.' },
          { state: 'Washington', rule: 'All-party', law: 'RCW 9.73.030', note: 'The statute says a reasonably clear announcement that the call is recorded counts as consent.' },
          { state: 'Connecticut', rule: 'All-party (civil)', law: 'Conn. Gen. Stat. 52-570d', note: 'One-party for criminal law, but you can be sued for recording a phone call without everyone’s consent.' },
          { state: 'Nevada', rule: 'All-party', law: 'Nev. Rev. Stat. 200.620', note: 'Phone calls need all-party consent; in-person conversations only need one.' },
          { state: 'Oregon', rule: 'One-party', law: 'Or. Rev. Stat. 165.540', note: 'The reverse of Nevada: phone calls are one-party, in-person conversations are all-party.' },
        ],
      },
      callout:
        'Hawaii and Maine are one-party states for normal calls, but the Reporters Committee notes stricter rules for recording in private places. If you install recording devices in a shop or clinic, check those states separately.',
    },
    {
      id: 'interstate',
      heading: 'What if the caller is in a different state?',
      paragraphs: [
        'This is the part that catches businesses out. Your HVAC company might be in Texas, a one-party state, but the homeowner calling you could be on a cell phone in California. The Reporters Committee’s example is a reporter in Virginia calling a source in Maryland: the Maryland law can still apply to the reporter.',
        'Courts don’t all agree on which state wins in a cross-border call, and California courts in particular have applied California law to calls coming in from elsewhere. The rule of thumb almost every guide gives is the same: **follow the stricter state.** Since you can’t know where a mobile caller is standing, the only rule that works is to announce the recording on every call.',
      ],
    },
    {
      id: 'ai-receptionists',
      heading: 'Do these laws apply to AI receptionists and AI phone agents?',
      paragraphs: [
        'Yes. The laws are about recording and listening to a conversation, and an AI receptionist that records, transcribes or stores calls is doing exactly that. It doesn’t matter that no human listens live.',
        'There is a newer risk too. In February 2025 a federal court in California let a class action go ahead against Google over its contact center AI, which a customer service line used to handle calls (Ambriz v. Google). The claim was that the AI vendor was effectively a third party listening in, because its terms let it use call data for its own purposes. The court accepted that theory at an early stage. Later cases have pushed back, and the law is still moving.',
        'For a business owner, the practical lesson is to ask any AI phone vendor two questions: does it use your call recordings to train its own models, and can you switch that off? We set up AI receptionists so recordings and transcripts belong to the business, and we have the assistant announce the recording at the start of every call. You can see how ours handle calls on /ai-employees/ai-receptionist.',
      ],
    },
    {
      id: 'what-to-say',
      heading: 'What should an AI receptionist say at the start of a call?',
      paragraphs: [
        'One sentence, said before anything else, that covers both disclosures callers increasingly expect: that it is an AI, and that the call is recorded. This is the opening we use:',
      ],
      callout:
        '"Thanks for calling Northside Heating and Air. I’m an AI assistant, and this call is recorded so we can help you properly. What can I do for you today?"',
      bullets: [
        '**Say it before the caller gives any personal details.** Consent has to come before the recording matters, not halfway through.',
        '**Keep it short.** Callers hang up on long legal scripts. One sentence is enough; Washington’s statute treats a reasonably clear announcement as consent.',
        '**Offer a way out.** If a caller says they don’t want to be recorded, the assistant should offer a callback from a person or a voicemail that isn’t transcribed.',
        '**Do the same on outbound calls.** If an AI agent calls customers back, it needs the same announcement.',
        '**Medical and financial calls need more.** A med spa or clinic also has HIPAA to think about. See /industries/med-spas.',
      ],
    },
    {
      id: 'canada',
      heading: 'What about recording calls in Canada?',
      paragraphs: [
        'Canada’s Criminal Code, section 184, is one-party: a person who is part of a conversation can record it without breaking criminal law. That isn’t the end of it for a business, though.',
        'A business recording customer calls is collecting personal information, so federal privacy law (PIPEDA) applies, along with provincial laws in Quebec, Alberta and British Columbia. In practice that means telling callers the call is recorded and why, at the start of the call. The same one-sentence opening covers it.',
      ],
    },
    {
      id: 'penalties',
      heading: 'What happens if you get it wrong?',
      paragraphs: [
        'It depends on the state, but the exposure is real. Several all-party states make secret recording a crime, and states such as California and Florida also let people sue. California’s privacy statute is a common basis for class actions, because damages are counted per violation and a business records a lot of calls.',
        'The fix costs nothing. An announcement at the start of every call removes almost all of this risk, which is why we put it in every AI receptionist we build. If you want a second set of eyes on how your phones are set up, /book.',
      ],
    },
  ],
  faq: [
    {
      question: 'Which states are two-party consent states?',
      answer:
        'As of November 2026 the all-party consent states are California, Delaware, Florida, Illinois, Maryland, Massachusetts, Michigan, Montana, New Hampshire, Pennsylvania and Washington. Connecticut and Nevada also require all-party consent for phone calls, and Oregon requires it for in-person conversations.',
    },
    {
      question: 'Is it legal to record a phone call without telling the other person?',
      answer:
        'In one-party consent states, yes, if you are on the call. In all-party consent states such as California, Florida and Pennsylvania, no. Because a caller can be in a different state, businesses should tell every caller the call is recorded.',
    },
    {
      question: 'Is Texas a one-party consent state?',
      answer:
        'Yes. Texas only requires one party to consent. But if your business in Texas takes a call from someone in California or Florida, that state’s stricter law can apply, so announce the recording anyway.',
    },
    {
      question: 'Do I need consent to record calls with an AI receptionist?',
      answer:
        'Yes. Recording and transcribing a call with AI is still recording under these laws. Have the AI receptionist say at the start of every call that it is an AI assistant and that the call is recorded.',
    },
    {
      question: 'Does a recorded message at the start of the call count as consent?',
      answer:
        'Generally yes. Washington’s statute says a reasonably clear announcement counts as consent, and staying on the line after a clear notice is widely treated as agreeing. Make the announcement before the caller shares personal details.',
    },
    {
      question: 'Is Canada a one-party or two-party consent country?',
      answer:
        'Canada’s Criminal Code is one-party, but businesses that record customer calls also fall under privacy law (PIPEDA and provincial laws), which expects you to tell callers the call is recorded and why.',
    },
    {
      question: 'Is this legal advice?',
      answer:
        'No. This is general information checked against published sources in November 2026. Recording laws change and courts interpret them differently, so ask a lawyer licensed in your state about your specific setup.',
    },
  ],
  sources: [
    {
      label: 'Justia, Recording Phone Calls and Conversations: 50-State Survey',
      url: 'https://www.justia.com/50-state-surveys/recording-phone-calls-and-conversations/',
      note: 'State-by-state rules, including Nevada, Oregon, Connecticut and Michigan details (last reviewed by Justia Sep 2024). Read Nov 6, 2026.',
    },
    {
      label: 'Reporters Committee for Freedom of the Press, Reporter’s Recording Guide',
      url: 'https://www.rcfp.org/introduction-to-reporters-recording-guide/',
      note: 'All-party state list, split states, Hawaii and Maine, and the interstate call example. Read Nov 6, 2026.',
    },
    {
      label: '18 U.S. Code 2511 (Cornell Legal Information Institute)',
      url: 'https://www.law.cornell.edu/uscode/text/18/2511',
      note: 'Federal one-party rule in subsection (2)(d). Read Nov 6, 2026.',
    },
    {
      label: 'Goodwin, AI voice products subject to California invasion of privacy claims',
      url: 'https://www.goodwinlaw.com/en/insights/publications/2025/02/alerts-practices-dpc-ftec-ai-voice-products-subject-to-california-invasion-of-privacy-claims',
      note: 'Summary of the Feb 2025 Ambriz v. Google ruling on AI contact center tools. Read Nov 6, 2026.',
    },
    {
      label: 'Office of the Privacy Commissioner of Canada, PIPEDA finding 2002-086',
      url: 'https://www.priv.gc.ca/en/opc-actions-and-decisions/investigations/investigations-into-businesses/2002/pipeda-2002-086/',
      note: 'PIPEDA investigation about a business recording a customer call. Read Nov 6, 2026.',
    },
  ],
  related: ['what-is-an-ai-agent', 'a2p-10dlc-explained', 'how-to-get-recommended-by-chatgpt'],
  queries: [
    'two party consent states',
    'call recording laws by state',
    'all party consent states',
    'is it legal to record phone calls',
    'one party consent states',
    'ai receptionist call recording consent',
  ],
};

export default article;
