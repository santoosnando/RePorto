"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { ChevronLeft, Search, ShoppingCart, Trash2, Home as HomeIcon, TicketPercent, X, Check } from "lucide-react"
import { useCart } from "@/components/cart-context"
import { USER_BALANCE } from "@/lib/data"

export function CartScreen() {
  const cart = useCart()
  const [confirmOpen, setConfirmOpen] = useState(false)
  const [purchased, setPurchased] = useState(false)

  function confirmPurchase() {
    cart.clear()
    setConfirmOpen(false)
    setPurchased(true)
  }

  const isEmpty = cart.items.length === 0

  return (
    <div className="relative h-full w-full">
      <div className="h-full overflow-y-auto bg-gradient-to-b from-[#1a1f4d] via-[#2c4694] to-[#1f56b0] pb-[76px] [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        {/* header */}
        <div className="px-[18px] pb-5 pt-14">
          <Link href="/" className="flex items-center gap-3.5">
            <div className="flex size-9 flex-shrink-0 items-center justify-center rounded-full bg-brand-blue">
              <ChevronLeft className="size-[18px] text-white" />
            </div>
            <span className="text-[19px] font-medium tracking-wide text-white">Recompensas</span>
          </Link>
          <div className="mt-4 flex items-center gap-2.5">
            <div className="flex flex-1 items-center gap-2 rounded-[22px] bg-white px-4 py-[11px] text-brand-mute">
              <Search className="size-4" />
              <span className="text-[13px]">O que procura?</span>
            </div>
            <div className="relative flex size-11 flex-shrink-0 items-center justify-center rounded-full bg-white">
              <ShoppingCart className="size-[19px] text-brand-blue" />
              {cart.count > 0 && (
                <span className="absolute -right-1 -top-1 flex size-4 items-center justify-center rounded-full bg-brand-blue text-[9px] text-white">
                  {cart.count}
                </span>
              )}
            </div>
          </div>
        </div>

        {/* content */}
        <div className="px-4 pt-1">
          {isEmpty ? (
            <div className="mt-10 flex flex-col items-center px-6 text-center">
              <div className="flex size-16 items-center justify-center rounded-full bg-white/10">
                <TicketPercent className="size-8 text-white" />
              </div>
              <p className="mt-4 text-[15px] font-medium text-white">
                {purchased ? "Compra confirmada com sucesso!" : "Seu carrinho está vazio"}
              </p>
              <p className="mt-1.5 text-[13px] leading-relaxed text-[#c3cbe6]">
                Você ainda não tem cupons para resgatar.
              </p>
              <Link
                href="/"
                className="mt-6 rounded-[22px] bg-white px-6 py-2.5 text-[13px] font-semibold text-brand-blue"
              >
                Explorar recompensas
              </Link>
            </div>
          ) : (
            <>
              <ul className="space-y-3">
                {cart.items.map((item) => (
                  <li key={item.id} className="flex gap-3 rounded-2xl bg-white p-3">
                    <div className="relative size-[70px] flex-shrink-0 overflow-hidden rounded-xl bg-[#e7eaf2]">
                      <Image src={item.image || "/placeholder.svg"} alt={item.name} fill className="object-cover" />
                    </div>
                    <div className="flex min-w-0 flex-1 flex-col">
                      <div className="flex items-start justify-between gap-2">
                        <span className="text-[15px] font-semibold text-brand-navy">{item.name}</span>
                        <button
                          type="button"
                          onClick={() => cart.removeItem(item.id)}
                          aria-label={`Remover ${item.name}`}
                          className="flex-shrink-0 text-brand-coral"
                        >
                          <Trash2 className="size-[18px]" />
                        </button>
                      </div>
                      <span className="mt-0.5 inline-flex w-fit items-center rounded-full bg-brand-blue-soft px-2 py-0.5 text-[10px] font-medium text-brand-blue">
                        {item.storeName}
                      </span>
                      <p className="mt-1 line-clamp-2 text-[12px] leading-snug text-brand-slate">{item.description}</p>
                      <div className="mt-auto flex items-center justify-between pt-1">
                        <span className="text-[12px] text-brand-mute">
                          {item.qty > 1 ? `${item.qty} x ${item.priceLabel}` : ""}
                        </span>
                        <span className="text-[13px] font-bold text-brand-navy">{item.points * item.qty} pts</span>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>

              <div className="my-5 h-px bg-white/25" />

              <div className="flex items-end justify-between px-1">
                <div>
                  <div className="text-[15px] font-semibold text-white">Saldo</div>
                  <div className="text-[15px] font-semibold italic text-white">
                    {USER_BALANCE.toLocaleString("pt-BR")} pontos
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-[20px] font-bold text-white">Total</div>
                  <div className="text-[30px] font-extrabold leading-none text-white">{cart.total} pontos</div>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setConfirmOpen(true)}
                className="mx-auto mt-8 block w-[70%] rounded-xl bg-brand-emerald py-3.5 text-center text-[16px] font-bold text-white transition-colors hover:brightness-95 active:scale-[0.99]"
              >
                Confirmar compra!
              </button>
            </>
          )}
        </div>
      </div>

      {/* fixed footer navbar */}
      <div className="absolute inset-x-0 bottom-0 flex justify-center border-t border-border bg-white pb-3 pt-2">
        <Link
          href="/"
          className="flex size-11 items-center justify-center rounded-full bg-brand-blue"
          aria-label="Início"
        >
          <HomeIcon className="size-5 text-white" />
        </Link>
      </div>

      {/* purchase confirmation modal */}
      {confirmOpen && (
        <div className="absolute inset-0 z-30 flex items-center justify-center px-6" role="dialog" aria-modal="true">
          <button
            type="button"
            aria-label="Fechar"
            className="absolute inset-0 bg-black/50"
            onClick={() => setConfirmOpen(false)}
          />
          <div className="relative z-[1] w-full max-w-[330px] rounded-2xl bg-white px-6 py-6 shadow-xl">
            <div className="flex items-center justify-center gap-2">
              <h2 className="text-[22px] font-bold text-brand-navy">Confirmação</h2>
              <button type="button" onClick={() => setConfirmOpen(false)} aria-label="Fechar">
                <X className="size-5 text-brand-slate" />
              </button>
            </div>
            <p className="mt-4 text-center text-[15px] text-brand-slate">Deseja finalizar a compra?</p>
            <div className="mt-6 flex items-center justify-center gap-4">
              <button
                type="button"
                onClick={() => setConfirmOpen(false)}
                className="flex items-center gap-1.5 px-3 py-2 text-[15px] font-bold text-brand-coral"
              >
                <X className="size-4" />
                Não
              </button>
              <button
                type="button"
                onClick={confirmPurchase}
                className="flex items-center gap-1.5 rounded-xl border-2 border-brand-blue-light bg-brand-blue px-6 py-2.5 text-[15px] font-bold text-white"
              >
                <Check className="size-4" />
                Sim
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
