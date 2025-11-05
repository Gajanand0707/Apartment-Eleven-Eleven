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

  // Generate keyframes for each image's spiral path
  const generateKeyframes = () => {
    let keyframesText = ""

    for (let imageIndex = 0; imageIndex < totalImages; imageIndex++) {
      keyframesText += `@keyframes spiralPath${imageIndex} {`

      // Create path from center outward following spiral
      for (let step = 0; step <= 100; step += 2) {
        const progress = step / 100
        // Anticlockwise spiral: angle decreases as radius increases
        const angle = -progress * Math.PI * 4 + (imageIndex / totalImages) * Math.PI * 2
        const radius = progress * 250
        const x = 300 + radius * Math.cos(angle)
        const y = 300 + radius * Math.sin(angle)

        keyframesText += `${step}% { left: ${x}px; top: ${y}px; }`
      }

      keyframesText += `}`
    }

    return keyframesText
  }

  return (
    <div className="relative w-full h-[462px] overflow-hidden bg-[#D8CCBA] flex items-center justify-center">
      <style>{`
        @keyframes imageAppear {
          0% { opacity: 0; }
          5% { opacity: 1; }
          95% { opacity: 1; }
          100% { opacity: 0; }
        }

        .spiral-container {
          position: relative;
          width: 600px;
          height: 600px;
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

        ${generateKeyframes()}
      `}</style>

      {/* Spiral Container */}
      <div className="spiral-container">
        {/* SVG Spiral Line - Static */}
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

        {images.map((image, index) => {
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
  )
}
// "use client";

// import { useEffect, useRef } from "react";
// import { motion, useAnimation } from "framer-motion";
// import Image from "next/image";
// import img1 from "../public/ideas1.png";
// import img2 from "../public/ideas2.png";
// import img3 from "../public/ideas3.png";

// export default function AnimatedPathImages() {
//   const controls = useAnimation();
//   const pathRef = useRef<SVGPathElement | null>(null);

//   // Animate along the path continuously
//   useEffect(() => {
//     const animate = async () => {
//       while (true) {
//         await controls.start({
//           pathLength: [0, 1],
//           transition: { duration: 10, ease: "easeInOut" },
//         });
//         await controls.start({
//           pathLength: [1, 0],
//           transition: { duration: 10, ease: "easeInOut" },
//         });
//       }
//     };
//     animate();
//   }, [controls]);

//   // Function to compute positions along the path
//   const getPathPoint = (progress: number) => {
//     if (!pathRef.current) return { x: 0, y: 0 };
//     const path = pathRef.current;
//     const length = path.getTotalLength();
//     const point = path.getPointAtLength(progress * length);
//     return { x: point.x, y: point.y };
//   };

//   return (
//     <div className="relative w-full h-[500px] flex items-center justify-center bg-gray-900 overflow-hidden rounded-2xl">
//       {/* SVG Path */}
//       <svg
//         viewBox="0 0 800 400"
//         className="absolute w-full h-full"
//         xmlns="http://www.w3.org/2000/svg"
//       >
//         <path
//           ref={pathRef}
//           d="M 50 300 C 200 100, 600 100, 750 300"
//           fill="transparent"
//           stroke="rgba(255,255,255,0.2)"
//           strokeWidth="3"
//         />
//       </svg>

//       {/* Moving Images */}
//       {[img1, img2, img3].map((img, index) => {
//         const offset = index * 0.33; // stagger positions
//         return (
//           <motion.div
//             key={index}
//             className="absolute"
//             animate={{
//               x: [0, 1],
//               transition: {
//                 repeat: Infinity,
//                 repeatType: "reverse",
//                 duration: 10,
//                 ease: "easeInOut",
//               },
//             }}
//             style={{
//               translateX: "-50%",
//               translateY: "-50%",
//             }}
//           >
//             <PathFollower
//               pathRef={pathRef}
//               duration={10}
//               offset={offset}
//               image={img}
//             />
//           </motion.div>
//         );
//       })}
//     </div>
//   );
// }

// function PathFollower({
//   pathRef,
//   duration,
//   offset,
//   image,
// }: {
//   pathRef: React.RefObject<SVGPathElement>;
//   duration: number;
//   offset: number;
//   image: any;
// }) {
//   const divRef = useRef<HTMLDivElement | null>(null);

//   useEffect(() => {
//     let frameId: number;
//     const startTime = performance.now();

//     const animate = (time: number) => {
//       if (!pathRef.current || !divRef.current) return;
//       const path = pathRef.current;
//       const totalLength = path.getTotalLength();

//       const elapsed = ((time - startTime) / 1000) % duration;
//       const progress = ((elapsed / duration) + offset) % 1;

//       const point = path.getPointAtLength(progress * totalLength);
//       divRef.current.style.transform = `translate(${point.x}px, ${point.y}px)`;

//       frameId = requestAnimationFrame(animate);
//     };

//     frameId = requestAnimationFrame(animate);
//     return () => cancelAnimationFrame(frameId);
//   }, [pathRef, duration, offset]);

//   return (
//     <div ref={divRef} className="absolute w-16 h-16">
//       <Image
//         src={image}
//         alt="moving"
//         className="w-full h-full object-contain rounded-full shadow-lg"
//       />
//     </div>
//   );
// }
