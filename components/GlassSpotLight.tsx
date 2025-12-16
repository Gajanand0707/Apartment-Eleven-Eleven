// app/components/GlassSpotlight.tsx
"use client"

import Image from "next/image"
import { useState, useEffect } from "react"

type Item = {
  id: number
  name: string
  sub: string
  avatarUrl?: string
}

const SAMPLE: Item[] = []

export default function GlassSpotlight({
  items: initialItems,
  background,
  autoScrollInterval = 2000, // 2 seconds default interval
}: {
  items?: Item[]
  background?: string
  autoScrollInterval?: number
}) {
  const [items, setItems] = useState<Item[]>(initialItems ?? SAMPLE)
  const [loading, setLoading] = useState<boolean>(!initialItems || initialItems.length === 0)
  const [error, setError] = useState<string | null>(null)

  const [active, setActive] = useState(1)
  const [isPaused, setIsPaused] = useState(false)
  const n = items.length || 1
  
  const next = () => setActive((i) => (i + 1) % n)
  const prev = () => setActive((i) => (i - 1 + n) % n)

  // Auto scroll functionality
  useEffect(() => {
    if (!isPaused) {
      const interval = setInterval(() => {
        next();
      }, autoScrollInterval);

      return () => clearInterval(interval);
    }
  }, [isPaused, autoScrollInterval, n]);

  // If no items were passed in, fetch resident cards from Strapi
  useEffect(() => {
    if (initialItems && initialItems.length > 0) return

    let mounted = true
    const fetchData = async () => {
      setLoading(true)
      setError(null)
      try {
        const res = await fetch(
          "https://proper-friendship-29e4bdb47f.strapiapp.com/api/resident-cards?populate=*"
        )
        if (!res.ok) throw new Error(`Failed to fetch: ${res.status}`)
        const json = await res.json()
        const data = Array.isArray(json?.data) ? json.data : []
        const mapped: Item[] = data.map((d: any) => {
          const image = d.image || d.attributes?.image || null
          // prefer thumbnail/small when available
          const url = image?.formats?.thumbnail?.url ?? image?.formats?.small?.url ?? image?.url ?? null
          return {
            id: d.id,
            name: d.name ?? d.attributes?.name ?? "",
            sub: d.short_intro ?? d.attributes?.short_intro ?? "",
            avatarUrl: url,
          }
        })
        if (mounted) setItems(mapped)
      } catch (err: any) {
        if (mounted) setError(err?.message ?? "Unknown error")
      } finally {
        if (mounted) setLoading(false)
      }
    }

    fetchData()
    return () => {
      mounted = false
    }
  }, [initialItems])

  // Pause on hover
  const handleMouseEnter = () => setIsPaused(true);
  const handleMouseLeave = () => setIsPaused(false);

  const slotOf = (i: number) => {
    const rel = (i - active + n) % n
    if (rel === 0) return "center"
    if (rel === 1) return "right"
    if (rel === n - 1) return "left"
    return "hidden"
  }

  // Responsive offset logic for the side cards:
  // - On mobile: modest +/- translate to keep center truly centered
  // - On md+: larger +/- translate to show the side cards clearly
  const slotClass = (slot: string) => {
    switch (slot) {
      case "center":
        return "z-30 scale-100 opacity-100 -translate-x-[100px] sm:-translate-x-[80px] md:-translate-x-[120px] lg:-translate-x-[160px]"
      case "left":
        return [
          "z-20 opacity-80",
          "-translate-x-[220px] mx-10 sm:-translate-x-[240px] md:-translate-x-[320px] lg:-translate-x-[400px] ",
          "scale-[0.8] sm:scale-[0.88] md:scale-[0.9] lg:scale-[0.92]",
        ].join(" ")
      case "right":
        return [
          "z-20 opacity-80",
          "translate-x-[10px] -mx-10 sm:translate-x-[80px] md:translate-x-[80px] lg:translate-x-[80px] ",
          "scale-[0.8] sm:scale-[0.88] md:scale-[0.9] lg:scale-[0.92]",
        ].join(" ")
      default:
        return "opacity-0 pointer-events-none scale-90"
    }
  }

  return (
    <section className="relative w-full overflow-hidden">
      {/* Background (only when provided) */}
      {background && (
        <div className="absolute inset-0 -z-10">
          <Image
            src={background}
            alt=""
            fill
            priority
            className="object-cover scale-105"
          />
          <div className="absolute inset-0" />
        </div>
      )}

      <div className="mx-auto max-w-7xl  overflow-hidden px-2 sm:px-4 md:px-20 py-8 sm:py-12 md:py-8  ">
        <div 
          className="relative h-[320px] md:h-[480px] flex items-center justify-center  md:mr-20"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}>
          {/* Cards — centered on mobile; slight left bias only from md+ */}
          <div
            className="relative w-full h-full flex items-center justify-center "
          >
            {items.map((m, i) => {
              const slot = slotOf(i)
              return (
                <article
                  key={m.id}
                  className={[
                    "absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2",
                    // Card sizing tuned for all screens
                    "w-[200px]  md:w-[446px] ",
                    "h-[240px]  md:h-[480px] ",
                    "transition-all duration-500 ease-in will-change-transform",
                    slotClass(slot),
                  ].join(" ")}
                >
                  <GlassCard item={m} emphasis={slot === "center"} />
                </article>
              )
            })}
          </div>


        </div>
      </div>
    </section>
  )
}

function GlassCard({ item, emphasis }: { item: Item; emphasis: boolean }) {
  return (
    <div
      className={[
        "h-full rounded-[24px] sm:rounded-[28px] md:rounded-[77px] border",
        "bg-gray-500 border-white/40 backdrop-blur-xl shadow-[0_12px_30px_rgba(0,0,0,0.25)]",
        "bg-[linear-gradient(180deg,rgba(255,255,255,0.9)_0%,rgba(255,255,255,0.72)_60%,rgba(255,255,255,0.6)_100%)]",
      ].join(" ")}
    >
      <div className="h-full flex flex-col items-center justify-between px-3 py-8 sm:px-5 md:px-6">
       
        {item.avatarUrl ? (
          <div className="">
            <Image
              src={item.avatarUrl}
              alt={`${item.name} logo`}
              width={160}
              height={160}
              className="rounded-full w-[110px] h-[110px] sm:w-[110px] md:my-8 md:w-[200px] md:h-[200px] object-cover"
            />
          </div>
        ) : (
          <div className="mb-2 sm:mb-3 md:mb-6 w-[60px] h-[60px] sm:w-[110px] sm:h-[110px] md:w-[140px] md:h-[140px] rounded-full bg-black" />
        )}
        <div>
        <h3
          className={[
            "font-['Goudy Old Style'] text-center font-bold leading-none",
            emphasis
              ? "text-2xl md:text-4xl"
              : "text-2xl md:text-4xl",
          ].join(" ")}
        >
          {item.name}
        </h3>
        <p className="mt-1 sm:mt-2 text-center font-['Goudy Old Style'] text-xl   md:text-2xl text-black/70">
          {item.sub}
        </p>
       </div>
      </div>
    </div>
  )
}