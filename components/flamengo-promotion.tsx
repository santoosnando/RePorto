"use client"

import { useState } from "react"
import Image from "next/image"
import { Info, Trophy, X } from "lucide-react"

const ranking = [
  { position: 1, name: "Maria Usuário", points: "12.540 pts" },
  { position: 2, name: "Fernando Santos", points: "9.870 pts" },
  { position: 3, name: "Ana Oliveira", points: "8.420 pts" },
  { position: 4, name: "João Costa", points: "7.960 pts" },
  { position: 5, name: "Camila Souza", points: "7.310 pts" },
  { position: 6, name: "Lucas Almeida", points: "6.980 pts" },
]

export function FlamengoPromotion() {
  const [instructionsOpen, setInstructionsOpen] = useState(false)

  return (
    <section className="bg-white px-4 pb-24">
      <div className="overflow-hidden rounded-2xl border border-[#f1d4d4] bg-gradient-to-br from-[#fff7f7] to-white shadow-sm">
        <div className="flex items-center gap-3 bg-gradient-to-r from-[#a90816] to-[#d71920] px-4 py-3 text-white">
          <Image src="/loja/flamengo-logo.png" alt="Flamengo" width={44} height={44} className="rounded-lg bg-white object-contain p-1" />
          <div>
            <h2 className="text-[16px] font-bold">Flamengo x Chapecoense</h2>
            <p className="text-[12px] text-white/85">02 de dezembro · Maracanã</p>
          </div>
        </div>
        <div className="px-4 py-4">
          <div className="flex items-center justify-between gap-3">
            <div>
              <p className="text-[12px] font-semibold uppercase tracking-wide text-[#b20d1d]">Recompensa especial</p>
              <p className="mt-1 text-[13px] leading-snug text-brand-slate">Os 30 melhores colocados no ranking geral de entregas concorrem a um ingresso.</p>
            </div>
            <Image src="/loja/chapecoense-logo.png" alt="Chapecoense" width={48} height={48} className="object-contain" />
          </div>
          <button type="button" onClick={() => setInstructionsOpen(true)} className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl bg-[#f5e5e5] px-3 py-2.5 text-[13px] font-semibold text-[#a90816]">
            <Info className="size-4" /> Instruções da promoção
          </button>
        </div>
      </div>

      <div className="mt-5 flex items-center gap-2 text-brand-navy">
        <Trophy className="size-5 text-[#d49a15]" />
        <h2 className="text-[16px] font-bold">Ranking geral de entregas</h2>
      </div>
      <p className="mt-1 text-[11px] text-brand-mute">Os 30 primeiros recebem prioridade no resgate.</p>

      <ol className="mt-3 space-y-2">
        {ranking.map((person) => (
          <li key={person.position} className="flex items-center gap-3 rounded-xl border border-[#e8ebf3] bg-white px-3 py-3 shadow-sm">
            <span className={`flex size-8 items-center justify-center rounded-full text-[12px] font-bold ${person.position <= 3 ? "bg-[#fff1c7] text-[#b27700]" : "bg-brand-blue-soft text-brand-blue"}`}>
              {person.position}
            </span>
            <span className="flex-1 text-[13px] font-semibold text-brand-navy">{person.name}</span>
            <span className="text-[12px] font-bold text-brand-blue">{person.points}</span>
          </li>
        ))}
      </ol>
      <p className="mt-3 text-center text-[10px] text-brand-mute">Ranking atualizado após a validação de cada entrega.</p>

      {instructionsOpen && <InstructionsModal onClose={() => setInstructionsOpen(false)} />}
    </section>
  )
}

function InstructionsModal({ onClose }: { onClose: () => void }) {
  return (
    <div className="absolute inset-0 z-40 flex items-end bg-black/45 p-3" role="dialog" aria-modal="true" aria-label="Instruções da promoção">
      <div className="w-full rounded-3xl bg-white p-5 shadow-2xl">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-wide text-[#b20d1d]">Flamengo x Chapecoense</p>
            <h3 className="mt-1 text-[20px] font-bold text-brand-navy">Como participar</h3>
          </div>
          <button type="button" onClick={onClose} aria-label="Fechar instruções" className="rounded-full bg-[#f2f3f7] p-2 text-brand-slate"><X className="size-4" /></button>
        </div>
        <ol className="mt-5 space-y-3 text-[13px] leading-snug text-brand-slate">
          <li><b className="text-brand-navy">1.</b> Ao entregar seus resíduos no ponto de coleta, informe à equipe que deseja participar da promoção.</li>
          <li><b className="text-brand-navy">2.</b> Serão disponibilizados apenas 30 ingressos, destinados aos 30 melhores colocados do ranking geral.</li>
          <li><b className="text-brand-navy">3.</b> Se alguém desistir ou não resgatar o ingresso dentro do prazo, a oportunidade será oferecida ao próximo participante da lista.</li>
          <li><b className="text-brand-navy">4.</b> O ranking considera somente entregas validadas pela equipe do ponto de coleta.</li>
          <li><b className="text-brand-navy">5.</b> O ingresso é individual e dá acesso ao jogo Flamengo x Chapecoense, em 02 de dezembro, no Maracanã.</li>
          <li><b className="text-brand-navy">6.</b> A organização poderá solicitar documento de identificação e comunicará os contemplados pelos canais cadastrados.</li>
        </ol>
        <button type="button" onClick={onClose} className="mt-5 w-full rounded-xl bg-[#b20d1d] py-3 text-[13px] font-bold text-white">Entendi</button>
      </div>
    </div>
  )
}
