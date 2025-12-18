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
  opacity: number;
}

export function SpiralAnimation({
  images,
  duration = 20,
  showPath = true,
  speed = 0.8,
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
    window.addEventListener("resize", update)
    return () => {
      ro.disconnect()
      window.removeEventListener("resize", update)
    }
  }, [])

  const totalImages = Math.min(images.length, 10)

  useLayoutEffect(() => {
    if (!mounted || !pathRef.current) return

    tweensRef.current.forEach((t) => t.kill())
    tweensRef.current = []

    const path = pathRef.current
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

      gsap.set(el, {
        scale: 0,

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
        opacity: 1,
      })

      tweensRef.current.push(tween)
    }

    // Apply speed (timeScale) to all tweens
    tweensRef.current.forEach((t) => t.timeScale(speed))

    return () => {
      tweensRef.current.forEach((t) => t.kill())
      tweensRef.current = []
    }
  }, [mounted, containerSize.width, totalImages, duration, speed, direction])

  if (!mounted) return null

  // Use the original SVG viewBox (user coordinate system) and keep
  // rendering responsive via CSS aspect-ratio (padding-top).
  const originalW = 6000
  const originalH = 3400

  // Unscaled golden spiral path (original coordinates)
  const pathD = `M1.03,3402.5c0,-1864.37,1492.96,-3400,3402.94,-3400c1155.3,0,2100,927.52,2100,2100c0,737.13,-600.75,1300,-1300,1300c-472.93,0,-800,-400,-800,-800c0,-309.06,252.94,-500,500,-500c152.94,0,295.59,150.04,300,300c2.94,100,-100,200,-202.94,200c-47.06,0,-97.06,-50,-97.06,-100`

  return (
    <div className="relative w-full flex justify-center items-center bg-[#D8CCBA] py-10 z-10">
      <style>{`
        // @keyframes imageAppear {
        //   0% { opacity: 0; }
        //   1% { opacity: 1; }
        //   100% { opacity: 1; }
        // }

        .spiral-container {
          position: relative;
          width: 100%;
          margin-left: 5rem;
          height: 0;
          padding-top: ${(originalH / originalW) * 100}%;
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
          -webkit-object-fit: cover;
          object-position: center;
          -webkit-object-position: center;
          width: 100%;
          height: 100%;
          display: block;
          -webkit-transform: translate3d(0,0,0);
          transform: translate3d(0,0,0);
        }

        .pseudo-box{
        position: absolute;
        top: 100%;
        left: 0%;
        width: 150px;
        height:250px;
        transform: translate(-50%, 0%);
        background: #D8CCBA;
        pointer-events: none;
        z-index: 9999;
        }

        @media(max-width: 768px) {
        .spiral-image {
          width: 45px;
          height: 45px;}
.spiral-container {
          margin-left: 2rem;
           margin-right: 2rem;
           left:-30px;
        }
          .spiral-imagex {
    width: 110%;
    margin: 0 auto;
    left: -15px !important;
    top: -9px !important;
}
          }
      `}</style>

      <div ref={outerRef} className="sm:w-full w-[70%] sm:me-0 me-[-30px] max-w-[600px]">
        <div className="spiral-container">
          <div className="pseudo-box"></div>
          <svg
            className="absolute top-0 opacity-0 left-0 w-full h-full"
            viewBox={`0 0 ${originalW} ${originalH}`}
            preserveAspectRatio="xMidYMid meet"
          >
            <g opacity="0.55">
              <polyline
                points="3400,0 3400,3400 "
                fill="none"
                stroke={squaresStroke}
                strokeWidth={"3px"}
              />
              <line
                x1="3400" y1="2100" x2="5500" y2="2100"
                stroke={squaresStroke}
                strokeWidth={"3px"}
              />
              <line
                x1="4200" y1="2100" x2="4200" y2="3400"
                stroke={squaresStroke}
                strokeWidth={"3px"}
              />
              <polyline
                points="4200,2600 3900,2600 3400,2600"
                fill="none"
                stroke={squaresStroke}
                strokeWidth={"3px"}
              />
              <line
                x1="3900" y1="2600" x2="3900" y2="2100"
                stroke={squaresStroke}
                strokeWidth={"3px"}
              />
              <line
                x1="3900" y1="2400" x2="4200" y2="2400"
                stroke={squaresStroke}
                strokeWidth={"3px"}
              />
              <line
                x1="4000" y1="2400" x2="4000" y2="2600"
                stroke={squaresStroke}
                strokeWidth={"3px"}
              />
              <line
                x1="4000" y1="2500" x2="3900" y2="2500"
                stroke={squaresStroke}
                strokeWidth={"3px"}
              />
            </g>
            <path
              ref={pathRef}
              d={pathD}
              fill="none"
              stroke={showPath ? "rgba(59,130,246,1)" : "transparent"}
              strokeWidth={showPath ? "4px" : 0}
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <img src="/SpiralAnimation.svg" className="spiral-imagex" alt="" style={{
            top: "-15px",
            position: "absolute",
            left: "-35px",
            width: "109%"}} />
          {images.slice(0, totalImages).map((image, index) => {
            const delay = (index / totalImages) * duration
            return (
              <div
                key={index}
                ref={(el) => { imageRefs.current[index] = el }}
                className="spiral-image"
                style={{
                  // Keep opacity behavior via CSS keyframes
                  animation: `imageAppear ${duration / speed}s linear infinite`,
                  animationDelay: `${delay / speed}s`,
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