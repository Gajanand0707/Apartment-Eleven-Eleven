"use client"
import Image from "next/image"
import { useEffect, useRef, useState } from "react"

interface SpiralAnimationProps {
  images: string[]
  duration?: number
  lineImage?: string
  lineImageSize?: number
  turns?: number
  radius?: number
  center?: { x: number; y: number }
  pathD?: string
  pathViewBox?: string
  showPath?: boolean
  containerWidth?: number
  containerHeight?: number
  radiusX?: number
  radiusY?: number
  radialExponent?: number
  angleOffsetDeg?: number
  reverse?: boolean
  lineImageFit?: "contain" | "cover"
  lineImageOpacity?: number
  guidelineColor?: string
  guidelineWidth?: number
  pathTransform?: {
    scaleX?: number
    scaleY?: number
    translateX?: number
    translateY?: number
    rotateDeg?: number
    pivotX?: number
    pivotY?: number
  }
}

export function SpiralAnimation({
  images,
  duration = 25,
  lineImage,
  lineImageSize = 600,
  turns = 2,
  radius = 250,
  center,
  pathD,
  pathViewBox,
  showPath = false,
  containerWidth,
  containerHeight,
  radiusX,
  radiusY,
  radialExponent = 1,
  angleOffsetDeg = 0,
  reverse = false,
  lineImageFit = "contain",
  lineImageOpacity = 1,
  guidelineColor = "rgba(59,130,246,0.2)",
  guidelineWidth = 2,
  pathTransform,
}: SpiralAnimationProps) {
  const [mounted, setMounted] = useState(false)
  const [keyframesCSS, setKeyframesCSS] = useState("")
  const pathRef = useRef<SVGPathElement | null>(null)
  const outerRef = useRef<HTMLDivElement | null>(null)
  const [measuredWidth, setMeasuredWidth] = useState<number | null>(null)

  useEffect(() => {
    setMounted(true)
  }, [])

  // Measure the parent width to fill the div; height defaults to width for a square
  useEffect(() => {
    if (!outerRef.current) return
    const el = outerRef.current
    const update = () => setMeasuredWidth(Math.max(0, Math.floor(el.getBoundingClientRect().width)))
    update()
    const ro = new ResizeObserver(update)
    ro.observe(el)
    return () => ro.disconnect()
  }, [])

  const totalImages = Math.min(images.length, 12)
  const cW = containerWidth ?? measuredWidth ?? lineImageSize
  const cH = containerHeight ?? cW
  const cx = center?.x ?? cW / 2
  const cy = center?.y ?? cH / 2
  const fallbackRadius = Math.max(0, Math.min(cW, cH) / 2 - 16)
  const rx = (radiusX ?? radius ?? fallbackRadius)
  const ry = (radiusY ?? radius ?? fallbackRadius)
  const angleOffset = (angleOffsetDeg * Math.PI) / 180

  // Generate keyframes (path-based if provided, else parametric spiral)
  useEffect(() => {
    if (!mounted) return
    let css = ""
    const steps = 100

    if (pathD && pathRef.current) {
      const path = pathRef.current
      try {
        const totalLen = path.getTotalLength()
        for (let imageIndex = 0; imageIndex < totalImages; imageIndex++) {
          css += `@keyframes spiralPath${imageIndex} {`
          for (let step = 0; step <= steps; step++) {
            const progress = step / steps
            const d = progress * totalLen
            const ptRaw = path.getPointAtLength(d)
            const sx = pathTransform?.scaleX ?? 1
            const sy = pathTransform?.scaleY ?? 1
            const tx = pathTransform?.translateX ?? 0
            const ty = pathTransform?.translateY ?? 0
            const theta = ((pathTransform?.rotateDeg ?? 0) * Math.PI) / 180
            const px = pathTransform?.pivotX ?? 0
            const py = pathTransform?.pivotY ?? 0
            const cosT = Math.cos(theta)
            const sinT = Math.sin(theta)
            let x1 = px + (ptRaw.x - px) * sx
            let y1 = py + (ptRaw.y - py) * sy
            const xr = px + (x1 - px) * cosT - (y1 - py) * sinT
            const yr = py + (x1 - px) * sinT + (y1 - py) * cosT
            const xf = xr + tx
            const yf = yr + ty
            css += `${step}% { left: ${xf}px; top: ${yf}px; }`
          }
          css += `}`
        }
      } catch {
        // Fallback to parametric if path API fails
        for (let imageIndex = 0; imageIndex < totalImages; imageIndex++) {
          css += `@keyframes spiralPath${imageIndex} {`
          for (let step = 0; step <= steps; step++) {
            const progress = step / steps
            const dir = reverse ? 1 : -1
            const angle = dir * progress * Math.PI * (turns * 2) + (imageIndex / totalImages) * Math.PI * 2 + angleOffset
            const rFactor = Math.pow(progress, radialExponent)
            const x = cx + rx * rFactor * Math.cos(angle)
            const y = cy + ry * rFactor * Math.sin(angle)
            css += `${step}% { left: ${x}px; top: ${y}px; }`
          }
          css += `}`
        }
      }
    } else {
      for (let imageIndex = 0; imageIndex < totalImages; imageIndex++) {
        css += `@keyframes spiralPath${imageIndex} {`
        for (let step = 0; step <= steps; step++) {
          const progress = step / steps
          const dir = reverse ? 1 : -1
          const angle = dir * progress * Math.PI * (turns * 2) + (imageIndex / totalImages) * Math.PI * 2 + angleOffset
          const rFactor = Math.pow(progress, radialExponent)
          const x = cx + rx * rFactor * Math.cos(angle)
          const y = cy + ry * rFactor * Math.sin(angle)
          css += `${step}% { left: ${x}px; top: ${y}px; }`
        }
        css += `}`
      }
    }

    setKeyframesCSS(css)
  }, [mounted, pathD, totalImages, cx, cy, radius, turns, rx, ry, angleOffset, radialExponent, reverse, pathTransform])

  if (!mounted) return null

  // Fallback guide path matching parametric settings
  const guideSteps = 200
  let guidePathD = `M ${cx} ${cy - ry}`
  for (let s = 0; s <= guideSteps; s++) {
    const t = s / guideSteps
    const dir = reverse ? 1 : -1
    const angle = dir * t * Math.PI * (turns * 2) + angleOffset
    const rFactor = Math.pow(t, radialExponent)
    const x = cx + rx * rFactor * Math.cos(angle)
    const y = cy + ry * rFactor * Math.sin(angle)
    guidePathD += ` L ${x} ${y}`
  }

  return (
    <div className="relative w-full h-auto overflow-hidden bg-[#D8CCBA] flex items-center justify-center">
      <style>{`
        @keyframes imageAppear {
          0% { opacity: 0; }
          5% { opacity: 1; }
          95% { opacity: 1; }
          100% { opacity: 0; }
        }

        .spiral-container {
          position: relative;
          width: ${cW}px;
          height: ${cH}px;
        }

        .spiral-line {
          position: absolute;
          width: 100%;
          height: 100%;
          top: 0;
          left: 0;
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

        .spiral-image.small {
          width: 55px;
          height: 55px;
        }

        .spiral-image img {
          object-fit: cover;
          width: 100%;
          height: 100%;
        }

        ${keyframesCSS}
      `}</style>

      {/* Spiral Container */}
      <div ref={outerRef} className="w-full">
        <div className="spiral-container">
          {lineImage ? (
            <div className="spiral-line">
              <Image
                src={lineImage}
                alt="Spiral guide line"
                fill
                className=""
                style={{ objectFit: lineImageFit, opacity: lineImageOpacity }}
                priority
              />
            </div>
          ) : (
            <svg className="spiral-line" viewBox={`0 0 ${cW} ${cH}`} preserveAspectRatio="xMidYMid meet">
              <path
                d={guidePathD}
                stroke={guidelineColor}
                strokeWidth={guidelineWidth}
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          )}

          {pathD && (
            <svg
              className="spiral-line"
              viewBox={pathViewBox ?? `0 0 ${cW} ${cH}`}
              preserveAspectRatio="none"
            >
              <path
                ref={pathRef}
                d={pathD}
                fill="none"
                stroke={showPath ? "rgba(59,130,246,0.4)" : "transparent"}
                strokeWidth={showPath ? 2 : 0}
              />
            </svg>
          )}

          {images.slice(0, totalImages).map((image, index) => {
            const delay = (index / totalImages) * duration
            const isLarge = index < 3

            return (
              <div
                key={index}
                className={`spiral-image ${!isLarge ? "small" : ""}`}
                style={{
                  animation: `spiralPath${index} ${duration}s linear infinite, imageAppear ${duration}s linear infinite`,
                  animationDelay: `${delay}s`,
                }}
              >
                <Image
                  src={image || "/placeholder.svg?height=100&width=100&query=profile"}
                  alt={`Spiral image ${index + 1}`}
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


