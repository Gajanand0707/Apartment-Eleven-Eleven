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
    <div className="space-y-8">
      {blogs.map((blog, index) => {
        // Pattern based on index to match design
        if (index === 0) {
          // First: Horizontal left
          return <BlogCardHorizontal key={blog.id} blog={blog} imagePosition="left" />
        } else if (index === 1) {
          // Second: Horizontal right
          return <BlogCardHorizontal key={blog.id} blog={blog} imagePosition="right" />
        } else if (index === 2) {
          // Third: 2x2 grid
          return (
            <div key={`grid-${index}`} className="grid grid-cols-2 gap-6">
              {blogs.slice(2, 4).map((gridBlog) => (
                <BlogCardGrid key={gridBlog.id} blog={gridBlog} />
              ))}
            </div>
          )
        } else if (index === 4) {
          // Fifth: Featured full width
          return <BlogCardFeatured key={blog.id} blog={blog} />
        } else if (index === 5) {
          // Sixth: 2x2 grid again
          return (
            <div key={`grid-${index}`} className="grid grid-cols-2 gap-6">
              {blogs.slice(5, 7).map((gridBlog) => (
                <BlogCardGrid key={gridBlog.id} blog={gridBlog} />
              ))}
            </div>
          )
        } else if (index === 7) {
          // Eighth: Horizontal left
          return <BlogCardHorizontal key={blog.id} blog={blog} imagePosition="left" />
        }
        return null
      })}
    </div>
  )
}
