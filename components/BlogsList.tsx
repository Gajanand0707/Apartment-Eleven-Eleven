"use client"

import { BlogCardHorizontal } from "./BlogCardHorizontal"
import { BlogCardGrid } from "./BlogCardGrid"
import { BlogCardFeatured } from "./BlogCardFeatured"
import type { Blog } from "@/types/blog"

interface BlogsListProps {
  blogs: Blog[]
}

export function BlogsList({ blogs }: BlogsListProps) {
  return (
    <div className="space-y-20">
      {blogs.map((blog, index) => {
        // Repeating pattern: 8 blogs per cycle
        const patternIndex = index % 8
        
        if (patternIndex === 0) {
          // Horizontal left
          return <BlogCardHorizontal key={blog.id} blog={blog} imagePosition="left" />
        } else if (patternIndex === 1) {
          // Horizontal right
          return <BlogCardHorizontal key={blog.id} blog={blog} imagePosition="right" />
        } else if (patternIndex === 2) {
          // 2x2 grid
          return (
            <div key={`grid-${index}`} className="grid md:grid-cols-2 gap-x-12 gap-y-16">
              {blogs.slice(index, index + 2).map((gridBlog) => (
                <BlogCardGrid key={gridBlog.id} blog={gridBlog} />
              ))}
            </div>
          )
        } else if (patternIndex === 4) {
          // Featured full width
          return <BlogCardFeatured key={blog.id} blog={blog} />
        } else if (patternIndex === 5) {
          // 2x2 grid again
          return (
            <div key={`grid-${index}`} className="grid md:grid-cols-2 gap-x-12 gap-y-16">
              {blogs.slice(index, index + 2).map((gridBlog) => (
                <BlogCardGrid key={gridBlog.id} blog={gridBlog} />
              ))}
            </div>
          )
        } else if (patternIndex === 7) {
          // Horizontal left
          return <BlogCardHorizontal key={blog.id} blog={blog} imagePosition="left" />
        }
        return null
      })}
    </div>
  )
}
