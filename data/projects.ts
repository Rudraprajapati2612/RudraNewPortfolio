export type ProjectCategory = "Engineering" | "People" | "Research" | "Skills" | "Writing";

export interface SimplyTabContent {
  whatItIs: string;
  ideaTitle?: string;
  problemExplored: string;
  architecturalWhy: string;
  roleAndContribution?: string;
  currentStage?: string;
}

export interface UnderTheHoodComponent {
  title: string;
  description: string;
  protocolOrStack?: string;
}

export interface UnderTheHoodProgram {
  name: string;
  description: string;
}

export interface UnderTheHoodCustomSection {
  title: string;
  content?: string;
  items?: { name: string; description: string }[];
}

export interface UnderTheHoodTabContent {
  systemArchitectureOverview: string;
  matchingAndSettlement?: string;
  onChainPrograms?: UnderTheHoodProgram[];
  techTags?: string[];
  customSections?: UnderTheHoodCustomSection[];
  components: UnderTheHoodComponent[];
  technicalChallenges: {
    challenge: string;
    tradeoff: string;
  }[];
  implementationHighlights: string[];
  resultsAndBenchmarks: string[];
  limitations: string[];
}

export interface ProjectItem {
  id: string;
  index: string;
  category: ProjectCategory;
  eyebrow: string;
  headline: string;
  headlineSerif?: string; // specific word/phrase emphasized in serif italic
  description: string;
  tags: string[];
  visualType: 
    | "hydra-diagram"
    | "portrait"
    | "sentinel-guard"
    | "ferrum-pipeline"
    | "layoutd-terminal"
    | "swaplit-curve"
    | "uptime-monitor"
    | "engram-pipeline"
    | "skills-matrix"
    | "leaf-vision"
    | "research-nodes"
    | "notes-paper";
  status: "Prototype" | "In Development" | "Research" | "Active" | "Archive";
  githubUrl?: string;
  contractsUrl?: string;
  dashboardUrl?: string;
  docsUrl?: string;
  demoUrl?: string;
  readTime?: string;
  gridSpanDesktop: string;
  simply: SimplyTabContent;
  underTheHood: UnderTheHoodTabContent;
}

export const CATEGORIES: ProjectCategory[] = [
  "Engineering",
  "People",
  "Research",
  "Skills",
  "Writing",
];

