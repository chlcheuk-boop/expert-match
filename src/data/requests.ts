import type { ExpertRequest } from "@/lib/types";

/**
 * Mock request history.
 *
 * Experts are fictional composites — the product should never imply that a
 * named public figure is bookable. Replace this module with the real data
 * layer; presentation components only depend on the `ExpertRequest` shape.
 */
export const REQUESTS: ExpertRequest[] = [
  {
    id: "req_2041",
    title: "Starting a fried chicken concept",
    description:
      "Looking for advice on unit economics, menu strategy, restaurant operations, site selection, and scaling.",
    fullRequest:
      "I'm exploring opening a fried chicken concept in the Southeast and want to understand unit economics, menu strategy, staffing models, site selection, and what actually makes the concept scalable past the first few units. I have a location under consideration and a rough P&L I'd like pressure-tested.",
    industry: "Restaurants & QSR",
    status: "Completed",
    date: "2026-09-12",
    durationMinutes: 60,
    tags: ["Menu Strategy", "Unit Economics", "Operations", "Expansion"],
    notes:
      "Focus on getting the first location operationally consistent before expanding the menu or opening additional units. Target a 26–28% food cost at the current price point; revisit the drive-thru layout before signing the lease.",
    expert: {
      id: "exp_310",
      name: "Marcus Dellwood",
      title: "Founder & CEO",
      company: "Copper Skillet Chicken",
      level: "Founder / CEO",
      hourlyRate: 1600,
      background:
        "25+ years in restaurants; grew a regional fried chicken concept from one location to 140 company-operated units.",
    },
  },
  {
    id: "req_2038",
    title: "Building operating systems for a five-location restaurant group",
    description:
      "Standardizing prep, labor scheduling, and quality checks across locations without adding management overhead.",
    fullRequest:
      "We run five locations and every one of them operates a little differently. I want to understand what operating systems — checklists, labor models, prep sheets, quality audits — actually hold up at this size, and how to roll them out without hiring a large back-office team.",
    industry: "Restaurants & QSR",
    status: "Completed",
    date: "2026-08-27",
    durationMinutes: 60,
    tags: ["Operations", "Labor Model", "Multi-Unit"],
    notes:
      "Start with a single daily opening/closing checklist per station and audit it weekly for a quarter before layering on anything else. General managers own the numbers, not the corporate office.",
    expert: {
      id: "exp_284",
      name: "Sarah Chen",
      title: "Former SVP of Operations",
      company: "Harbor Hospitality Group",
      level: "Senior Executive",
      hourlyRate: 1200,
      background:
        "Led operations for a 200-unit casual dining group; built the multi-unit operating standards still used there today.",
    },
  },
  {
    id: "req_2044",
    title: "Restaurant supply chain strategy",
    description:
      "Evaluating distributor consolidation and protein contracts ahead of a regional expansion.",
    fullRequest:
      "We're expanding from 5 to 12 locations over the next 18 months. I want to understand whether to consolidate onto a single broadline distributor, how protein contracts are typically structured at our volume, and what leverage we realistically have.",
    industry: "Restaurants & QSR",
    status: "Scheduled",
    date: "2026-10-02",
    durationMinutes: 45,
    tags: ["Supply Chain", "Vendor Strategy", "Cost Control"],
    suggestedQuestions: [
      "At 12 locations, does a single broadline distributor still make sense, or should we split proteins out?",
      "What contract terms are actually negotiable at our volume, and which ones never move?",
      "How far ahead should we lock protein pricing given where the market is now?",
      "What does a distributor look for before giving better terms to a growing group?",
    ],
    expert: {
      id: "exp_401",
      name: "Marcus Reed",
      title: "Director of Supply Chain",
      company: "Northfield Food Group",
      level: "Director / Senior Leader",
      hourlyRate: 800,
      background:
        "Negotiates distribution and protein contracts for a 300-unit franchise system across the Midwest.",
    },
  },
  {
    id: "req_2033",
    title: "Moving from SMB to enterprise sales",
    description:
      "Rebuilding the sales motion, comp plan, and security review process for six-figure contracts.",
    fullRequest:
      "Our product is being pulled upmarket by inbound demand, but the sales motion is still self-serve and SMB. I want to understand how to restructure the team, what the comp plan should look like, and what we need in place — security review, procurement, legal — before we can close six-figure contracts reliably.",
    industry: "Software & Technology",
    status: "Completed",
    date: "2026-07-30",
    durationMinutes: 60,
    tags: ["Go-to-Market", "Sales Comp", "Enterprise Readiness"],
    notes:
      "Don't convert existing SMB reps — hire two enterprise AEs with a longer ramp and separate quota. SOC 2 Type II is table stakes before the first serious procurement conversation.",
    expert: {
      id: "exp_129",
      name: "Daniel Okafor",
      title: "Former VP of Enterprise Sales",
      company: "Lattice Systems",
      level: "Senior Executive",
      hourlyRate: 1100,
      background:
        "Built and led an 80-person enterprise sales organization through a move from mid-market into the Fortune 500.",
    },
  },
  {
    id: "req_2027",
    title: "Pricing and packaging for a usage-based model",
    description:
      "Moving from per-seat pricing to consumption without destabilizing existing contracts.",
    fullRequest:
      "We want to shift from per-seat to usage-based pricing. I'd like to talk through packaging, how to handle existing annual contracts mid-term, and what the revenue predictability story looks like to a board.",
    industry: "Software & Technology",
    status: "Completed",
    date: "2026-05-14",
    durationMinutes: 45,
    tags: ["Pricing", "Packaging", "Revenue Strategy"],
    notes:
      "Grandfather existing contracts through renewal rather than forcing migration. Introduce a committed-spend floor so the revenue story stays legible to the board.",
    expert: {
      id: "exp_188",
      name: "Priya Raghunathan",
      title: "Chief Revenue Officer",
      company: "Vantage Cloud",
      level: "C-Suite",
      hourlyRate: 1350,
      background:
        "Led two pricing model transitions at infrastructure companies, including a per-seat to consumption migration across 4,000 accounts.",
    },
  },
  {
    id: "req_2046",
    title: "Getting a new beverage brand into national retail",
    description:
      "Understanding broker relationships, slotting fees, and what buyers expect at a first category review.",
    fullRequest:
      "We have strong regional traction and want to approach national grocery. I want to understand how broker relationships actually work, what slotting costs look like, and what a category buyer expects to see at a first review.",
    industry: "Consumer Products",
    status: "Matching",
    date: "2026-09-16",
    tags: ["Retail Distribution", "Category Management", "Trade Spend"],
    expert: {
      id: "exp_356",
      name: "Angela Whitfield",
      title: "Former SVP of Retail Distribution",
      company: "Crestline Beverage Co.",
      level: "Senior Executive",
      hourlyRate: 900,
      background:
        "Placed more than 40 beverage SKUs into national grocery and club channels over a 20-year career.",
    },
  },
  {
    id: "req_2047",
    title: "Understanding the hospital procurement process",
    description:
      "How value analysis committees evaluate new devices, and realistic timelines for a first health system.",
    fullRequest:
      "We're a device startup with a signed pilot at one hospital. I want to understand how value analysis committees actually evaluate new products, who the real decision makers are, and what timeline to plan for at a large health system.",
    industry: "Healthcare",
    status: "Requested",
    date: "2026-09-18",
    tags: ["Procurement", "Value Analysis", "Health Systems"],
    expert: {
      id: "exp_222",
      name: "Dr. Elena Vasquez",
      title: "Former Chief Supply Chain Officer",
      company: "Meridian Health System",
      level: "C-Suite",
      hourlyRate: 1250,
      background:
        "Oversaw $2B in annual purchasing across a 14-hospital system and chaired its value analysis program.",
    },
  },
  {
    id: "req_2045",
    title: "Building a compliance function for a Series B fintech",
    description:
      "First compliance hires, sponsor bank expectations, and what to build before a state licensing push.",
    fullRequest:
      "We're a Series B payments company operating under a sponsor bank. I want to understand what a real compliance function looks like at our stage — first hires, monitoring, reporting cadence — and what has to be in place before we pursue state licensing directly.",
    industry: "Financial Services",
    status: "Scheduled",
    date: "2026-09-29",
    durationMinutes: 60,
    tags: ["Compliance", "Licensing", "Risk"],
    suggestedQuestions: [
      "What does a credible compliance function look like at Series B, headcount and all?",
      "Which responsibilities should stay with the sponsor bank versus move in-house first?",
      "How early should we start state licensing if we want to be direct within two years?",
      "What are the warning signs that a sponsor bank relationship is about to tighten?",
    ],
    expert: {
      id: "exp_267",
      name: "Robert Nakamura",
      title: "Former Chief Compliance Officer",
      company: "Ardsley Financial",
      level: "C-Suite",
      hourlyRate: 1450,
      background:
        "Built compliance programs at two payments companies and led remediation under a consent order.",
    },
  },
  {
    id: "req_2019",
    title: "Store footprint strategy for a regional expansion",
    description:
      "Format sizing, market sequencing, and lease structures for a move into three new metros.",
    fullRequest:
      "We operate 22 stores in one region and want to enter three new metros. I'd like to talk through format sizing, how to sequence markets, and what lease structures protect us if a market underperforms.",
    industry: "Retail",
    status: "Completed",
    date: "2026-04-08",
    durationMinutes: 90,
    tags: ["Site Selection", "Market Entry", "Real Estate"],
    notes:
      "Enter one metro at a time with three to four stores — a single store in a new market never gets the marketing efficiency to work. Push for co-tenancy and kick-out clauses on everything above 4,000 sq ft.",
    expert: {
      id: "exp_144",
      name: "Lisa Hartmann",
      title: "Former EVP of Store Operations",
      company: "Brookline Retail Group",
      level: "Senior Executive",
      hourlyRate: 1050,
      background:
        "Opened over 300 stores across 20 states and managed a 400-location portfolio through two expansion cycles.",
    },
  },
  {
    id: "req_2012",
    title: "Reshoring a contract manufacturing line",
    description:
      "Cost modeling and qualification timelines for moving production from Southeast Asia to the US.",
    fullRequest:
      "We're evaluating moving a production line from a contract manufacturer in Vietnam to a domestic partner. I want a realistic view of landed cost differences, qualification timelines, and what typically goes wrong during the transfer.",
    industry: "Manufacturing",
    status: "Cancelled",
    date: "2026-03-02",
    tags: ["Reshoring", "Cost Modeling", "Supplier Qualification"],
    notes: "Cancelled — we paused the reshoring evaluation until after the Q3 board review.",
    expert: {
      id: "exp_419",
      name: "Thomas Beaulieu",
      title: "Plant Operations Manager",
      company: "Arcadia Industrial",
      level: "Industry Professional",
      hourlyRate: 750,
      background:
        "12 years running domestic contract manufacturing lines, including six supplier transfers from Asia.",
    },
  },
  {
    id: "req_2004",
    title: "Licensing strategy for an independent studio's back catalog",
    description:
      "Window structures and platform economics for a 40-title library coming out of an output deal.",
    fullRequest:
      "Our output deal expires next year and we get 40 titles back. I want to understand how to structure windows across streaming, AVOD, and international, and what the economics realistically look like for a library our size.",
    industry: "Media & Entertainment",
    status: "Completed",
    date: "2026-01-22",
    durationMinutes: 60,
    tags: ["Licensing", "Windowing", "Content Economics"],
    notes:
      "Hold back the six strongest titles from any first-window package — they carry the negotiation. International sold territory-by-territory outperforms a single global deal at this library size.",
    expert: {
      id: "exp_301",
      name: "Nina Castellanos",
      title: "Former Head of Content Licensing",
      company: "Pinehurst Media",
      level: "Senior Executive",
      hourlyRate: 950,
      background:
        "Negotiated library and output deals across streaming and international markets for two mid-size studios.",
    },
  },
  {
    id: "req_1987",
    title: "Evaluating a ground lease for a first flagship location",
    description:
      "Reading the economics of a 25-year ground lease and where the negotiating room actually is.",
    fullRequest:
      "We've been offered a 25-year ground lease on a corner parcel for our first flagship. I want help reading the economics, understanding escalation and reversion terms, and knowing where there's genuine negotiating room.",
    industry: "Real Estate",
    status: "Completed",
    date: "2025-11-06",
    durationMinutes: 45,
    tags: ["Ground Lease", "Deal Structure", "Negotiation"],
    notes:
      "The escalation schedule matters more than the headline rent — push for CPI-capped increases. Reversion terms on the improvements are where this deal is actually won or lost.",
    expert: {
      id: "exp_233",
      name: "Gregory Almeida",
      title: "Managing Director",
      company: "Sterling Property Partners",
      level: "Director / Senior Leader",
      hourlyRate: 800,
      background:
        "Structured over $1.5B in retail and hospitality ground leases across secondary US markets.",
    },
  },
  {
    id: "req_2049",
    title: "Preparing for technical due diligence",
    description:
      "What acquirers actually examine in the codebase, the team, and the security posture.",
    fullRequest:
      "We're in early conversations with a strategic acquirer and expect technical due diligence within the quarter. I want to understand what they will actually examine — architecture, code quality, security posture, key-person risk — and what we can realistically fix in eight weeks.",
    industry: "Software & Technology",
    status: "Scheduled",
    date: "2026-09-24",
    durationMinutes: 60,
    tags: ["Due Diligence", "Security", "Engineering Org"],
    suggestedQuestions: [
      "What findings most often reduce the price at this stage, and which ones are just noise?",
      "How much can we credibly remediate in eight weeks before diligence starts?",
      "How do acquirers assess key-person risk on a small engineering team?",
      "What documentation should already exist before the first technical session?",
    ],
    expert: {
      id: "exp_372",
      name: "Helena Vaughn",
      title: "Former Chief Technology Officer",
      company: "Brightwater Systems",
      level: "C-Suite",
      hourlyRate: 1300,
      background:
        "Led engineering through two acquisitions and has sat on both sides of technical due diligence.",
    },
  },
  {
    id: "req_2050",
    title: "Inventory planning for a first peak season",
    description:
      "Buy depth, markdown cadence, and reorder timing heading into a first holiday quarter.",
    fullRequest:
      "This is our first holiday season with physical stores. I want to understand how to set buy depth by store, when to commit to reorders, and how to plan markdown cadence so we don't end January carrying the whole season.",
    industry: "Retail",
    status: "Scheduled",
    date: "2026-10-15",
    durationMinutes: 45,
    tags: ["Inventory", "Merchandise Planning", "Markdowns"],
    suggestedQuestions: [
      "How should buy depth differ between our highest and lowest volume stores?",
      "When is the last useful moment to place a holiday reorder?",
      "What markdown cadence protects margin without leaving us long in January?",
      "What early signals tell you a season is running ahead or behind plan?",
    ],
    expert: {
      id: "exp_388",
      name: "Owen Marsh",
      title: "Director of Merchandise Planning",
      company: "Halloway Stores",
      level: "Director / Senior Leader",
      hourlyRate: 850,
      background:
        "Plans seasonal inventory across 180 stores and has run twelve peak seasons end to end.",
    },
  },
];
