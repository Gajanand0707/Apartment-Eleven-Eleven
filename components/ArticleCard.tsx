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
    <div className="flex items-stretch flex-col md:flex-row gap-0 bg-white rounded-3xl md:rounded-[56px] overflow-hidden border-2 border-gray-800 shadow-sm hover:shadow-md transition-shadow min-h-[400px] md:min-h-[300px]">
      {/* Image Container */}
      <div className={`flex-shrink-0 w-full md:w-2/5 h-[200px] md:h-auto relative ${isImageLeft ? "md:order-1" : "md:order-2"}`}>
        <Image
          src={article.imageUrl || "/placeholder.svg"}
          alt={article.title}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 40vw"
        />
      </div>

      {/* Content Container */}
      <div className={`flex-1 p-6 md:p-8 lg:p-10 flex flex-col justify-center ${isImageLeft ? "md:order-2" : "md:order-1"}`}>
        <h2 className="text-2xl md:text-4xl  font-[Goudy_Old_Style] text-black mb-2">{article.title}</h2>

        <h3 className="text-xl md:text-2xl font-semibold text-black mb-3 md:mb-4">
          {article.subtitle && article.subtitle.length > 100 
            ? article.subtitle.slice(0, 100) + '...' 
            : article.subtitle}
        </h3>

        <p className="text-xl md:text-2xl text-black font-[Goudy_Bookletter_1911] mb-4 line-clamp-3 md:line-clamp-4">{article.description}</p>

        <Link
          href={article.readMoreUrl || "#"}
          className="text-blue-500 hover:text-blue-700 font-['Goudy_Bookletter_1911'] text-xl md:text-2xl transition-colors"
        >
          Read more...
        </Link>
      </div>
    </div>
  )
}
