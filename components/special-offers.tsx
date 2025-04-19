import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Image from "next/image"
import Link from "next/link"

export function SpecialOffers() {
  // In a real app, this would come from an API
  const offers = [
    {
      id: "offer1",
      title: "Family Combo",
      description: "2 Large Pizzas + 4 Drinks + 2 Sides",
      discount: "25% OFF",
      image: "/placeholder.svg?height=300&width=600",
      link: "/offers/family-combo",
    },
    {
      id: "offer2",
      title: "Weekend Special",
      description: "Buy 1 Get 1 Free on all Burgers",
      discount: "BOGO",
      image: "/placeholder.svg?height=300&width=600",
      link: "/offers/weekend-special",
    },
  ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {offers.map((offer) => (
        <Link href={offer.link} key={offer.id}>
          <Card className="overflow-hidden transition-all hover:shadow-md">
            <CardContent className="p-0">
              <div className="relative h-48 w-full">
                <Badge className="absolute top-2 right-2 z-10">{offer.discount}</Badge>
                <Image src={offer.image || "/placeholder.svg"} alt={offer.title} fill className="object-cover" />
              </div>
              <div className="p-4">
                <h3 className="font-semibold text-lg">{offer.title}</h3>
                <p className="text-muted-foreground">{offer.description}</p>
              </div>
            </CardContent>
          </Card>
        </Link>
      ))}
    </div>
  )
}
