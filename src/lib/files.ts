export type File = {
  slug: string;
  title: string;
  content: string;
  tags?: string[];
};

export const mockFiles: File[] = [
  {
    slug: 'welcome',
    title: 'Welcome to Noctura',
    content: `# Noctura\n\nWelcome to your personal dark vault. Begin archiving.`,
    tags: ['intro', 'system'],
  },
  {
    slug: 'glitch-core',
    title: 'Glitch Core Theory',
    content: `## Observations\n\nReality glitches occur near electromagnetic thresholds.`,
    tags: ['theory', 'glitch'],
  },
  {
    slug: 'log-2025-07-31',
    title: 'System Log: 31.07.2025',
    content: `**Status:** unstable\n\n> Memory fragments were detected.`,
    tags: ['log', 'system'],
  },
];
