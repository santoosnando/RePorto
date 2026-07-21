"use client"

import { useEffect } from "react"
import Image from "next/image"
import type { Product, Store } from "@/lib/data"

export function ProductModal({
  product,
  store,
  onClose,
  onAdd,
}: {
  product: Product
  store: Store
  onClose: () => void
  onAdd: () => void
}) {
  // Close on Escape for accessibility.
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose()
    }
    document.addEventListener("keydown", onKey)
    return () => document.removeEventListener("keydown", onKey)
  }, [onClose])

  const description =
    product.description ?? `${product.name} disponível para resgate com os seus pontos acumulados.`
  const stock = product.stock ?? 10

  return (
    <div className="absolute inset-0 z-30 flex items-center justify-center px-4" role="dialog" aria-modal="true">
      <button type="button" aria-label="Fechar" className="absolute inset-0 bg-black/50" onClick={onClose} />

      <div className="relative z-[1] flex max-h-[88%] w-full max-w-[340px] flex-col overflow-hidden rounded-2xl bg-white shadow-xl">
        <div className="flex-shrink-0 border-b border-border px-5 py-4 text-center">
          <h2 className="text-[20px] font-semibold text-brand-navy">{product.name}</h2>
        </div>

        <div className="min-h-0 flex-1 overflow-y-auto px-5 pt-4 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          <div className="relative mx-auto h-[190px] w-full overflow-hidden rounded-xl bg-[#e7eaf2]">
            <Image src={product.image || "/placeholder.svg"} alt={product.name} fill className="object-cover" />
          </div>

          <div className="mt-4 space-y-3.5">
            <div>
              <div className="text-[14px] font-semibold text-brand-navy">Valor</div>
              <div className="text-[14px] text-brand-slate">{product.price}</div>
            </div>
            <div>
              <div className="text-[14px] font-semibold text-brand-navy">Quantidade disponível</div>
              <div className="text-[14px] text-brand-slate">
                {stock} {stock === 1 ? "unidade" : "unidades"}
              </div>
            </div>
            <div>
              <div className="text-[14px] font-semibold text-brand-navy">Descrição</div>
              <p className="text-[14px] leading-relaxed text-brand-slate">{description}</p>
            </div>
          </div>
        </div>

        <div className="flex-shrink-0 border-t border-border px-5 pb-5 pt-4">
          <button
            type="button"
            onClick={onAdd}
            className="w-full rounded-xl bg-[#1f9d3f] py-3.5 text-[15px] font-semibold text-white transition-colors hover:brightness-95 active:scale-[0.99]"
          >
            Adicionar ao carrinho
          </button>
          <button
            type="button"
            onClick={onClose}
            className="mt-2.5 w-full rounded-xl bg-[#eef0f5] py-3.5 text-[15px] font-semibold text-[#f4544f] transition-colors hover:bg-[#e6e9f0]"
          >
            Fechar
          </button>
        </div>
      </div>
    </div>
  )
}
