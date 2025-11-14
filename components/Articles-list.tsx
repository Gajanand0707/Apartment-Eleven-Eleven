"use client"

import { useState } from "react"
import type { Article } from "../types/article"
import { ArticleCard } from "./ArticleCard"

interface ArticlesListProps {
  articles: Article[]
  onLoadMore?: () => void
}


export function ArticlesList({ articles, onLoadMore }: ArticlesListProps) {
  const [visibleCount, setVisibleCount] = useState(5)

  const handleLoadMore = () => {
    setVisibleCount((prev) => prev + 5)
    onLoadMore?.()
  }

  const visibleArticles = articles.slice(0, visibleCount)
  const hasMore = visibleCount < articles.length

  return (
    <div className="w-full max-w-6xl mx-auto px-8 py-16 bg-[#D5C7B3]">
      <div className="space-y-16">
        {visibleArticles.map((article, index) => (
          <div
            key={article.id}
            className="transform scale-125 md:scale-130 transition-transform duration-300"
          >
            <div className="p-8 md:p-12 rounded-2xl ">
              <ArticleCard
                article={{
                  ...article,
                  // Apply larger text size dynamically if your ArticleCard uses these props
                  title: article.title,
                  description: article.introduction,
                }}
                imagePosition={index % 2 === 0 ? "left" : "right"}
              />
            </div>
          </div>
        ))}
      </div>

      {hasMore && (
        <div className="mt-16 flex justify-center">
          <button
            onClick={handleLoadMore}
            className="px-8 py-3 border-2 w-44 bg-white border-gray-900 text-gray-900 text-lg font-semibold rounded-lg hover:bg-gray-900 hover:text-white transition-colors"
          >
            Load More
          </button>
        </div>
      )}
    </div>
  )
}
