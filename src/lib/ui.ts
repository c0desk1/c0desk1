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

export const base = [
  "inline-flex items-center justify-center gap-2 font-medium tracking-wide transition-all duration-200 select-none cursor-pointer",
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-(--focus-ring,#d4a853) focus-visible:ring-offset-2 focus-visible:ring-offset-(--bg,#0a0a0a)",
  "active:scale-[0.97] disabled:pointer-events-none disabled:opacity-40 data-[loading=true]:cursor-wait",
  "relative overflow-hidden"
].join(' ');

export const variants: Record<Variant, string> = {
  primary:
    "bg-(--fg,#f0ece4) text-(--bg,#0a0a0a) border border-transparent " +
    "hover:bg-(--fg-muted,#d9d4cc) active:bg-(--fg-subtle,#c2bdb5) shadow-sm",

  secondary:
    "bg-(--bg,#0a0a0a) text-(--fg,#f0ece4) border border-(--border,#2a2a2a) " +
    "hover:bg-(--bg-muted,#141414) hover:border-(--border-hover,#3a3a3a) active:bg-(--bg-subtle,#1e1e1e) shadow-sm",

  tertiary:
    "text-(--fg-muted,#9a9590) hover:text-(--fg,#f0ece4) hover:bg-(--bg-muted,#141414) active:bg-(--bg-subtle,#1e1e1e)",

  ghost:
    "text-(--fg,#f0ece4) bg-transparent hover:bg-white/5 active:bg-white/10",

  outline:
    "bg-transparent text-(--accent,#d4a853) border border-(--accent,#d4a853) " +
    "hover:bg-(--accent,#d4a853) hover:text-(--bg,#0a0a0a) active:bg-(--accent-dark,#b8903f) shadow-sm",

  accent:
    "bg-(--accent,#d4a853) text-(--bg,#0a0a0a) border border-transparent " +
    "hover:bg-(--accent-hover,#e0b86a) active:bg-(--accent-dark,#b8903f) shadow-md shadow-(--accent,#d4a853)/20",

  noir:
    "bg-[#111] text-[#f0ece4] border border-[#2c2c2c] " +
    "shadow-[inset_0_1px_0_rgba(255,255,255,0.06),0_1px_3px_rgba(0,0,0,0.6)] " +
    "hover:bg-[#1a1a1a] hover:border-[#3a3a3a] hover:shadow-[inset_0_1px_0_rgba(255,255,255,0.09),0_2px_6px_rgba(0,0,0,0.7)] " +
    "active:bg-[#0d0d0d] active:shadow-[inset_0_2px_4px_rgba(0,0,0,0.8)]",

  "noir-outline":
    "bg-transparent text-[#c8c0b0] border border-[#3a3a3a] " +
    "hover:border-[#d4a853] hover:text-[#d4a853] hover:shadow-[0_0_12px_rgba(212,168,83,0.15)] " +
    "active:bg-[#d4a853]/5",

  danger:
    "bg-(--error,#c0392b) text-white border border-transparent " +
    "hover:bg-red-600 active:bg-red-700 shadow-sm shadow-red-900/30",

  success:
    "bg-emerald-700 text-white border border-transparent " +
    "hover:bg-emerald-600 active:bg-emerald-800 shadow-sm shadow-emerald-900/30",

  warning:
    "bg-amber-600 text-[#0a0a0a] border border-transparent " +
    "hover:bg-amber-500 active:bg-amber-700 shadow-sm shadow-amber-900/30",

  glass:
    "bg-white/5 text-(--fg,#f0ece4) border border-white/10 backdrop-blur-sm " +
    "hover:bg-white/10 hover:border-white/20 active:bg-white/[0.07] shadow-sm",
};

export const sizes: Record<Size, string> = {
  xs: 'h-7  px-2.5 text-xs   rounded-md  gap-1.5',
  sm: 'h-8  px-3   text-sm   rounded-lg  gap-1.5',
  md: 'h-9  px-4   text-sm   rounded-xl  gap-2',
  lg: 'h-10 px-5   text-base rounded-xl  gap-2',
  xl: 'h-12 px-7   text-base rounded-2xl gap-2.5',
};

export function buildClasses(
  variant: Variant,
  size: Size,
  className?: string
): string {
  return [base, variants[variant], sizes[size], className].filter(Boolean).join(' ');
}