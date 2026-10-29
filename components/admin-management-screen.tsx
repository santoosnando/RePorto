"use client"

import { useState } from "react"
import { ArrowLeft, Pencil, Eye, Trash2, Plus, Store as StoreIcon, Megaphone, X } from "lucide-react"

type Campaign = { id: string; name: string; period: string; beneficiaries: string; category: string; cardImage: string; modalColor: string }
type ManagedProduct = { name: string; description: string; price: string; code: string; stock: string; minMare: string; minManguinhos: string; minZ10: string; availableMare: boolean; availableManguinhos: boolean; availableZ10: boolean; active: boolean; promotion: boolean }

const initialCampaign: Campaign = { id: "flamengo", name: "Flamengo x Chapecoense", period: "02 de dezembro · Maracanã", beneficiaries: "30", category: "Lazer", cardImage: "/loja/flamengo-logo.png", modalColor: "#b20d1d" }
const initialProducts: ManagedProduct[] = [
  { name: "Abridor", description: "Abridor reutilizado", price: "120 pts", code: "ABR-001", stock: "12", minMare: "3", minManguinhos: "3", minZ10: "3", availableMare: true, availableManguinhos: true, availableZ10: false, active: true, promotion: false },
  { name: "Mosquetão", description: "Mosquetão reciclado", price: "180 pts", code: "MOS-002", stock: "9", minMare: "2", minManguinhos: "2", minZ10: "2", availableMare: true, availableManguinhos: false, availableZ10: true, active: true, promotion: false },
  { name: "Pente", description: "Pente produzido com plástico reciclado", price: "150 pts", code: "PEN-003", stock: "15", minMare: "3", minManguinhos: "3", minZ10: "3", availableMare: true, availableManguinhos: true, availableZ10: true, active: true, promotion: false },
]

