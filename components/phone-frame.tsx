import type { ReactNode } from "react"

export function PhoneFrame({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen items-center justify-center bg-neutral-200 p-4">
      <div className="relative h-[852px] w-[393px] overflow-hidden rounded-[44px] border border-border bg-white shadow-2xl">
        {/* notch */}
        <div className="absolute left-1/2 top-3.5 z-20 h-7 w-[120px] -translate-x-1/2 rounded-2xl bg-black" />
        {children}
      </div>
    </div>
  )
}
