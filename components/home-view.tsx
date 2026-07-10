"use client"

import { useState } from "react"
import Link from "next/link"
import {
  Bell,
  User,
  Recycle,
  TicketPercent,
  Search,
  QrCode,
  ShoppingCart,
  ChevronRight,
  ChevronLeft,
  UtensilsCrossed,
  ShoppingBag,
  Heart,
  Home as HomeIcon,
  Star,
} from "lucide-react"
import { partners } from "@/lib/data"

type View = "home" | "rewards"

export function HomeView() {
  const [view, setView] = useState<View>("home")

  return (
    <div className="h-full w-full overflow-hidden">
      {view === "home" ? (
        <ProfileScreen onOpenRewards={() => setView("rewards")} />
      ) : (
        <RewardsScreen onBack={() => setView("home")} />
      )}
    </div>
  )
}

function ProfileScreen({ onOpenRewards }: { onOpenRewards: () => void }) {
  return (
    <div className="h-full w-full overflow-y-auto">
      {/* header */}
      <div className="flex items-center justify-between bg-white px-5 pt-[52px]">
        <span className="text-[19px] font-medium text-brand-navy">Meu perfil</span>
        <div className="flex gap-2">
          <div className="flex size-9 items-center justify-center rounded-full bg-brand-blue">
            <Bell className="size-[17px] text-white" />
          </div>
          <div className="flex size-9 items-center justify-center rounded-full bg-brand-blue">
            <User className="size-[17px] text-white" />
          </div>
        </div>
      </div>

      {/* balance card */}
      <div className="bg-white px-4 pb-5 pt-3.5">
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-[#1a2f6b] to-[#2c4694] px-[18px] py-4 text-white">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-white/15 px-2.5 py-1 text-[11px]">
            <span className="inline-block size-1.5 rounded-full bg-brand-green" />
            Vizinho consciente
          </span>
          <div className="mt-2.5 text-[18px] font-medium">Fernando Santos</div>
          <div className="mt-3 text-[10px] tracking-wide text-[#b9c3e6]">SALDO DISPONÍVEL</div>
          <div className="mt-0.5 text-[26px] font-medium text-brand-green">
            0 <span className="text-[13px]">pts</span>
          </div>
          <div className="absolute right-4 top-3.5 flex size-[66px] items-center justify-center rounded-full border-[3px] border-[#4a7fd6] bg-brand-navy-deep">
            <Recycle className="size-6 text-white" />
          </div>
          <div className="mt-4 flex justify-between border-t border-white/15 pt-2.5 text-[11px] text-[#d7deee]">
            <span>
              Faltam <b className="text-brand-green">1000 pts</b> para Mobilizador do bairro
            </span>
            <span>0%</span>
          </div>
          <div className="mt-1.5 h-[5px] rounded-full bg-white/15" />
        </div>

        <div className="mt-4 flex gap-2.5">
          <div className="flex size-11 flex-shrink-0 items-center justify-center rounded-full border border-[#cfd8f0]">
            <TicketPercent className="size-[19px] text-brand-blue" />
          </div>
          <div className="flex flex-1 items-center justify-center rounded-[22px] bg-gradient-to-r from-brand-blue to-brand-blue-light text-sm font-medium text-white">
            Carteira de cupons
          </div>
        </div>
      </div>

      {/* actions */}
      <div className="bg-gradient-to-b from-[#1a2f6b] to-brand-blue px-4 pb-6 pt-[18px]">
        <div className="rounded-[14px] bg-white p-[13px] text-center text-sm font-medium text-brand-navy">
          Sobre o projeto
        </div>
        <div className="mt-3 flex items-center gap-2 rounded-[14px] bg-white px-3.5 py-[11px] text-brand-mute">
          <Search className="size-4" />
          <span className="text-[13px]">O que você procura?</span>
        </div>
        <div className="mt-3.5 flex items-center gap-3.5 rounded-[14px] bg-white/[0.08] p-3.5">
          <div className="flex size-11 items-center justify-center rounded-lg bg-white">
            <QrCode className="size-6 text-brand-navy" />
          </div>
          <span className="text-[13px] font-medium tracking-wide text-white">Cadastrar entrega</span>
        </div>
        <button
          type="button"
          onClick={onOpenRewards}
          className="mt-3 flex w-full items-start gap-3.5 rounded-[14px] bg-white/[0.08] p-3.5 text-left transition-colors hover:bg-white/15"
        >
          <div className="flex size-11 flex-shrink-0 items-center justify-center rounded-lg bg-white">
            <ShoppingCart className="size-[22px] text-brand-navy" />
          </div>
          <div className="flex-1">
            <div className="text-[13px] font-medium text-white">Recompensas</div>
            <div className="mt-0.5 text-[11px] leading-snug text-[#c3cbe6]">
              Troque seus pontos por produtos e benefícios
            </div>
          </div>
          <ChevronRight className="mt-1 size-4 text-[#c3cbe6]" />
        </button>
      </div>

      {/* partners */}
      <div className="bg-white px-0 pb-9 pt-4 text-center">
        <div className="mb-2.5 text-[11px] tracking-wide text-brand-mute">PARCEIROS</div>
        <div className="overflow-x-auto [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          <div className="flex w-max animate-[scrollx_22s_linear_infinite]">
            {[...partners, ...partners].map((b, i) => (
              <div key={i} className="flex min-w-[74px] flex-col items-center gap-1.5 px-[22px]">
                <div className="flex size-[46px] items-center justify-center rounded-full bg-brand-blue-soft">
                  <b.icon className="size-5 text-brand-navy" />
                </div>
                <span className="whitespace-nowrap text-[10.5px] text-brand-ink">{b.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

function RewardsScreen({ onBack }: { onBack: () => void }) {
  const categories = [
    { label: "Alimentação e bebidas", icon: UtensilsCrossed, href: null },
    { label: "Mercado", icon: ShoppingBag, href: null },
    { label: "Moda e beleza", icon: Heart, href: null },
    { label: "Produtos reciclados", icon: Recycle, href: "/loja/reverse-lab" },
    { label: "Pet", icon: HomeIcon, href: null },
    { label: "Serviços", icon: Star, href: null },
  ] as const

  return (
    <div className="h-full w-full overflow-y-auto">
      <div className="bg-gradient-to-b from-[#1a1f4d] via-[#2c4694] to-[#3b6fd8] px-[18px] pb-5 pt-14">
        <button type="button" onClick={onBack} className="flex items-center gap-3.5">
          <div className="flex size-9 flex-shrink-0 items-center justify-center rounded-full bg-brand-blue">
            <ChevronLeft className="size-[18px] text-white" />
          </div>
          <span className="text-[19px] font-medium tracking-wide text-white">Recompensas</span>
        </button>
        <div className="mt-4 flex items-center gap-2.5">
          <div className="flex flex-1 items-center gap-2 rounded-[22px] bg-white px-4 py-[11px] text-brand-mute">
            <Search className="size-4" />
            <span className="text-[13px]">O que procura?</span>
          </div>
          <div className="relative flex size-11 flex-shrink-0 items-center justify-center rounded-full bg-white">
            <ShoppingCart className="size-[19px] text-brand-blue" />
            <span className="absolute -right-1 -top-1 flex size-4 items-center justify-center rounded-full bg-brand-blue text-[9px] text-white">
              1
            </span>
          </div>
        </div>
      </div>

      <div className="bg-gradient-to-b from-[#2c4694] via-[#3b6fd8] to-[#4d82e0] px-4 pb-6 pt-[18px]">
        <div className="grid grid-cols-2 gap-3.5">
          {categories.map((c) => {
            const inner = (
              <>
                <c.icon className="size-[46px] text-brand-blue" />
                <div className="mt-3 text-[13px] font-medium leading-tight text-brand-navy">{c.label}</div>
              </>
            )
            const cls =
              "flex flex-col items-center rounded-2xl bg-white px-2.5 pb-4 pt-6 text-center transition-transform active:scale-95"
            return c.href ? (
              <Link key={c.label} href={c.href} className={cls}>
                {inner}
              </Link>
            ) : (
              <div key={c.label} className={cls}>
                {inner}
              </div>
            )
          })}
        </div>
      </div>

      <div className="flex justify-center bg-white pb-9 pt-3.5">
        <button
          type="button"
          onClick={onBack}
          className="flex size-[52px] items-center justify-center rounded-full border-4 border-[#d7e0f5] bg-brand-blue"
          aria-label="Início"
        >
          <HomeIcon className="size-[22px] text-white" />
        </button>
      </div>
    </div>
  )
}
