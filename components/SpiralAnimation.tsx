"use client"
import Image from "next/image"
import { useEffect, useState } from "react"

interface SpiralAnimationProps {
  images: string[]
  duration?: number
}

export function SpiralAnimation({ images, duration = 25 }: SpiralAnimationProps) {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  const totalImages = Math.min(images.length, 12)

  return (
    <div className="relative w-full h-[462px] overflow-hidden bg-[#D8CCBA] flex items-center justify-center">
      <style>{`
        @keyframes spiralMove {
          0% {
            transform: scale(1) rotate(0deg);
            opacity: 1;
          }
          100% {
            transform: scale(0.2) rotate(720deg);
            opacity: 0.3;
          }
        }

        @keyframes imageAppear {
          0% {
            opacity: 0;
            transform: scale(0);
          }
          5% {
            opacity: 1;
            transform: scale(1);
          }
          95% {
            opacity: 1;
            transform: scale(1);
          }
          100% {
            opacity: 0;
            transform: scale(0);
          }
        }

        .spiral-container {
          position: relative;
          width: 600px;
          height: 600px;
          animation: spiralMove ${duration}s linear infinite;
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
          left: 50%;
          top: 50%;
          border-radius: 50%;
          overflow: hidden;
          border: 3px solid rgba(59, 130, 246, 0.8);
          box-shadow: 0 0 25px rgba(59, 130, 246, 0.6);
          display: flex;
          align-items: center;
          justify-content: center;
          transform: translate(-50%, -50%);
          background: rgba(15, 23, 42, 0.5);
        }

        .spiral-image img {
          object-fit: cover;
          width: 100%;
          height: 100%;
        }
      `}</style>

      {/* Spiral Container */}
      <div className="spiral-container">
        {/* SVG Spiral Line */}
        <svg className="spiral-line" viewBox="0 0 600 600" preserveAspectRatio="xMidYMid meet">
          <defs>
            <linearGradient id="spiralGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.5" />
              <stop offset="100%" stopColor="#06b6d4" stopOpacity="0.5" />
            </linearGradient>
          </defs>
          <path
            d="M 300 50 A 250 250 0 0 1 300 550 A 200 200 0 0 1 300 100 A 150 150 0 0 1 300 500 A 100 100 0 0 1 300 150 A 50 50 0 0 1 300 450 A 25 25 0 0 1 300 300"
            stroke="url(#spiralGradient)"
            strokeWidth="2.5"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>

        {/* Images appearing sequentially on the spiral */}
        {images.map((image, index) => {
          const angle = (index / totalImages) * Math.PI * 6 // Spiral path angle
          const radius = 250 - (index / totalImages) * 180 // Moving inward
          const x = 300 + radius * Math.cos(angle)
          const y = 300 + radius * Math.sin(angle)

          // First 3 images are bigger
          const size = index < 3 ? 90 : 55

          // Stagger each image to appear one after another
          const delay = (index / totalImages) * duration

          return (
            <div
              key={index}
              className="spiral-image"
              style={{
                width: `${size}px`,
                height: `${size}px`,
                left: `${x}px`,
                top: `${y}px`,
                animation: `imageAppear ${duration}s linear infinite`,
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
  )
}
