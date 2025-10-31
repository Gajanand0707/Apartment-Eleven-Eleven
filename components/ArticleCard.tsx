import Image from "next/image"
import Link from "next/link"
import type { Article } from "../types/article"

interface ArticleCardProps {
  article: Article
  imagePosition: "left" | "right"
}

export function ArticleCard({ article, imagePosition }: ArticleCardProps) {
  const isImageLeft = imagePosition === "left"

  return (
    <div className="flex items-center gap-0 bg-white rounded-[70] overflow-hidden border-2 border-gray-800 shadow-sm hover:shadow-md transition-shadow">
      {/* Image Container */}
      <div className={`flex-shrink-0 w-1/3 h-64 relative ${isImageLeft ? "order-1" : "order-2"}`}>
        <Image
          src={article.imageUrl || "/placeholder.svg"}
          alt={article.title}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 33vw"
        />
      </div>

      {/* Content Container */}
      <div className={`flex-1 p-8 ${isImageLeft ? "order-2" : "order-1"}`}>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">{article.title}</h2>

        <h3 className="text-sm font-semibold text-gray-700 mb-4">{article.subtitle}</h3>

        <p className="text-sm text-gray-600 mb-4 line-clamp-4">{article.description}</p>

        <Link
          href={article.readMoreUrl || "#"}
          className="text-blue-500 hover:text-blue-700 font-medium text-sm transition-colors"
        >
          Read more...
        </Link>
      </div>
    </div>
  )
}
