export const categories = [
  "general",
  "web-dev",
  "ai",
  "automation",
  "infrastructure",
  "tools",
  "security",
  "networking",
  "electronics"
] as const;

export const categoryLabels: Record<
  typeof categories[number],
  string
> = {
  "general": "General",
  "web-dev": "Web Development",
  "ai": "Artificial Intelligence",
  "automation": "Automation",
  "infrastructure": "Infrastructure",
  "tools": "Tools",
  "security": "Security",
  "networking": "Networking",
  "electronics": "Electronics",
};