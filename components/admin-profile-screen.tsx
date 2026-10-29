"use client"

import { useState } from "react"
import Image from "next/image"
import { ArrowLeft, Pencil, Package, Users, Bell, Database, ShoppingBag, Target, Warehouse, ClipboardList, ChevronRight, Megaphone, Store as StoreIcon } from "lucide-react"
import { USER } from "@/lib/data"

const modules = [
  ["Dados de Coleta", Database],
  ["Relatório de processos", ClipboardList],
  ["Usuários e lojas", Users],
  ["Configurar alertas", Bell],
  ["Configurar economia", Database],
  ["Produtos", Package],
  ["Objetivos", Target],
  ["Estoque", Warehouse],
  ["Histórico de estoque", ClipboardList],
  ["Compras", ShoppingBag],
] as const

export function AdminProfileScreen({
  onBack,
  onSwitchUser,
  displayName,
  onNameChange,
  onOpenCampaigns,
  onOpenStores,
}: {
  onBack: () => void
  onSwitchUser: () => void
  displayName: string
  onNameChange: (name: string) => void
  onOpenCampaigns: () => void
  onOpenStores: () => void
}) {
  const [editing, setEditing] = useState(false)
  const [draftName, setDraftName] = useState(displayName)
  const adminModules = [
    ...modules.slice(0, 2),
    ["Campanhas", Megaphone, onOpenCampaigns] as const,
    ["Lojas", StoreIcon, onOpenStores] as const,
    ...modules.slice(2).map(([label, Icon]) => [label, Icon, undefined] as const),
  ]

  function saveName() {
    const nextName = draftName.trim()
    if (nextName) onNameChange(nextName)
    setEditing(false)
  }

  return (
    <div className="relative h-full w-full bg-[#29478f]">
      <div className="h-full overflow-y-auto pb-[76px] [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        <div className="rounded-b-[10px] bg-white px-5 pb-5 pt-3 text-center">
          <button type="button" onClick={onBack} aria-label="Voltar" className="mr-auto flex size-9 items-center justify-center rounded-full bg-brand-blue text-white">
            <ArrowLeft className="size-4" />
          </button>
          <div className="mx-auto mt-[-20px] relative size-20 overflow-hidden rounded-full border-4 border-brand-blue">
            <Image src={USER.avatar || "/placeholder.svg"} alt={displayName} fill className="object-cover" />
          </div>
          <h1 className="mt-4 text-[17px] font-bold text-brand-ink">{displayName}</h1>
          <p className="mt-1 text-[13px] italic text-brand-slate">Usuário ADM</p>
          {editing ? (
            <div className="mx-auto mt-4 flex max-w-[230px] gap-2">
              <input value={draftName} onChange={(event) => setDraftName(event.target.value)} className="min-w-0 flex-1 rounded-lg border border-[#d9dff0] px-3 py-2 text-[12px]" aria-label="Nome do perfil" />
              <button type="button" onClick={saveName} className="rounded-lg bg-brand-blue px-3 text-[12px] font-bold text-white">Salvar</button>
            </div>
          ) : (
            <button type="button" onClick={() => setEditing(true)} className="mt-4 inline-flex items-center gap-1.5 rounded-lg bg-brand-blue px-3 py-2 text-[12px] font-bold text-white">
              <Pencil className="size-3.5" /> Editar perfil
            </button>
          )}
        </div>

        <div className="space-y-2.5 px-3 pt-5">
          {adminModules.map(([label, Icon, action]) => (
            <button key={label} type="button" onClick={action} className="flex w-full items-center gap-3 rounded-xl bg-white px-4 py-3 text-left">
              <Icon className="size-5 text-[#4c82ff]" />
              <span className="flex-1 text-[12px] font-bold text-[#2d3263]">{label}</span>
              <ChevronRight className="size-4 text-[#a6adca]" />
            </button>
          ))}
        </div>
      </div>
      <div className="absolute inset-x-0 bottom-0 border-t border-[#d9dff0] bg-white px-4 py-2">
        <button type="button" onClick={onSwitchUser} className="flex w-full items-center justify-center rounded-xl bg-brand-blue py-2.5 text-[12px] font-bold text-white">Retornar ao perfil usuário</button>
      </div>
    </div>
  )
}
