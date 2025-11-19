"use client"
import Image from "next/image"
import { useEffect, useLayoutEffect, useRef, useState } from "react"
import gsap from "gsap"
import { MotionPathPlugin } from "gsap/MotionPathPlugin"

// Ensure MotionPathPlugin is registered before any animations
if (typeof window !== "undefined") {
  gsap.registerPlugin(MotionPathPlugin)
}

interface SpiralAnimationProps {
  images: string[]
  duration?: number // base loop duration in seconds
  showPath?: boolean
  speed?: number // timeline speed multiplier (1 = normal)
  direction?: "innerToOuter" | "outerToInner" // flip travel along the path
  orientation?: "cw" | "ccw" // clockwise vs counterclockwise spiral shape
  showSquares?: boolean // draw golden rectangle squares
  squaresStroke?: string // stroke color for squares
}

export function SpiralAnimation({
  images,
  duration = 20,
  showPath = true,
  speed = 1,
  direction = "innerToOuter",
  orientation = "cw",
  showSquares = true,
  squaresStroke = "#000000",
}: SpiralAnimationProps) {
  const [mounted, setMounted] = useState(false)
  const pathRef = useRef<SVGPathElement | null>(null)
  const outerRef = useRef<HTMLDivElement | null>(null)
  const imageRefs = useRef<Array<HTMLDivElement | null>>([])
  const tweensRef = useRef<gsap.core.Tween[]>([])
  const [containerSize, setContainerSize] = useState<{ width: number; height: number }>({
    width: 600,
    height: 370,
  })

  useEffect(() => {
    setMounted(true)
  }, [])

  // Measure parent container for responsive scaling
  useEffect(() => {
    if (!outerRef.current) return
    const el = outerRef.current
    const update = () => {
      const rect = el.getBoundingClientRect()
      const rectWidth = rect.width
      const isMobile = rectWidth < 768
      const scale = isMobile ? 0.6 : 1
      const width = rectWidth * scale
      setContainerSize({
        width,
        height: (width * 370) / 600,
      })
    }
    update()
    const ro = new ResizeObserver(update)
    ro.observe(el)
    return () => ro.disconnect()
  }, [])

  const totalImages = Math.min(images.length, 10)

  // Create/refresh GSAP tweens when size, images, or duration changes
  useLayoutEffect(() => {
    if (!mounted || !pathRef.current) return

    // Kill previous tweens
    tweensRef.current.forEach((t) => t.kill())
    tweensRef.current = []

    const path = pathRef.current

    // Set initial transform percent to center the element relative to its own size
    imageRefs.current.forEach((el) => {
      if (!el) return
      gsap.set(el, { xPercent: -50, yPercent: -50, transformOrigin: "50% 50%" })
    })

    const pathStart = direction === "innerToOuter" ? 1 : 0
    const pathEnd = direction === "innerToOuter" ? 0 : 1

    for (let index = 0; index < totalImages; index++) {
      const el = imageRefs.current[index]
      if (!el) continue
      const delay = (duration / totalImages) * index

      // Place at the starting point on the path (inner center) and scale small
      gsap.set(el, {
        scale: 0.1,
        xPercent: -50,
        yPercent: -50,
        transformOrigin: "50% 50%",
        motionPath: {
          path,
          start: pathStart,
          end: pathStart,
          align: path,
          alignOrigin: [0.5, 0.5],
          autoRotate: false,
        },
      })

      // Animate from inner (1) to outer (0) while scaling up
      const tween = gsap.to(el, {
        duration,
        ease: "none",
        repeat: -1,
        delay,
        motionPath: {
          path,
          start: pathStart,
          end: pathEnd,
          align: path,
          alignOrigin: [0.5, 0],
          autoRotate: false,
        },
        scale: 1,
      })

      tweensRef.current.push(tween)
    }

    // Apply speed (timeScale) to all tweens
    tweensRef.current.forEach((t) => t.timeScale(speed))

    return () => {
      tweensRef.current.forEach((t) => t.kill())
      tweensRef.current = []
    }
  }, [mounted, containerSize, totalImages, duration, speed, direction])

  if (!mounted) return null

  // Use the provided golden spiral path scaled to fit container
  const w = containerSize.width
  const h = containerSize.height
  
  // Original path coordinates from viewBox approximately 0 0 6800 3400
  const originalW = 6800
  const originalH = 3400
  
  // Scale factors to fit container
  const scaleX = w / originalW
  const scaleY = h / originalH
  
  // Use uniform scale to preserve spiral shape
  const scale = Math.min(scaleX, scaleY)
  
  // Center the scaled path
  const offsetX = (w - originalW * scale) / 2
  const offsetY = (h - originalH * scale) / 2

  // Golden spiral path from the provided SVG, scaled and positioned
  const pathD = `M${1.03 * scale + offsetX},${3402.5 * scale + offsetY}c0,${-1864.37 * scale},${1492.96 * scale},${-3400 * scale},${3402.94 * scale},${-3400 * scale}c${1155.3 * scale},0,${2100 * scale},${927.52 * scale},${2100 * scale},${2100 * scale}c0,${737.13 * scale},${-600.75 * scale},${1300 * scale},${-1300 * scale},${1300 * scale}c${-472.93 * scale},0,${-800 * scale},${-400 * scale},${-800 * scale},${-800 * scale}c0,${-309.06 * scale},${252.94 * scale},${-500 * scale},${500 * scale},${-500 * scale}c${152.94 * scale},0,${295.59 * scale},${150.04 * scale},${300 * scale},${300 * scale}c${2.94 * scale},${100 * scale},${-100 * scale},${200 * scale},${-202.94 * scale},${200 * scale}c${-47.06 * scale},0,${-97.06 * scale},${-50 * scale},${-97.06 * scale},${-100 * scale}`

  return (
    <div className="relative w-full flex justify-center items-center bg-[#D8CCBA] py-10">
      <style>{`
        @keyframes imageAppear {
          0% { opacity: 0; }
          2% { opacity: 1; }
          98% { opacity: 1; }
          100% { opacity: 0; }
        }

        .spiral-container {
          position: relative;
          width: 100%;
          margin-left: 2rem;
          height: ${containerSize.height}px;
        }

        .spiral-image {
          position: absolute;
          margin : 0;
          left: 0;
          top: 0;
          width: 90px;
          height: 90px;
          border-radius: 50%;
          overflow: hidden;
          display: flex;
          align-items: center;
          justify-content: center;
          background: rgba(15, 23, 42, 0.5);
        }

        .spiral-image img {
          object-fit: cover;
          width: 100%;
          height: 100%;
        }

        @media(max-width: 768px) {
        .spiral-image {
          width: 45px;
          height: 45px;}

          }
      `}</style>

      <div ref={outerRef} className="w-full max-w-[600px]">
        <div className="spiral-container">
          <svg
            className="absolute top-0 left-0 w-full h-full"
            viewBox={`0 0 ${containerSize.width} ${containerSize.height}`}
            preserveAspectRatio="xMidYMid meet"
          >
            <path
              ref={pathRef}
              d={pathD}
              fill="none"
              stroke={showPath ? "rgba(59,130,246,0.4)" : "transparent"}

              strokeWidth={showPath ? 2 : 0}
            />
          </svg>

          {images.slice(0, totalImages).map((image, index) => {
            const delay = (index / totalImages) * duration
            return (
              <div
                key={index}
                ref={(el) => { imageRefs.current[index] = el }}
                className="spiral-image"
                style={{
                  // Keep opacity behavior via CSS keyframes
                  animation: `imageAppear ${duration}s linear infinite`,
                  animationDelay: `${delay}s`,
                  animationFillMode: "both",
                  willChange: "transform, opacity",
                }}
              >
                <Image
                  src={image}
                  alt={`spiral-${index}`}
                  fill
                  className="object-cover"
                  priority={index < 3}
                />
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}