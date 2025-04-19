import type React from "react"
export default function OffersLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Special Offers</h1>
      {children}
    </div>
  )
}
