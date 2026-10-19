"use client"

import { useState } from "react"
import Image from "next/image"
import { Info, Trophy, X } from "lucide-react"

const ranking = [
  ["Maria Usuário", "12.540 pts"], ["Fernando Santos", "9.870 pts"], ["Ana Oliveira", "8.420 pts"],
  ["João Costa", "7.960 pts"], ["Camila Souza", "7.310 pts"], ["Lucas Almeida", "6.980 pts"],
  ["Beatriz Lima", "6.740 pts"], ["Rafael Martins", "6.520 pts"], ["Juliana Alves", "6.280 pts"],
  ["Gustavo Rocha", "6.110 pts"], ["Mariana Castro", "5.980 pts"], ["Pedro Henrique", "5.840 pts"],
  ["Larissa Mendes", "5.710 pts"], ["Bruno Ferreira", "5.580 pts"], ["Clara Nunes", "5.420 pts"],
  ["Diego Ribeiro", "5.290 pts"], ["Isabela Martins", "5.160 pts"], ["Thiago Souza", "5.040 pts"],
  ["Amanda Costa", "4.920 pts"], ["Felipe Santos", "4.800 pts"], ["Nathalia Lima", "4.690 pts"],
  ["Rodrigo Alves", "4.570 pts"], ["Carolina Rocha", "4.460 pts"], ["Vitor Castro", "4.350 pts"],
  ["Sofia Mendes", "4.240 pts"], ["André Nunes", "4.130 pts"], ["Luana Ribeiro", "4.020 pts"],
  ["Marcelo Dias", "3.910 pts"], ["Evelyn Martins", "3.800 pts"], ["Caio Oliveira", "3.690 pts"],
].map(([name, points], index) => ({ position: index + 1, name, points }))

export function FlamengoPromotion() {
  const [instructionsOpen, setInstructionsOpen] = useState(false)

  return (
    <section className="bg-white px-4 pb-24">
      <div className="overflow-hidden rounded-2xl border border-[#f1d4d4] bg-gradient-to-br from-[#fff7f7] to-white shadow-sm">
        <div className="bg-gradient-to-r from-[#a90816] to-[#d71920] px-4 py-4 text-white">
          <div className="flex items-center justify-center gap-3">
            <Image src="/loja/flamengo-logo.png" alt="Flamengo" width={54} height={54} className="size-14 rounded-xl bg-white object-contain p-1" />
            <span className="text-xl font-black text-white/90">×</span>
            <Image src="/loja/chapecoense-logo.png" alt="Chapecoense" width={54} height={54} className="size-14 rounded-xl bg-white object-contain p-1" />
          </div>
          <div className="mt-3 text-center">
            <h2 className="text-[17px] font-bold">Flamengo x Chapecoense</h2>
            <p className="mt-0.5 text-[12px] text-white/85">02 de dezembro · Maracanã</p>
          </div>
        </div>
        <div className="px-4 py-3.5">
          <p className="text-center text-[11px] font-semibold uppercase tracking-wide text-[#b20d1d]">Recompensa especial</p>
          <p className="mt-1 text-center text-[13px] leading-snug text-brand-slate">Os 30 melhores colocados no ranking geral de entregas recebem um ingresso para a partida.</p>
          <button type="button" onClick={() => setInstructionsOpen(true)} className="mt-3 flex w-full items-center justify-center gap-2 rounded-xl bg-[#f5e5e5] px-3 py-2.5 text-[13px] font-semibold text-[#a90816]">
            <Info className="size-4" /> Instruções da promoção
          </button>
        </div>
      </div>

      <div className="mt-4 flex items-center gap-2 text-brand-navy">
        <Trophy className="size-5 text-[#d49a15]" />
        <h2 className="text-[16px] font-bold">Ranking geral de entregas</h2>
      </div>
      <p className="mt-1 text-[11px] text-brand-mute">30 posições · atualizado após a validação de cada entrega</p>

      <ol className="mt-3 divide-y divide-[#edf0f5] overflow-hidden rounded-xl border border-[#e8ebf3] bg-white">
        {ranking.map((person) => (
          <li key={person.position} className="flex min-h-10 items-center gap-2.5 px-3 py-1.5">
            <span className={`flex size-6 shrink-0 items-center justify-center rounded-full text-[10px] font-bold ${person.position <= 3 ? "bg-[#fff1c7] text-[#b27700]" : "bg-brand-blue-soft text-brand-blue"}`}>
              {person.position}
            </span>
            <span className="min-w-0 flex-1 truncate text-[12px] font-semibold text-brand-navy">{person.name}</span>
            <span className="shrink-0 text-[11px] font-bold text-brand-blue">{person.points}</span>
          </li>
        ))}
      </ol>
      <p className="mt-3 text-center text-[10px] text-brand-mute">Em caso de empate, terá prioridade quem atingir a pontuação primeiro.</p>

      {instructionsOpen && <InstructionsModal onClose={() => setInstructionsOpen(false)} />}
    </section>
  )
}

function InstructionsModal({ onClose }: { onClose: () => void }) {
  return (
    <div className="absolute inset-0 z-40 flex items-end bg-black/45 p-3" role="dialog" aria-modal="true" aria-label="Instruções da promoção">
      <div className="w-full rounded-3xl bg-white p-5 shadow-2xl">
        <div className="flex items-start justify-between gap-4">
          <div><p className="text-[11px] font-semibold uppercase tracking-wide text-[#b20d1d]">Flamengo x Chapecoense</p><h3 className="mt-1 text-[20px] font-bold text-brand-navy">Como participar</h3></div>
          <button type="button" onClick={onClose} aria-label="Fechar instruções" className="rounded-full bg-[#f2f3f7] p-2 text-brand-slate"><X className="size-4" /></button>
        </div>
        <ol className="mt-5 space-y-3 text-[13px] leading-snug text-brand-slate">
          <li><b className="text-brand-navy">1.</b> Ao entregar seus resíduos no ponto de coleta, informe à equipe que deseja participar da promoção.</li>
          <li><b className="text-brand-navy">2.</b> Apenas 30 ingressos serão disponibilizados, destinados aos 30 participantes mais bem colocados no ranking geral.</li>
          <li><b className="text-brand-navy">3.</b> Somente entregas registradas e validadas pela equipe do ponto de coleta entram na pontuação.</li>
          <li><b className="text-brand-navy">4.</b> Em caso de empate, terá prioridade quem alcançar a pontuação primeiro.</li>
          <li><b className="text-brand-navy">5.</b> Se um contemplado desistir ou não resgatar o ingresso no prazo informado, a oportunidade passará ao próximo participante elegível.</li>
          <li><b className="text-brand-navy">6.</b> O ingresso é individual e dá acesso ao jogo Flamengo x Chapecoense, em 02 de dezembro, no Maracanã.</li>
          <li><b className="text-brand-navy">7.</b> A organização poderá solicitar documento de identificação e comunicará os contemplados pelos canais cadastrados.</li>
        </ol>
        <button type="button" onClick={onClose} className="mt-5 w-full rounded-xl bg-[#b20d1d] py-3 text-[13px] font-bold text-white">Entendi</button>
      </div>
    </div>
  )
}
