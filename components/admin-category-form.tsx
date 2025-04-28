"use client";

import { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { X } from "lucide-react";
import {
  useCategoryPostMutation,
  useCategoryPutMutation,
  useGetAllCategoryQuery,
} from "@/redux/api/CategoryApi";
import { toast } from "react-toastify";

interface Category {
  _id?: string;
  name: string;
  slug?: string;
  image?: string | null;
  description?: string;
  isActive?: boolean;
  parentCategory?: any | null;
  isDelete?: boolean;
}

interface AdminCategoryFormProps {
  category?: Category;
  onClose: () => void;
  onSuccess?: () => void;
}

export function AdminCategoryForm({
  category,
  onClose,
  onSuccess,
}: AdminCategoryFormProps) {
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);

  const isEditing = !!category;
  const [categoryPost] = useCategoryPostMutation();
  const [categoryPut] = useCategoryPutMutation();
  const { data: parentCategoryData } = useGetAllCategoryQuery({
    isDelete: false,
 
  });

  const [formData, setFormData] = useState<Category>({
    name: "",
    slug: "",
    description: "",
    image: null,
    isActive: true,
    parentCategory: null,
  });

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isEditing && category) {
      setFormData({
        name: category.name,
        slug: category.slug || "",
        description: category.description || "",
        image: category.image || null,
        isActive: category.isActive !== false,
        parentCategory: category?.parentCategory?._id || null,
      });
      setImagePreview(category.image || null);
    }
  }, [isEditing, category]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setImageFile(file);
    setImagePreview(URL.createObjectURL(file));
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: checked,
    }));
  };

  const handleParentCategoryChange = (categoryId: string | null) => {
    setFormData((prev) => ({
      ...prev,
      parentCategory: categoryId === prev.parentCategory ? null : categoryId,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const form = new FormData();
      form.append("name", formData.name);
      if (formData.slug) form.append("slug", formData.slug);
      if (formData.description) form.append("description", formData.description);
      form.append("isActive", String(formData.isActive !== false));
      
      if (formData.parentCategory) {
        form.append("parentCategory", formData.parentCategory);
      } else {
        form.append("parentCategory", ""); // Explicitly send empty for null
      }

      if (imageFile) {
        form.append("image", imageFile);
      } else if (isEditing && !imageFile && !formData.image) {
        form.append("image", "");
      }

      let response;
      if (isEditing && category?._id) {
        response = await categoryPut({
          data: form,
          id: category._id,
        }).unwrap();
      } else {
        response = await categoryPost(form).unwrap();
      }

      toast.success(
        response?.message ||
          (isEditing ? "Category updated successfully!" : "Category created successfully!")
      );
      onClose();
      if (onSuccess) onSuccess();
    } catch (error: any) {
      console.error("Error submitting form:", error);
      toast.error(
        error?.data?.message || error?.message || "Something went wrong!"
      );
    } finally {
      setLoading(false);
    }
  };


  return (
    <form onSubmit={handleSubmit}>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>
            {isEditing ? "Edit Category" : "Add New Category"}
          </CardTitle>
          <Button variant="ghost" size="icon" type="button" onClick={onClose}>
            <X className="h-4 w-4" />
          </Button>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Name *</Label>
            <Input
              id="name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              required
              placeholder="Category name"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="slug">Slug</Label>
            <Input
              id="slug"
              name="slug"
              value={formData.slug || ""}
              onChange={handleInputChange}
              placeholder="Category slug (auto-generated if empty)"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              name="description"
              value={formData.description || ""}
              onChange={handleInputChange}
              placeholder="Category description"
              rows={3}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="image">Image</Label>
            <div className="flex items-center gap-4">
              <div className="h-20 w-20 rounded-md overflow-hidden border">
                {imagePreview ? (
                  <img
                    src={imagePreview}
                    alt="Preview"
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <div className="flex items-center justify-center h-full text-xs text-muted-foreground">
                    No Image
                  </div>
                )}
              </div>
              <div className="flex-1 space-y-2">
                <Input
                  id="image"
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                />
                {isEditing && formData.image && !imagePreview && (
                  <p className="text-xs text-muted-foreground">
                    Current image will be kept if no new image is selected
                  </p>
                )}
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label>Parent Category</Label>
              {formData.parentCategory && (
                <span className="text-sm text-muted-foreground">
                  Currently selected: {
                    parentCategoryData?.data?.result.find(
                      (cat: Category) => cat._id === formData.parentCategory
                    )?.name
                  }
                </span>
              )}
            </div>
            <div className="flex flex-wrap gap-2">
              {parentCategoryData?.data?.result.map((cat: Category) => (
                <Button
                  key={cat._id}
                  type="button"
                  variant={
                    formData.parentCategory === cat._id
                      ? "default"
                      : "outline"
                  }
                  size="sm"
                  onClick={() => handleParentCategoryChange(cat._id || null)}
                >
                  {cat.name}
                </Button>
              ))}
              {formData.parentCategory && (
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() => handleParentCategoryChange(null)}
                >
                  Clear Selection
                </Button>
              )}
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              id="isActive"
              name="isActive"
              checked={formData.isActive !== false}
              onChange={handleCheckboxChange}
              className="h-4 w-4"
            />
            <Label htmlFor="isActive">Active Category</Label>
          </div>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button type="button" variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button type="submit" disabled={loading}>
            {loading ? (
              <span className="flex items-center">
                <svg
                  className="animate-spin -ml-1 mr-2 h-4 w-4"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                {isEditing ? "Updating..." : "Creating..."}
              </span>
            ) : isEditing ? (
              "Update Category"
            ) : (
              "Add Category"
            )}
          </Button>
        </CardFooter>
      </Card>
    </form>
  );
}