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
export const base = "btn select-none cursor-pointer active:scale-[0.97] data-[loading=true]:cursor-wait relative overflow-hidden";
export const variants: Record<Variant, string> = {
  primary: "btn-primary shadow-sm",
  secondary: "btn-secondary shadow-sm",
  ghost: "btn-ghost",

  tertiary:
    "text-(--fg-muted) hover:text-(--fg-strong) hover:bg-(--bg-subtle) active:bg-(--bg-muted)",

  outline:
    "bg-transparent text-(--fg-strong) border border-(--border-strong) " +
    "hover:bg-(--bg-subtle) active:bg-(--bg-muted) shadow-sm",

  accent:
    "bg-(--accent) text-(--accent-fg) border border-transparent " +
    "hover:opacity-90 active:opacity-80 shadow-sm shadow-(--accent-ring)",

  noir:
    "bg-(--color-void-950) text-(--color-void-50) border border-(--color-void-800) " +
    "shadow-[inset_0_1px_0_rgba(255,255,255,0.06),0_1px_3px_rgba(0,0,0,0.6)] " +
    "hover:bg-(--color-void-900) hover:border-(--color-void-700) hover:shadow-[inset_0_1px_0_rgba(255,255,255,0.09),0_2px_6px_rgba(0,0,0,0.7)] " +
    "active:bg-(--color-void-1000) active:shadow-[inset_0_2px_4px_rgba(0,0,0,0.8)]",

  "noir-outline":
    "bg-transparent text-(--color-void-400) border border-(--color-void-800) " +
    "hover:border-(--color-void-400) hover:text-(--color-void-0) hover:shadow-[0_0_12px_rgba(255,255,255,0.08)] " +
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
    "bg-(--fg)/5 text-(--fg-strong) border border-(--fg)/10 backdrop-blur-sm " +
    "hover:bg-(--fg)/10 hover:border-(--fg)/20 active:bg-(--fg)/5 shadow-sm",
};


export const sizes: Record<Size, string> = {
  xs: 'h-7  px-2.5 text-button-13',
  sm: 'h-8  px-3   text-button-13',
  md: 'h-9  px-4   text-button-14',
  lg: 'h-10 px-5   text-button-14 rounded-(--radius-xl)',
  xl: 'h-12 px-7   text-button-16   rounded-(--radius-full)',
};

export function buildClasses(
  variant: Variant,
  size: Size,
  className?: string
): string {
  return [base, variants[variant], sizes[size], className].filter(Boolean).join(' ');
}