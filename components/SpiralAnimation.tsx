
"use client"
import Image from "next/image"
import { useEffect, useRef, useState } from "react"

interface SpiralAnimationProps {
  images: string[]
  duration?: number
  showPath?: boolean
}

export function SpiralAnimation({
  images,
  duration = 25,
  showPath = true,
}: SpiralAnimationProps) {
  const [mounted, setMounted] = useState(false)
  const [keyframesCSS, setKeyframesCSS] = useState("")
  const pathRef = useRef<SVGPathElement | null>(null)
  const outerRef = useRef<HTMLDivElement | null>(null)
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
      const isMobile = rectWidth < 500
      const width = isMobile ? rectWidth * 0.8 : rectWidth
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
  const steps = 100

  useEffect(() => {
    if (!mounted || !pathRef.current) return
    const path = pathRef.current
    const totalLen = path.getTotalLength()
    let css = ""

    for (let imageIndex = 0; imageIndex < totalImages; imageIndex++) {
      css += `@keyframes spiralPath${imageIndex} {`
      for (let step = 0; step <= steps; step++) {
        const progress = step / steps
        // Reverse the traversal along the path so images move anticlockwise
        const d = (1 - progress) * totalLen
        const pt = path.getPointAtLength(d)
        css += `${step}% { left: ${pt.x}px; top: ${pt.y}px; }`
      }
      css += `}`
    }

    setKeyframesCSS(css)
  }, [mounted, totalImages, containerSize])

  if (!mounted) return null

  // Golden Spiral Path (like image)
  const w = containerSize.width
  const h = containerSize.height

  // We'll draw a sequence of arcs for the spiral, and make the final (innermost)
  // segment a full circle so it appears circular like the rest of the spiral.
  const innerR = h * 0.13
  const innerCx = w - h * 0.5
  const innerCy = h - h * 0.5

  const pathD = `
    M0,${h}
    A${h},${h} 0 0,1 ${h},0
    M${h},0
    A${h * 0.62},${h * 0.62} 0 0,1 ${w},${h * 0.62}
    M${w},${h * 0.62}
    A${h * 0.38},${h * 0.38} 0 0,1 ${w - h * 0.38},${h}
    M${w - h * 0.38},${h}
    A${h * 0.22},${h * 0.22} 0 0,1 ${w - h * 0.62},${h - h * 0.38}
    M${w - h * 0.62},${h - h * 0.38}
    <!-- replace final partial arc with a full circular path -->
    M ${innerCx + innerR}, ${innerCy}
    A ${innerR},${innerR} 0 1,0 ${innerCx - innerR},${innerCy}
    A ${innerR},${innerR} 0 1,0 ${innerCx + innerR},${innerCy}
  `

  return (
    <div className="relative w-full flex justify-center items-center bg-[#D8CCBA] py-10">
      <style>{`
        @keyframes imageAppear {
          0% { opacity: 0; }
          5% { opacity: 1; }
          95% { opacity: 1; }
          100% { opacity: 0; }
        }

        .spiral-container {
          position: relative;
          width: ${containerSize.width}px;
          height: ${containerSize.height}px;
        }

        .spiral-image {
          position: absolute;
          width: 90px;
          height: 90px;
          border-radius: 50%;
          overflow: hidden;
          border: 3px solid rgba(59, 130, 246, 0.8);
          box-shadow: 0 0 25px rgba(59, 130, 246, 0.6);
          display: flex;
          align-items: center;
          justify-content: center;
          background: rgba(15, 23, 42, 0.5);
          transform: translate(-50%, -50%);
        }

        .spiral-image img {
          object-fit: cover;
          width: 100%;
          height: 100%;
        }

        ${keyframesCSS}
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
                className="spiral-image"
                style={{
                  animation: `spiralPath${index} ${duration}s linear infinite, imageAppear ${duration}s linear infinite`,
                  animationDelay: `${delay}s`,
                  // keep the element at the first keyframe while animation is delayed
                  animationFillMode: "both",
                  willChange: "left, top, transform",
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
