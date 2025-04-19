import { FoodCategory } from "@/components/food-category";
import { BestSellers } from "@/components/best-sellers";
import { SpecialOffers } from "@/components/special-offers";
import { Navbar } from "@/components/navbar";

export default function Home() {
  return (
    <>
      <Navbar />

      <div className="container mx-auto px-4 py-8">
        <header className="mb-8">
          <h1 className="text-3xl font-bold text-center mb-2">Tasty Bites</h1>
          <p className="text-center text-muted-foreground">
            Delicious food delivered to your doorstep
          </p>
        </header>

        <section className="mb-10">
          <h2 className="text-2xl font-semibold mb-4">Special Offers</h2>
          <SpecialOffers />
        </section>

        <section className="mb-10">
          <h2 className="text-2xl font-semibold mb-4">Categories</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            <FoodCategory
              id="fast-food"
              name="Fast Food"
              image="/placeholder.svg?height=200&width=200"
            />
            <FoodCategory
              id="desserts"
              name="Desserts"
              image="/placeholder.svg?height=200&width=200"
            />
            <FoodCategory
              id="drinks"
              name="Drinks"
              image="/placeholder.svg?height=200&width=200"
            />
            <FoodCategory
              id="main-course"
              name="Main Course"
              image="/placeholder.svg?height=200&width=200"
            />
          </div>
        </section>

        <section className="mb-10">
          <h2 className="text-2xl font-semibold mb-4">Best Sellers</h2>
          <BestSellers />
        </section>
      </div>
    </>
  );
}
