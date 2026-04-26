export const categories = [
  "general",
  "web-dev",
  "ai",
  "anime",
  "automation",
  "content-creator",
  "game",
  "infrastructure",
  "news",
  "tips",
  "tools",
  "tutorials",
  "security",
  "networking",
  "electronics",
  "workflow"
] as const;

export const categoryLabels: Record<
  typeof categories[number],
  string
> = {
  "general": "General",
  "web-dev": "Web Development",
  "ai": "Artificial Intelligence",
  "anime": "Anime",
  "automation": "Automation",
  "content-creator": "Content Creator",
  "game": "Game",
  "infrastructure": "Infrastructure",
  "news": "News",
  "tips": "Tips",
  "tools": "Tools",
  "tutorials": "Tutorial",
  "security": "Security",
  "networking": "Networking",
  "electronics": "Electronics",
  "workflow": "Workflow",
};