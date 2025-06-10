
import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "bg-peerpesa-primary text-white hover:bg-peerpesa-primary-dark hover:shadow-md hover:scale-[1.02]",
        destructive:
          "bg-destructive text-destructive-foreground hover:bg-destructive/90 hover:shadow-md hover:scale-[1.02]",
        outline:
          "border border-peerpesa-primary bg-white text-peerpesa-primary hover:bg-peerpesa-primary/10 hover:text-peerpesa-primary hover:shadow-md hover:scale-[1.02]",
        secondary:
          "bg-peerpesa-primary/10 text-peerpesa-primary hover:bg-peerpesa-primary/20 hover:shadow-md hover:scale-[1.02]",
        ghost: "hover:bg-peerpesa-primary/10 hover:text-peerpesa-primary hover:scale-[1.02]",
        link: "text-peerpesa-primary underline-offset-4 hover:underline hover:scale-[1.02]",
        purple: "bg-purple-600 text-white hover:bg-purple-700 hover:shadow-md hover:scale-[1.02]",
        amber: "bg-amber-500 text-white hover:bg-amber-600 hover:shadow-md hover:scale-[1.02]",
        red: "bg-peerpesa-red text-white hover:bg-peerpesa-red-dark active:bg-red-700 focus:bg-red-700 hover:shadow-md hover:scale-[1.02]",
        dark: "bg-peerpesa-dark text-white hover:bg-peerpesa-dark-hover hover:shadow-md hover:scale-[1.02]",
        google: "bg-white text-gray-700 border border-gray-300 hover:bg-gray-50 hover:shadow-md hover:scale-[1.02] flex items-center justify-center gap-2", // Updated Google variant
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3",
        lg: "h-11 rounded-md px-8",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }
