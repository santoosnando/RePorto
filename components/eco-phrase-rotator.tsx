"use client"

import { useEffect, useState } from "react"

/**
 * Rotates through sustainability comparison phrases, fading between each one.
 * Used on the "Meu impacto" screen where a static tree-equivalence line used to be.
 */
export function EcoPhraseRotator({ phrases, className }: { phrases: string[]; className?: string }) {
  const [index, setIndex] = useState(0)
  const [visible, setVisible] = useState(true)

  useEffect(() => {
    if (phrases.length <= 1) return
    const fadeOut = setInterval(() => {
      setVisible(false)
      // Swap the phrase while it is hidden, then fade back in.
      setTimeout(() => {
        setIndex((i) => (i + 1) % phrases.length)
        setVisible(true)
      }, 400)
    }, 4000)
    return () => clearInterval(fadeOut)
  }, [phrases.length])

  return (
    <span
      className={`block transition-opacity duration-[400ms] ${visible ? "opacity-100" : "opacity-0"} ${className ?? ""}`}
      aria-live="polite"
    >
      {phrases[index]}
    </span>
  )
}
