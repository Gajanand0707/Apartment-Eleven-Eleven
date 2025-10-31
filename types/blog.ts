export interface Blog {
  id: string | number
  title: string
  description: string
  imageUrl: string
  variant?: "horizontal-left" | "horizontal-right" | "grid" | "featured"
  readMoreUrl?: string
}
