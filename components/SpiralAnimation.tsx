

// "use client"
// import Image from "next/image"
// import { useEffect, useRef, useState } from "react"

// interface SpiralAnimationProps {
//   images: string[]
//   duration?: number
//   showPath?: boolean
// }

// export function SpiralAnimation({
//   images,
//   duration = 25,
//   showPath = true,
// }: SpiralAnimationProps) {
//   const [mounted, setMounted] = useState(false)
//   const [keyframesCSS, setKeyframesCSS] = useState("")
//   const pathRef = useRef<SVGPathElement | null>(null)
//   const outerRef = useRef<HTMLDivElement | null>(null)
//   const [containerSize, setContainerSize] = useState<{ width: number; height: number }>({
//     width: 600,
//     height: 370,
//   })

//   useEffect(() => {
//     setMounted(true)
//   }, [])

//   // Measure parent container for responsive scaling
//   useEffect(() => {
//     if (!outerRef.current) return
//     const el = outerRef.current
//     const update = () => {
//       const rect = el.getBoundingClientRect()
//       setContainerSize({
//         width: rect.width,
//         height: (rect.width * 370) / 600, // keep golden ratio
//       })
//     }
//     update()
//     const ro = new ResizeObserver(update)
//     ro.observe(el)
//     return () => ro.disconnect()
//   }, [])

//   const totalImages = Math.min(images.length, 10)
//   const steps = 100

//   useEffect(() => {
//     if (!mounted || !pathRef.current) return
//     const path = pathRef.current
//     const totalLen = path.getTotalLength()
//     let css = ""

//     for (let imageIndex = 0; imageIndex < totalImages; imageIndex++) {
//       css += `@keyframes spiralPath${imageIndex} {`
//       for (let step = 0; step <= steps; step++) {
//         const progress = step / steps
//         // Reverse the traversal along the path so images move anticlockwise
//         const d = (1 - progress) * totalLen
//         const pt = path.getPointAtLength(d)
//         css += `${step}% { left: ${pt.x}px; top: ${pt.y}px; }`
//       }
//       css += `}`
//     }

//     setKeyframesCSS(css)
//   }, [mounted, totalImages, containerSize])

//   if (!mounted) return null

//   // Golden Spiral Path (like image)
//   const w = containerSize.width
//   const h = containerSize.height

//   // We'll draw a sequence of arcs for the spiral, and make the final (innermost)
//   // segment a full circle so it appears circular like the rest of the spiral.
//   const innerR = h * 0.13
//   const innerCx = w - h * 0.5
//   const innerCy = h - h * 0.5

//   const pathD = `
//     M0,${h}
//     A${h},${h} 0 0,1 ${h},0
//     M${h},0
//     A${h * 0.62},${h * 0.62} 0 0,1 ${w},${h * 0.62}
//     M${w},${h * 0.62}
//     A${h * 0.38},${h * 0.38} 0 0,1 ${w - h * 0.38},${h}
//     M${w - h * 0.38},${h}
//     A${h * 0.22},${h * 0.22} 0 0,1 ${w - h * 0.62},${h - h * 0.38}
//     M${w - h * 0.62},${h - h * 0.38}
//     <!-- replace final partial arc with a full circular path -->
//     M ${innerCx + innerR}, ${innerCy}
//     A ${innerR},${innerR} 0 1,0 ${innerCx - innerR},${innerCy}
//     A ${innerR},${innerR} 0 1,0 ${innerCx + innerR},${innerCy}
//   `

//   return (
//     <div className="relative w-full flex justify-center items-center bg-[#D8CCBA] py-10">
//       <style>{`
//         @keyframes imageAppear {
//           0% { opacity: 0; }
//           5% { opacity: 1; }
//           95% { opacity: 1; }
//           100% { opacity: 0; }
//         }

//         .spiral-container {
//           position: relative;
//           width: ${containerSize.width}px;
//           height: ${containerSize.height}px;
//         }

//         .spiral-image {
//           position: absolute;
//           width: 90px;
//           height: 90px;
//           border-radius: 50%;
//           overflow: hidden;
//           border: 3px solid rgba(59, 130, 246, 0.8);
//           box-shadow: 0 0 25px rgba(59, 130, 246, 0.6);
//           display: flex;
//           align-items: center;
//           justify-content: center;
//           background: rgba(15, 23, 42, 0.5);
//           transform: translate(-50%, -50%);
//         }

