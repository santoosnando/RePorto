"use client"

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react"

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
}

const CartContext = createContext<CartContextValue | null>(null)
const STORAGE_KEY = "eco-cart"

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([])
  const [ready, setReady] = useState(false)

  // Load persisted cart once on mount so it survives navigation/refresh.
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY)
      if (saved) setItems(JSON.parse(saved) as CartItem[])
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

  const value = useMemo<CartContextValue>(() => {
    const count = items.reduce((sum, i) => sum + i.qty, 0)
    const total = items.reduce((sum, i) => sum + i.points * i.qty, 0)
    return { items, count, total, ready, addItem, removeItem, clear }
  }, [items, ready, addItem, removeItem, clear])

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}

export function useCart() {
  const ctx = useContext(CartContext)
  if (!ctx) throw new Error("useCart deve ser usado dentro de CartProvider")
  return ctx
}
