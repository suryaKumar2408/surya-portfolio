import { useEffect, useRef } from 'react'
import Lenis from 'lenis'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

/**
 * SmoothScroll
 * -------------------------------------------------
 * Wraps the whole app in a buttery, inertia-based
 * scroll powered by Lenis, and keeps it perfectly
 * in sync with GSAP's ScrollTrigger (used for the
 * pinned Skills → Contact reveal) and with Framer
 * Motion's useScroll (used by SectionReveal), since
 * both read the real window scroll position that
 * Lenis drives.
 * -------------------------------------------------
 */
export default function SmoothScroll({ children }) {
  const lenisRef = useRef(null)

  useEffect(() => {
    const isReducedMotion =
      window.matchMedia('(prefers-reduced-motion: reduce)').matches

    if (isReducedMotion) return

    const lenis = new Lenis({
      duration: 1.35,
      easing: t => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 1.2,
      lerp: 0.09,
      infinite: false,
      autoRaf: false,
    })

    lenisRef.current = lenis

    // Keep ScrollTrigger's calculations glued to Lenis's
    // smoothed scroll position every frame.
    lenis.on('scroll', ScrollTrigger.update)

    // Drive Lenis from GSAP's own ticker so both stay
    // perfectly frame-synced (no double rAF loops).
    const rafCallback = time => {
      lenis.raf(time * 1000)
    }

    gsap.ticker.add(rafCallback)

    // Prevent GSAP's ticker from "catching up" after a
    // tab is backgrounded, which used to cause jumpy
    // scroll-triggered animations.
    gsap.ticker.lagSmoothing(0)

    // Recalculate pin/trigger positions once Lenis has
    // taken over, and again after fonts/images settle.
    ScrollTrigger.refresh()
    const refreshTimeout = setTimeout(() => ScrollTrigger.refresh(), 300)

    return () => {
      clearTimeout(refreshTimeout)
      gsap.ticker.remove(rafCallback)
      lenis.destroy()
      lenisRef.current = null
    }
  }, [])

  return children
}
