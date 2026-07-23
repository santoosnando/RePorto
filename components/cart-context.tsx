"use client"

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react"
import type { Coupon } from "@/lib/data"

export type CartItem = {
  /** Unique id per store + product. */
  id: string
  storeSlug: string
  storeName: string
  name: string
  image: string
  priceLabel: string
  points: number
  description: string
  qty: number
}

type AddItemInput = Omit<CartItem, "id" | "qty">

type CartContextValue = {
  items: CartItem[]
  count: number
  total: number
  ready: boolean
  addItem: (item: AddItemInput) => void
  removeItem: (id: string) => void
  clear: () => void
  /** Cupons gerados a partir de compras confirmadas, exibidos em "Disponíveis". */
  confirmedCoupons: Coupon[]
  /** Converte os itens do carrinho em cupons e os adiciona aos disponíveis. */
  addConfirmedCoupons: (cartItems: CartItem[]) => void
}

const CartContext = createContext<CartContextValue | null>(null)
const STORAGE_KEY = "eco-cart"
const COUPONS_STORAGE_KEY = "eco-confirmed-coupons"

/** Gera uma data de validade 90 dias a partir de hoje no formato DD/MM/AAAA. */
function validUntil90Days(): string {
  const d = new Date()
  d.setDate(d.getDate() + 90)
  return d.toLocaleDateString("pt-BR")
}

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([])
  const [confirmedCoupons, setConfirmedCoupons] = useState<Coupon[]>([])
  const [ready, setReady] = useState(false)

  // Load persisted cart and confirmed coupons once on mount.
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY)
      if (saved) setItems(JSON.parse(saved) as CartItem[])
      const savedCoupons = localStorage.getItem(COUPONS_STORAGE_KEY)
      if (savedCoupons) setConfirmedCoupons(JSON.parse(savedCoupons) as Coupon[])
    } catch {
      // ignore malformed storage
    }
    setReady(true)
  }, [])

  useEffect(() => {
    if (!ready) return
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(items))
    } catch {
      // storage may be unavailable
    }
  }, [items, ready])

  useEffect(() => {
    if (!ready) return
    try {
      localStorage.setItem(COUPONS_STORAGE_KEY, JSON.stringify(confirmedCoupons))
    } catch {
      // storage may be unavailable
    }
  }, [confirmedCoupons, ready])

  const addItem = useCallback((item: AddItemInput) => {
    const id = `${item.storeSlug}:${item.name}`
    setItems((prev) => {
      const existing = prev.find((i) => i.id === id)
      if (existing) {
        return prev.map((i) => (i.id === id ? { ...i, qty: i.qty + 1 } : i))
      }
      return [...prev, { ...item, id, qty: 1 }]
    })
  }, [])

  const removeItem = useCallback((id: string) => {
    setItems((prev) => prev.filter((i) => i.id !== id))
  }, [])

  const clear = useCallback(() => setItems([]), [])

  const addConfirmedCoupons = useCallback((cartItems: CartItem[]) => {
    const newCoupons: Coupon[] = cartItems.flatMap((item) =>
      Array.from({ length: item.qty }, (_, i) => ({
        id: `confirmed:${item.id}:${Date.now()}:${i}`,
        name: item.name,
        storeName: item.storeName,
        storeSlug: item.storeSlug,
        image: item.image,
        points: item.points,
        description: item.description,
        validUntil: validUntil90Days(),
      })),
    )
    setConfirmedCoupons((prev) => [...prev, ...newCoupons])
  }, [])

  const value = useMemo<CartContextValue>(() => {
    const count = items.reduce((sum, i) => sum + i.qty, 0)
    const total = items.reduce((sum, i) => sum + i.points * i.qty, 0)
    return { items, count, total, ready, addItem, removeItem, clear, confirmedCoupons, addConfirmedCoupons }
  }, [items, ready, addItem, removeItem, clear, confirmedCoupons, addConfirmedCoupons])

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}

export function useCart() {
  const ctx = useContext(CartContext)
  if (!ctx) throw new Error("useCart deve ser usado dentro de CartProvider")
  return ctx
}
