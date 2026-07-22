"use client"

import Image from "next/image"
import {
  ChevronLeft,
  Settings,
  Home as HomeIcon,
  TicketPercent,
  Leaf,
  Trophy,
  ReceiptText,
  ChevronRight,
  type LucideIcon,
} from "lucide-react"
import { USER, LEVEL_BADGE_PROGRESS } from "@/lib/data"

type MenuItem = {
  label: string
  icon: LucideIcon
  onClick?: () => void
}

export function ProfileScreen({
  onBack,
  onOpenCupons,
  onOpenImpacto,
}: {
  onBack: () => void
  onOpenCupons: () => void
  onOpenImpacto: () => void
}) {
  const menu: MenuItem[] = [
    { label: "Carteira de cupons", icon: TicketPercent, onClick: onOpenCupons },
    { label: "Meu Impacto", icon: Leaf, onClick: onOpenImpacto },
    { label: "Ranking de coleta", icon: Trophy },
    { label: "Extrato de pontos", icon: ReceiptText },
  ]

  return (
    <div className="relative h-full w-full">
      <div className="h-full overflow-y-auto bg-gradient-to-b from-[#1a2f6b] to-brand-blue pb-[76px] [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        {/* white header card */}
        <div className="rounded-b-[28px] bg-white px-5 pb-6 pt-12">
          <div className="flex items-center justify-between">
            <button
              type="button"
              onClick={onBack}
              className="flex size-11 items-center justify-center rounded-full bg-brand-blue"
              aria-label="Voltar"
            >
              <ChevronLeft className="size-5 text-white" />
            </button>
            <button
              type="button"
              className="flex size-11 items-center justify-center rounded-full bg-brand-blue"
              aria-label="Configurações"
            >
              <Settings className="size-5 text-white" />
            </button>
          </div>

          <div className="mt-2 flex flex-col items-center text-center">
            <div className="relative size-28 overflow-hidden rounded-full border-4 border-brand-blue">
              <Image src={USER.avatar || "/placeholder.svg"} alt={USER.name} fill className="object-cover" />
            </div>
            <h1 className="mt-4 text-[24px] font-bold text-brand-ink">{USER.name}</h1>
            <p className="mt-0.5 text-[16px] italic text-brand-slate">{USER.level}</p>
            <button
              type="button"
              className="mt-5 rounded-2xl bg-brand-blue px-8 py-3 text-[15px] font-semibold text-white transition-colors hover:bg-brand-blue-light"
            >
              Editar perfil
            </button>
          </div>
        </div>

        {/* level progress with badges */}
        <div className="px-5 pt-7">
          <div className="flex items-end justify-between gap-3">
            <BadgeColumn image={USER.levelBadge} label={USER.level} />
            <div className="flex-1 pb-1.5">
              <div className="h-[9px] overflow-hidden rounded-full bg-white/20">
                <div
                  className="h-full rounded-full bg-brand-green"
                  style={{ width: `${LEVEL_BADGE_PROGRESS}%` }}
                />
              </div>
              <p className="mt-2.5 text-center text-[15px] font-bold text-brand-green">
                {USER.levelPoints} pts <span className="text-white/70">/</span>
              </p>
              <p className="text-center text-[13px] font-medium leading-snug text-white text-balance">
                {USER.levelTarget} pts para o próximo nível
              </p>
            </div>
            <BadgeColumn image={USER.nextLevelBadge} label={USER.nextLevel} />
          </div>
        </div>

        {/* menu list */}
        <div className="mt-7 space-y-3 px-4">
          {menu.map((item) => (
            <button
              key={item.label}
              type="button"
              onClick={item.onClick}
              className="flex w-full items-center gap-3.5 rounded-2xl bg-white px-4 py-4 text-left transition-transform active:scale-[0.99]"
            >
              <item.icon className="size-6 flex-shrink-0 text-brand-blue" />
              <span className="flex-1 text-[16px] font-semibold text-brand-navy">{item.label}</span>
              <ChevronRight className="size-4 text-brand-mute" />
            </button>
          ))}
        </div>

        <p className="px-6 pb-2 pt-6 text-[13px] text-white/80">
          entrou em <b className="text-white">{USER.joinDate}</b>
        </p>
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

function BadgeColumn({ image, label }: { image: string; label: string }) {
  return (
    <div className="flex w-[78px] flex-shrink-0 flex-col items-center text-center">
      <div className="relative size-[64px] overflow-hidden rounded-2xl bg-white p-1.5 shadow-sm">
        <div className="relative size-full">
          <Image src={image || "/placeholder.svg"} alt={label} fill className="object-contain" />
        </div>
      </div>
      <span className="mt-1.5 text-[11px] font-semibold leading-tight text-white text-balance">{label}</span>
    </div>
  )
}
