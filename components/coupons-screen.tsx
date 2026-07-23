"use client"

import { useState, useEffect, useRef } from "react"
import Image from "next/image"
import {
  ChevronLeft,
  Home as HomeIcon,
  TicketPercent,
  CalendarClock,
  CheckCircle2,
  QrCode,
  X,
  Loader2,
} from "lucide-react"
import { AVAILABLE_COUPONS, USED_COUPONS, type Coupon } from "@/lib/data"
import { useCart } from "@/components/cart-context"

type Tab = "available" | "history"
type ModalStep = "confirm" | "qr" | "success"

/* ---------- helpers ---------- */

/** Generates a deterministic-ish QR-like SVG pattern for a given seed string. */
function QRPattern({ seed }: { seed: string }) {
  // Build a 21×21 grid seeded from the coupon id to look like a real QR.
  const size = 21
  const cells: boolean[][] = Array.from({ length: size }, (_, r) =>
    Array.from({ length: size }, (_, c) => {
      const hash = (seed.charCodeAt((r * size + c) % seed.length) * 31 + r * 7 + c * 13) % 3
      // Keep the three finder-pattern corners always filled.
      const inTopLeft = r < 7 && c < 7
      const inTopRight = r < 7 && c >= size - 7
      const inBottomLeft = r >= size - 7 && c < 7
      if (inTopLeft || inTopRight || inBottomLeft) return true
      return hash === 0
    }),
  )

  const cellSize = 8
  const svgSize = size * cellSize

  return (
    <svg
      width={svgSize}
      height={svgSize}
      viewBox={`0 0 ${svgSize} ${svgSize}`}
      className="rounded-lg"
      aria-label="QR Code do cupom"
    >
      <rect width={svgSize} height={svgSize} fill="white" rx={8} />
      {cells.flatMap((row, r) =>
        row.map((filled, c) =>
          filled ? (
            <rect key={`${r}-${c}`} x={c * cellSize} y={r * cellSize} width={cellSize} height={cellSize} fill="#1a2f6b" />
          ) : null,
        ),
      )}
    </svg>
  )
}

/* ---------- main screen ---------- */

export function CouponsScreen({ onBack }: { onBack: () => void }) {
  const [tab, setTab] = useState<Tab>("available")
  const { confirmedCoupons, usedCoupons, useCoupon } = useCart()

  // Cupons disponíveis = estáticos (menos os já usados dinamicamente) + confirmados por compra.
  const dynamicallyUsedIds = new Set(usedCoupons.map((c) => c.id))
  const staticAvailable = AVAILABLE_COUPONS.filter((c) => !dynamicallyUsedIds.has(c.id))
  const availableCoupons = [...staticAvailable, ...confirmedCoupons]

  // Histórico = estáticos + usados dinamicamente.
  const historyCoupons = [...USED_COUPONS, ...usedCoupons]

  const list = tab === "available" ? availableCoupons : historyCoupons

  // Modal state
  const [selectedCoupon, setSelectedCoupon] = useState<Coupon | null>(null)
  const [modalStep, setModalStep] = useState<ModalStep>("confirm")

  function openModal(coupon: Coupon) {
    setSelectedCoupon(coupon)
    setModalStep("confirm")
  }

  function closeModal() {
    setSelectedCoupon(null)
  }

  function handleConfirmUse() {
    setModalStep("qr")
  }

  function handleValidate() {
    if (!selectedCoupon) return
    const isStatic = AVAILABLE_COUPONS.some((c) => c.id === selectedCoupon.id)
    useCoupon(selectedCoupon.id, isStatic ? selectedCoupon : undefined)
    setModalStep("success")
  }

  function handleDone() {
    closeModal()
    setTab("history")
  }

  return (
    <div className="relative h-full w-full">
      <div className="h-full overflow-y-auto bg-gradient-to-b from-[#1a1f4d] via-[#2c4694] to-[#4d82e0] pb-[76px] [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        {/* header */}
        <div className="px-[18px] pb-4 pt-14">
          <button type="button" onClick={onBack} className="flex items-center gap-3.5">
            <div className="flex size-9 flex-shrink-0 items-center justify-center rounded-full bg-brand-blue">
              <ChevronLeft className="size-[18px] text-white" />
            </div>
            <span className="text-[19px] font-medium tracking-wide text-white">Carteira de cupons</span>
          </button>

          {/* segmented selector */}
          <div className="mt-4 flex rounded-full bg-white/15 p-1">
            <button
              type="button"
              onClick={() => setTab("available")}
              className={`flex-1 rounded-full py-2 text-[13px] font-medium transition-colors ${
                tab === "available" ? "bg-white text-brand-navy" : "text-white/80"
              }`}
            >
              Disponíveis
            </button>
            <button
              type="button"
              onClick={() => setTab("history")}
              className={`flex-1 rounded-full py-2 text-[13px] font-medium transition-colors ${
                tab === "history" ? "bg-white text-brand-navy" : "text-white/80"
              }`}
            >
              Histórico
            </button>
          </div>
        </div>

        {/* list */}
        <div className="px-4 pt-1">
          {list.length === 0 ? (
            <div className="mt-10 flex flex-col items-center px-6 text-center">
              <div className="flex size-16 items-center justify-center rounded-full bg-white/10">
                <TicketPercent className="size-8 text-white" />
              </div>
              <p className="mt-4 text-[15px] font-medium text-white">
                {tab === "available" ? "Nenhum cupom disponível" : "Nenhum cupom utilizado"}
              </p>
            </div>
          ) : (
            <ul className="space-y-3">
              {list.map((c) => (
                <CouponCard
                  key={c.id}
                  coupon={c}
                  used={tab === "history"}
                  onClick={tab === "available" ? () => openModal(c) : undefined}
                />
              ))}
            </ul>
          )}
        </div>
      </div>

      {/* fixed footer navbar */}
      <div className="absolute inset-x-0 bottom-0 flex justify-center border-t border-border bg-white pb-3 pt-2">
        <button
          type="button"
          onClick={onBack}
          className="flex size-11 items-center justify-center rounded-full bg-brand-blue"
          aria-label="Início"
        >
          <HomeIcon className="size-5 text-white" />
        </button>
      </div>

      {/* use-coupon modal */}
      {selectedCoupon && (
        <UseCouponModal
          coupon={selectedCoupon}
          step={modalStep}
          onConfirm={handleConfirmUse}
          onValidate={handleValidate}
          onDone={handleDone}
          onClose={closeModal}
        />
      )}
    </div>
  )
}

