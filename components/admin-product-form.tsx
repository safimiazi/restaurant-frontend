"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { X, Plus, ImageIcon, Trash } from "lucide-react"
import { Separator } from "@/components/ui/separator"

interface AdminProductFormProps {
  product?: any
  onClose: () => void
}

export function AdminProductForm({ product, onClose }: AdminProductFormProps) {
  const isEditing = !!product

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    category: "",
    stock: 0,
    isPopular: false,
    isOffer: false,
    offerPrice: 0,
    offerDescription: "",
    image: "/placeholder.svg?height=200&width=200",
    variants: [{ id: "new-1", name: "", price: 0 }],
  })

  const [categories, setCategories] = useState([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    // Fetch categories
    // In a real app, this would be an API call
    setCategories([
      { id: "1", name: "Fast Food" },
      { id: "2", name: "Desserts" },
      { id: "3", name: "Drinks" },
      { id: "4", name: "Main Course" },
    ])

    // If editing, populate form with product data
    if (isEditing) {
      setFormData({
        name: product.name,
        description: product.description || "",
        category: product.categoryId,
        stock: product.stock,
        isPopular: product.isPopular || false,
        isOffer: product.isOffer || false,
        offerPrice: product.offerPrice || 0,
        offerDescription: product.offerDescription || "",
        image: product.image,
        variants: product.variants || [{ id: "new-1", name: "", price: 0 }],
      })
    }
  }, [isEditing, product])

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    })
  }

  const handleSelectChange = (name, value) => {
    setFormData({
      ...formData,
      [name]: value,
    })
  }

  const handleVariantChange = (index, field, value) => {
    const updatedVariants = [...formData.variants]
    updatedVariants[index] = {
      ...updatedVariants[index],
      [field]: value,
    }
    setFormData({
      ...formData,
      variants: updatedVariants,
    })
  }

  const addVariant = () => {
    setFormData({
      ...formData,
      variants: [...formData.variants, { id: `new-${Date.now()}`, name: "", price: 0 }],
    })
  }

  const removeVariant = (index) => {
    if (formData.variants.length > 1) {
      const updatedVariants = [...formData.variants]
      updatedVariants.splice(index, 1)
      setFormData({
        ...formData,
        variants: updatedVariants,
      })
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)

    try {
      // In a real app, this would be an API call to save the product
      console.log("Saving product:", formData)

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Success
      alert(isEditing ? "Product updated successfully!" : "Product added successfully!")
      onClose()
    } catch (error) {
      console.error("Error saving product:", error)
      alert("Failed to save product. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>{isEditing ? "Edit Product" : "Add New Product"}</CardTitle>
          <Button variant="ghost" size="icon" type="button" onClick={onClose}>
            <X className="h-4 w-4" />
          </Button>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="basic">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="basic">Basic Info</TabsTrigger>
              <TabsTrigger value="variants">Variants</TabsTrigger>
              <TabsTrigger value="offers">Offers & Promotions</TabsTrigger>
            </TabsList>

            <TabsContent value="basic" className="space-y-4 pt-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="name">Product Name</Label>
                  <Input id="name" name="name" value={formData.name} onChange={handleInputChange} required />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="category">Category</Label>
                  <Select value={formData.category} onValueChange={(value) => handleSelectChange("category", value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map((category) => (
                        <SelectItem key={category.id} value={category.id}>
                          {category.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2 md:col-span-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    rows={4}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="stock">Stock Quantity</Label>
                  <Input
                    id="stock"
                    name="stock"
                    type="number"
                    min="0"
                    value={formData.stock}
                    onChange={handleInputChange}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="image">Product Image</Label>
                  <div className="flex items-center gap-4">
                    <div className="h-20 w-20 rounded-md overflow-hidden border">
                      <img
                        src={formData.image || "/placeholder.svg"}
                        alt="Product"
                        className="h-full w-full object-cover"
                      />
                    </div>
                    <Button type="button" variant="outline" className="h-10">
                      <ImageIcon className="mr-2 h-4 w-4" />
                      Upload Image
                    </Button>
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="variants" className="space-y-4 pt-4">
              <div className="space-y-4">
                {formData.variants.map((variant, index) => (
                  <div key={variant.id} className="flex items-end gap-4 pb-4 border-b">
                    <div className="flex-1 space-y-2">
                      <Label htmlFor={`variant-name-${index}`}>Variant Name</Label>
                      <Input
                        id={`variant-name-${index}`}
                        value={variant.name}
                        onChange={(e) => handleVariantChange(index, "name", e.target.value)}
                        placeholder="e.g. Small, Medium, Large"
                      />
                    </div>
                    <div className="w-1/3 space-y-2">
                      <Label htmlFor={`variant-price-${index}`}>Price</Label>
                      <Input
                        id={`variant-price-${index}`}
                        type="number"
                        min="0"
                        step="0.01"
                        value={variant.price}
                        onChange={(e) => handleVariantChange(index, "price", Number.parseFloat(e.target.value))}
                      />
                    </div>
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      onClick={() => removeVariant(index)}
                      disabled={formData.variants.length <= 1}
                    >
                      <Trash className="h-4 w-4" />
                    </Button>
                  </div>
                ))}

                <Button type="button" variant="outline" onClick={addVariant}>
                  <Plus className="mr-2 h-4 w-4" />
                  Add Variant
                </Button>
              </div>
            </TabsContent>

            <TabsContent value="offers" className="space-y-4 pt-4">
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="isPopular">Mark as Popular</Label>
                    <p className="text-sm text-muted-foreground">
                      This product will be displayed in the "Best Sellers" section
                    </p>
                  </div>
                  <Switch
                    id="isPopular"
                    name="isPopular"
                    checked={formData.isPopular}
                    onCheckedChange={(checked) => handleSelectChange("isPopular", checked)}
                  />
                </div>

                <Separator />

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="isOffer">Special Offer</Label>
                    <p className="text-sm text-muted-foreground">
                      This product will be displayed in the "Special Offers" section
                    </p>
                  </div>
                  <Switch
                    id="isOffer"
                    name="isOffer"
                    checked={formData.isOffer}
                    onCheckedChange={(checked) => handleSelectChange("isOffer", checked)}
                  />
                </div>

                {formData.isOffer && (
                  <div className="space-y-4 pl-6 border-l-2 border-primary/20">
                    <div className="space-y-2">
                      <Label htmlFor="offerPrice">Offer Price</Label>
                      <Input
                        id="offerPrice"
                        name="offerPrice"
                        type="number"
                        min="0"
                        step="0.01"
                        value={formData.offerPrice}
                        onChange={handleInputChange}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="offerDescription">Offer Description</Label>
                      <Textarea
                        id="offerDescription"
                        name="offerDescription"
                        value={formData.offerDescription}
                        onChange={handleInputChange}
                        placeholder="e.g. Limited time offer! 20% off until June 30th"
                      />
                    </div>
                  </div>
                )}
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button type="button" variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button type="submit" disabled={loading}>
            {loading ? "Saving..." : isEditing ? "Update Product" : "Add Product"}
          </Button>
        </CardFooter>
      </Card>
    </form>
  )
}
