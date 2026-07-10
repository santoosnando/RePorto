"use client"

import { useEffect, useRef, useState } from "react"
import Link from "next/link"
import Image from "next/image"
import {
  ChevronLeft,
  Camera,
  Star,
  Search,
  ShoppingCart,
  Home as HomeIcon,
  Pencil,
  Recycle,
  type LucideIcon,
} from "lucide-react"
import type { Store, FallbackIconKey } from "@/lib/data"

const fallbackIcons: Record<FallbackIconKey, LucideIcon> = { recycle: Recycle }

export function StoreScreen({ store }: { store: Store }) {
  const storageKey = `store-cover:${store.slug}`
  const [cover, setCover] = useState<string | null>(null)
  const [loaded, setLoaded] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    try {
      const saved = localStorage.getItem(storageKey)
      if (saved) setCover(saved)
    } catch {
      // ignore
    }
    setLoaded(true)
  }, [storageKey])

  function handlePick() {
    fileInputRef.current?.click()
  }

  function handleFile(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (!file) return
    const reader = new FileReader()
    reader.onload = () => {
      const result = reader.result as string
      setCover(result)
      try {
        localStorage.setItem(storageKey, result)
      } catch {
        // storage may be full; keep in-memory preview
      }
    }
    reader.readAsDataURL(file)
    e.target.value = ""
  }

  const FallbackIcon = store.fallbackIcon ? fallbackIcons[store.fallbackIcon] : undefined
  // Priority: uploaded cover > preset cover; otherwise a brand-colored gradient.
  const presetCover = !cover && loaded ? store.defaultCover : undefined
  const showImage = cover ?? presetCover

  return (
    <div className="h-full w-full overflow-y-auto bg-white">
      {/* cover */}
      <div
        className="relative h-[170px] overflow-hidden"
        style={{ background: `linear-gradient(135deg, ${store.gradient[0]}, ${store.gradient[1]})` }}
      >
        {showImage && (
          <Image src={showImage || "/placeholder.svg"} alt="Foto de capa da loja" fill className="object-cover" priority />
        )}
        <div className="absolute inset-0 bg-black/10" />

        <Link
          href="/"
          className="absolute left-4 top-[52px] z-[2] flex size-9 items-center justify-center rounded-full bg-black/35"
          aria-label="Voltar"
        >
          <ChevronLeft className="size-[18px] text-white" />
        </Link>

        {/* editable cover control for the partner owner */}
        <button
          type="button"
          onClick={handlePick}
          className="absolute right-4 top-[52px] z-[2] flex items-center gap-1.5 rounded-2xl bg-black/40 px-2.5 py-[6px] text-[10px] text-white backdrop-blur-sm transition-colors hover:bg-black/55"
        >
          {cover ? <Pencil className="size-3" /> : <Camera className="size-3" />}
          {cover ? "Alterar capa" : "Adicionar foto de capa"}
        </button>

        <input ref={fileInputRef} type="file" accept="image/*" className="hidden" onChange={handleFile} />
      </div>

      {/* store identity */}
      <div className="relative bg-white px-4 pb-2">
        <div className="absolute -top-8 left-4 flex size-16 items-center justify-center overflow-hidden rounded-2xl border-[3px] border-white bg-white shadow-sm">
          {store.logo ? (
            // Remote brand SVG from theSVG.org
            // eslint-disable-next-line @next/next/no-img-element
            <img src={store.logo || "/placeholder.svg"} alt={`Logo ${store.name}`} className="size-9 object-contain" />
          ) : FallbackIcon ? (
            <div
              className="flex size-full items-center justify-center"
              style={{ background: `linear-gradient(135deg, ${store.gradient[0]}, ${store.gradient[1]})` }}
            >
              <FallbackIcon className="size-7 text-brand-green" />
            </div>
          ) : null}
        </div>
        <div className="pt-[38px]">
          <div className="text-[18px] font-medium text-brand-navy">{store.name}</div>
          <div className="mt-1 flex items-center gap-2 text-[11px] text-brand-slate">
            <span className="flex items-center gap-1 text-[#0f9d58]">
              <span className="inline-block size-1.5 rounded-full bg-[#0f9d58]" />
              Aberto agora
            </span>
            <span>·</span>
            <span className="flex items-center gap-[3px]">
              <Star className="size-3 fill-[#f2a900] text-[#f2a900]" />
              {store.rating}
            </span>
          </div>
          <div className="mt-1 text-[11px] text-brand-mute">{store.tagline}</div>
        </div>
      </div>

      {/* search */}
      <div className="bg-white px-4 pb-4 pt-3">
        <div className="flex items-center gap-2 rounded-[22px] bg-[#f2f3f7] px-4 py-[11px] text-brand-mute">
          <Search className="size-4" />
          <span className="text-[13px]">O que você procura?</span>
        </div>
      </div>

      {/* products */}
      <div className="bg-white px-4 pb-24">
        <div className="grid grid-cols-2 gap-3.5">
          {store.products.map((p) => (
            <div key={p.name} className="overflow-hidden rounded-2xl border border-border bg-[#f7f8fb]">
              <div className="relative h-[110px] w-full bg-[#e7eaf2]">
                <Image src={p.image || "/placeholder.svg"} alt={p.name} fill className="object-cover" />
              </div>
              <div className="flex items-center justify-between px-2.5 py-2.5">
                <span className="text-[12.5px] font-medium text-brand-navy">{p.name}</span>
                <span className="text-[11px] font-medium text-brand-blue">{p.price}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* floating cart + home */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 flex items-center justify-center gap-3 bg-gradient-to-t from-white via-white/95 to-transparent pb-6 pt-4">
        <Link
          href="/"
          className="pointer-events-auto flex size-[52px] items-center justify-center rounded-full border-4 border-[#d7e0f5] bg-brand-blue"
          aria-label="Início"
        >
          <HomeIcon className="size-[22px] text-white" />
        </Link>
        <button
          type="button"
          className="pointer-events-auto relative flex size-[52px] items-center justify-center rounded-full border-4 border-[#d7e0f5] bg-white"
          aria-label="Carrinho"
        >
          <ShoppingCart className="size-[20px] text-brand-blue" />
          <span className="absolute -right-1 -top-1 flex size-5 items-center justify-center rounded-full bg-brand-blue text-[10px] text-white">
            1
          </span>
        </button>
      </div>
    </div>
  )
}
