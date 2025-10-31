export interface Tab {
  id: string
  label: string
  href: string
}

export interface TabsProps {
  tabs: Tab[]
  activeTabId?: string
}
