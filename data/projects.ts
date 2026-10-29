export type ProjectCategory = "Engineering" | "People" | "Research" | "Skills" | "Writing";

export interface SimplyTabContent {
  whatItIs: string;
  problemExplored: string;
  architecturalWhy: string;
  roleAndContribution: string;
  currentStage: string;
}

export interface UnderTheHoodComponent {
  title: string;
  description: string;
  protocolOrStack?: string;
}

export interface UnderTheHoodTabContent {
  systemArchitectureOverview: string;
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
    description: "A hybrid prediction-market platform exploring low-latency order matching and on-chain settlement.",
    tags: ["Rust", "Solana", "gRPC", "TypeScript"],
    visualType: "hydra-diagram",
    status: "Prototype",
    githubUrl: "https://github.com/rudraprajapati",
    readTime: "4 min read",
    gridSpanDesktop: "lg:col-span-2",
    simply: {
      whatItIs:
        "HydraMarket is an experimental prediction-market exchange designed to handle rapid order placement without making traders wait for blockchain block confirmations on every single bid or ask.",
      problemExplored:
        "Prediction markets suffer from a difficult dilemma: if you put every order directly on a blockchain, transaction fees and block slots make high-frequency trading sluggish; if you run a purely centralized exchange, users must hand over complete custodial custody of their funds to an opaque server.",
      architecturalWhy:
        "HydraMarket separates the order lifecycle into two distinct phases. Order matching happens off-chain in a lightning-fast in-memory engine where limit and market orders pair instantly. Settlement happens on-chain on Solana, where batches of completed trades are submitted together into non-custodial smart contracts, giving traders instant execution speed alongside verifiable custody.",
      roleAndContribution:
        "Sole creator & systems designer. Architected the dual-layer flow, built the core in-memory FIFO orderbook in Rust, wrote the gRPC streaming service, and implemented the Anchor settlement contracts on Solana.",
      currentStage:
        "Working engineering prototype evaluated in local test clusters with synthetic multi-client load generators."
    },
    underTheHood: {
      systemArchitectureOverview:
        "A decoupled micro-architecture where order processing is segregated into an ingestion gateway, a zero-copy lock-free matching core, and an asynchronous batch settlement pipeline targeting Solana's Sealevel parallel runtime.",
      components: [
        {
          title: "API & Ingestion Gateway",
          description:
            "Accepts high-throughput limit and market orders over gRPC. Authenticates trader cryptographic signatures upfront, performs balance checks against cached margin tables, and pushes validated orders into an in-process ring buffer.",
          protocolOrStack: "gRPC / Protobuf / Tokio"
        },
        {
          title: "In-Memory Matching Engine",
          description:
            "Implemented in pure Rust utilizing price-time priority (FIFO). Implements contiguous array-backed order queues and intrusive doubly-linked leaves to guarantee cache locality and sub-microsecond internal order traversal.",
          protocolOrStack: "Rust / Crossbeam / RingBuffer"
        },
        {
          title: "Settlement & State Rollup",
          description:
            "Dispatches trade execution batches to Solana programs written in Anchor. Consolidates multi-fill trade groups into atomic transaction instructions to respect compute-unit ceilings and minimize per-trade rent overhead.",
          protocolOrStack: "Solana Anchor / SPL Tokens"
        }
      ],
      technicalChallenges: [
        {
          challenge: "State reconciliation between volatile in-memory order states and delayed on-chain confirmation slots.",
          tradeoff: "Adopted optimistic internal balance reservations combined with an append-only commit log that handles on-chain transaction retries gracefully."
        },
        {
          challenge: "Serialization overhead in the critical trade execution path.",
          tradeoff: "Replaced JSON serialization with zero-copy binary Protocol Buffers over gRPC, drastically minimizing CPU cycle spend during order arrivals."
        }
      ],
      implementationHighlights: [
        "Thread-safe lock-free channels ensuring orderbook worker threads are never blocked by network I/O operations.",
        "Deterministic batch reconciliation loop verifying that every on-chain escrow release strictly matches off-chain matched execution receipts.",
        "Custom TypeScript client with reconnecting WebSocket diff subscriptions."
      ],
      resultsAndBenchmarks: [
        "Zero-drop order queuing validated across synthetic burst loads of 15,000 orders/sec in local benchmarks.",
        "Deterministic reconciliation: 100% of batched trade receipts verified against Solana local validator logs."
      ],
      limitations: [
        "Tested exclusively on local validator testnets; validator jitter and network fee priority spikes on Solana mainnet require further study.",
        "Margin liquidation engine is currently simplified to spot balances rather than complex cross-collateral derivatives."
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
        "Designed and implemented 8 distinct technical projects and research workbenches."
      ],
      limitations: [
        "Still learning every single day; prefer transparently acknowledging what I don't know rather than pretending to be an expert in everything."
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
    simply: {
      whatItIs:
        "ZestVault is a decentralized finance yield tracker and vault strategy prototype that continuously monitors interest rates across multiple liquidity pools on Solana.",
      problemExplored:
        "In DeFi, advertised APYs can be deceiving. Flash spikes, pool liquidity crunches, and sudden volatility can wipe out theoretical returns. ZestVault explores how to measure risk-adjusted yield rather than chasing nominal headline figures.",
      architecturalWhy:
        "By streaming live oracle price feeds and pooling yield histories into a fast Redis time-series cache, ZestVault computes a sliding-window volatility score before reallocating capital, helping depositors avoid toxic pools.",
      roleAndContribution:
        "DeFi Protocol & Indexer Architect. Implemented the Solana account listener, built the Redis time-series sliding window engine, and authored the Anchor strategy prototype.",
      currentStage:
        "Prototype tested on Solana devnet with simulated price feed updates and mock lending pools."
    },
    underTheHood: {
      systemArchitectureOverview:
        "A three-part pipeline comprising an off-chain RPC indexer streaming Solana account diffs, an in-memory analytics engine calculating statistical volatility bands, and an Anchor smart contract with threshold-gated rebalance hooks.",
      components: [
        {
          title: "Account Streamer & Pyth Oracle Consumer",
          description:
            "Subscribes to Solana websocket account changes, decoding Pyth oracle price streams and protocol pool reserve accounts in real time.",
          protocolOrStack: "Solana RPC / Pyth Network / Rust"
        },
        {
          title: "Time-Series Volatility Indexer",
          description:
            "Aggregates 1-minute, 5-minute, and 1-hour exponential moving average (EMA) yield volatility metrics in Redis.",
          protocolOrStack: "Redis TimeSeries / Node.js"
        },
        {
          title: "Anchor Strategy Vault",
          description:
            "On-chain program that deposits assets into candidate lending programs only when oracle confidence intervals pass strict sanity checks.",
          protocolOrStack: "Rust / Anchor Framework"
        }
      ],
      technicalChallenges: [
        {
          challenge: "Preventing flash loan or oracle manipulation from triggering false rebalances.",
          tradeoff: "Implemented multi-block TWAP (Time-Weighted Average Price) checks and minimum deviation thresholds before any vault capital reallocation can execute."
        }
      ],
      implementationHighlights: [
        "Rust mathematical helpers for integer-based sliding window standard deviations without floating-point hazards.",
        "Automatic sanity checks ensuring total vault asset accounting strictly matches underlying deposit share mints."
      ],
      resultsAndBenchmarks: [
        "Maintained sub-second indexer latency behind devnet block production.",
        "Protected vault assets in synthetic test harnesses from simulated oracle flash crashes."
      ],
      limitations: [
        "Tested against simulated devnet pools; live mainnet liquidity slippage and MEV sandwich attacks require dedicated private RPC infrastructure."
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
    simply: {
      whatItIs:
        "SwapLiT is an educational and invariant-driven decentralized exchange (DEX) smart contract exploring how automated market makers price tokens purely through mathematics without orderbooks.",
      problemExplored:
        "Traditional markets rely on matching individual buyers with sellers. Automated Market Makers replace this with an invariant formula (x * y = k), where a pool of tokens automatically trades against anyone at a price determined by the ratio of tokens remaining in the pool.",
      architecturalWhy:
        "Studying the constant-product curve reveals the core mechanics of decentralized finance: how slippage increases with trade size, how liquidity providers earn fees, and why invariant conservation is essential to prevent pool drainage.",
      roleAndContribution:
        "Smart contract engineer. Authored EVM contracts in Solidity, wrote fuzz tests in Foundry verifying mathematical invariants, and created the interactive curve visualizer.",
      currentStage:
        "Complete mathematical and Solidity implementation with comprehensive Foundry invariant test suites."
    },
    underTheHood: {
      systemArchitectureOverview:
        "A modular EVM contract suite implementing constant-product automated market making with flash-swap hooks, precision integer arithmetic, and strict reentrancy guards.",
      components: [
        {
          title: "SwapLiTPair Contract",
          description:
            "Core state container holding token reserves. Enforces that post-swap reserves satisfy (x_new * y_new >= k) after taking into account the 0.3% protocol fee.",
          protocolOrStack: "Solidity 0.8 / Checks-Effects-Interactions"
        },
        {
          title: "SwapLiTRouter",
          description:
            "Performs multi-hop optimal route calculations, slippage tolerances, and minimum output amount enforcement for end users.",
          protocolOrStack: "Solidity / ERC-20"
        },
        {
          title: "LP Token Ledger",
          description:
            "ERC-20 token tracking liquidity provider ownership proportional to the geometric mean of deposited reserves sqrt(x * y).",
          protocolOrStack: "OpenZeppelin ERC20"
        }
      ],
      technicalChallenges: [
        {
          challenge: "Integer division precision loss in square-root liquidity calculations.",
          tradeoff: "Implemented the Babylonian square root method in assembly/Solidity with precision scaling factors to eliminate rounding exploits."
        }
      ],
      implementationHighlights: [
        "Foundry property-based fuzz tests running 100,000 random input permutations to guarantee invariant preservation.",
        "Reentrancy guards on all external state transitions preventing recursive drain attacks."
      ],
      resultsAndBenchmarks: [
        "Zero invariant violations across 100,000 randomized trade fuzzing runs.",
        "Gas optimization: kept standard swap invocation below 105,000 EVM gas units."
      ],
      limitations: [
        "Constant-product (v2 style) design suffers from higher capital inefficiency compared to concentrated liquidity (v3 style)."
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
    simply: {
      whatItIs:
        "A genuine, uninflated overview of the technologies, programming languages, and system architectures I work with on a daily basis.",
      problemExplored:
        "Resumes are often filled with meaningless percentage bars (e.g., '95% Rust') or buzzwords without depth. I prefer to organize my toolkit by domain, focusing on what I have actually built and can substantiate.",
      architecturalWhy:
        "I choose tools based on their runtime characteristics: Rust when low latency, memory safety, and zero-cost abstractions are non-negotiable; TypeScript for safe, end-to-end full-stack development; Python for tensor pipelines and computer vision; Solidity and Anchor for verifiable state machines.",
      roleAndContribution:
        "Architected and deployed systems across all listed languages and tools.",
      currentStage:
        "Active, continuously expanding toolkit."
    },
    underTheHood: {
      systemArchitectureOverview:
        "My toolkit is organized across 5 core domains: Languages, Backend & Systems, Blockchain State Machines, Databases & Infrastructure, and Machine Learning.",
      components: [
        {
          title: "Languages",
          description: "Rust (concurrency, systems), TypeScript (full-stack, strict typing), Python (scientific, ML), Solidity (EVM contracts), JavaScript.",
          protocolOrStack: "Rust / TS / Py / Sol"
        },
        {
          title: "Backend & Systems",
          description: "Node.js, Express, gRPC, Protobuf, distributed consensus models, WebSockets, REST API design.",
          protocolOrStack: "gRPC / Tokio / Microservices"
        },
        {
          title: "Blockchain & Consensus",
          description: "Solana Sealevel runtime, Anchor framework, EVM smart contracts, automated market makers (AMMs), decentralized oracles.",
          protocolOrStack: "Solana / EVM"
        },
        {
          title: "Databases & Infrastructure",
          description: "PostgreSQL (relational schemas, indices), Redis (caching, pub/sub, time-series), Docker, Linux environments, Git.",
          protocolOrStack: "Postgres / Redis / Docker / Linux"
        },
        {
          title: "AI / Machine Learning",
          description: "TensorFlow, Keras, Convolutional Neural Networks (CNNs), OpenCV, data preprocessing, computer vision pipelines.",
          protocolOrStack: "TF / Keras / Vision"
        }
      ],
      technicalChallenges: [
        {
          challenge: "Avoiding tool fatigue and superficial adoption.",
          tradeoff: "Focus deeply on operating system primitives (memory, threads, sockets, I/O multiplexing) so new frameworks can be mastered rapidly from first principles."
        }
      ],
      implementationHighlights: [
        "Practical experience debugging lock contention, memory leaks, and async task starvation.",
        "Deep understanding of serialized network protocols and database indexing structures."
      ],
      resultsAndBenchmarks: [
        "Proven ability to deliver end-to-end applications from database schema to browser interface."
      ],
      limitations: [
        "Prefer to admit unfamiliarity with legacy proprietary enterprise stacks rather than claiming unverified mastery."
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
