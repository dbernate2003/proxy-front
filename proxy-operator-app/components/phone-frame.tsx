"use client"

import { cn } from "@/lib/utils"

interface PhoneFrameProps {
  children: React.ReactNode
  className?: string
}

export function PhoneFrame({ children, className }: PhoneFrameProps) {
  return (
    <div className={cn(
      "relative mx-auto w-[375px] h-[812px] bg-background rounded-[3rem] border-4 border-secondary shadow-2xl phone-frame overflow-hidden",
      className
    )}>
      {/* Notch */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-40 h-7 bg-secondary rounded-b-3xl z-50" />
      
      {/* Screen content */}
      <div className="relative h-full pt-8 pb-4 overflow-hidden">
        {children}
      </div>

      {/* Home indicator */}
      <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-32 h-1 bg-muted-foreground/30 rounded-full" />
    </div>
  )
}
