import { notFound } from "next/navigation"
import { PhoneFrame } from "@/components/phone-frame"
import { StoreScreen } from "@/components/store-screen"
import { getStore, stores } from "@/lib/data"

export function generateStaticParams() {
  return stores.map((s) => ({ slug: s.slug }))
}

export default async function StorePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const store = getStore(slug)
  if (!store) notFound()

  return (
    <PhoneFrame>
      <StoreScreen store={store} />
    </PhoneFrame>
  )
}
