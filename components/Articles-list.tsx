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
    <div className="w-full max-w-4xl mx-auto px-4 py-8 bg-[#D5C7B3]">
      <div className="space-y-6">
        {visibleArticles.map((article, index) => (
          <ArticleCard key={article.id} article={article} imagePosition={index % 2 === 0 ? "left" : "right"} />
        ))}
      </div>

      {hasMore && (
        <div className="mt-8 flex justify-center">
          <button
            onClick={handleLoadMore}
            className="px-6 py-2 border-2 w-2xs bg-white border-gray-900 text-gray-900 font-semibold rounded-lg hover:bg-gray-900 hover:text-white transition-colors"
          >
            Load More
          </button>
        </div>
      )}
    </div>
  )
}