/* ---------- coupon card ---------- */

function CouponCard({
  coupon,
  used,
  onClick,
}: {
  coupon: Coupon
  used: boolean
  onClick?: () => void
}) {
  return (
    <li>
      <button
        type="button"
        onClick={onClick}
        disabled={used || !onClick}
        className={`flex w-full items-center gap-3 rounded-2xl bg-white p-3 text-left transition-all ${
          onClick ? "active:scale-[0.98] hover:shadow-md cursor-pointer" : "cursor-default"
        }`}
      >
        <div className="relative size-[64px] flex-shrink-0 overflow-hidden rounded-xl bg-[#e7eaf2]">
          <Image src={coupon.image || "/placeholder.svg"} alt={coupon.name} fill className="object-cover" />
        </div>

        <div className="min-w-0 flex-1">
          <div className="text-[15px] font-bold text-brand-ink">{coupon.name}</div>
          <p className="mt-0.5 line-clamp-2 text-[12px] leading-snug text-brand-slate">{coupon.description}</p>
          <div className="mt-1 flex items-center gap-1 text-[10.5px] text-brand-mute">
            {used ? (
              <>
                <CheckCircle2 className="size-3" />
                Utilizado em {coupon.usedAt}
              </>
            ) : (
              <>
                <CalendarClock className="size-3" />
                Válido até {coupon.validUntil}
              </>
            )}
          </div>
        </div>

        <span
          className={`flex-shrink-0 rounded-lg px-3 py-1.5 text-[12px] font-semibold ${
            used ? "bg-[#eef1f6] text-brand-mute" : "bg-brand-emerald text-white"
          }`}
        >
          {used ? "Usado" : "Ativo"}
        </span>
      </button>
    </li>
  )
}

/* ---------- use-coupon modal ---------- */

