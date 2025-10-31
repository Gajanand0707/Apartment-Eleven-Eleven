"use client"
import blogcard from "../public/blogcard.png"
import { useState, useEffect, useRef } from "react"
import Image from "next/image"

const dummyTechnologyData = [
  { id: 1, title: "Blockchain Technology", description: "A framework for leveraging blockchain to enhance transparency and trust in transactions.", image: blogcard.src, link: "/blockchain" },
  { id: 2, title: "Artificial Intelligence", description: "A framework for utilizing AI to automate processes and improve decision-making.", image: blogcard.src, link: "/ai" },
  { id: 3, title: "Cloud Computing", description: "A framework for leveraging cloud services to improve scalability and flexibility.", image: blogcard.src, link: "/cloud" },
  { id: 4, title: "IoT (Internet of Things)", description: "A framework for connecting devices to create smart, automated environments.", image: blogcard.src, link: "/iot" },
  { id: 5, title: "5G Technology", description: "A framework for utilizing 5G networks to improve communication and connectivity.", image: blogcard.src, link: "/5g" },
]

export default function GrowthCard() {
  const scrollContainerRef = useRef<HTMLDivElement>(null)
  const [currentIndex, setCurrentIndex] = useState(0)
  const [canScrollLeft, setCanScrollLeft] = useState(false)
  const [canScrollRight, setCanScrollRight] = useState(true)

  useEffect(() => {
    setCanScrollLeft(currentIndex > 0)
    setCanScrollRight(currentIndex < dummyTechnologyData.length - 3)
  }, [currentIndex])

  const scroll = (direction: "left" | "right") => {
    if (direction === "left" && currentIndex > 0) setCurrentIndex(currentIndex - 1)
    else if (direction === "right" && currentIndex < dummyTechnologyData.length - 3) setCurrentIndex(currentIndex + 1)
  }

  const visibleCards = [
    dummyTechnologyData[currentIndex],
    dummyTechnologyData[currentIndex + 1],
    dummyTechnologyData[currentIndex + 2],
  ]

  return (
    <div className="bg-[#D5C7B3] py-16 px-4">
      {/* Section Title */}
      <div className="text-center mb-16">
        <h2 className="text-8xl font-bold font-[Payfair_Display] text-[#111] mb-4">Growth</h2>
        <div className="w-[547px] h-1 bg-[#111] mx-auto"></div>
        <div className="w-[503px] h-1 bg-[#111] mx-auto mt-2"></div>
      </div>

      {/* Carousel */}
      <div className="relative w-full flex items-center justify-center">
        {canScrollLeft && (
          <button
            onClick={() => scroll("left")}
            className="absolute left-2 top-1/2 -translate-y-1/2 z-20 bg-[#111] text-white p-4 rounded-full hover:bg-[#333] transition-colors"
            aria-label="Scroll left"
          >
            ←
          </button>
        )}

        <div className="w-full max-w-7xl px-6 md:px-12">
          {/* Increased overall height */}
          <div className="flex items-center justify-center relative h-[620px] md:h-[700px]">
            {/* Left Card — Bigger */}
            <div className="flex-shrink-0 w-80 md:w-96 lg:w-[26rem] h-[28rem] md:h-[30rem] lg:h-[32rem] scale-95 -mr-32 md:-mr-40 transition-all duration-300">
              <div className="h-full border-2 border-[#111] rounded-3xl overflow-hidden bg-white shadow-xl">
                <div className="relative w-full h-56 md:h-64 lg:h-72 overflow-hidden">
                  <Image
                    src={visibleCards[0].image || "/placeholder.svg"}
                    alt={visibleCards[0].title}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-5 flex flex-col h-[calc(100%-16rem)]">
                  <h3 className="text-xl md:text-2xl font-bold text-[#111] mb-2">{visibleCards[0].title}</h3>
                  <p className="text-[#333] text-sm md:text-base leading-relaxed flex-1 line-clamp-4">
                    {visibleCards[0].description}
                  </p>
                </div>
              </div>
            </div>

            {/* Center Card — Largest & on top */}
            <div className="flex-shrink-0 z-10 w-[26rem] md:w-[30rem] lg:w-[34rem] h-[32rem] md:h-[36rem] lg:h-[40rem] transition-all duration-300">
              <div className="h-full border-2 border-[#111] rounded-3xl overflow-hidden bg-white shadow-2xl">
                <div className="relative w-full h-72 md:h-80 lg:h-96 overflow-hidden">
                  <Image
                    src={visibleCards[1].image || "/placeholder.svg"}
                    alt={visibleCards[1].title}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-7 flex flex-col h-[calc(100%-20rem)]">
                  <h3 className="text-3xl md:text-4xl font-bold text-[#111] mb-3">{visibleCards[1].title}</h3>
                  <p className="text-[#333] text-base md:text-lg leading-relaxed flex-1 line-clamp-5">
                    {visibleCards[1].description}
                  </p>
                  <a
                    href={visibleCards[1].link}
                    className="inline-block text-[#111] font-semibold hover:underline mt-3 text-base md:text-lg"
                  >
                    Learn More →
                  </a>
                </div>
              </div>
            </div>

            {/* Right Card — Bigger */}
            <div className="flex-shrink-0 w-80 md:w-96 lg:w-[26rem] h-[28rem] md:h-[30rem] lg:h-[32rem] scale-95 -ml-32 md:-ml-40 transition-all duration-300">
              <div className="h-full border-2 border-[#111] rounded-3xl overflow-hidden bg-white shadow-xl">
                <div className="relative w-full h-56 md:h-64 lg:h-72 overflow-hidden">
                  <Image
                    src={visibleCards[2].image || "/placeholder.svg"}
                    alt={visibleCards[2].title}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-5 flex flex-col h-[calc(100%-16rem)]">
                  <h3 className="text-xl md:text-2xl font-bold text-[#111] mb-2">{visibleCards[2].title}</h3>
                  <p className="text-[#333] text-sm md:text-base leading-relaxed flex-1 line-clamp-4">
                    {visibleCards[2].description}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {canScrollRight && (
          <button
            onClick={() => scroll("right")}
            className="absolute right-2 top-1/2 -translate-y-1/2 z-20 bg-[#111] text-white p-4 rounded-full hover:bg-[#333] transition-colors"
            aria-label="Scroll right"
          >
            →
          </button>
        )}
      </div>
    </div>
  )
}
