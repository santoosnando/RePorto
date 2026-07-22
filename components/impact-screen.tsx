"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import { ChevronLeft, Home as HomeIcon, Recycle, Leaf, Droplets, Zap, Package, Wind } from "lucide-react"
import { USER } from "@/lib/data"
import { EcoPhraseRotator } from "@/components/eco-phrase-rotator"

type Impact = {
  totalKg: number
  deliveries: number
  pointsEarned: number
  co2Kg: number
  materials: { label: string; kg: number; color: string }[]
}

const BASE_IMPACT: Impact = {
  totalKg: 68,
  deliveries: 24,
  pointsEarned: 4820,
  co2Kg: 41,
  materials: [
    { label: "Plástico", kg: 24, color: "#3b5fd8" },
    { label: "Vidro", kg: 17, color: "#1f9d3f" },
    { label: "Papel", kg: 15, color: "#f2a900" },
    { label: "Metal", kg: 12, color: "#5f6b85" },
  ],
}

function rand(min: number, max: number) {
  return Math.round(min + Math.random() * (max - min))
}

export function ImpactScreen({ onBack }: { onBack: () => void }) {
  // Random demo data generated after mount to avoid hydration mismatch.
  const [impact, setImpact] = useState<Impact>(BASE_IMPACT)

  useEffect(() => {
    const materials = [
      { label: "Plástico", kg: rand(18, 32), color: "#3b5fd8" },
      { label: "Vidro", kg: rand(10, 22), color: "#1f9d3f" },
      { label: "Papel", kg: rand(8, 20), color: "#f2a900" },
      { label: "Metal", kg: rand(6, 16), color: "#5f6b85" },
    ]
    const totalKg = materials.reduce((s, m) => s + m.kg, 0)
    setImpact({
      totalKg,
      deliveries: rand(15, 40),
      pointsEarned: rand(3200, 6800),
      co2Kg: Math.round(totalKg * 0.6),
      materials,
    })
  }, [])

  const maxKg = Math.max(...impact.materials.map((m) => m.kg))

  const phrases = [
    `Você evitou cerca de ${impact.co2Kg} kg de CO₂ — o mesmo que ${Math.round(impact.co2Kg / 2.5)} árvores absorvem em um dia.`,
    `Seus ${impact.totalKg} kg reciclados economizaram energia para abastecer uma casa por ${rand(4, 9)} dias.`,
    `Você poupou cerca de ${impact.totalKg * 13} litros de água ao reciclar em vez de descartar.`,
    `O plástico que você reciclou deixaria de poluir ${rand(2, 6)} mil litros de oceano.`,
    `Cada entrega sua tira resíduos de aterros e devolve matéria-prima ao ciclo produtivo.`,
  ]

  const stats = [
    { icon: Recycle, label: "Total reciclado", value: `${impact.totalKg} kg`, tone: "text-brand-blue" },
    { icon: Package, label: "Entregas", value: `${impact.deliveries}`, tone: "text-brand-emerald" },
    { icon: Zap, label: "Pontos gerados", value: impact.pointsEarned.toLocaleString("pt-BR"), tone: "text-[#f2a900]" },
    { icon: Wind, label: "CO₂ evitado", value: `${impact.co2Kg} kg`, tone: "text-brand-slate" },
  ]

  return (
    <div className="relative h-full w-full">
      <div className="h-full overflow-y-auto bg-gradient-to-b from-[#1a1f4d] via-[#2c4694] to-[#4d82e0] pb-[76px] [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        {/* header */}
        <div className="px-[18px] pb-4 pt-14">
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

        {/* stats grid */}
        <div className="px-4">
          <div className="grid grid-cols-2 gap-2.5">
            {stats.map((s) => (
              <div key={s.label} className="flex items-center gap-2.5 rounded-2xl bg-white px-3 py-3">
                <div className="flex size-9 flex-shrink-0 items-center justify-center rounded-full bg-brand-blue-soft">
                  <s.icon className={`size-[18px] ${s.tone}`} />
                </div>
                <div className="min-w-0">
                  <div className="truncate text-[16px] font-semibold text-brand-navy">{s.value}</div>
                  <div className="truncate text-[10.5px] text-brand-mute">{s.label}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* rotating sustainability phrase (replaces the old static tree line) */}
        <div className="px-4 pt-3">
          <div className="flex items-start gap-3 rounded-2xl bg-white/[0.1] px-4 py-3.5">
            <div className="flex size-9 flex-shrink-0 items-center justify-center rounded-full bg-brand-green/20">
              <Droplets className="size-[18px] text-brand-green" />
            </div>
            <EcoPhraseRotator phrases={phrases} className="min-h-[40px] text-[13px] leading-snug text-white" />
          </div>
        </div>

        {/* material breakdown */}
        <div className="px-4 pt-3">
          <div className="rounded-2xl bg-white p-4">
            <div className="text-[14px] font-semibold text-brand-navy">Reciclagem por material</div>
            <div className="mt-3.5 space-y-3">
              {impact.materials.map((m) => (
                <div key={m.label}>
                  <div className="flex items-center justify-between text-[12px]">
                    <span className="text-brand-slate">{m.label}</span>
                    <span className="font-semibold text-brand-navy">{m.kg} kg</span>
                  </div>
                  <div className="mt-1 h-2 overflow-hidden rounded-full bg-[#eef1fb]">
                    <div
                      className="h-full rounded-full"
                      style={{ width: `${Math.round((m.kg / maxKg) * 100)}%`, backgroundColor: m.color }}
                    />
                  </div>
                </div>
              ))}
            </div>
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
