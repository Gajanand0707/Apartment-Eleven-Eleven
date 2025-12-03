"use client"

import { useEffect, useRef } from "react"
import Lenis from "@studio-freight/lenis"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

export default function LenisProvider({ children }: { children: React.ReactNode }) {
  const rafRef = useRef<((time: number) => void) | null>(null)
  const lenisRef = useRef<Lenis | null>(null)

  useEffect(() => {
    if (typeof window === "undefined") return

    gsap.registerPlugin(ScrollTrigger)

    const lenis = new Lenis({
      duration: 1.2,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      direction: "vertical",
      gestureDirection: "vertical",
      smooth: true,
      mouseMultiplier: 1,
      smoothTouch: false,
      touchMultiplier: 2,
      infinite: false,
    })

    // keep refs so we can clean up
    lenisRef.current = lenis

    // Register scrollerProxy so ScrollTrigger understands Lenis-controlled scrolling
    const scroller = document.documentElement
    ScrollTrigger.scrollerProxy(scroller, {
      scrollTop(value?: number) {
        if (!lenisRef.current) return 0
        if (arguments.length) {
          // scrollTo expects pixels; allow GSAP to set position
          lenisRef.current.scrollTo(value as number)
          return
        }
        // return current Lenis scroll position
        // @ts-ignore - access internal instance
        return (lenisRef.current as any).scroll?.y ?? 0
      },
      getBoundingClientRect() {
        return { top: 0, left: 0, width: window.innerWidth, height: window.innerHeight }
      },
      // let ScrollTrigger decide pinType based on transform support
      pinType: (document.documentElement.style.transform ? "transform" : "fixed") as any,
    })

    // ensure ScrollTrigger refresh uses Lenis measurements
    // Lenis doesn't expose `update()` — call `raf` with current timestamp
    ScrollTrigger.addEventListener("refresh", () => {
      try { lenis.raf(performance.now()) } catch (e) { /* ignore */ }
    })

    // connect Lenis RAF to GSAP ticker and update ScrollTrigger each frame
    const raf = (time: number) => {
      lenis.raf(time * 1000)
      ScrollTrigger.update()
    }

    gsap.ticker.add(raf)
    rafRef.current = raf
    gsap.ticker.lagSmoothing(0)

    // initial refresh so pin calculations are correct
    setTimeout(() => ScrollTrigger.refresh(), 0)

    return () => {
      // cleanup
      if (lenisRef.current) {
        lenisRef.current.off("scroll", scrollHandler)
        lenisRef.current.destroy()
        lenisRef.current = null
      }
      if (rafRef.current) {
        gsap.ticker.remove(rafRef.current)
        rafRef.current = null
      }
    }
  }, [])

  return <>{children}</>
}
