import * as React from "react"
import * as AvatarPrimitive from "@radix-ui/react-avatar"
import { cva } from "class-variance-authority"

import { cn } from "@/shared/lib/utils"

const avatarStatusVariants = cva(
  "absolute bottom-0 right-0 h-3 w-3 rounded-full border-2 border-background",
  {
    variants: {
      status: {
        online: "bg-green-500",
        idle: "bg-yellow-500",
        dnd: "bg-red-500",
        offline: "bg-gray-500",
      }
    }
  }
)

const Avatar = React.forwardRef(({ className, status, ...props }, ref) => (
  <div className="relative inline-block">
    <AvatarPrimitive.Root
      ref={ref}
      className={cn(
        "relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full",
        className
      )}
      {...props}
    />
    {status && (
      <span className={cn(avatarStatusVariants({ status }))} />
    )}
  </div>
))
Avatar.displayName = AvatarPrimitive.Root.displayName

const AvatarImage = React.forwardRef(({ className, ...props }, ref) => (
  <AvatarPrimitive.Image
    ref={ref}
    className={cn("aspect-square h-full w-full object-cover", className)}
    {...props}
  />
))
AvatarImage.displayName = AvatarPrimitive.Image.displayName

const AvatarFallback = React.forwardRef(({ className, ...props }, ref) => (
  <AvatarPrimitive.Fallback
    ref={ref}
    className={cn(
      "flex h-full w-full items-center justify-center rounded-full bg-indigo-500 text-white font-medium",
      className
    )}
    {...props}
  />
))
AvatarFallback.displayName = AvatarPrimitive.Fallback.displayName

export { Avatar, AvatarImage, AvatarFallback }
