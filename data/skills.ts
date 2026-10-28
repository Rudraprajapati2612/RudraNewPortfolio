export interface SkillGroup {
  category: string;
  description: string;
  skills: string[];
}

export const skillGroups: SkillGroup[] = [
  {
    category: "Languages",
    description: "Core systems, application logic, and contract implementation",
    skills: ["Rust", "TypeScript", "JavaScript", "Python", "Solidity"],
  },
  {
    category: "Backend & Systems",
    description: "High-throughput services, network protocols, and interface design",
    skills: ["Node.js", "Express", "gRPC", "Distributed systems", "API design"],
  },
  {
    category: "Blockchain",
    description: "Decentralized state machines, consensus interaction, and liquidity mechanics",
    skills: ["Solana", "Anchor", "Smart contracts", "AMMs"],
  },
  {
    category: "Databases & Infrastructure",
    description: "Data persistence, fast in-memory stores, and containerized runtime",
    skills: ["PostgreSQL", "Redis", "Docker", "Linux", "Git"],
  },
  {
    category: "AI / Machine Learning",
    description: "Computer vision architectures, tensor pipelines, and convolutional models",
    skills: ["Python", "TensorFlow", "CNNs", "Computer vision"],
  },
];
