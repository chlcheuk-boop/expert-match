import type { ExpertRequest } from "@/lib/types";

/**
 * A consultation another member has agreed to share as an example.
 * The person who asked is described, never named.
 */
export interface CommunityRequest extends ExpertRequest {
  /** Anonymised description of who asked, e.g. "Founder, 9-unit coffee group". */
  requester: string;
  /** What the consultation actually produced. */
  outcome: string;
}

/**
 * A short, curated selection — not the full history of the platform.
 * Experts are fictional composites, as everywhere else in this mock data.
 */
export const COMMUNITY_REQUESTS: CommunityRequest[] = [
  {
    id: "pub_318",
    requester: "Owner, 9-unit coffee group",
    title: "Franchising a regional coffee concept",
    description:
      "Whether to franchise at nine locations, and what has to be true operationally before selling the first territory.",
    fullRequest:
      "We run nine coffee shops in one metro and keep getting approached about franchising. I want an honest read on whether we are ready, what has to be documented first, and how franchisors actually make money at this size.",
    industry: "Restaurants & QSR",
    status: "Completed",
    date: "2026-08-05",
    durationMinutes: 60,
    tags: ["Franchising", "Unit Economics", "Operations"],
    outcome:
      "Paused franchising for four quarters and used the time to document the operating manual and prove out two non-founder-run stores. The advice was that franchisees buy a system, not a brand.",
    expert: {
      id: "pub_exp_11",
      name: "Gloria Santos",
      title: "Founder & CEO",
      company: "Pinebrook Coffee Co.",
      level: "Founder / CEO",
      hourlyRate: 1500,
      background:
        "Built a 60-unit coffee franchise system from a single location and sold territories across four states.",
    },
  },
  {
    id: "pub_294",
    requester: "COO, Series C infrastructure company",
    title: "Standing up a partner channel from scratch",
    description:
      "How to structure a reseller programme without cannibalising a direct sales team.",
    fullRequest:
      "Our direct team is at capacity and partners keep asking to resell. I want to understand margin structures, how to avoid channel conflict, and what the first two partner hires should actually own.",
    industry: "Software & Technology",
    status: "Completed",
    date: "2026-07-21",
    durationMinutes: 45,
    tags: ["Channel Strategy", "Partnerships", "Go-to-Market"],
    outcome:
      "Launched with three regional partners on a fixed-margin model and a hard deal-registration rule. Channel conflict escalations dropped to near zero in the first two quarters.",
    expert: {
      id: "pub_exp_12",
      name: "Rajiv Menon",
      title: "Former Head of Global Partnerships",
      company: "Cirroline",
      level: "Senior Executive",
      hourlyRate: 1150,
      background:
        "Built partner channels at two infrastructure companies, growing indirect revenue past 40% of bookings.",
    },
  },
  {
    id: "pub_271",
    requester: "Founder, regional snack brand",
    title: "Getting a snack brand into the club channel",
    description:
      "Pack economics, demo strategy, and what a club buyer needs to see before a first test.",
    fullRequest:
      "We have strong grocery velocity and want to test club. I want to understand club pack economics, what a roadshow actually costs, and how brands survive the volume swings after a successful test.",
    industry: "Consumer Products",
    status: "Completed",
    date: "2026-06-03",
    durationMinutes: 60,
    tags: ["Club Channel", "Pack Economics", "Trade Spend"],
    outcome:
      "Reworked the club pack to protect margin before pitching, then ran a regional roadshow first. The test converted to a national item nine months later.",
    expert: {
      id: "pub_exp_13",
      name: "Dana Prescott",
      title: "Former VP of Club Sales",
      company: "Northbrook Foods",
      level: "Senior Executive",
      hourlyRate: 1000,
      background:
        "Placed more than 30 items into national club retailers and managed those relationships for 15 years.",
    },
  },
  {
    id: "pub_255",
    requester: "Founder, independent podcast network",
    title: "Building an advertising business for a podcast network",
    description:
      "Moving from a host-read marketplace to direct advertiser relationships.",
    fullRequest:
      "We have eight shows and sell everything through a marketplace that takes most of the margin. I want to understand what it takes to sell direct — team, rate card, measurement — and at what audience size that becomes realistic.",
    industry: "Media & Entertainment",
    status: "Completed",
    date: "2026-05-07",
    durationMinutes: 45,
    tags: ["Ad Sales", "Rate Card", "Measurement"],
    outcome:
      "Hired one seller against a small guaranteed base rather than building a team, and kept the marketplace for remnant inventory. Direct now covers roughly a third of revenue at a much better margin.",
    expert: {
      id: "pub_exp_14",
      name: "Simone Dubois",
      title: "Former SVP of Ad Sales",
      company: "Larkfield Audio",
      level: "Senior Executive",
      hourlyRate: 975,
      background:
        "Led audio ad sales through the shift from network buys to direct and programmatic.",
    },
  },
  {
    id: "pub_238",
    requester: "CEO, multi-site specialty clinics",
    title: "Pricing a specialty clinic network",
    description:
      "Payer mix, contract renegotiation, and where cash-pay services genuinely fit.",
    fullRequest:
      "We operate six specialty clinics and our payer contracts have not been renegotiated in years. I want to understand where we actually have leverage, and whether a cash-pay service line is a distraction or a real margin opportunity.",
    industry: "Healthcare",
    status: "Completed",
    date: "2026-04-29",
    durationMinutes: 60,
    tags: ["Payer Contracts", "Pricing", "Margin"],
    outcome:
      "Renegotiated two of six payer contracts using volume data they had never presented before, and launched a single cash-pay line rather than three.",
    expert: {
      id: "pub_exp_15",
      name: "Dr. Ruth Abernathy",
      title: "Former Chief Strategy Officer",
      company: "Kearnley Health",
      level: "C-Suite",
      hourlyRate: 1400,
      background:
        "Negotiated payer contracts for a regional system and led its ambulatory pricing strategy.",
    },
  },
  {
    id: "pub_214",
    requester: "VP Operations, industrial components maker",
    title: "Automating a legacy assembly line",
    description:
      "Sequencing automation investment on a line that still has ten good years in it.",
    fullRequest:
      "Our main assembly line is twenty years old and running near capacity. I want to understand how to sequence automation investment, what payback periods are realistic, and what usually gets underestimated in these projects.",
    industry: "Manufacturing",
    status: "Completed",
    date: "2026-02-18",
    durationMinutes: 45,
    tags: ["Automation", "Capital Planning", "Throughput"],
    outcome:
      "Automated material handling before assembly itself, which cleared the real bottleneck at a fraction of the cost. Payback landed inside fourteen months.",
    expert: {
      id: "pub_exp_16",
      name: "Peter Lindqvist",
      title: "Director of Manufacturing Engineering",
      company: "Valmark Industries",
      level: "Director / Senior Leader",
      hourlyRate: 825,
      background:
        "Has run eleven line automation projects across automotive and industrial components.",
    },
  },
];
