export type SkillCategoryId = 'languages' | 'systems-networking' | 'solana-web3' | 'backend-web' | 'data-infrastructure';

export interface SkillDefinition {
  id: string;
  name: string;
  category: SkillCategoryId;
  description: string;
  /** Only project ids documented in data/projects.ts are included here. */
  projectIds: string[];
}

export interface SkillCategory { id: SkillCategoryId; name: string; }

export const SKILL_CATEGORIES: SkillCategory[] = [
  { id: 'languages', name: 'Languages' },
  { id: 'systems-networking', name: 'Systems & Networking' },
  { id: 'solana-web3', name: 'Solana & Web3' },
  { id: 'backend-web', name: 'Backend & Web' },
  { id: 'data-infrastructure', name: 'Data & Infrastructure' },
];

const skill = (id: string, name: string, category: SkillCategoryId, description: string, projectIds: string[] = []): SkillDefinition => ({ id, name, category, description, projectIds });

export const SKILLS: SkillDefinition[] = [
  skill('rust', 'Rust', 'languages', 'Systems programs, matching engines, watchers, and developer tooling.', ['hydramarket', 'sentinelguard', 'ferrum', 'layoutd-cli']),
  skill('typescript', 'TypeScript', 'languages', 'Typed services, event indexers, and application interfaces.', ['hydramarket', 'sentinelguard', 'swaplit', 'better-uptime', 'engram']),
  skill('javascript', 'JavaScript', 'languages', 'Core language knowledge supporting web application development.'),
  skill('solidity', 'Solidity', 'languages', 'EVM contracts for automated market-maker mechanics.', ['swaplit']),
  skill('sql', 'SQL', 'languages', 'A relational query language in the wider toolkit.'),
  skill('tokio', 'Tokio', 'systems-networking', 'Async runtime used for low-latency Rust services.', ['sentinelguard', 'ferrum']),
  skill('async-io', 'Async I/O', 'systems-networking', 'Non-blocking I/O patterns for concurrent services.', ['sentinelguard', 'ferrum']),
  skill('tcp', 'TCP', 'systems-networking', 'Raw socket connections in the HTTP server.', ['ferrum']),
  skill('http-1-1', 'HTTP/1.1', 'systems-networking', 'A from-scratch parser and server protocol implementation.', ['ferrum']),
  skill('grpc', 'gRPC', 'systems-networking', 'Service and transaction-stream communication.', ['hydramarket', 'sentinelguard']),
  skill('protobuf', 'Protocol Buffers (Protobuf)', 'systems-networking', 'A schema format in the networking toolkit.'),
  skill('websockets', 'WebSockets', 'systems-networking', 'Real-time response streaming for conversational memory.', ['engram']),
  skill('kafka', 'Kafka', 'systems-networking', 'Event-streaming infrastructure in the toolkit.'),
  skill('redis', 'Redis', 'systems-networking', 'Queues, streams, and asynchronous coordination.', ['hydramarket', 'better-uptime', 'engram']),
  skill('solana', 'Solana', 'solana-web3', 'On-chain settlement, security controls, and developer tooling.', ['hydramarket', 'sentinelguard', 'layoutd-cli']),
  skill('anchor', 'Anchor', 'solana-web3', 'Solana programs and account-layout tooling.', ['hydramarket', 'sentinelguard', 'layoutd-cli']),
  skill('spl-tokens', 'SPL Tokens', 'solana-web3', 'Token-program primitives in the toolkit.'),
  skill('pdas', 'Program Derived Addresses (PDAs)', 'solana-web3', 'Solana account-addressing primitives in the toolkit.'),
  skill('yellowstone-grpc', 'Yellowstone gRPC', 'solana-web3', 'Transaction and account streams for threat detection.', ['sentinelguard']),
  skill('geyser', 'Geyser', 'solana-web3', 'Solana data-streaming infrastructure in the toolkit.'),
  skill('helius', 'Helius', 'solana-web3', 'Solana infrastructure in the toolkit.'),
  skill('pyth', 'Pyth', 'solana-web3', 'Oracle infrastructure in the toolkit.'),
  skill('ethereum', 'Ethereum', 'solana-web3', 'The execution environment for the AMM project.', ['swaplit']),
  skill('foundry', 'Foundry', 'solana-web3', 'EVM development tooling in the toolkit.'),
  skill('hardhat', 'Hardhat', 'solana-web3', 'EVM development tooling in the toolkit.'),
  skill('circom', 'Circom', 'solana-web3', 'Zero-knowledge circuit tooling in the toolkit.'),
  skill('snarkjs', 'snarkjs', 'solana-web3', 'Zero-knowledge proof tooling in the toolkit.'),
  skill('nodejs', 'Node.js', 'backend-web', 'JavaScript server runtime in the toolkit.'),
  skill('express', 'Express', 'backend-web', 'REST API service for distributed uptime monitoring.', ['better-uptime']),
  skill('bun', 'Bun', 'backend-web', 'Fast runtime for dispatchers, workers, and the memory service.', ['sentinelguard', 'better-uptime', 'engram']),
  skill('elysiajs', 'ElysiaJS', 'backend-web', 'Backend framework for the conversational memory service.', ['engram']),
  skill('rest-apis', 'REST APIs', 'backend-web', 'HTTP interfaces for application services.', ['better-uptime']),
  skill('trpc', 'tRPC', 'backend-web', 'Type-safe API tooling in the toolkit.'),
  skill('react', 'React', 'backend-web', 'Interface development in the toolkit.'),
  skill('nextjs', 'Next.js', 'backend-web', 'Dashboard and frontend delivery.', ['swaplit', 'better-uptime']),
  skill('tailwind-css', 'Tailwind CSS', 'backend-web', 'Utility-first styling in the toolkit.'),
  skill('postgresql', 'PostgreSQL', 'data-infrastructure', 'Persistent state, metrics, indexes, and vector-backed memory.', ['hydramarket', 'swaplit', 'better-uptime', 'engram']),
  skill('prisma', 'Prisma', 'data-infrastructure', 'Database access for the AMM and uptime-monitoring applications.', ['swaplit', 'better-uptime']),
  skill('mongodb', 'MongoDB', 'data-infrastructure', 'Document-store tooling in the toolkit.'),
  skill('sqlx', 'sqlx', 'data-infrastructure', 'Rust SQL tooling in the toolkit.'),
  skill('git', 'Git', 'data-infrastructure', 'Version control across project work.'),
  skill('github-actions', 'GitHub Actions', 'data-infrastructure', 'CI integration for account-layout safety checks.', ['layoutd-cli']),
  skill('docker', 'Docker', 'data-infrastructure', 'Container tooling in the toolkit.'),
  skill('postman', 'Postman', 'data-infrastructure', 'API exploration tooling in the toolkit.'),
];

export const projectLinkedSkillCount = SKILLS.filter((item) => item.projectIds.length > 0).length;

// Kept as a derived compatibility export for the résumé view; the skill map is
// the single source of truth for names, categories, and project relationships.
export const skillGroups = SKILL_CATEGORIES.map((category) => ({
  category: category.name,
  description: 'Project-linked technologies and supporting tools.',
  skills: SKILLS.filter((item) => item.category === category.id).map((item) => item.name),
}));
