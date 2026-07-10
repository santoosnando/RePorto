import { Recycle, type LucideIcon } from "lucide-react"

const SVG_BASE = "https://cdn.jsdelivr.net/gh/glincker/thesvg@main/public/icons"
const brandLogo = (slug: string) => `${SVG_BASE}/${slug}/default.svg`

export type Product = {
  name: string
  image: string
  price: string
}

export type Store = {
  slug: string
  name: string
  tagline: string
  rating: string
  /** Remote brand logo URL. When null, a fallback icon is used. */
  logo: string | null
  /** Fallback icon when there is no brand logo. */
  fallbackIcon?: LucideIcon
  /** Optional preset cover image. When absent, a brand-colored gradient is used. */
  defaultCover?: string
  /** Two-stop gradient used for the cover and logo background. */
  gradient: [string, string]
  products: Product[]
}

export const stores: Store[] = [
  {
    slug: "reverse-lab",
    name: "Reverse Lab",
    tagline: "Produtos reciclados feitos à mão a partir de resíduos coletados",
    rating: "4.8",
    logo: null,
    fallbackIcon: Recycle,
    defaultCover: "/loja/reverse-lab-cover.png",
    gradient: ["#1a2f6b", "#2c4694"],
    products: [
      { name: "Abridor", image: "/loja/reverse-lab/abridor.png", price: "120 pts" },
      { name: "Mosquetão", image: "/loja/reverse-lab/mosquetao.png", price: "180 pts" },
      { name: "Pente", image: "/loja/reverse-lab/pente.png", price: "150 pts" },
      { name: "Porta celular", image: "/loja/reverse-lab/porta-celular.png", price: "260 pts" },
      { name: "Selos decorativos", image: "/loja/reverse-lab/selos.png", price: "90 pts" },
      { name: "Relógio de parede", image: "/loja/reverse-lab/relogio.png", price: "400 pts" },
    ],
  },
  {
    slug: "carrefour",
    name: "Carrefour",
    tagline: "Vale-compras e benefícios no seu mercado do dia a dia",
    rating: "4.6",
    logo: brandLogo("carrefour"),
    gradient: ["#004e9f", "#0a6fd0"],
    products: [
      { name: "Vale R$20", image: "/loja/carrefour/1.png", price: "500 pts" },
      { name: "Cesta básica", image: "/loja/carrefour/2.png", price: "900 pts" },
      { name: "Kit limpeza", image: "/loja/carrefour/3.png", price: "320 pts" },
      { name: "Ecobag", image: "/loja/carrefour/4.png", price: "150 pts" },
    ],
  },
  {
    slug: "ifood",
    name: "iFood",
    tagline: "Cupons e combos para pedir sem sair de casa",
    rating: "4.9",
    logo: brandLogo("ifood"),
    gradient: ["#c9101f", "#ea1d2c"],
    products: [
      { name: "Entrega grátis", image: "/loja/ifood/1.png", price: "200 pts" },
      { name: "Combo burger", image: "/loja/ifood/2.png", price: "450 pts" },
      { name: "Sobremesa", image: "/loja/ifood/3.png", price: "180 pts" },
      { name: "Refrigerante", image: "/loja/ifood/4.png", price: "90 pts" },
    ],
  },
  {
    slug: "uber",
    name: "Uber",
    tagline: "Mobilidade com desconto usando seus pontos",
    rating: "4.7",
    logo: brandLogo("uber"),
    gradient: ["#111111", "#3a3a3a"],
    products: [
      { name: "Corrida grátis", image: "/loja/uber/1.png", price: "600 pts" },
      { name: "Desconto 30%", image: "/loja/uber/2.png", price: "250 pts" },
      { name: "Uber Eats", image: "/loja/uber/3.png", price: "300 pts" },
      { name: "Uber Pass", image: "/loja/uber/4.png", price: "800 pts" },
    ],
  },
  {
    slug: "starbucks",
    name: "Starbucks",
    tagline: "Cafés e itens exclusivos para resgatar",
    rating: "4.8",
    logo: brandLogo("starbucks"),
    gradient: ["#00543a", "#00704a"],
    products: [
      { name: "Caffè Latte", image: "/loja/starbucks/1.png", price: "300 pts" },
      { name: "Frappuccino", image: "/loja/starbucks/2.png", price: "350 pts" },
      { name: "Caneca térmica", image: "/loja/starbucks/3.png", price: "500 pts" },
      { name: "Cookie", image: "/loja/starbucks/4.png", price: "120 pts" },
    ],
  },
  {
    slug: "nike",
    name: "Nike",
    tagline: "Moda esportiva e acessórios para o seu treino",
    rating: "4.7",
    logo: brandLogo("nike"),
    gradient: ["#111111", "#444444"],
    products: [
      { name: "Tênis running", image: "/loja/nike/1.png", price: "1500 pts" },
      { name: "Camiseta Dri-FIT", image: "/loja/nike/2.png", price: "600 pts" },
      { name: "Meias esportivas", image: "/loja/nike/3.png", price: "200 pts" },
      { name: "Boné", image: "/loja/nike/4.png", price: "350 pts" },
    ],
  },
  {
    slug: "nubank",
    name: "Nubank",
    tagline: "Cashback e mimos roxinhos para clientes",
    rating: "4.9",
    logo: brandLogo("nubank"),
    gradient: ["#5b0a9e", "#820ad1"],
    products: [
      { name: "Cashback R$10", image: "/loja/nubank/1.png", price: "400 pts" },
      { name: "Caixa Nu", image: "/loja/nubank/2.png", price: "250 pts" },
      { name: "Kit adesivos", image: "/loja/nubank/3.png", price: "100 pts" },
      { name: "Garrafa térmica", image: "/loja/nubank/4.png", price: "500 pts" },
    ],
  },
  {
    slug: "burger-king",
    name: "Burger King",
    tagline: "Combos e lanches para resgatar com pontos",
    rating: "4.6",
    logo: brandLogo("burger-king"),
    gradient: ["#a51d00", "#d62300"],
    products: [
      { name: "Whopper", image: "/loja/burger-king/1.png", price: "450 pts" },
      { name: "Onion rings", image: "/loja/burger-king/2.png", price: "180 pts" },
      { name: "Milkshake", image: "/loja/burger-king/3.png", price: "220 pts" },
      { name: "Combo Duplo", image: "/loja/burger-king/4.png", price: "600 pts" },
    ],
  },
]

export function getStore(slug: string): Store | undefined {
  return stores.find((s) => s.slug === slug)
}

/** Partners shown in the horizontal bar (every store except the built-in Reverse Lab shortcut). */
export type Partner = { name: string; slug: string; logo: string | null; fallbackIcon?: LucideIcon }

export const partners: Partner[] = stores.map((s) => ({
  name: s.name,
  slug: s.slug,
  logo: s.logo,
  fallbackIcon: s.fallbackIcon,
}))
