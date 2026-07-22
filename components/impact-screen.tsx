"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import { ChevronLeft, Home as HomeIcon, Leaf, Target, CheckCircle2 } from "lucide-react"
import { USER } from "@/lib/data"
import { EcoPhraseRotator } from "@/components/eco-phrase-rotator"

type Tab = "mes" | "ranking" | "metas"

type ImpactData = {
  co2: number
  months: { label: string; value: number }[]
  ranking: { name: string; value: number; me?: boolean }[]
}

const MONTH_LABELS = ["Fev", "Mar", "Abr", "Mai", "Jun", "Jul"]

const BASE: ImpactData = {
  co2: 147,
  months: [
    { label: "Fev", value: 42 },
    { label: "Mar", value: 65 },
    { label: "Abr", value: 38 },
    { label: "Mai", value: 80 },
    { label: "Jun", value: 120 },
    { label: "Jul", value: 95 },
  ],
  ranking: [
    { name: "Maria Souza", value: 312 },
    { name: "Fernando Santos", value: 147, me: true },
    { name: "Ana Lima", value: 96 },
    { name: "Carlos Dias", value: 54 },
  ],
}

function rand(min: number, max: number) {
  return Math.round(min + Math.random() * (max - min))
}

const METAS = [
  { label: "Reciclar 200 kg no ano", current: 147, target: 200 },
  { label: "Fazer 30 entregas", current: 22, target: 30 },
  { label: "Alcançar Mobilizador do Bairro", current: 640, target: 1000 },
]

