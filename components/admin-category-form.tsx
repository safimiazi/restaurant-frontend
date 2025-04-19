"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { X, ImageIcon } from "lucide-react"

interface AdminCategoryFormProps {
  category?: any
  onClose: () => void
}

export function AdminCategoryForm({ category, onClose }: AdminCategoryFormProps) {
  const isEditing = !!category

  const [formData, setFormData] = useState({
    name: "",
    image: "/placeholder.svg?height=200&width=200",
  })

  const [loading, setLoading] = useState(false)

  useEffect(() => {
    // If editing, populate form with category data
    if (isEditing) {
      setFormData({
        name: category.name,
        image: category.image,
      })
    }
  }, [isEditing, category])

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value,
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)

    try {
      // In a real app, this would be an API call to save the category
      console.log("Saving category:", formData)

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Success
      alert(isEditing ? "Category updated successfully!" : "Category added successfully!")
      onClose()
    } catch (error) {
      console.error("Error saving category:", error)
      alert("Failed to save category. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>{isEditing ? "Edit Category" : "Add New Category"}</CardTitle>
          <Button variant="ghost" size="icon" type="button" onClick={onClose}>
            <X className="h-4 w-4" />
          </Button>
        </CardHeader>
        <CardContent>
          <div className="grid gap-6">
            <div className="space-y-2">
              <Label htmlFor="name">Category Name</Label>
              <Input id="name" name="name" value={formData.name} onChange={handleInputChange} required />
            </div>

            <div className="space-y-2">
              <Label htmlFor="image">Category Image</Label>
              <div className="flex items-center gap-4">
                <div className="h-20 w-20 rounded-md overflow-hidden border">
                  <img
                    src={formData.image || "/placeholder.svg"}
                    alt="Category"
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
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button type="button" variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button type="submit" disabled={loading}>
            {loading ? "Saving..." : isEditing ? "Update Category" : "Add Category"}
          </Button>
        </CardFooter>
      </Card>
    </form>
  )
}
