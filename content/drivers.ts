/**
 * The 10 drivers of enterprise value, in priority order.
 *
 * Shared with The Automation Institute's Enterprise Value Score (teacup-landing,
 * src/content/drivers.ts) so the two properties score a business the same way.
 * `employee` is the Hexona AI employee that moves the driver, used on the
 * results to recommend what to build first.
 */

export type Driver = {
  id: string;
  employee: string;
  name: string;
  short: string;
  buyerWants: string;
  aiHelps: string;
  scoreName: string;
  statements: [string, string];
  buildFirst: string;
  /** Counts double in the overall score. */
  weight: 1 | 2;
};

export const drivers: Driver[] = [
  {
    id: "financials",
    employee: "ai-office-admin",
    name: "Clean financials and data",
    short: "Clean financials",
    buyerWants: "Accurate, current books and numbers they can trust",
    aiHelps: "Speeds up categorizing, monthly reporting and CRM cleanup, alongside your accountant",
    scoreName: "Clean financials and data",
    statements: [
      "My monthly financials are ready within 15 days of month end.",
      "I trust my customer and sales data.",
    ],
    buildFirst: "Monthly reporting and customer data cleanup",
    weight: 2,
  },
  {
    id: "owner-dependence",
    employee: "ai-office-admin",
    name: "Less owner dependence",
    short: "Owner dependence",
    buyerWants: "A business that keeps running without you",
    aiHelps: "Takes admin, reporting and routine decisions off your plate",
    scoreName: "Less owner dependence",
    statements: [
      "My business could run for three months without me.",
      "Most revenue doesn't depend on my personal relationships.",
    ],
    buildFirst: "Handoffs for the work only you do today",
    weight: 2,
  },
  {
    id: "recurring-revenue",
    employee: "ai-retention",
    name: "Predictable, recurring revenue",
    short: "Recurring revenue",
    buyerWants: "Revenue that's likely to come back next year",
    aiHelps: "Offers plans after each job, automates renewals and wins back lapsed customers",
    scoreName: "Recurring revenue",
    statements: [
      "A meaningful share of revenue repeats automatically or under contract.",
      "I actively renew customers and win back those who lapse.",
    ],
    buildFirst: "Plan offers, renewals and win-backs",
    weight: 1,
  },
  {
    id: "margin",
    employee: "ai-dispatcher",
    name: "Earnings and margin",
    short: "Margin",
    buyerWants: "Healthy profit after every cost",
    aiHelps: "Automates quoting, admin and follow-up, so the savings reach profit",
    scoreName: "Earnings and margin",
    statements: [
      "I know my profit margin by service or product.",
      "My margin is at or above my industry's norm.",
    ],
    buildFirst: "Quoting support and admin automation",
    weight: 1,
  },
  {
    id: "key-employee-risk",
    employee: "ai-office-admin",
    name: "Less key-employee risk",
    short: "Key-employee risk",
    buyerWants: "No single person the business can't afford to lose",
    aiHelps: "Captures know-how and speeds up training",
    scoreName: "Key-employee risk",
    statements: [
      "No single employee's departure would seriously hurt the business.",
      "A new hire gets productive quickly.",
    ],
    buildFirst: "A staff training assistant built from your know-how",
    weight: 1,
  },
  {
    id: "documented-systems",
    employee: "ai-office-admin",
    name: "Documented systems",
    short: "Documented systems",
    buyerWants: "Processes a new person could pick up and follow",
    aiHelps: "Turns how work really gets done into SOPs your team and AI can use",
    scoreName: "Documented systems",
    statements: ["My core processes are written down.", "My team actually follows them."],
    buildFirst: "An AI assistant that turns how you work into SOPs",
    weight: 1,
  },
  {
    id: "growth",
    employee: "ai-sales-follow-up",
    name: "Growth from what you already have",
    short: "Growth",
    buyerWants: "Room to grow from existing leads and customers",
    aiHelps: "Speeds up lead response, reactivates old leads and prompts repeat business",
    scoreName: "Growth from what you have",
    statements: [
      "New leads get a response within minutes.",
      "I regularly follow up with old leads and past customers.",
    ],
    buildFirst: "Fast lead response and old-lead reactivation",
    weight: 1,
  },
  {
    id: "customer-satisfaction",
    employee: "ai-retention",
    name: "Customer satisfaction",
    short: "Customer satisfaction",
    buyerWants: "Happy customers who return and refer",
    aiHelps: "Handles review requests, follow-up and complaint triage",
    scoreName: "Customer satisfaction",
    statements: [
      "I measure customer satisfaction regularly.",
      "A steady share of new work comes from referrals.",
    ],
    buildFirst: "Review requests, follow-up and complaint triage",
    weight: 1,
  },
  {
    id: "cash-flow",
    employee: "ai-collections",
    name: "Healthy cash flow",
    short: "Cash flow",
    buyerWants: "Money that comes in quickly and predictably",
    aiHelps: "Chases invoices, collects deposits and sends payment reminders",
    scoreName: "Cash flow",
    statements: ["Customers pay on time.", "Overdue invoices get followed up automatically."],
    buildFirst: "Invoice follow-up and payment reminders",
    weight: 1,
  },
  {
    id: "output-per-employee",
    employee: "ai-dispatcher",
    name: "Output per employee",
    short: "Output per employee",
    buyerWants: "More profit per person",
    aiHelps: "Lets each person handle more work without adding headcount",
    scoreName: "Output per employee",
    statements: [
      "I track revenue and gross profit per employee.",
      "We can grow without adding people at the same rate.",
    ],
    buildFirst: "A map of the work each role can hand off",
    weight: 1,
  },
];
