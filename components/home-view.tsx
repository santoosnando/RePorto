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
  type LucideIcon,
} from "lucide-react"
import { partners, type FallbackIconKey } from "@/lib/data"

const fallbackIcons: Record<FallbackIconKey, LucideIcon> = { recycle: Recycle }

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

function PartnerLogo({
  logo,
  name,
  fallbackIcon,
  className,
}: {
  logo: string | null
  name: string
  fallbackIcon?: FallbackIconKey
  className?: string
}) {
  if (logo) {
    // Remote brand SVG from theSVG.org
    // eslint-disable-next-line @next/next/no-img-element
    return <img src={logo || "/placeholder.svg"} alt={`Logo ${name}`} className={className} />
  }
  const FallbackIcon = fallbackIcon ? fallbackIcons[fallbackIcon] : undefined
  if (FallbackIcon) return <FallbackIcon className={className} />
  return null
}

function ProfileScreen({ onOpenRewards }: { onOpenRewards: () => void }) {
  return (
    <div className="h-full w-full overflow-y-auto [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
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
              <Link
                key={i}
                href={`/loja/${b.slug}`}
                className="flex min-w-[74px] flex-col items-center gap-1.5 px-[22px]"
              >
                <div className="flex size-[46px] items-center justify-center rounded-full bg-brand-blue-soft">
                  <PartnerLogo
                    logo={b.logo}
                    name={b.name}
                    fallbackIcon={b.fallbackIcon}
                    className="size-6 object-contain text-brand-navy"
                  />
                </div>
                <span className="whitespace-nowrap text-[10.5px] text-brand-ink">{b.name}</span>
              </Link>
            ))}
          </div>
        </div>
      </div>

      <SponsorsFooter />
    </div>
  )
}

function SponsorsFooter() {
  return (
    <footer className="bg-white px-5 pb-6 pt-5">
      {/* Linha 1: Financiado por / Promovido por */}
      <div className="grid grid-cols-2 gap-4">
        <div className="flex flex-col items-center text-center">
          <span className="text-[9px] font-semibold tracking-wide text-brand-navy">FINANCIADO POR</span>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/logos/federal-ministry.png"
            alt="Federal Ministry for the Environment, Climate Action, Nature Conservation and Nuclear Safety"
            className="mt-2 h-9 w-auto object-contain"
          />
        </div>
        <div className="flex flex-col items-center text-center">
          <span className="text-[9px] font-semibold tracking-wide text-brand-navy">PROMOVIDO POR</span>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/logos/zug.jpg"
            alt="Zukunft Umwelt Gesellschaft (ZUG)"
            className="mt-2 h-8 w-auto object-contain"
          />
        </div>
      </div>

      {/* Linha 2: Implementado por */}
      <div className="mt-5 flex flex-col items-center text-center">
        <span className="text-[9px] font-semibold tracking-wide text-brand-navy">IMPLEMENTADO POR</span>
        <div className="mt-2 flex w-full items-center justify-center gap-3">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/logos/blackforest.png" alt="Blackforest Solutions" className="h-8 w-auto object-contain" />
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/logos/alta.png" alt="ALTA Geotecnia Ambiental" className="h-6 w-auto object-contain" />
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/logos/fraunhofer.jpg" alt="Fraunhofer ICT" className="h-5 w-auto object-contain" />
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/logos/seecon.png" alt="seecon" className="h-4 w-auto object-contain" />
        </div>
      </div>
    </footer>
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
    <div className="relative h-full w-full">
      <div className="h-full overflow-y-auto bg-[#4d82e0] pb-[76px] [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
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

        {/* partner shortcuts — horizontal scroll, tap to open the partner store */}
        <div className="bg-[#3b6fd8] px-0 pt-4">
          <div className="touch-pan-x overflow-x-auto overscroll-x-contain px-4 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            <div className="flex w-max gap-4 pb-1">
              {partners.map((p) => (
                <Link
                  key={p.slug}
                  href={`/loja/${p.slug}`}
                  className="flex w-[62px] flex-col items-center gap-1.5 transition-transform active:scale-95"
                >
                  <div className="flex size-14 items-center justify-center rounded-full bg-white shadow-sm">
                    <PartnerLogo
                      logo={p.logo}
                      name={p.name}
                      fallbackIcon={p.fallbackIcon}
                      className="size-8 object-contain text-brand-navy"
                    />
                  </div>
                  <span className="w-full truncate text-center text-[10px] text-white">{p.name}</span>
                </Link>
              ))}
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-b from-[#3b6fd8] to-[#4d82e0] px-4 pb-6 pt-4">
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
