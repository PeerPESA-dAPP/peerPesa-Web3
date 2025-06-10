
import * as React from "react"
import * as TogglePrimitive from "@radix-ui/react-toggle"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const toggleVariants = cva(
  "inline-flex items-center justify-center rounded-md text-sm font-medium transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "bg-transparent text-foreground hover:bg-gray-700 hover:text-white active:bg-gray-700 active:text-white data-[state=on]:bg-gray-700 data-[state=on]:text-white",
        outline: "border border-input bg-transparent hover:bg-gray-700 hover:text-white active:bg-gray-700 active:text-white data-[state=on]:bg-gray-700 data-[state=on]:text-white",
        frequency: "bg-white text-gray-600 border border-gray-200 shadow-sm hover:bg-gray-700 hover:text-white data-[state=on]:bg-gray-700 data-[state=on]:text-white data-[state=on]:border-gray-700",
        weekly: "bg-white text-gray-600 border border-gray-200 shadow-sm hover:bg-gray-700 hover:text-white data-[state=on]:bg-gray-700 data-[state=on]:text-white",
        monthly: "bg-white text-gray-600 border border-gray-200 shadow-sm hover:bg-gray-700 hover:text-white data-[state=on]:bg-gray-700 data-[state=on]:text-white",
        yearly: "bg-white text-gray-600 border border-gray-200 shadow-sm hover:bg-gray-700 hover:text-white data-[state=on]:bg-gray-700 data-[state=on]:text-white",
      },
      size: {
        default: "h-10 px-3",
        sm: "h-9 px-2.5",
        lg: "h-11 px-5",
        xl: "h-12 px-6",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

const Toggle = React.forwardRef<
  React.ElementRef<typeof TogglePrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof TogglePrimitive.Root> &
    VariantProps<typeof toggleVariants>
>(({ className, variant, size, ...props }, ref) => (
  <TogglePrimitive.Root
    ref={ref}
    className={cn(toggleVariants({ variant, size, className }))}
    {...props}
  />
))

Toggle.displayName = TogglePrimitive.Root.displayName

export { Toggle, toggleVariants }