function UseCouponModal({
  coupon,
  step,
  onConfirm,
  onValidate,
  onDone,
  onClose,
}: {
  coupon: Coupon
  step: ModalStep
  onConfirm: () => void
  onValidate: () => void
  onDone: () => void
  onClose: () => void
}) {
  // Auto-progress: after showing QR, simulate a 3s validation timer.
  const [validating, setValidating] = useState(false)
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  // Reset validating state whenever the step changes.
  useEffect(() => {
    setValidating(false)
    if (timerRef.current) clearTimeout(timerRef.current)
  }, [step])

  function handleValidate() {
    setValidating(true)
    timerRef.current = setTimeout(() => {
      setValidating(false)
      onValidate()
    }, 2200)
  }

  return (
    <div
      className="absolute inset-0 z-50 flex items-end justify-center"
      role="dialog"
      aria-modal="true"
      aria-label="Utilizar cupom"
    >
      {/* backdrop */}
      <button
        type="button"
        aria-label="Fechar"
        className="absolute inset-0 bg-black/60 backdrop-blur-[2px]"
        onClick={onClose}
      />

      {/* sheet */}
      <div className="relative z-10 w-full rounded-t-3xl bg-white px-5 pb-8 pt-4 shadow-2xl">
        {/* drag handle */}
        <div className="mx-auto mb-4 h-1 w-10 rounded-full bg-[#e0e4ef]" />

        {/* close button */}
        {step !== "success" && (
          <button
            type="button"
            onClick={onClose}
            aria-label="Fechar"
            className="absolute right-5 top-4 flex size-7 items-center justify-center rounded-full bg-[#f0f2f9] text-brand-mute"
          >
            <X className="size-4" />
          </button>
        )}

        {/* STEP 1 — confirm */}
        {step === "confirm" && (
          <div className="flex flex-col items-center text-center">
            <div className="relative size-[72px] overflow-hidden rounded-2xl border border-[#e7eaf2] bg-[#f5f7fc]">
              <Image src={coupon.image || "/placeholder.svg"} alt={coupon.name} fill className="object-cover" />
            </div>
            <h2 className="mt-3 text-[18px] font-bold text-brand-navy">{coupon.name}</h2>
            <p className="mt-1 text-[13px] text-brand-slate">{coupon.storeName}</p>
            <p className="mt-3 max-w-[260px] text-[13px] leading-snug text-brand-mute">{coupon.description}</p>

            <div className="mt-4 w-full rounded-2xl bg-[#f0f4ff] px-4 py-3 text-left">
              <p className="text-[12px] text-brand-mute">Válido até</p>
              <p className="text-[14px] font-semibold text-brand-navy">{coupon.validUntil}</p>
            </div>

            <p className="mt-4 text-[13px] text-brand-slate">
              Deseja utilizar este cupom agora? Após confirmar, um QR code será gerado para validação no estabelecimento.
            </p>

            <div className="mt-5 flex w-full gap-3">
              <button
                type="button"
                onClick={onClose}
                className="flex-1 rounded-2xl border border-[#e0e4ef] py-3 text-[14px] font-medium text-brand-mute"
              >
                Cancelar
              </button>
              <button
                type="button"
                onClick={onConfirm}
                className="flex-1 rounded-2xl bg-brand-blue py-3 text-[14px] font-semibold text-white"
              >
                Confirmar uso
              </button>
            </div>
          </div>
        )}

        {/* STEP 2 — QR code */}
        {step === "qr" && (
          <div className="flex flex-col items-center text-center">
            <div className="flex size-10 items-center justify-center rounded-full bg-brand-blue/10">
              <QrCode className="size-5 text-brand-blue" />
            </div>
            <h2 className="mt-2.5 text-[17px] font-bold text-brand-navy">Apresente o QR code</h2>
            <p className="mt-1 text-[12px] text-brand-mute">Mostre ao atendente para validar o cupom</p>

            <div className="mt-4 overflow-hidden rounded-2xl border-4 border-[#1a2f6b] p-1 shadow-lg">
              <QRPattern seed={coupon.id} />
            </div>

            <div className="mt-3 flex items-center gap-2 rounded-xl bg-[#f0f4ff] px-4 py-2">
              <div className="relative size-8 overflow-hidden rounded-lg">
                <Image src={coupon.image || "/placeholder.svg"} alt={coupon.name} fill className="object-cover" />
              </div>
              <div className="text-left">
                <p className="text-[12px] font-semibold text-brand-navy">{coupon.name}</p>
                <p className="text-[11px] text-brand-mute">{coupon.storeName}</p>
              </div>
            </div>

            <button
              type="button"
              onClick={handleValidate}
              disabled={validating}
              className="mt-5 flex w-full items-center justify-center gap-2 rounded-2xl bg-brand-emerald py-3.5 text-[14px] font-semibold text-white disabled:opacity-70"
            >
              {validating ? (
                <>
                  <Loader2 className="size-4 animate-spin" />
                  Validando...
                </>
              ) : (
                "Confirmar validação"
              )}
            </button>
          </div>
        )}

        {/* STEP 3 — success */}
        {step === "success" && (
          <div className="flex flex-col items-center text-center">
            <div className="flex size-16 items-center justify-center rounded-full bg-brand-emerald/15">
              <CheckCircle2 className="size-9 text-brand-emerald" />
            </div>
            <h2 className="mt-3 text-[18px] font-bold text-brand-navy">Cupom utilizado!</h2>
            <p className="mt-1.5 max-w-[240px] text-[13px] leading-snug text-brand-slate">
              O uso de <span className="font-semibold">{coupon.name}</span> foi registrado com sucesso.
              Ele agora aparece no seu histórico.
            </p>

            <div className="mt-5 flex size-16 items-center justify-center rounded-2xl border border-[#e7eaf2] bg-[#f5f7fc]">
              <div className="relative size-10 overflow-hidden rounded-xl">
                <Image src={coupon.image || "/placeholder.svg"} alt={coupon.name} fill className="object-cover" />
              </div>
            </div>

            <button
              type="button"
              onClick={onDone}
              className="mt-6 w-full rounded-2xl bg-brand-blue py-3.5 text-[14px] font-semibold text-white"
            >
              Ver histórico
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
