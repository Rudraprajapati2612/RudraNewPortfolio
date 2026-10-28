export type ProjectCategory = "Engineering" | "People" | "Research" | "Skills" | "Writing";

export interface ProjectDetailSection {
  title: string;
  content: string | string[];
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
    | "zest-chart"
    | "swaplit-curve"
    | "skills-matrix"
    | "leaf-vision"
    | "research-nodes"
    | "notes-paper";
  status: "Prototype" | "In Development" | "Research" | "Active" | "Archive";
  githubUrl?: string;
  demoUrl?: string;
  readTime?: string;
  gridSpanDesktop: string; // e.g., 'col-span-1 md:col-span-2' for curated asymmetric layout
  minHeightClass?: string;
  details: {
    overview: string;
    role?: string;
    architecture?: string[];
    challenges?: string[];
    implementation?: string[];
    results?: string[];
    limitations?: string[];
    researchQuestions?: string[];
    sections?: { heading: string; body: string }[];
  };
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
    description: "A hybrid prediction-market platform exploring low-latency order matching and on-chain settlement.",
    tags: ["Rust", "Solana", "gRPC", "TypeScript"],
    visualType: "hydra-diagram",
    status: "Prototype",
    githubUrl: "https://github.com/rudraprajapati",
    readTime: "4 min read",
    gridSpanDesktop: "lg:col-span-2",
    details: {
      overview:
        "HydraMarket investigates how decentralized outcome trading can separate fast matching state from durable settlement. Traditional on-chain books face transaction queuing and block-slot constraints, while purely centralized books require full custodial trust. This project builds a dual-layer architecture: an off-chain asynchronous matching engine paired with deterministic state commitments to Solana.",
      role: "System Designer & Core Engineer (Prototyping matching loop, serialization protocols, and Solana Anchor state hooks).",
      architecture: [
        "API & Gateway Layer: Lightweight proxy accepting incoming limit and market orders via gRPC, applying signature verification, and streaming book diffs to clients via WebSockets.",
        "Matching Engine: In-memory orderbook implemented in Rust with price-time priority (FIFO), utilizing intrusive cache-friendly order queues and ring buffers.",
        "Settlement Layer: Batched settlement transactions dispatched to Solana programs via Anchor, consolidating fills to reduce per-trade transaction overhead."
      ],
      challenges: [
        "Maintaining consistency between volatile in-memory order states and delayed on-chain block confirmations during high frequency arrival bursts.",
        "Designing zero-copy serialization over gRPC to eliminate decoding bottlenecks in the matching critical path.",
        "Handling rollbacks and partial fills gracefully when on-chain program invariants reject an edge-case settlement batch."
      ],
      implementation: [
        "Rust core engine utilizing crossbeam channels for thread-safe lock-free telemetry and dispatch.",
        "Solana Anchor program managing escrow vault balances and outcome resolution token pools.",
        "Custom TypeScript client SDK with reconnecting gRPC-web and reactive orderbook hooks."
      ],
      results: [
        "Validated decoupling architecture in local multi-node benchmarks with synthetic load generators.",
        "Demonstrated deterministic batch reconciliation where fills submitted in sequence strictly matched off-chain executions.",
        "Identified gas-boundary constraints on batch size per transaction, informing subsequent queue-chunking logic."
      ],
      limitations: [
        "Currently scoped as an engineering prototype for benchmarking orderbook mechanics; not operating on mainnet funds.",
        "Network latency metrics are derived from controlled local test suites rather than distributed validator networks."
      ]
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
    details: {
      overview:
        "I am an engineer from India who genuinely enjoys understanding what happens under the surface—from low-level systems and network protocols to decentralized consensus and computer vision pipelines.",
      role: "Full-Stack & Systems Engineer",
      sections: [
        {
          heading: "Philosophy",
          body: "I believe the best systems are built by engineers who respect both rigorous fundamentals and practical aesthetics. Understanding cache lines or memory layouts shouldn't stop you from crafting a clean, calm user experience."
        },
        {
          heading: "What I Spend Time On",
          body: "When I am not debugging concurrency anomalies or reading protocol whitepapers, I enjoy exploring open spaces, road trips, observing natural patterns, and keeping a physical notebook of system design ideas."
        },
        {
          heading: "Working Style",
          body: "I value candid code reviews, test-driven invariants, reproducible benchmarks, and concise technical documentation over hype and buzzwords."
        }
      ]
    }
  },
  {
    id: "zestvault",
    index: "03",
    category: "Engineering",
    eyebrow: "ZESTVAULT / DEFI",
    headline: "Yield, with a system behind it.",
    headlineSerif: "system",
    description: "Exploring yield discovery, pool analytics, pricing, and the infrastructure behind decentralized finance.",
    tags: ["Solana", "Anchor", "Redis", "Pyth"],
    visualType: "zest-chart",
    status: "Prototype",
    githubUrl: "https://github.com/rudraprajapati",
    readTime: "3 min read",
    gridSpanDesktop: "lg:col-span-1",
    details: {
      overview:
        "ZestVault explores automated yield aggregation strategies and real-time liquidity analytics on Solana. It models strategy routing across diverse lending pools while monitoring volatility and oracle deviation flags.",
      role: "DeFi Protocol & Indexer Architect",
      architecture: [
        "Data Ingestion: Streaming event listener observing Solana account state changes and Pyth network price oracles.",
        "Analytics Cache: Redis time-series database caching 1-minute to 24-hour liquidity depth and historical APY volatility metrics.",
        "Strategy Smart Contract: Anchor program with parameterized rebalance vaults that allocate deposits based on verifiable risk thresholds."
      ],
      implementation: [
        "Implemented sliding-window volatility metrics in Rust to safeguard against flash manipulation of reference yield rates.",
        "Constructed automated health checks ensuring total vault asset accounting strictly matches underlying deposit receipts.",
        "Interactive dashboard displaying simulated deposit yield curves, historical fee capture, and liquidation safety margins."
      ],
      results: [
        "Successfully simulated multi-pool rebalancing under simulated market price shifts.",
        "Kept indexer lag under one Solana slot duration in devnet evaluation."
      ],
      limitations: [
        "Yield compounding models are tested against devnet protocols and mock liquidity pools.",
        "Real liquidity depth and impermanent loss will vary in live high-volatility environments."
      ]
    }
  },
  {
    id: "swaplit",
    index: "04",
    category: "Engineering",
    eyebrow: "SWAPLIT / AMM",
    headline: "Liquidity has a logic.",
    headlineSerif: "logic",
    description: "An exploration of automated market makers, token swaps, and liquidity mechanics.",
    tags: ["Solidity", "EVM", "AMM"],
    visualType: "swaplit-curve",
    status: "Prototype",
    githubUrl: "https://github.com/rudraprajapati",
    readTime: "4 min read",
    gridSpanDesktop: "lg:col-span-2",
    details: {
      overview:
        "SwapLiT is a mathematical and implementation study into constant-product automated market makers (x * y = k), fee accrual distributions, and slippage dynamics in decentralized exchange environments.",
      role: "Smart Contract Engineer",
      architecture: [
        "Pair Contract: Core EVM contract maintaining reserve invariants, reentrancy guards, and atomic flash-swap hooks.",
        "Router Contract: Multi-hop trade path finder optimizing trade splitting to minimize total price impact.",
        "LP Token Ledger: Standard ERC-20 compliant minting and burning mechanism proportional to pool contribution square-roots."
      ],
      challenges: [
        "Preventing precision loss in integer square root computations without incurring excessive EVM gas overhead.",
        "Securing against reentrancy attacks and sandwich attack vectors during multi-step contract invocations."
      ],
      implementation: [
        "Clean Solidity contracts following checks-effects-interactions and OpenZeppelin security guidelines.",
        "Full Hardhat/Foundry test suite verifying invariant preservation across thousands of randomized fuzz test iterations.",
        "Custom SVG visualization displaying the hyperbolic curve and swap vectors across different liquidity depths."
      ],
      results: [
        "Verified invariant preservation (x_new * y_new >= k) across edge cases including near-zero balances and extreme trade ratios."
      ],
      limitations: [
        "Prototype written for educational and invariant testing purposes; audit required before any mainnet deployment."
      ]
    }
  },
  {
    id: "skills-toolkit",
    index: "05",
    category: "Skills",
    eyebrow: "THE TOOLKIT",
    headline: "The tools behind the systems.",
    headlineSerif: "tools",
    description: "A collection of the technologies and concepts I work with.",
    tags: ["Rust", "TypeScript", "Python", "Solana", "PostgreSQL", "Docker"],
    visualType: "skills-matrix",
    status: "Active",
    readTime: "2 min read",
    gridSpanDesktop: "lg:col-span-1",
    details: {
      overview:
        "A practical, honest inventory of the tools, languages, and systems I actively build with. I prioritize deep mental models of execution, memory management, and network I/O over surface-level syntax memorization.",
      sections: [
        {
          heading: "Core Languages",
          body: "Rust for systems programming and fast concurrency; TypeScript for end-to-end type safety across browser and server; Python for scientific computing and machine learning; Solidity for EVM contracts."
        },
        {
          heading: "Backend, Networking & Distributed Systems",
          body: "Node.js, Express, and gRPC for service boundaries; Redis for low-latency state and caching; PostgreSQL for relational integrity; Docker for repeatable deployment isolation."
        },
        {
          heading: "Decentralized Infrastructure",
          body: "Solana runtime mechanics, Anchor framework, on-chain state models, AMM constant product curves, and RPC connection management."
        },
        {
          heading: "Engineering Tenets",
          body: "Favor explicit over implicit; design for failure recovery; benchmark before optimizing; write clear comments explaining why, not just what."
        }
      ]
    }
  },
  {
    id: "agroaid",
    index: "06",
    category: "Engineering",
    eyebrow: "AGROAID / COMPUTER VISION",
    headline: "Learning from leaves.",
    headlineSerif: "leaves",
    description: "A plant disease detection application exploring CNN-based image classification.",
    tags: ["Python", "TensorFlow", "CNN", "Streamlit"],
    visualType: "leaf-vision",
    status: "Prototype",
    githubUrl: "https://github.com/rudraprajapati",
    readTime: "3 min read",
    gridSpanDesktop: "lg:col-span-1",
    details: {
      overview:
        "AgroAid applies convolutional neural networks (CNNs) to diagnose agricultural crop distress from leaf photography. By feeding field imagery through trained convolutional feature extractors, the tool identifies early fungal and bacterial lesions before symptoms cause widespread crop loss.",
      role: "ML Pipeline & Frontend Developer",
      architecture: [
        "Preprocessing Pipeline: Automated resizing, normalization, and data augmentation (shear, rotation, zoom) to mitigate overfitting on limited sample varieties.",
        "Classification Backbone: Multi-layer Convolutional Neural Network with Batch Normalization, Max Pooling, and Dropout regularization.",
        "Interactive Interface: Lightweight Streamlit app allowing farmers or researchers to upload leaf captures and receive classification probability distributions."
      ],
      implementation: [
        "Trained in TensorFlow/Keras on public crop disease benchmark datasets (e.g., PlantVillage subset).",
        "Visual feature map inspection showing that the model attended to lesion edges and discoloration rather than background soil artifacts."
      ],
      results: [
        "Achieved 91.4% accuracy on held-out test split across target leaf disease categories in controlled lighting datasets."
      ],
      limitations: [
        "Performance degrades significantly when test photos contain harsh direct sunlight shadows or uncalibrated mobile camera sensors.",
        "Training evaluated on laboratory-curated imagery; field deployment requires broader real-world lighting training datasets."
      ]
    }
  },
  {
    id: "research-notebook",
    index: "07",
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
    details: {
      overview:
        "An ongoing research workbench testing failure modes in distributed nodes, cache invalidation storms, split-brain scenarios, and cascading timeout propagation.",
      researchQuestions: [
        "How do thundering-herd effects cascade through layered Redis caches under simulated link packet drops?",
        "What are the latency tradeoffs between optimistic lock-free queues versus backpressure-throttled rings under bursty Poisson arrival rates?",
        "Can deterministic local logs allow single-node services to recover state in sub-second timeframes after unplanned power halts?"
      ],
      architecture: [
        "Chaos Testbed: Docker-compose environment injecting artificial latency, jitter, and packet loss using Linux `tc` (traffic control).",
        "Telemetry Exporter: High-resolution event log recorder tracking queue depth, thread context switch count, and socket buffer saturation.",
        "Scenario Runner: Automated test harness executing repeatable burst scripts and recording recovery metrics."
      ],
      results: [
        "Demonstrated that exponential backoff with jitter reduced retry contention by ~65% compared to naive constant-interval polling during simulated Redis restart.",
        "Documented boundary conditions where aggressive timeout cancellation induced self-inflicted cascade failures in downstream services."
      ],
      limitations: [
        "Experiments are conducted in virtualized Linux network namespaces rather than cross-continental fiber backbones.",
        "Work is documented as an experimental notebook and technical log; not peer-reviewed or published in academic journals."
      ]
    }
  },
  {
    id: "engineering-notes",
    index: "08",
    category: "Writing",
    eyebrow: "NOTES FROM THE WORKBENCH",
    headline: "Thinking beyond the implementation.",
    headlineSerif: "beyond",
    description: "Technical notes, design decisions, debugging lessons, and ideas worth documenting.",
    tags: ["Writing", "Architecture", "Post-Mortems"],
    visualType: "notes-paper",
    status: "Active",
    readTime: "3 min read",
    gridSpanDesktop: "lg:col-span-2",
    details: {
      overview:
        "A living archive of engineering notes, mental models, and post-mortems written while building systems. Writing helps refine fuzzy intuition into rigorous principles.",
      sections: [
        {
          heading: "Note #01: The Cost of Premature Optimization in Async Rust",
          body: "Reflections on when zero-copy abstractions introduce lifetime friction that slows down development without measurable throughput gains. Measure first, profile second."
        },
        {
          heading: "Note #02: Thinking in Invariants Rather Than Flows",
          body: "Why proving what can never happen is usually more valuable than trying to test every valid path through a state machine, especially in blockchain programs."
        },
        {
          heading: "Note #03: The Ergonomics of gRPC in Modern Web Stacks",
          body: "Evaluating trade-offs between REST, GraphQL, and Protocol Buffers when structuring high-frequency internal telemetry and browser clients."
        }
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
    github: "https://github.com/rudraprajapati",
    linkedin: "https://linkedin.com/in/rudraprajapati",
  }
};
