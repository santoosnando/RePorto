"use client"

import { useState } from "react"
import Image from "next/image"
import { ChevronLeft, Home as HomeIcon, TicketPercent, CalendarClock, CheckCircle2 } from "lucide-react"
import { AVAILABLE_COUPONS, USED_COUPONS, type Coupon } from "@/lib/data"

type Tab = "available" | "history"

export function CouponsScreen({ onBack }: { onBack: () => void }) {
  const [tab, setTab] = useState<Tab>("available")
  const list = tab === "available" ? AVAILABLE_COUPONS : USED_COUPONS

  return (
    <div className="relative h-full w-full">
      <div className="h-full overflow-y-auto bg-gradient-to-b from-[#1a1f4d] via-[#2c4694] to-[#4d82e0] pb-[76px] [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        {/* header */}
        <div className="px-[18px] pb-4 pt-14">
          <button type="button" onClick={onBack} className="flex items-center gap-3.5">
            <div className="flex size-9 flex-shrink-0 items-center justify-center rounded-full bg-brand-blue">
              <ChevronLeft className="size-[18px] text-white" />
            </div>
            <span className="text-[19px] font-medium tracking-wide text-white">Carteira de cupons</span>
          </button>

          {/* segmented selector */}
          <div className="mt-4 flex rounded-full bg-white/15 p-1">
            <button
              type="button"
              onClick={() => setTab("available")}
              className={`flex-1 rounded-full py-2 text-[13px] font-medium transition-colors ${
                tab === "available" ? "bg-white text-brand-navy" : "text-white/80"
              }`}
            >
              Disponíveis
            </button>
            <button
              type="button"
              onClick={() => setTab("history")}
              className={`flex-1 rounded-full py-2 text-[13px] font-medium transition-colors ${
                tab === "history" ? "bg-white text-brand-navy" : "text-white/80"
              }`}
            >
              Histórico
            </button>
          </div>
        </div>

        {/* list */}
        <div className="px-4 pt-1">
          {list.length === 0 ? (
            <div className="mt-10 flex flex-col items-center px-6 text-center">
              <div className="flex size-16 items-center justify-center rounded-full bg-white/10">
                <TicketPercent className="size-8 text-white" />
              </div>
              <p className="mt-4 text-[15px] font-medium text-white">
                {tab === "available" ? "Nenhum cupom disponível" : "Nenhum cupom utilizado"}
              </p>
            </div>
          ) : (
            <ul className="space-y-3">
              {list.map((c) => (
                <CouponCard key={c.id} coupon={c} used={tab === "history"} />
              ))}
            </ul>
          )}
        </div>
      </div>

      {/* fixed footer navbar */}
      <div className="absolute inset-x-0 bottom-0 flex justify-center border-t border-border bg-white pb-3 pt-2">
        <button
          type="button"
          onClick={onBack}
          className="flex size-11 items-center justify-center rounded-full bg-brand-blue"
          aria-label="Início"
        >
          <HomeIcon className="size-5 text-white" />
        </button>
      </div>
    </div>
  )
}

function CouponCard({ coupon, used }: { coupon: Coupon; used: boolean }) {
  return (
    <li className={`flex gap-3 rounded-2xl bg-white p-3 ${used ? "opacity-90" : ""}`}>
      <div className="relative size-[70px] flex-shrink-0 overflow-hidden rounded-xl bg-[#e7eaf2]">
        <Image src={coupon.image || "/placeholder.svg"} alt={coupon.name} fill className="object-cover" />
      </div>
      <div className="flex min-w-0 flex-1 flex-col">
        <span className="text-[15px] font-semibold text-brand-navy">{coupon.name}</span>
        <span className="mt-0.5 inline-flex w-fit items-center rounded-full bg-brand-blue-soft px-2 py-0.5 text-[10px] font-medium text-brand-blue">
          {coupon.storeName}
        </span>

        {used ? (
          <span className="mt-auto inline-flex w-fit items-center gap-1 rounded-full bg-[#e8f6ec] px-2 py-1 text-[10.5px] font-medium text-brand-emerald">
            <CheckCircle2 className="size-3" />
            Utilizado em {coupon.usedAt}
          </span>
        ) : (
          <div className="mt-auto flex items-center justify-between pt-1">
            <span className="inline-flex items-center gap-1 text-[10.5px] text-brand-mute">
              <CalendarClock className="size-3" />
              Válido até {coupon.validUntil}
            </span>
            <span className="text-[13px] font-bold text-brand-blue">{coupon.points} pts</span>
          </div>
        )}
      </div>
    </li>
  )
}