export function AdminManagementScreen({ type, onBack }: { type: "campaigns" | "stores"; onBack: () => void }) {
  const [campaigns, setCampaigns] = useState<Campaign[]>([initialCampaign])
  const [editingCampaign, setEditingCampaign] = useState<Campaign | null>(null)
  const [showCampaignForm, setShowCampaignForm] = useState(false)
  const [viewingCampaign, setViewingCampaign] = useState<Campaign | null>(null)
  const [storeEditing, setStoreEditing] = useState(false)
  const [storeName, setStoreName] = useState("Reverse Lab")
  const [storeDescription, setStoreDescription] = useState("Produtos reciclados feitos à mão a partir de resíduos coletados")
  const [products, setProducts] = useState(initialProducts)
  const [newProduct, setNewProduct] = useState({ name: "", price: "", stock: "" })
  const [showProductForm, setShowProductForm] = useState(false)
  const [showNewStoreForm, setShowNewStoreForm] = useState(false)

  function saveCampaign(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const form = new FormData(event.currentTarget)
    const next: Campaign = {
      id: editingCampaign?.id ?? `campaign-${Date.now()}`,
      name: String(form.get("name") || "Nova campanha"),
      period: `${String(form.get("periodFrom") || "")} - ${String(form.get("periodTo") || "")}`,
      beneficiaries: String(form.get("beneficiaries") || "0"),
      category: String(form.get("category") || ""),
      cardImage: String(form.get("cardImage") || "/placeholder.svg"),
      modalColor: String(form.get("modalColor") || "#4169e1"),
    }
    setCampaigns((current) => editingCampaign ? current.map((item) => item.id === editingCampaign.id ? next : item) : [...current, next])
    setEditingCampaign(null)
    setShowCampaignForm(false)
  }

  function addProduct(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (!newProduct.name.trim()) return
    setProducts((current) => [...current, { name: newProduct.name, description: "", price: newProduct.price, code: "", stock: newProduct.stock, minMare: "0", minManguinhos: "0", minZ10: "0", availableMare: false, availableManguinhos: false, availableZ10: false, active: true, promotion: false }])
    setNewProduct({ name: "", price: "", stock: "" })
  }

  return (
    <div className="h-full w-full overflow-y-auto bg-[#29478f] pb-5 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
      <header className="flex items-center gap-3 bg-white px-4 py-4">
        <button type="button" onClick={onBack} aria-label="Voltar" className="flex size-9 items-center justify-center rounded-full bg-brand-blue text-white"><ArrowLeft className="size-4" /></button>
        <div><p className="text-[10px] font-semibold uppercase tracking-wide text-brand-blue">Administração</p><h1 className="text-[18px] font-bold text-brand-navy">{type === "campaigns" ? "Campanhas" : "Lojas"}</h1></div>
      </header>

      {type === "campaigns" ? (
        <main className="space-y-3 px-3 py-4">
          {campaigns.map((campaign) => (
            <article key={campaign.id} className="rounded-2xl bg-white p-4">
              <div className="flex items-start gap-3"><img src={campaign.cardImage} alt="" className="size-14 rounded-xl object-contain" /><div className="min-w-0 flex-1"><h2 className="text-[14px] font-bold text-brand-navy">{campaign.name}</h2><p className="mt-1 text-[11px] text-brand-slate">{campaign.period} · {campaign.beneficiaries} beneficiados · {campaign.category}</p></div></div>
              {viewingCampaign?.id === campaign.id ? (
                <div className="mt-3 rounded-xl bg-[#f8f9fd] p-3"><CampaignPreview campaign={campaign} /><button type="button" onClick={() => setViewingCampaign(null)} className="mt-3 w-full rounded-lg bg-brand-blue py-2 text-[11px] font-bold text-white">Fechar pré-visualização</button></div>
              ) : showCampaignForm && editingCampaign?.id === campaign.id ? (
                <div className="mt-3"><CampaignForm campaign={campaign} onSave={saveCampaign} onClose={() => { setShowCampaignForm(false); setEditingCampaign(null) }} /></div>
              ) : (
                <div className="mt-3 flex gap-2"><button type="button" onClick={() => setViewingCampaign(campaign)} className="flex flex-1 items-center justify-center gap-1 rounded-lg bg-[#eef2ff] py-2 text-[11px] font-bold text-brand-blue"><Eye className="size-3.5" /> Ver</button><button type="button" onClick={() => { setEditingCampaign(campaign); setShowCampaignForm(true); setViewingCampaign(null) }} className="flex flex-1 items-center justify-center gap-1 rounded-lg bg-[#eef2ff] py-2 text-[11px] font-bold text-brand-blue"><Pencil className="size-3.5" /> Editar</button><button type="button" onClick={() => setCampaigns((current) => current.filter((item) => item.id !== campaign.id))} className="flex items-center justify-center rounded-lg bg-[#fff0f0] px-3 text-[#b20d1d]" aria-label={`Excluir ${campaign.name}`}><Trash2 className="size-3.5" /></button></div>
              )}
            </article>
          ))}
          {showCampaignForm ? <CampaignForm campaign={editingCampaign} onSave={saveCampaign} onClose={() => { setShowCampaignForm(false); setEditingCampaign(null) }} /> : <button type="button" onClick={() => setShowCampaignForm(true)} className="flex w-full items-center justify-center gap-2 rounded-2xl border-2 border-dashed border-white/60 bg-white/10 py-5 text-[13px] font-bold text-white"><Plus className="size-4" /> Adicionar nova campanha</button>}
        </main>
      ) : (
        <main className="space-y-3 px-3 py-4">
          <article className="rounded-2xl bg-white p-4"><div className="flex items-start gap-3"><div className="flex size-14 items-center justify-center rounded-xl bg-[#eef2ff]"><StoreIcon className="size-7 text-brand-blue" /></div><div className="flex-1"><h2 className="text-[14px] font-bold text-brand-navy">{storeName}</h2><p className="mt-1 text-[11px] text-brand-slate">{storeDescription}</p></div></div><div className="mt-3 flex gap-2"><button type="button" onClick={() => setStoreEditing(!storeEditing)} className="flex flex-1 items-center justify-center gap-1 rounded-lg bg-[#eef2ff] py-2 text-[11px] font-bold text-brand-blue"><Pencil className="size-3.5" /> Editar</button><button type="button" className="flex flex-1 items-center justify-center gap-1 rounded-lg bg-[#eef2ff] py-2 text-[11px] font-bold text-brand-blue"><Eye className="size-3.5" /> Ver</button><button type="button" className="flex items-center justify-center rounded-lg bg-[#fff0f0] px-3 text-[#b20d1d]" aria-label="Excluir Reverse Lab"><Trash2 className="size-3.5" /></button></div></article>
          {!showNewStoreForm && <button type="button" onClick={() => setShowNewStoreForm(true)} className="flex w-full items-center justify-center gap-2 rounded-2xl border-2 border-dashed border-white/60 bg-white/10 py-5 text-[13px] font-bold text-white"><Plus className="size-4" /> Adicionar nova loja</button>}
          {showNewStoreForm && <NewStoreForm onClose={() => setShowNewStoreForm(false)} onSave={() => setShowNewStoreForm(false)} />}
          {storeEditing && <section className="rounded-2xl bg-white p-4"><h2 className="text-[14px] font-bold text-brand-navy">Configurar Reverse Lab</h2><div className="mt-3 grid grid-cols-2 gap-2"><label className="text-[11px] font-semibold text-brand-slate">Foto de capa<input type="file" accept="image/*" className="mt-1 w-full text-[10px]" /></label><label className="text-[11px] font-semibold text-brand-slate">Foto de perfil<input type="file" accept="image/*" className="mt-1 w-full text-[10px]" /></label></div><label className="mt-3 block text-[11px] font-semibold text-brand-slate">Nome<input value={storeName} onChange={(event) => setStoreName(event.target.value)} className="mt-1 w-full rounded-lg border px-3 py-2 text-[12px] font-normal" /></label><label className="mt-3 block text-[11px] font-semibold text-brand-slate">Descrição<textarea value={storeDescription} onChange={(event) => setStoreDescription(event.target.value)} className="mt-1 min-h-16 w-full rounded-lg border px-3 py-2 text-[12px] font-normal" /></label><div className="mt-4 flex items-center justify-between"><h3 className="text-[12px] font-bold text-brand-navy">Produtos</h3><button type="button" onClick={() => setShowProductForm(!showProductForm)} className="flex items-center gap-1 rounded-lg bg-brand-blue px-2.5 py-1.5 text-[10px] font-bold text-white"><Plus className="size-3" /> Adicionar produto</button></div>{showProductForm && <ProductForm onSave={(product) => { setProducts((current) => [...current, product]); setShowProductForm(false) }} onClose={() => setShowProductForm(false)} />}<div className="mt-2 space-y-2">{products.map((product) => <div key={product.name} className="flex items-center justify-between rounded-lg bg-[#f6f7fb] px-3 py-2 text-[11px]"><span className="font-semibold text-brand-navy">{product.name}</span><span className="text-brand-slate">{product.price} · estoque {product.stock}</span></div>)}</div><form onSubmit={addProduct} className="mt-3 grid grid-cols-3 gap-2"><input placeholder="Produto" value={newProduct.name} onChange={(event) => setNewProduct({ ...newProduct, name: event.target.value })} className="rounded-lg border px-2 py-2 text-[11px]" /><input placeholder="Pontos" value={newProduct.price} onChange={(event) => setNewProduct({ ...newProduct, price: event.target.value })} className="rounded-lg border px-2 py-2 text-[11px]" /><input placeholder="Estoque" value={newProduct.stock} onChange={(event) => setNewProduct({ ...newProduct, stock: event.target.value })} className="rounded-lg border px-2 py-2 text-[11px]" /><button type="submit" className="col-span-3 rounded-lg bg-brand-blue py-2 text-[11px] font-bold text-white">Adicionar produto</button></form></section>}
        </main>
      )}
    </div>
  )
}

