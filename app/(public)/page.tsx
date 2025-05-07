import { BestSellers } from "@/components/best-sellers"
import { SpecialOffers } from "@/components/special-offers"

import Categories from "@/components/pageComponent/home/Categories"

export default function Home() {
  // category:
 
  return (
    <div className="container mx-auto px-4 py-8">
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-center mb-2">Tasty Bites</h1>
        <p className="text-center text-muted-foreground">Delicious food delivered to your doorstep</p>
      </header>

      <section className="mb-10">
        <h2 className="text-2xl font-semibold mb-4">Special Offers</h2>
        <SpecialOffers />
      </section>

      <section className="mb-10">
        <h2 className="text-2xl font-semibold mb-4">Categories</h2>
       <Categories/>
      </section>

      <section className="mb-10">
        <h2 className="text-2xl font-semibold mb-4">Best Sellers</h2>
        <BestSellers />
      </section>
    </div>
  )
}
