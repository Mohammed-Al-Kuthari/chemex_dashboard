import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

// Maps typography variants to semantic HTML tags to keep headings accessible by default.
const variantToElement = {
  display: "h1",
  h1: "h1",
  h2: "h2",
  h3: "h3",
  h4: "h4",
  h5: "h5",
  h6: "h6",
  lead: "p",
  body: "p",
  small: "p",
  muted: "p",
  eyebrow: "p",
  caption: "span",
  blockquote: "blockquote",
} as const

const typographyVariants = cva("text-foreground", {
  variants: {
    variant: {
      display:
        "scroll-m-20 text-balance text-4xl font-semibold tracking-tight sm:text-5xl",
      h1: "scroll-m-20 text-balance text-3xl font-semibold tracking-tight sm:text-4xl",
      h2: "scroll-m-20 text-balance text-2xl font-semibold tracking-tight",
      h3: "scroll-m-20 text-balance text-xl font-semibold tracking-tight",
      h4: "scroll-m-20 text-balance text-lg font-semibold tracking-tight",
      h5: "scroll-m-20 text-balance text-base font-semibold tracking-tight",
      h6: "scroll-m-20 text-balance text-sm font-semibold uppercase tracking-wide text-muted-foreground",
      lead: "text-balance text-lg text-muted-foreground",
      body: "text-pretty text-base leading-7",
      small: "text-pretty text-sm leading-6",
      muted: "text-pretty text-sm text-muted-foreground",
      eyebrow:
        "text-pretty text-xs font-semibold uppercase tracking-[0.26em] text-muted-foreground",
      caption: "text-xs text-muted-foreground",
      blockquote:
        "text-pretty border-l-4 border-border/60 pl-4 italic text-muted-foreground",
    },
    weight: {
      regular: "font-normal",
      medium: "font-medium",
      semibold: "font-semibold",
      bold: "font-bold",
    },
    align: {
      start: "text-left",
      center: "text-center",
      end: "text-right",
      justify: "text-justify",
    },
    wrap: {
      balance: "text-balance",
      pretty: "text-pretty",
      normal: "",
      truncate: "truncate",
    },
  },
  compoundVariants: [
    {
      variant: ["display", "h1", "h2", "h3", "h4", "h5", "h6"],
      weight: "regular",
      class: "font-semibold",
    },
    {
      variant: "eyebrow",
      weight: "regular",
      class: "font-semibold",
    },
    {
      variant: "caption",
      weight: "regular",
      class: "font-medium",
    },
  ],
  defaultVariants: {
    variant: "body",
    weight: "regular",
    align: "start",
    wrap: "balance",
  },
})

type Variant = NonNullable<VariantProps<typeof typographyVariants>["variant"]>

function getElementForVariant(variant: Variant) {
  return variantToElement[variant] ?? "p"
}

type TypographyProps<TComponent extends React.ElementType = "p"> = {
  as?: TComponent
} & Omit<React.ComponentPropsWithoutRef<TComponent>, "as" | "color"> &
  VariantProps<typeof typographyVariants>

const Typography = React.forwardRef<
  HTMLElement,
  TypographyProps<React.ElementType>
>(function Typography(
  { as, variant = "body", weight, wrap, align, className, ...props },
  ref
) {
  const Component = (as ?? getElementForVariant(variant)) as React.ElementType

  return (
    <Component
      ref={ref as React.Ref<HTMLElement>}
      data-slot="typography"
      className={cn(
        typographyVariants({ variant, weight, wrap, align }),
        className
      )}
      {...props}
    />
  )
})

export { Typography, typographyVariants }
export type { TypographyProps }