//         .spiral-image img {
//           object-fit: cover;
//           width: 100%;
//           height: 100%;
//         }

//         ${keyframesCSS}
//       `}</style>

//       <div ref={outerRef} className="w-full max-w-[600px]">
//         <div className="spiral-container">
//           <svg
//             className="absolute top-0 left-0 w-full h-full"
//             viewBox={`0 0 ${containerSize.width} ${containerSize.height}`}
//             preserveAspectRatio="xMidYMid meet"
//           >
//             <path
//               ref={pathRef}
//               d={pathD}
//               fill="none"
//               stroke={showPath ? "rgba(59,130,246,0.4)" : "transparent"}
//               strokeWidth={showPath ? 2 : 0}
//             />
//           </svg>

//           {images.slice(0, totalImages).map((image, index) => {
//             const delay = (index / totalImages) * duration
//             return (
//               <div
//                 key={index}
//                 className="spiral-image"
//                 style={{
//                   animation: `spiralPath${index} ${duration}s linear infinite, imageAppear ${duration}s linear infinite`,
//                   animationDelay: `${delay}s`,
//                   // keep the element at the first keyframe while animation is delayed
//                   animationFillMode: "both",
//                   willChange: "left, top, transform",
//                 }}
//               >
//                 <Image
//                   src={image}
//                   alt={`spiral-${index}`}
//                   fill
//                   className="object-cover"
//                   priority={index < 3}
//                 />
//               </div>
//             )
//           })}
//         </div>
//       </div>
//     </div>
//   )
// }

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
          width: ${containerSize.width}px;
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
          border: 3px solid rgba(59, 130, 246, 0.8);
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
            {showSquares && (
              <g>
                {/* Golden rectangle squares from the provided SVG, scaled to fit container */}
                <rect 
                  x={3902.5 * scale + offsetX} 
                  y={2502.5 * scale + offsetY} 
                  width={100 * scale} 
                  height={100 * scale}
                  fill="none"
                  stroke={squaresStroke}
                  strokeWidth={1}
                />
                <rect 
                  x={3902.5 * scale + offsetX} 
                  y={2402.5 * scale + offsetY} 
                  width={100 * scale} 
                  height={100 * scale}
                  fill="none"
                  stroke={squaresStroke}
                  strokeWidth={1}
                />
                <rect 
                  x={4002.5 * scale + offsetX} 
                  y={2402.5 * scale + offsetY} 
                  width={200 * scale} 
                  height={200 * scale}
                  fill="none"
                  stroke={squaresStroke}
                  strokeWidth={1}
                />
                <rect 
                  x={3902.5 * scale + offsetX} 
                  y={2102.5 * scale + offsetY} 
                  width={300 * scale} 
                  height={300 * scale}
                  fill="none"
                  stroke={squaresStroke}
                  strokeWidth={1}
                />
                <rect 
                  x={3402.5 * scale + offsetX} 
                  y={2602.5 * scale + offsetY} 
                  width={800 * scale} 
                  height={800 * scale}
                  fill="none"
                  stroke={squaresStroke}
                  strokeWidth={1}
                />
                <rect 
                  x={4202.5 * scale + offsetX} 
                  y={2102.5 * scale + offsetY} 
                  width={1300 * scale} 
                  height={1300 * scale}
                  fill="none"
                  stroke={squaresStroke}
                  strokeWidth={1}
                />
                <rect 
                  x={3402.5 * scale + offsetX} 
                  y={2.5 * scale + offsetY} 
                  width={2100 * scale} 
                  height={2100 * scale}
                  fill="none"
                  stroke={squaresStroke}
                  strokeWidth={1}
                />
                <rect 
                  x={2.5 * scale + offsetX} 
                  y={2.5 * scale + offsetY} 
                  width={3400 * scale} 
                  height={3400 * scale}
                  fill="none"
                  stroke={squaresStroke}
                  strokeWidth={1}
                />
                <rect 
                  x={3402.5 * scale + offsetX} 
                  y={2102.5 * scale + offsetY} 
                  width={500 * scale} 
                  height={500 * scale}
                  fill="none"
                  stroke={squaresStroke}
                  strokeWidth={1}
                />
              </g>
            )}
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
