"use client"

import Image from "next/image"
import Link from "next/link"

interface BlogCardFeaturedProps {
  blog: {
    id: string | number
    title: string
    description: string
    imageUrl: string
    readMoreUrl?: string
  }
}

export function BlogCardFeatured({ blog }: BlogCardFeaturedProps) {
  return (
  <div className="rounded-[56px] border-2 border-gray-800 overflow-hidden bg-white hover:shadow-lg transition-shadow">
      {/* Large Image */}
      <div className="relative w-full md:h-screen">
        <Image src={blog.imageUrl || "/placeholder.svg"} alt={blog.title} fill className="object-cover" />
      </div>

      {/* Content */}
      <div className="p-14 flex flex-col items-end">
        <h3 className="text-2xl md:text-4xl font-['OPTIGoudy_Agency'] text-center underline w-full font-bold text-gray-900 mb-4">{blog.title}</h3>
        <p className=" text-[20px] md:text-2xl font-['Goudy_Bookletter_1911'] text-center w-full leading-relaxed mb-4">{blog.description}</p>
        <Link href={blog.readMoreUrl || "#"} className="text-blue-500 font-['Goudy_Bookletter_1911'] underline text-xl md:text-2xl hover:underline">
          Read more...
        </Link>
      </div>
    </div>
  )
}