function CampaignPreview({ campaign }: { campaign: Campaign }) {
  return <div className="overflow-hidden rounded-xl border border-[#f1d4d4] bg-white shadow-sm"><div className="flex items-center gap-3 bg-gradient-to-r from-[#8f0a17] to-[#d71920] px-3 py-3 text-white"><img src={campaign.cardImage} alt="" className="size-12 rounded-lg bg-white object-contain p-1" /><div className="min-w-0"><p className="text-[9px] font-semibold uppercase tracking-wide text-white/75">Recompensa especial</p><h3 className="truncate text-[13px] font-bold">{campaign.name}</h3><p className="text-[10px] text-white/85">{campaign.period}</p></div></div><div className="px-3 py-3"><p className="text-center text-[11px] leading-snug text-brand-slate">Os {campaign.beneficiaries} melhores colocados no ranking geral de entregas recebem um ingresso para a partida.</p><span className="mt-2 block text-center text-[10px] font-bold text-[#a90816]">Categoria: {campaign.category}</span></div></div>
}

function ProductForm({ onSave, onClose }: { onSave: (product: ManagedProduct) => void; onClose: () => void }) {
  const [availability, setAvailability] = useState({ mare: false, manguinhos: false, z10: false, active: true, promotion: false })
  function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const data = new FormData(event.currentTarget)
    onSave({ name: String(data.get("name") || ""), description: String(data.get("description") || ""), price: `${data.get("price") || 0} pts`, code: String(data.get("code") || ""), stock: String(data.get("stock") || "0"), minMare: String(data.get("minMare") || "0"), minManguinhos: String(data.get("minManguinhos") || "0"), minZ10: String(data.get("minZ10") || "0"), availableMare: availability.mare, availableManguinhos: availability.manguinhos, availableZ10: availability.z10, active: availability.active, promotion: availability.promotion })
  }
  const toggle = (key: keyof typeof availability) => setAvailability((current) => ({ ...current, [key]: !current[key] }))
  return <form onSubmit={submit} className="mt-3 rounded-xl border border-[#dce3f2] bg-[#f8f9fd] p-3"><div className="grid grid-cols-2 gap-2">{[["name", "Nome do produto"], ["price", "Valor em pontos"], ["code", "Código do produto"], ["stock", "Estoque atual"], ["minMare", "Estoque mínimo · Maré"], ["minManguinhos", "Estoque mínimo · Manguinhos"], ["minZ10", "Estoque mínimo · Z10"]].map(([name, label]) => <label key={name} className="text-[10px] font-semibold text-brand-navy">{label}<input name={name} required={name === "name"} type={name === "price" || name.startsWith("min") || name === "stock" ? "number" : "text"} className="mt-1 w-full rounded-lg border border-[#cbd5e1] bg-white px-2 py-2 text-[11px] text-brand-navy" /></label>)}</div><label className="mt-2 block text-[10px] font-semibold text-brand-navy">Descrição<textarea name="description" className="mt-1 min-h-14 w-full rounded-lg border border-[#cbd5e1] bg-white px-2 py-2 text-[11px] text-brand-navy" /></label><div className="mt-3 grid grid-cols-2 gap-2">{[["mare", "Disponível no posto Maré?"], ["manguinhos", "Disponível no posto Manguinhos?"], ["z10", "Disponível no posto Z10?"], ["active", "Ativo?"], ["promotion", "Em promoção?"]].map(([key, label]) => <label key={key} className="flex items-center justify-between rounded-lg bg-white px-2.5 py-2 text-[10px] font-semibold text-brand-navy">{label}<input type="checkbox" checked={availability[key as keyof typeof availability]} onChange={() => toggle(key as keyof typeof availability)} className="size-4 accent-brand-blue" /></label>)}</div><div className="mt-3 flex gap-2"><button type="button" onClick={onClose} className="flex-1 rounded-lg border border-[#cbd5e1] py-2 text-[11px] font-bold text-brand-slate">Cancelar</button><button type="submit" className="flex-1 rounded-lg bg-brand-blue py-2 text-[11px] font-bold text-white">Salvar</button></div></form>
}