export function ImpactScreen({ onBack }: { onBack: () => void }) {
  const [tab, setTab] = useState<Tab>("mes")
  // Random demo data generated after mount to avoid hydration mismatch.
  const [data, setData] = useState<ImpactData>(BASE)

  useEffect(() => {
    const months = MONTH_LABELS.map((label) => ({ label, value: rand(30, 130) }))
    const co2 = Math.round(months.reduce((s, m) => s + m.value, 0) / months.length)
    setData({
      co2,
      months,
      ranking: [
        { name: "Maria Souza", value: rand(250, 360) },
        { name: "Fernando Santos", value: co2, me: true },
        { name: "Ana Lima", value: rand(60, 120) },
        { name: "Carlos Dias", value: rand(20, 60) },
      ].sort((a, b) => b.value - a.value),
    })
  }, [])

  const phrases = [
    `Você evitou cerca de ${data.co2} kg de CO₂ — o mesmo que ${Math.max(1, Math.round(data.co2 / 21))} árvores absorvem em um dia.`,
    `Seus resíduos reciclados economizaram energia para abastecer uma casa por ${rand(4, 9)} dias.`,
    `Você poupou cerca de ${data.co2 * 15} litros de água ao reciclar em vez de descartar.`,
    `O plástico que você reciclou deixaria de poluir milhares de litros de oceano.`,
    `Cada entrega sua devolve matéria-prima ao ciclo produtivo e reduz o aterro.`,
  ]

  return (
    <div className="relative h-full w-full">
      <div className="h-full overflow-y-auto bg-gradient-to-b from-[#1a1f4d] via-[#2c4694] to-[#4d82e0] pb-[76px] [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        {/* header */}
        <div className="px-[18px] pb-2 pt-14">
          <button type="button" onClick={onBack} className="flex items-center gap-3.5">
            <div className="flex size-9 flex-shrink-0 items-center justify-center rounded-full bg-brand-blue">
              <ChevronLeft className="size-[18px] text-white" />
            </div>
            <span className="text-[19px] font-medium tracking-wide text-white">Meu impacto</span>
          </button>

          <div className="mt-4 flex items-center gap-3">
            <div className="relative size-12 overflow-hidden rounded-full border-2 border-white/40">
              <Image src={USER.avatar || "/placeholder.svg"} alt={USER.name} fill className="object-cover" />
            </div>
            <div>
              <div className="text-[15px] font-medium text-white">{USER.name}</div>
              <div className="flex items-center gap-1.5 text-[11px] text-[#c3cbe6]">
                <Leaf className="size-3 text-brand-green" />
                {USER.level}
              </div>
            </div>
          </div>
        </div>

        {/* eco logo + headline */}
        <div className="flex flex-col items-center px-6 pt-3 text-center">
          <div className="relative size-24 overflow-hidden rounded-full bg-white p-3 shadow-sm">
            <div className="relative size-full">
              <Image src="/badges/eco-logo.png" alt="Impacto ambiental" fill className="object-contain" priority />
            </div>
          </div>
          <h2 className="mt-3 text-[17px] font-bold text-white">
            {data.co2} kg de CO₂e evitados
          </h2>
          <EcoPhraseRotator
            phrases={phrases}
            className="mt-2 min-h-[40px] text-[13px] leading-snug text-[#dbe2f4]"
          />
        </div>

        {/* tabs */}
        <div className="mt-4 flex justify-center gap-2.5 px-4">
          {(["mes", "ranking", "metas"] as Tab[]).map((t) => (
            <button
              key={t}
              type="button"
              onClick={() => setTab(t)}
              className={`rounded-full px-6 py-2 text-[13px] font-semibold capitalize transition-colors ${
                tab === t ? "bg-brand-blue text-white" : "bg-white/70 text-brand-navy"
              }`}
            >
              {t === "mes" ? "Mês" : t}
            </button>
          ))}
        </div>

        {/* tab content */}
        <div className="px-4 pt-4">
          {tab === "mes" && <MonthsChart months={data.months} />}
          {tab === "ranking" && <Ranking ranking={data.ranking} />}
          {tab === "metas" && <Metas />}
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

function MonthsChart({ months }: { months: { label: string; value: number }[] }) {
  const max = Math.max(...months.map((m) => m.value), 1)
  return (
    <div className="rounded-2xl bg-white p-4">
      <div className="text-[14px] font-semibold text-brand-navy">CO₂e evitado por mês (kg)</div>
      <div className="mt-4 flex items-end justify-between gap-2">
        {months.map((m) => (
          <div key={m.label} className="flex flex-1 flex-col items-center justify-end gap-1.5">
            <span className="text-[10px] font-semibold text-brand-slate">{m.value}</span>
            <div
              className="w-full rounded-t-md bg-brand-blue"
              style={{ height: `${Math.max(6, Math.round((m.value / max) * 120))}px` }}
            />
            <span className="text-[11px] font-medium text-brand-mute">{m.label}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

function Ranking({ ranking }: { ranking: { name: string; value: number; me?: boolean }[] }) {
  return (
    <ul className="space-y-2.5">
      {ranking.map((r, i) => (
        <li
          key={r.name}
          className={`flex items-center gap-3 rounded-2xl px-4 py-3 ${
            r.me ? "bg-brand-green/20 ring-1 ring-brand-green" : "bg-white"
          }`}
        >
          <span
            className={`flex size-7 flex-shrink-0 items-center justify-center rounded-full text-[13px] font-bold ${
              i === 0 ? "bg-[#f2a900] text-white" : "bg-brand-blue-soft text-brand-blue"
            }`}
          >
            {i + 1}
          </span>
          <span className={`flex-1 text-[14px] font-medium ${r.me ? "text-white" : "text-brand-navy"}`}>
            {r.name}
            {r.me && <span className="ml-1.5 text-[11px] text-brand-green">você</span>}
          </span>
          <span className={`text-[14px] font-bold ${r.me ? "text-brand-green" : "text-brand-blue"}`}>
            {r.value} kg
          </span>
        </li>
      ))}
    </ul>
  )
}

function Metas() {
  return (
    <ul className="space-y-3">
      {METAS.map((m) => {
        const pct = Math.min(100, Math.round((m.current / m.target) * 100))
        const done = pct >= 100
        return (
          <li key={m.label} className="rounded-2xl bg-white p-4">
            <div className="flex items-center gap-2.5">
              {done ? (
                <CheckCircle2 className="size-[18px] flex-shrink-0 text-brand-emerald" />
              ) : (
                <Target className="size-[18px] flex-shrink-0 text-brand-blue" />
              )}
              <span className="flex-1 text-[13px] font-semibold text-brand-navy">{m.label}</span>
              <span className="text-[12px] font-bold text-brand-blue">{pct}%</span>
            </div>
            <div className="mt-2.5 h-2 overflow-hidden rounded-full bg-[#eef1fb]">
              <div className="h-full rounded-full bg-brand-green" style={{ width: `${pct}%` }} />
            </div>
            <div className="mt-1.5 text-right text-[11px] text-brand-mute">
              {m.current} / {m.target}
            </div>
          </li>
        )
      })}
    </ul>
  )
}
