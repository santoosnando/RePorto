import {
  ShoppingCart,
  Store,
  Cross,
  Flower2,
  Bike,
  Car,
  Shirt,
  Tv,
  type LucideIcon,
} from "lucide-react"

export type Partner = { name: string; icon: LucideIcon }

export const partners: Partner[] = [
  { name: "Carrefour", icon: ShoppingCart },
  { name: "Pão de Açúcar", icon: Store },
  { name: "Droga Raia", icon: Cross },
  { name: "Natura", icon: Flower2 },
  { name: "iFood", icon: Bike },
  { name: "Uber", icon: Car },
  { name: "Renner", icon: Shirt },
  { name: "Magazine Luiza", icon: Tv },
]

export type Product = {
  name: string
  image: string
  price: string
}

export const reverseLabProducts: Product[] = [
  { name: "Abridor", image: "/loja/abridor.png", price: "120 pts" },
  { name: "Mosquetão", image: "/loja/mosquetao.png", price: "180 pts" },
  { name: "Pente", image: "/loja/pente.png", price: "150 pts" },
  { name: "Porta celular", image: "/loja/porta-celular.png", price: "260 pts" },
  { name: "Selos decorativos", image: "/loja/selos.png", price: "90 pts" },
  { name: "Relógio de parede", image: "/loja/relogio.png", price: "400 pts" },
]