function NewStoreForm({ onClose, onSave }: { onClose: () => void; onSave: () => void }) {
  return <form onSubmit={(event) => { event.preventDefault(); onSave() }} className="rounded-2xl bg-white p-4"><h2 className="text-[14px] font-bold text-brand-navy">Nova loja</h2><div className="mt-3 space-y-2"><input required placeholder="Nome da loja" className="w-full rounded-lg border px-3 py-2 text-[12px]" /><textarea placeholder="Descrição" className="min-h-20 w-full rounded-lg border px-3 py-2 text-[12px]" /><div className="grid grid-cols-2 gap-2"><label className="text-[10px] font-semibold text-brand-slate">Foto de capa<input type="file" accept="image/*" className="mt-1 w-full text-[10px]" /></label><label className="text-[10px] font-semibold text-brand-slate">Foto de perfil<input type="file" accept="image/*" className="mt-1 w-full text-[10px]" /></label></div></div><div className="mt-3 flex gap-2"><button type="button" onClick={onClose} className="flex-1 rounded-lg border py-2 text-[11px] font-bold text-brand-slate">Cancelar</button><button type="submit" className="flex-1 rounded-lg bg-brand-blue py-2 text-[11px] font-bold text-white">Salvar loja</button></div></form>
}

function CampaignForm({ campaign, onSave, onClose }: { campaign: Campaign | null; onSave: (event: React.FormEvent<HTMLFormElement>) => void; onClose: () => void }) {
  const [periodFrom = "", periodTo = ""] = campaign?.period.split(" - ") ?? []
  const fields = [
    ["name", "Nome da campanha", campaign?.name ?? ""],
    ["beneficiaries", "Quantidade de beneficiados", campaign?.beneficiaries ?? ""],
    ["cardImage", "Imagem do card", campaign?.cardImage ?? ""],
  ]

  return (
    <form onSubmit={onSave} className="rounded-2xl bg-white p-4 text-brand-navy shadow-sm">
      <div className="flex items-center justify-between">
        <h2 className="text-[14px] font-bold">{campaign ? "Editar campanha" : "Nova campanha"}</h2>
        <button type="button" onClick={onClose} aria-label="Fechar" className="rounded-full p-1 text-brand-slate hover:bg-[#f2f4fa]"><X className="size-4" /></button>
      </div>
      <div className="mt-4 space-y-3">
        {fields.map(([name, label, value]) => (
          <label key={name} className="block text-[11px] font-semibold text-brand-navy">
            {label}
            <input
              name={name}
              defaultValue={value}
              type={name === "beneficiaries" ? "number" : "text"}
              min={name === "beneficiaries" ? "1" : undefined}
              required={name !== "cardImage"}
              className="mt-1 w-full rounded-lg border border-[#cbd5e1] bg-white px-3 py-2.5 text-[12px] font-normal text-brand-navy outline-none placeholder:text-[#94a3b8] focus:border-brand-blue focus:ring-2 focus:ring-brand-blue/20"
            />
            {name === "beneficiaries" && <span className="mt-1 block text-[10px] font-normal text-brand-slate">Lista de usuários que concorrerão ao benefício</span>}
          </label>
        ))}
        <div className="grid grid-cols-2 gap-2">
          <label className="block text-[11px] font-semibold text-brand-navy">De<input name="periodFrom" type="date" defaultValue={periodFrom} required className="mt-1 w-full rounded-lg border border-[#cbd5e1] bg-white px-3 py-2.5 text-[12px] font-normal text-brand-navy" /></label>
          <label className="block text-[11px] font-semibold text-brand-navy">Até<input name="periodTo" type="date" defaultValue={periodTo} required className="mt-1 w-full rounded-lg border border-[#cbd5e1] bg-white px-3 py-2.5 text-[12px] font-normal text-brand-navy" /></label>
        </div>
        <p className="text-[10px] text-brand-slate">Período em que a campanha ficará disponível.</p>
        <label className="block text-[11px] font-semibold text-brand-navy">Categoria<select name="category" defaultValue={campaign?.category ?? "Lazer"} className="mt-1 w-full rounded-lg border border-[#cbd5e1] bg-white px-3 py-2.5 text-[12px] font-normal text-brand-navy"><option>Moda e beleza</option><option>Produtos reciclados</option><option>Pet</option><option>Lazer</option></select></label>
        <p className="text-[10px] text-brand-slate">Escolha uma categoria disponível em Recompensas.</p>
        <label className="flex items-center gap-3 text-[11px] font-semibold text-brand-navy">
          Cor da modal
          <input name="modalColor" defaultValue={campaign?.modalColor ?? "#4169e1"} type="color" className="size-9 cursor-pointer rounded border border-[#cbd5e1] bg-white p-0.5" />
        </label>
      </div>
      <button type="submit" className="mt-5 w-full rounded-lg bg-brand-blue py-2.5 text-[12px] font-bold text-white">Salvar campanha</button>
    </form>
  )
}