export const PROJECTS: ProjectItem[] = [
  {
    id: "hydramarket",
    index: "01",
    category: "Engineering",
    eyebrow: "HYDRAMARKET / SYSTEMS",
    headline: "Where orders meet.",
    headlineSerif: "orders",
    description:
      "A prediction market where people trade on possible outcomes, combining fast order matching with settlement through Solana smart contracts.",
    tags: ["Rust", "Solana", "Anchor", "TypeScript", "gRPC", "PostgreSQL", "Redis"],
    visualType: "hydra-diagram",
    status: "Prototype",
    githubUrl: "https://github.com/Rudraprajapati2612/HydraMarket-Solana-Predection-Market-",
    contractsUrl: "https://github.com/Rudraprajapati2612/HydraMarket-Contract",
    readTime: "3 min read",
    gridSpanDesktop: "lg:col-span-2",
    simply: {
      whatItIs:
        "HydraMarket is a prediction market where people can trade on the outcomes of future events, such as cryptocurrency prices or sports results. It combines a fast trading engine with Solana smart contracts that handle on-chain market operations and settlement.",
      ideaTitle: "THE IDEA",
      problemExplored:
        "Instead of sending every order through the blockchain, HydraMarket matches orders off-chain and uses Solana for selected on-chain operations. The goal is to combine responsive trading with transparent, verifiable settlement.",
      architecturalWhy:
        "Separating order matching from settlement allows the system to optimize the trading path without moving every operation on-chain. The project explores how a Rust matching engine and Solana programs can work together as one trading system.",
    },
    underTheHood: {
      systemArchitectureOverview:
        "A TypeScript API gateway routes orders to a Rust matching engine. The engine manages the order book and price-time priority, while supporting services coordinate persistent state and settlement workflows.",
      matchingAndSettlement:
        "Complementary YES/NO orders can trigger a settlement workflow. A Rust settlement worker, Redis queue, PostgreSQL, and Solana Anchor programs coordinate token minting, collateral handling, and market-state updates.",
      onChainPrograms: [
        {
          name: "Market Registry",
          description: "Creates markets and manages their lifecycle."
        },
        {
          name: "Escrow Vault",
          description: "Handles collateral and YES/NO token operations."
        },
        {
          name: "Resolution Adapter",
          description: "Supports oracle proposals, disputes, and outcome finalization."
        }
      ],
      techTags: ["Rust", "Solana", "Anchor", "TypeScript", "gRPC", "PostgreSQL", "Redis"],
      components: [],
      technicalChallenges: [],
      implementationHighlights: [],
      resultsAndBenchmarks: [],
      limitations: []
    }
  },
  {
    id: "about-rudra",
    index: "02",
    category: "People",
    eyebrow: "THE PERSON",
    headline: "Rudra, away from the keyboard.",
    headlineSerif: "keyboard",
    description: "A little more than code.",
    tags: ["Engineer", "Builder", "Explorer"],
    visualType: "portrait",
    status: "Active",
    readTime: "2 min read",
    gridSpanDesktop: "lg:col-span-1",
    simply: {
      whatItIs:
        "A look at who I am beyond the code editor — an engineer based in India who is captivated by how systems behave under the hood, whether they are distributed software clusters, economic market mechanisms, or the physical world.",
      problemExplored:
        "Technology often gets siloed into either abstract theory or rushed copy-paste templates. I strive to bridge the two: maintaining deep respect for mathematical and computer science fundamentals while creating calm, intentional, and aesthetically disciplined user tools.",
      architecturalWhy:
        "Building with clarity requires curiosity across domains. Stepping away from the keyboard — exploring open waters, road trips, and sketching system topologies in physical notebooks — allows fresh perspectives on stubborn concurrency anomalies and interface bottlenecks.",
      roleAndContribution:
        "Engineer, builder, lifelong student of distributed systems, decentralized protocols, and computer vision.",
      currentStage:
        "Actively building, experimenting with systems, and open to impactful technical collaborations."
    },
    underTheHood: {
      systemArchitectureOverview:
        "My engineering toolkit and problem-solving methodology centers on first principles: mental models before framework abstractions, explicit error paths over implicit defaults, and reproducible measurements over assertions.",
      components: [
        {
          title: "Engineering Tenets",
          description:
            "Design for failure recovery first. If a state machine cannot recover deterministically from an abrupt shutdown, it is not production-ready.",
          protocolOrStack: "Resilience / Invariant Proving"
        },
        {
          title: "Curiosity Loops",
          description:
            "Continuously reading protocol specifications, RFCs, kernel memory papers, and decompiled contract bytecodes to observe how high-performance software operates at the lowest levels.",
          protocolOrStack: "Systems / Low-Level Research"
        },
        {
          title: "Craft & Restraint",
          description:
            "Refusing visual slop, gratuitous animations, and vanity metrics. Great software communicates with quiet confidence.",
          protocolOrStack: "Editorial UI / Clean Systems"
        }
      ],
      technicalChallenges: [
        {
          challenge: "Balancing the speed of prototyping with architectural rigor.",
          tradeoff: "Define strict boundary interfaces early so implementation details can be refactored or rewritten without destabilizing the whole."
        }
      ],
      implementationHighlights: [
        "Hands-on experience with Rust memory safety patterns, asynchronous runtime mechanics, and lock-free concurrency.",
        "Deep exploration of Solana Sealevel transaction pipelines, Anchor IDLs, and EVM contract gas optimization.",
        "End-to-end full-stack fluency in TypeScript, React, Next.js, Docker, and Linux system namespaces."
      ],
      resultsAndBenchmarks: [
        "Consistent track record of building working, runnable prototypes with demonstrable invariants.",
        "Designed and implemented 10 distinct technical projects and research workbenches."
      ],
      limitations: [
        "Still learning every single day; prefer transparently acknowledging what I don't know rather than pretending to be an expert in everything."
      ]
    }
  },
  {
    id: "sentinelguard",
    index: "03",
    category: "Engineering",
    eyebrow: "SENTINELGUARD / SOLANA SECURITY",
    headline: "Detecting what doesn't belong.",
    headlineSerif: "belong",
    description:
      "A real-time threat detection and automated response system for Solana protocols, streaming transaction events and triggering on-chain circuit breakers.",
    tags: ["Rust", "Solana", "Anchor", "Tokio", "gRPC", "Bun", "Elysia"],
    visualType: "sentinel-guard",
    status: "In Development",
    githubUrl: "https://github.com/Rudraprajapati2612/Sentinal-Guard",
    dashboardUrl: "https://sentinel-guard-three.vercel.app",
    docsUrl: "https://sentinel-guard-three.vercel.app/docs/detection-rules",
    readTime: "3 min read",
    gridSpanDesktop: "lg:col-span-1",
    simply: {
      whatItIs:
        "SentinelGuard is a real-time security monitoring and automated response system for Solana protocols. It continuously inspects transaction events, flags suspicious patterns such as sudden liquidity draining or flash loan exploits, and triggers on-chain circuit breakers to protect user funds.",
      ideaTitle: "THE IDEA",
      problemExplored:
        "Smart contract exploits on high-throughput blockchains execute within seconds. Post-mortem audits cannot recover stolen assets. SentinelGuard explores proactive automated intervention: detecting exploit patterns mid-flight and pausing vulnerable operations before a drain is completed.",
      architecturalWhy:
        "By pairing a low-latency Rust watcher streaming Yellowstone gRPC feeds with an Anchor-based on-chain circuit breaker, SentinelGuard minimizes detection-to-mitigation time to single-digit milliseconds without relying on manual intervention.",
      roleAndContribution:
        "Designed and implemented the core detection pipeline, the Rust watcher using Yellowstone gRPC streams, and the Anchor sentinel guardian program.",
      currentStage:
        "In active development with verified detection rules and live testnet monitoring dashboard."
    },
    underTheHood: {
      systemArchitectureOverview:
        "The system is organized into three synchronized components: an off-chain Rust watcher that consumes raw transaction streams via Yellowstone gRPC, an anomaly detection engine evaluating customizable security heuristics, and an Anchor smart contract program capable of pausing withdrawals.",
      customSections: [
        {
          title: "DETECTION RULES",
          items: [
            {
              name: "FlashLoanDrain",
              description: "Detects borrowing and rapid withdrawal anomalies across liquidity pools within a single transaction slot."
            },
            {
              name: "TvlVelocity",
              description: "Monitors the rate of change of total value locked, flagging negative spikes exceeding protocol risk thresholds."
            },
            {
              name: "BridgeOutflowSpike",
              description: "Identifies abnormal outbound cross-chain transfer bursts before settlement achieves finality."
            }
          ]
        },
        {
          title: "ON-CHAIN DEFENSE",
          content: "An Anchor program (sentinel_guardian) provides an emergency pause_withdrawals() instruction callable only by authenticated guardian multisig keys or automated bot signers with rate-limited authorities."
        },
        {
          title: "DISPATCH & STREAMING",
          content: "Built with Tokio async I/O in Rust for the core watcher, Yellowstone gRPC for Solana account and slot streams, and Bun + Elysia for the lightweight webhook dispatcher."
        }
      ],
      techTags: ["Rust", "Solana", "Anchor", "Yellowstone gRPC", "Tokio", "Bun", "Elysia", "TypeScript"],
      components: [],
      technicalChallenges: [],
      implementationHighlights: [],
      resultsAndBenchmarks: [],
      limitations: []
    }
  },
  {
    id: "ferrum",
    index: "04",
    category: "Engineering",
    eyebrow: "FERRUM / SYSTEMS",
    headline: "HTTP from the socket up.",
    headlineSerif: "socket",
    description:
      "A high-throughput HTTP/1.1 web server built from scratch in Rust, featuring a Radix-Trie router, custom middleware pipeline, and zero external web crates.",
    tags: ["Rust", "Tokio", "HTTP/1.1", "Systems", "Radix Tree"],
    visualType: "ferrum-pipeline",
    status: "Active",
    githubUrl: "https://github.com/Rudraprajapati2612/Ferrum",
    readTime: "3 min read",
    gridSpanDesktop: "lg:col-span-1",
    simply: {
      whatItIs:
        "Ferrum is a high-performance HTTP/1.1 web framework and server built from scratch in Rust. It implements raw socket handling, request parsing, Radix-Trie routing, and a composable middleware chain without relying on any external HTTP or web frameworks.",
      ideaTitle: "THE MOTIVATION",
      problemExplored:
        "Modern web frameworks wrap developers in heavy abstractions, hiding how network buffers are read, how HTTP state machines parse headers, and how routing tables resolve parameterized paths. Ferrum was built to master every layer of systems networking from first principles.",
      architecturalWhy:
        "By leveraging Tokio's asynchronous event loop with a zero-copy byte-slice HTTP parser and an O(k) Radix Trie, Ferrum achieves high request throughput with minimal memory allocations and zero third-party web framework dependencies.",
      roleAndContribution:
        "Sole author and systems engineer. Implemented the RFC 7230 parser, the Radix-Trie route matching engine, and the extensible async middleware pipeline.",
      currentStage:
        "Working production-ready prototype with passing HTTP/1.1 conformance tests."
    },
    underTheHood: {
      systemArchitectureOverview:
        "Ferrum accepts raw TCP connections through Tokio's non-blocking I/O loop, feeds raw buffers into a custom zero-copy HTTP/1.1 parser, matches routes using a Radix Trie, and chains requests through modular middleware before dispatching to async handlers.",
      customSections: [
        {
          title: "PARSER ARCHITECTURE",
          content: "Implements an RFC 7230 compliant state machine that parses HTTP request lines, headers, and bodies directly from byte slices without unnecessary string allocations or heap churn."
        },
        {
          title: "RADIX-TRIE ROUTER",
          content: "Routes are indexed in a prefix Radix Tree enabling O(k) lookups where k is path length. Supports parameterized segments like /users/:id and wildcard paths without regular expression overhead."
        },
        {
          title: "MIDDLEWARE PIPELINE",
          content: "Composable onion-style middleware architecture allowing logging, authentication validation, and CORS header injection with clean async trait contracts."
        }
      ],
      techTags: ["Rust", "Tokio", "HTTP/1.1", "Radix Tree", "Zero-Copy Parsing", "Async I/O"],
      components: [],
      technicalChallenges: [],
      implementationHighlights: [],
      resultsAndBenchmarks: [],
      limitations: []
    }
  },
  {
    id: "layoutd-cli",
    index: "05",
    category: "Engineering",
    eyebrow: "LAYOUTD / SOLANA TOOLING",
    headline: "Catching layout drift before mainnet.",
    headlineSerif: "drift",
    description:
      "An off-chain CLI for Solana and Anchor that diffs account struct layouts and classifies field changes as Safe, Review, or Danger to prevent breaking migrations.",
    tags: ["Rust", "Solana", "Anchor", "Borsh", "CLI", "SARIF"],
    visualType: "layoutd-terminal",
    status: "Active",
    githubUrl: "https://github.com/Rudraprajapati2612/layoutd-cli",
    docsUrl: "https://crates.io/crates/layoutd",
    readTime: "3 min read",
    gridSpanDesktop: "lg:col-span-1",
    simply: {
      whatItIs:
        "Layoutd is an off-chain developer tool for the Solana and Anchor ecosystems. It analyzes account struct definitions across versions and identifies backward-incompatible field layout shifts before programs are upgraded on mainnet.",
      ideaTitle: "THE MOTIVATION",
      problemExplored:
        "Anchor serializes on-chain accounts sequentially using Borsh or zero-copy repr(C). If a developer widens a type, inserts a field mid-struct, or removes an existing field, the byte offsets of stored data shift. Every deployed account becomes instantly unreadable, causing irreversible protocol outages.",
      architecturalWhy:
        "By parsing Anchor IDL JSON and Rust AST representations into uniform memory layout trees, Layoutd compares field offsets and types statically in CI. It automatically generates Rust migration boilerplate and outputs SARIF reports for GitHub PR checks.",
      roleAndContribution:
        "Author and developer. Designed the memory offset analyzer, AST diff engine, SARIF 2.1 emitter, and published the CLI to crates.io.",
      currentStage:
        "Published on crates.io (layoutd and layoutd-core) with GitHub Action integration."
    },
    underTheHood: {
      systemArchitectureOverview:
        "Layoutd accepts two IDL files or Rust source files, parses their struct definitions, computes byte alignments and field offsets, and runs a rule-based safety classifier comparing Borsh sequential and zero-copy repr(C) constraints.",
      customSections: [
        {
          title: "SAFETY CLASSIFICATION ENGINE",
          items: [
            {
              name: "Safe",
              description: "Appending fields at the end or renaming fields at identical byte offsets without altering serialized sizes."
            },
            {
              name: "Review",
              description: "Widening integer types (e.g., u32 to u64) or reordering fields in Borsh where deserialization order matters."
            },
            {
              name: "Danger",
              description: "Inserting fields into the middle of a struct, removing existing fields, or changing zero-copy alignments. Exits with code 1 in CI."
            }
          ]
        },
        {
          title: "CLI COMMAND SUITE",
          items: [
            {
              name: "layoutd diff",
              description: "Human-readable terminal diff highlighting field offsets, size deltas, and classification badges."
            },
            {
              name: "layoutd check",
              description: "CI gate with --sarif output for GitHub Code Scanning, supporting explicit --ack and --hints overrides."
            },
            {
              name: "layoutd gen",
              description: "Emits a Rust migration scaffold implementing realloc and byte copy routines for safe on-chain upgrades."
            }
          ]
        }
      ],
      techTags: ["Rust", "Anchor IDL", "Syn", "Quote", "Borsh", "SARIF 2.1.0", "Clap", "GitHub Actions"],
      components: [],
      technicalChallenges: [],
      implementationHighlights: [],
      resultsAndBenchmarks: [],
      limitations: []
    }
  },
  {
    id: "swaplit",
    index: "06",
    category: "Engineering",
    eyebrow: "SWAPLIT / AMM",
    headline: "Liquidity has a logic.",
    headlineSerif: "logic",
    description:
      "SwapLiT is an educational decentralized exchange built around automated market makers. It explores how token reserves determine swap prices, how trading fees affect trades, and how liquidity providers participate in a shared pool.",
    tags: ["Solidity", "Ethereum", "AMM", "EVM", "OpenZeppelin", "Prisma"],
    visualType: "swaplit-curve",
    status: "Prototype",
    githubUrl: "https://github.com/Rudraprajapati2612/Decentralised-Exchange-Eth",
    readTime: "4 min read",
    gridSpanDesktop: "lg:col-span-2",
    simply: {
      whatItIs:
        "SwapLiT is an educational decentralized exchange built around automated market makers. It explores how token reserves determine swap prices, how trading fees affect trades, and how liquidity providers participate in a shared pool.",
      ideaTitle: "THE MECHANICS",
      problemExplored:
        "How markets establish fair equilibrium pricing without centralized order books. SwapLiT explores the mathematics of automated market making, analyzing the constant-product invariant, pool reserve ratios, and multi-hop path execution.",
      architecturalWhy:
        "By enforcing the constant-product formula (x · y = k) at the smart contract level, every trade adjusts the pool's marginal price deterministically. The architecture separates pair pool custody from router path coordination.",
      roleAndContribution:
        "Smart contract developer. Authored Solidity contracts, implemented the multi-hop router, and built the TypeScript blockchain event indexer.",
      currentStage:
        "Functional EVM contracts (AMM, AMMFactory, AMMRouter) with frontend interface and event indexer."
    },
    underTheHood: {
      systemArchitectureOverview:
        "A core contract suite consisting of AMM.sol (pair pool and LP token), AMMFactory.sol (pair registry), and AMMRouter.sol (multi-hop swap execution and slippage protection), supported by a TypeScript event indexer.",
      customSections: [
        {
          title: "CONSTANT-PRODUCT INVARIANT & POOL DYNAMICS",
          items: [
            {
              name: "AMM.sol",
              description: "Pair contract combining constant-product pricing (dy = y - (x·y)/(x+dx)) with an internal ERC-20 LP token (AMM-LP). Emits Mint, Burn, Swap, and Sync events."
            },
            {
              name: "Liquidity Accounting",
              description: "Initial liquidity mints sqrt(amount0 * amount1) LP tokens; subsequent additions mint proportional reserve shares with optimal ratio calculations."
            }
          ]
        },
        {
          title: "ROUTING & SLIPPAGE PROTECTION",
          items: [
            {
              name: "AMMRouter.sol",
              description: "Executes multi-hop swaps (swapExactTokensForTokens) across arbitrary token paths with deadline validation and amountOutMin slippage guards."
            },
            {
              name: "AMMFactory.sol",
              description: "Deploys and tracks unique token pair addresses with deterministic token0/token1 address sorting."
            }
          ]
        },
        {
          title: "INDEXING & FULL-STACK INTEGRATION",
          content: "A TypeScript backend service monitors on-chain events via ethers.js, indexing liquidity ticks and swap histories into PostgreSQL via Prisma for the Next.js frontend."
        }
      ],
      techTags: ["Solidity", "Ethereum", "AMM", "OpenZeppelin", "ERC-20", "EVM", "Prisma", "TypeScript"],
      components: [],
      technicalChallenges: [],
      implementationHighlights: [],
      resultsAndBenchmarks: [],
      limitations: []
    }
  },
  {
    id: "better-uptime",
    index: "07",
    category: "Engineering",
    eyebrow: "BETTER UPTIME / DISTRIBUTED MONITORING",
    headline: "Observing availability from the edge.",
    headlineSerif: "availability",
    description:
      "A distributed website uptime and latency monitoring system with multi-region worker probes, Redis Streams task queuing, and real-time dashboard analytics.",
    tags: ["TypeScript", "Redis Streams", "Next.js", "PostgreSQL", "Prisma", "Express", "Bun"],
    visualType: "uptime-monitor",
    status: "Prototype",
    githubUrl: "https://github.com/Rudraprajapati2612/betteruptime-typescript",
    readTime: "3 min read",
    gridSpanDesktop: "lg:col-span-1",
    simply: {
      whatItIs:
        "A distributed website monitoring platform that checks site availability and response latency across multiple geographical regions, isolating localized network hiccups from true global downtime.",
      ideaTitle: "THE PURPOSE",
      problemExplored:
        "Checking website health from a single server creates single-point-of-failure blind spots and misleading false alerts. A distributed setup with independent regional probes provides reliable, multi-perspective latency and uptime tracking.",
      architecturalWhy:
        "Using Redis Streams consumer groups allows decoupled task dispatching: a central pusher schedules probes, regional workers consume tasks and measure HTTP latencies concurrently, and a dedicated worker persists batched tick metrics to PostgreSQL.",
      roleAndContribution:
        "Full-stack systems developer. Implemented the multi-service monorepo, Redis Streams queuing, regional consumer group workers, and Next.js frontend.",
      currentStage:
        "Functional multi-service prototype running API, Pusher, Regional Workers, and Dashboard."
    },
    underTheHood: {
      systemArchitectureOverview:
        "A Turborepo monorepo separating concerns across four independent services: an Express REST API, a 3-second Bun pusher, regional HTTP probe workers consuming via Redis consumer groups, and a Next.js real-time status dashboard.",
      customSections: [
        {
          title: "REDIS STREAMS WORKFLOW",
          items: [
            {
              name: "betteruptime:website",
              description: "Pusher dispatches website IDs and URLs every 3 seconds to a central stream partitioned by regional consumer groups (XGROUP)."
            },
            {
              name: "Regional Workers",
              description: "Workers make non-blocking HTTP probes, measure response times in milliseconds, and publish results to the DB queue."
            },
            {
              name: "betteruptime:db",
              description: "A dedicated database consumer batches WebsiteTick records into PostgreSQL via Prisma with explicit message acknowledgement (XACK)."
            }
          ]
        },
        {
          title: "DATA MODEL & PERSISTENCE",
          content: "Relational PostgreSQL schema tracking Users, monitored Websites, Regions (UUID, name), and time-indexed WebsiteTick entries with status flags (Up, Down, Unknown) and response times."
        }
      ],
      techTags: ["TypeScript", "Redis Streams", "Prisma", "PostgreSQL", "Bun", "Express", "Next.js", "Turborepo"],
      components: [],
      technicalChallenges: [],
      implementationHighlights: [],
      resultsAndBenchmarks: [],
      limitations: []
    }
  },
  {
    id: "engram",
    index: "08",
    category: "Engineering",
    eyebrow: "ENGRAM / AI MEMORY",
    headline: "Give AI a memory.",
    headlineSerif: "memory",
    description:
      "A conversational AI assistant that retrieves useful memories from past interactions to personalize future responses.",
    tags: ["Bun", "ElysiaJS", "TypeScript", "Gemini API", "pgvector", "Redis", "BullMQ"],
    visualType: "engram-pipeline",
    status: "In Development",
    githubUrl: "https://github.com/Rudraprajapati2612/Engram",
    readTime: "4 min read",
    gridSpanDesktop: "lg:col-span-2",
    simply: {
      whatItIs:
        "Engram is an AI chat application that remembers useful details from previous conversations. It retrieves relevant information when you return, helping the assistant give responses that reflect your preferences, goals, and past context.",
      ideaTitle: "WHY IT MATTERS",
      problemExplored:
        "Most conversational AI tools reset context once a session ends, forcing users to repeatedly restate their background, preferences, and workflows. Engram bridges conversations by maintaining persistent, searchable personal memories.",
      architecturalWhy:
        "Separating fact extraction from the real-time chat path keeps interactions responsive: Gemini extracts atomic facts asynchronously via Redis and BullMQ, while vector embeddings in PostgreSQL with pgvector retrieve only relevant memories when needed.",
      roleAndContribution:
        "Backend and AI systems engineer. Built the ElysiaJS backend, vector retrieval queries with pgvector, BullMQ background worker, and WebSocket streaming.",
      currentStage:
        "In active development with working memory extraction, vector similarity search, and real-time streaming."
    },
    underTheHood: {
      systemArchitectureOverview:
        "A Bun and ElysiaJS backend organized around a dual-path architecture: a low-latency WebSocket path for streaming LLM responses, and an asynchronous BullMQ queue for conversational fact extraction and pgvector indexing.",
      customSections: [
        {
          title: "MEMORY PIPELINE",
          items: [
            {
              name: "Fact Extraction",
              description: "Gemini analyzes conversation turns to extract discrete, self-contained user facts and preferences without manual tagging."
            },
            {
              name: "Vector Embeddings",
              description: "Extracted facts are converted into dense vector embeddings using Google GenAI models and stored in PostgreSQL with pgvector."
            },
            {
              name: "Semantic Retrieval",
              description: "Incoming chat messages trigger a cosine distance search (<=>) to retrieve the top-k relevant memories, injecting them into the prompt context."
            },
            {
              name: "Background Processing",
              description: "Redis and BullMQ handle memory extraction asynchronously so chat responsiveness is never blocked by extraction latency."
            }
          ]
        },
        {
          title: "REAL-TIME STREAMING & SECURITY",
          content: "WebSocket endpoints deliver real-time token streaming with JWT session authentication and bcrypt password hashing, packaged within a Turborepo monorepo."
        }
      ],
      techTags: ["Bun", "ElysiaJS", "TypeScript", "Google Gemini API", "PostgreSQL", "pgvector", "Redis", "BullMQ", "WebSockets"],
      components: [],
      technicalChallenges: [],
      implementationHighlights: [],
      resultsAndBenchmarks: [],
      limitations: []
    }
  },
  {
    id: "skills-toolkit",
    index: "09",
    category: "Skills",
    eyebrow: "THE TOOLKIT",
    headline: "The tools behind the systems.",
    headlineSerif: "tools",
    description: "A collection of the technologies and concepts I work with.",
    tags: ["Rust", "TypeScript", "Solana", "PostgreSQL", "Docker"],
    visualType: "skills-matrix",
    status: "Active",
    readTime: "2 min read",
    gridSpanDesktop: "lg:col-span-2",
    simply: {
      whatItIs:
        "My toolkit spans systems programming, backend engineering, Solana and Ethereum development, networking, and databases. I focus on tools I can demonstrate through working projects.",
      problemExplored:
        "I choose technologies based on the problem — from Rust for systems work to TypeScript for backend services and Anchor for Solana programs.",
      architecturalWhy:
        "Learn the fundamentals, build real systems, and understand the trade-offs behind every tool."
    },
    underTheHood: {
      systemArchitectureOverview:
        "Applied across Rust matching engines, gRPC services, Solana programs, REST APIs, database-backed applications, and asynchronous systems.",
      components: [],
      technicalChallenges: [],
      implementationHighlights: [],
      resultsAndBenchmarks: [],
      limitations: []
    }
  },
  {
    id: "agroaid",
    index: "10",
    category: "Engineering",
    eyebrow: "AGROAID / COMPUTER VISION",
    headline: "Learning from leaves.",
    headlineSerif: "leaves",
    description: "A plant disease detection application exploring CNN-based image classification.",
    tags: ["Python", "TensorFlow", "CNN", "Streamlit"],
    visualType: "leaf-vision",
    status: "Prototype",
    githubUrl: "https://github.com/Rudraprajapati2612",
    readTime: "3 min read",
    gridSpanDesktop: "lg:col-span-1",
    simply: {
      whatItIs:
        "AgroAid is a computer vision diagnostic tool that classifies plant leaf diseases from photographs, helping identify early fungal and bacterial lesions before they spread across crops.",
      problemExplored:
        "Crop diseases cause significant yield loss globally. Early detection usually requires manual agronomist inspection, which is often inaccessible or delayed in rural farming communities.",
      architecturalWhy:
        "Convolutional Neural Networks (CNNs) excel at extracting hierarchical visual features — detecting edges and colors in early layers, and recognizing complex lesion patterns in deeper layers. AgroAid packages this into a lightweight, accessible tool.",
      roleAndContribution:
        "Machine learning pipeline developer. Prepared dataset augmentations, designed and trained the multi-layer CNN architecture, and implemented the classification interface.",
      currentStage:
        "Trained model prototype achieving 91.4% test accuracy on held-out benchmark splits."
    },
    underTheHood: {
      systemArchitectureOverview:
        "An image classification pipeline using transfer-learned convolutional layers with custom classification heads, feature map inspection, and image augmentation routines.",
      components: [
        {
          title: "Augmentation & Preprocessing",
          description:
            "Normalizes image dimensions to 224x224, applies random rotations, zooms, and horizontal flips to prevent overfitting on specific lighting conditions.",
          protocolOrStack: "TensorFlow Data Pipelines"
        },
        {
          title: "Convolutional Classifier",
          description:
            "Architecture featuring alternating 2D Convolutional and Max Pooling layers with Batch Normalization and Dropout (0.4) to regularize weight convergence.",
          protocolOrStack: "Keras / TensorFlow 2"
        },
        {
          title: "Inference & Explanation",
          description:
            "Outputs softmax probability distribution across disease classes alongside region-of-interest highlighting to confirm the network attended to leaf lesions.",
          protocolOrStack: "Python / Streamlit"
        }
      ],
      technicalChallenges: [
        {
          challenge: "Preventing the model from classifying background soil or lighting artifacts instead of the actual leaf disease.",
          tradeoff: "Used Grad-CAM feature map visualizations during validation to verify that activation gradients concentrated strictly on lesion boundaries."
        }
      ],
      implementationHighlights: [
        "Held-out test split strictly segregated before any hyperparameter tuning or augmentation.",
        "Model quantized for lightweight deployment on resource-constrained devices."
      ],
      resultsAndBenchmarks: [
        "91.4% test accuracy on held-out test split of 3,200 curated crop pathology images.",
        "Under 120ms inference latency per image on standard CPU instances."
      ],
      limitations: [
        "Tested primarily on curated laboratory dataset images; field tests with uncalibrated mobile cameras and harsh direct sunlight require broader training datasets."
      ]
    }
  },
  {
    id: "research-notebook",
    index: "11",
    category: "Research",
    eyebrow: "RESEARCH / SYSTEMS",
    headline: "What happens when systems fail?",
    headlineSerif: "fail",
    description: "Investigating system behavior through measurement, experiments, and technical analysis.",
    tags: ["Distributed Systems", "Fault Tolerance", "Simulation"],
    visualType: "research-nodes",
    status: "Research",
    readTime: "5 min read",
    gridSpanDesktop: "lg:col-span-1",
    simply: {
      whatItIs:
        "A personal research notebook and chaos engineering testbed investigating how distributed software services behave when network connections drop, servers crash, or caches get overloaded.",
      problemExplored:
        "In theory, systems work smoothly according to happy-path diagrams. In practice, networks partition, latencies spike unpredictably, and retry loops can unintentionally launch self-inflicted denial-of-service attacks against their own databases.",
      architecturalWhy:
        "The best way to understand fault tolerance is to break systems deliberately under controlled, measured conditions. This notebook documents what fails, why it fails, and what patterns actually restore stability.",
      roleAndContribution:
        "Researcher and testbed builder. Constructed the Linux network namespace testbed, wrote synthetic failure injection scripts, and documented failure post-mortems.",
      currentStage:
        "Ongoing experimental notebook with documented findings on exponential backoff and cache stampede mitigation."
    },
    underTheHood: {
      systemArchitectureOverview:
        "An experimental containerized testbed utilizing Linux `tc` (traffic control) to inject deterministic packet loss, jitter, and interface partitions while streaming high-resolution metrics to an analysis dashboard.",
      components: [
        {
          title: "Chaos Injection Engine",
          description:
            "Automated scripts applying NetEm rules to introduce artificial packet drop (5% to 60%), asymmetric latency (10ms to 2000ms), and partition barriers between node clusters.",
          protocolOrStack: "Linux tc / NetEm / Bash"
        },
        {
          title: "Service Cluster",
          description:
            "Multi-node coordinator and replica cluster executing state synchronization across simulated partition barriers.",
          protocolOrStack: "Docker Compose / Go / Rust"
        },
        {
          title: "Telemetry Recorder",
          description:
            "High-resolution logger capturing thread context switches, socket buffer saturation, and retry storm cascades.",
          protocolOrStack: "Prometheus / Python Analytics"
        }
      ],
      technicalChallenges: [
        {
          challenge: "Distinguishing between genuine network failure and self-inflicted retry stampedes.",
          tradeoff: "Implemented randomized exponential backoff with full jitter, proving mathematically and experimentally how it disperses clustered retry waves."
        }
      ],
      implementationHighlights: [
        "Reproducible test scripts packaged in Docker Compose for one-command test replication.",
        "Comparative telemetry graphs contrasting constant retry intervals against exponential backoff with jitter."
      ],
      resultsAndBenchmarks: [
        "Observed a 65% reduction in Redis connection contention during simulated restart when clients utilized jittered backoff.",
        "Demonstrated that aggressive client timeout cancellations can cascade into total cluster starvation during momentary latency hiccups."
      ],
      limitations: [
        "Simulations run inside virtualized containers on single host machines; cross-continental fiber anomalies may exhibit additional physical routing nuances."
      ]
    }
  },
  {
    id: "engineering-notes",
    index: "12",
    category: "Writing",
    eyebrow: "NOTES FROM THE WORKBENCH",
    headline: "Thinking beyond the implementation.",
    headlineSerif: "beyond",
    description: "Technical notes, design decisions, debugging lessons, and ideas worth documenting.",
    tags: ["Writing", "Architecture", "Post-Mortems"],
    visualType: "notes-paper",
    status: "Active",
    readTime: "3 min read",
    gridSpanDesktop: "lg:col-span-1",
    simply: {
      whatItIs:
        "A living editorial archive of essays, architectural post-mortems, and engineering reflections written from the workbench while building systems.",
      problemExplored:
        "Code is ephemeral, but the principles and mental models that guide architectural decisions endure. Writing forces clarity of thought and prevents repeating hard-learned debugging mistakes.",
      architecturalWhy:
        "Documenting trade-offs — such as when to choose explicit state machines over ad-hoc flags, or when async zero-copy introduces more lifetime friction than it solves — crystallizes engineering intuition into repeatable rules.",
      roleAndContribution:
        "Author and engineer.",
      currentStage:
        "Active collection of technical essays and workbench notes."
    },
    underTheHood: {
      systemArchitectureOverview:
        "Curated technical notes exploring systems engineering, invariant-centric state modeling, memory management trade-offs, and communication protocols.",
      components: [
        {
          title: "Note #01: The Cost of Premature Optimization in Async Rust",
          description:
            "An analysis of when zero-copy lifetime constraints introduce structural friction that slows down iteration without providing measurable throughput benefits. Measure first, profile second.",
          protocolOrStack: "Rust / Systems"
        },
        {
          title: "Note #02: Thinking in Invariants Rather Than Flows",
          description:
            "Why proving what can never happen is usually more valuable than trying to test every valid path through a state machine, especially in blockchain smart contracts.",
          protocolOrStack: "Formal Modeling / State Machines"
        },
        {
          title: "Note #03: The Ergonomics of gRPC in Modern Web Stacks",
          description:
            "Evaluating trade-offs between REST, GraphQL, and Protocol Buffers when structuring high-frequency internal telemetry and browser clients.",
          protocolOrStack: "Protocols / Network I/O"
        }
      ],
      technicalChallenges: [
        {
          challenge: "Expressing nuanced technical concepts concisely without losing technical accuracy.",
          tradeoff: "Focus on concrete code examples and verifiable benchmarks rather than vague generalities."
        }
      ],
      implementationHighlights: [
        "Carefully formatted typographic essays with code snippets, architectural diagrams, and post-mortem logs."
      ],
      resultsAndBenchmarks: [
        "3 core published essays in the workbench collection with active readers."
      ],
      limitations: [
        "Subject to continuous refinement as new production lessons and system paradigms emerge."
      ]
    }
  }
];

export interface SocialLink {
  label: string;
  url: string;
  type: "github" | "linkedin" | "email";
}

export const AUTHOR = {
  name: "Rudra Prajapati",
  role: "ENGINEER / BUILDER / EXPLORER",
  location: "INDIA / IST",
  tagline: "Usually happy. Always building.",
  intro: "I build systems, explore ideas, and enjoy figuring out how things work under the hood.",
  email: "rudraprajapati2612@gmail.com",
  links: {
    github: "https://github.com/Rudraprajapati2612/",
    x: "https://x.com/0xRudraSol",
    linkedin: "https://www.linkedin.com/in/rudra2612/",
  }
};
