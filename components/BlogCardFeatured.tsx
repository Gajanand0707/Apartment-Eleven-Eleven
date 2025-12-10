"use client"

import Image from "next/image"
import Link from "next/link"

interface BlogCardFeaturedProps {
  blog: {
    id: string | number
    title: string
    subtitle?: string
    description: string
    imageUrl: string
    readMoreUrl?: string
  }
}

export function BlogCardFeatured({ blog }: BlogCardFeaturedProps) {
  return (
    <Link href={blog.readMoreUrl || "#"}>
      <div className="rounded-[56px] border-2 border-gray-800 overflow-hidden bg-white hover:shadow-lg transition-shadow cursor-pointer">
        {/* Large Image */}
        <div className="relative w-full h-[300px] md:h-screen">
          <Image src={blog.imageUrl || "/placeholder.svg"} alt={blog.title} fill className="object-cover" />
        </div>

        {/* Content */}
        <div className="p-14 flex flex-col items-end justify-between">
          <h3 className="text-2xl md:text-4xl font-['OPTIGoudy_Agency'] text-center w-full font-bold text-black mb-4">{blog.title}</h3>
          {blog.subtitle && (
            <p className="text-xl md:text-2xl font-['Goudy_Old_Style'] text-center w-full font-bold text-black mb-4 line-clamp-2">
              {blog.subtitle}
            </p>
          )}
          <p className=" text-[20px] md:text-2xl font-['Goudy_Bookletter_1911'] text-center w-full leading-relaxed mb-4">{blog.description}</p>
          <span className="text-blue-500 font-['Goudy_Bookletter_1911']  text-xl md:text-2xl hover:underline pointer-events-none">
            Read more...
          </span>
        </div>
      </div>
    </Link>
  )
}
