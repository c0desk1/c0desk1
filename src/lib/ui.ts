export type Variant =
  | 'primary'
  | 'secondary'
  | 'tertiary'
  | 'danger'
  | 'accent'
  | 'outline'
  | 'ghost'
  | 'noir'
  | 'noir-outline'
  | 'success'
  | 'warning'
  | 'glass';

export type Size = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

export const base = 
  "btn inline-flex items-center justify-center font-medium select-none cursor-pointer " +
  "active:scale-[0.97] data-[loading=true]:cursor-wait relative overflow-hidden transition-all duration-200 " +
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-(--border-strong) focus-visible:ring-offset-2 focus-visible:ring-offset-(--bg)";

export const variants: Record<Variant, string> = {
  primary: 
    "bg-(--fg) text-(--bg) border border-transparent " +
    "hover:bg-(--fg-strong) active:opacity-90 shadow-sm",

  secondary: 
    "bg-(--bg-muted) text-(--fg-strong) border border-transparent " +
    "hover:bg-(--bg-subtle) active:bg-(--bg-muted) shadow-sm",

  ghost: 
    "bg-transparent text-(--fg-muted) border border-transparent " +
    "hover:text-(--fg-strong) hover:bg-(--bg-subtle) active:bg-(--bg-muted)",

  tertiary:
    "text-(--fg-muted) hover:text-(--fg-strong) hover:bg-(--bg-subtle) active:bg-(--bg-muted)",

  outline:
    "bg-transparent text-(--fg-strong) border border-(--border) " +
    "hover:bg-(--bg-subtle) hover:border-(--border-strong) active:bg-(--bg-muted) shadow-sm",

  accent:
    "bg-(--accent) text-(--accent-fg) border border-transparent " +
    "hover:opacity-90 active:opacity-80 shadow-sm shadow-(--accent-ring)",

  noir:
    "bg-(--color-void-950) text-(--color-void-50) border border-(--color-void-800) " +
    "shadow-[inset_0_1px_0_rgba(255,255,255,0.06),0_1px_2px_rgba(0,0,0,0.6)] " +
    "hover:bg-(--color-void-900) hover:border-(--color-void-700) " +
    "active:bg-(--color-void-1000) active:shadow-none",

  "noir-outline":
    "bg-transparent text-(--color-void-400) border border-(--color-void-800) " +
    "hover:border-(--color-void-400) hover:text-(--color-void-0) hover:shadow-[0_0_12px_rgba(255,255,255,0.05)] " +
    "active:bg-(--color-void-900)",

  danger:
    "bg-(--error) text-(--error-fg) border border-transparent " +
    "hover:opacity-90 active:opacity-80 shadow-sm",

  success:
    "bg-(--success) text-(--success-fg) border border-transparent " +
    "hover:opacity-90 active:opacity-80 shadow-sm",

  warning:
    "bg-(--warning) text-(--warning-fg) border border-transparent " +
    "hover:opacity-90 active:opacity-80 shadow-sm",
  glass:
    "bg-(--fg-strong)/5 text-(--fg-strong) border border-(--border) backdrop-blur-md " +
    "hover:bg-(--fg-strong)/10 hover:border-(--border-strong) active:bg-(--fg-strong)/5 shadow-sm",
};

export const sizes: Record<Size, string> = {
  xs: 'h-7  px-2.5 text-button-13 rounded-(--radius)',
  sm: 'h-8  px-3   text-button-13 rounded-(--radius)',
  md: 'h-9  px-4   text-button-14 rounded-(--radius)',
  lg: 'h-10 px-5   text-button-14 rounded-(--radius-lg)',
  xl: 'h-12 px-7   text-button-16 rounded-(--radius-xl)',
};

export function buildClasses(
  variant: Variant,
  size: Size,
  className?: string
): string {
  return [base, variants[variant], sizes[size], className].filter(Boolean).join(' ');
}