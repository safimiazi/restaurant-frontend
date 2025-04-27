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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { X, ImageIcon } from "lucide-react";
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
  parentCategory?: string | null;
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
    pageIndex: 0,
    pageSize: 100, // Fetch enough to show all categories
  });

  const [formData, setFormData] = useState<Category>({
    name: "",
    description: "",
    isActive: true,
    parentCategory: null,
  });

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isEditing && category) {
      setFormData({
        name: category.name,
        description: category.description || "",
        isActive: category.isActive !== false,
        parentCategory: category.parentCategory || null,
      });
      setImagePreview(category?.image || null);

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

  // const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   if (e.target.files && e.target.files[0]) {
  //     const file = e.target.files[0];
  //     const reader = new FileReader();
  //     reader.onloadend = () => {
  //       setFormData((prev) => ({
  //         ...prev,
  //         image: reader.result as string,
  //       }));
  //     };
  //     reader.readAsDataURL(file);
  //   }
  // };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Create FormData object to handle file uploads if needed
      const form = new FormData();

      // Append all fields to formData
      form.append("name", formData.name);
      form.append("description", formData.description || "");
      form.append("isActive", String(formData.isActive !== false));

      // Handle parentCategory - either null, undefined, or ObjectId string
      if (formData.parentCategory) {
        form.append("parentCategory",formData.parentCategory);
      }

      // Handle image upload if it's a File object
        
      if (imageFile) {
        form.append("image", imageFile);
      }
  

      let response;
      if (isEditing && category?._id) {
        response = await categoryPut({
          id: category._id,
          body: form,
        }).unwrap();
      } else {
        response = await categoryPost(form).unwrap();
      }

      toast.success(
        response?.message ||
          (isEditing
            ? "Category updated successfully!"
            : "Category created successfully!")
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

  // Filter out the current category when editing to prevent circular references
  const availableParentCategories = (
    parentCategoryData?.data?.result || []
  ).filter((cat: Category) => !isEditing || cat._id !== category?._id);

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
            <Label htmlFor="description">Description</Label>
            <Input
              id="description"
              name="description"
              value={formData.description || ""}
              onChange={handleInputChange}
              placeholder="Category description"
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
              <Input
                id="image"
                type="file"
                accept="image/*"
                onChange={handleImageChange}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label>Parent Category</Label>
            <div className="flex flex-wrap gap-2">
              {availableParentCategories?.map((cat: Category) => (
                <Button
                  key={cat._id}
                  type="button"
                  variant={
                    formData.parentCategory === cat._id
                      ? "default"
                      : "outline"
                  }
                  size="sm"
                  onClick={() =>
                    setFormData((prev) => ({
                      ...prev,
                      parentCategory: cat._id,
                    }))
                  }
                >
                  {cat.name}
                </Button>
              ))}
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              id="isActive"
              name="isActive"
              checked={formData.isActive !== false}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, isActive: e.target.checked }))
              }
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
