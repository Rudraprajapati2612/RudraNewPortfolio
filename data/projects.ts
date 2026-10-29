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
    | "swaplit-curve"
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
        "Designed and implemented 8 distinct technical projects and research workbenches."
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
    id: "swaplit",
    index: "05",
    category: "Engineering",
    eyebrow: "SWAPLIT / AMM",
    headline: "Liquidity has a logic.",
    headlineSerif: "logic",
    description:
      "An automated market maker and decentralized exchange built on Ethereum, implementing constant-product pricing, token swaps, and multi-hop routing.",
    tags: ["Solidity", "Ethereum", "AMM", "EVM", "Foundry"],
    visualType: "swaplit-curve",
    status: "Prototype",
    githubUrl: "https://github.com/Rudraprajapati2612/Decentralised-Exchange-Eth",
    readTime: "4 min read",
    gridSpanDesktop: "lg:col-span-2",
    simply: {
      whatItIs:
        "SwapLiT is a decentralized exchange and automated market maker built on Ethereum. It replaces order books with the constant-product invariant formula (x · y = k), enabling autonomous token pricing, peer-to-pool liquidity, and graph-based routing across trading pairs.",
      ideaTitle: "THE MECHANICS",
      problemExplored:
        "How markets establish fair equilibrium pricing without centralized intermediaries. SwapLiT explores the mathematics of automated market making, analyzing slippage curves, impermanent loss, liquidity provider incentives, and transaction routing.",
      architecturalWhy:
        "By enforcing invariant conservation at the smart contract level, every trade adjusts the pool's marginal price deterministically. The architecture uses checks-effects-interactions and reentrancy guards to prevent economic exploits.",
      roleAndContribution:
        "Smart contract engineer. Authored Solidity contracts, created invariant test suites in Foundry, and implemented the token routing algorithms.",
      currentStage:
        "Fully implemented and verified smart contract suite with mathematical property tests."
    },
    underTheHood: {
      systemArchitectureOverview:
        "The system comprises factory contracts for pair deployment, core pair contracts enforcing the invariant with flash-swap capability, and router contracts for multi-hop swap execution with slippage protection.",
      customSections: [
        {
          title: "CONSTANT-PRODUCT INVARIANT",
          content: "Enforces the fundamental conservation invariant (x_new · y_new >= k) after taking into account the 0.3% liquidity provider fee, ensuring that reserves cannot be depleted by rounding exploits."
        },
        {
          title: "ROUTING & SLIPPAGE",
          content: "Graph-based router calculates optimal multi-hop paths (e.g., Token A → ETH → Token B) with user-configurable maximum slippage parameters to guard against front-running."
        },
        {
          title: "SMART CONTRACT SECURITY",
          content: "Built with reentrancy protection, safe math arithmetic, ERC-20 permit support for gasless approvals, and comprehensive Foundry fuzzing test coverage."
        }
      ],
      techTags: ["Solidity", "Ethereum", "Foundry", "ERC-20", "Automated Market Maker", "EVM"],
      components: [],
      technicalChallenges: [],
      implementationHighlights: [],
      resultsAndBenchmarks: [],
      limitations: []
    }
  },
  {
    id: "skills-toolkit",
    index: "06",
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
    index: "07",
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
    index: "08",
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
    index: "09",
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
