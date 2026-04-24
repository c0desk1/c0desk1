export const categories = [
  "general",
  "web-dev",
  "ai",
  "anime",
  "automation",
  "game",
  "infrastructure",
  "news",
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
  "game": "Game",
  "infrastructure": "Infrastructure",
  "news": "News",
  "tools": "Tools",
  "tutorials": "Tutorial",
  "security": "Security",
  "networking": "Networking",
  "electronics": "Electronics",
  "workflow": "Workflow",
};