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
import { X } from "lucide-react";
import {
  useBrandPostMutation,
  useBrandPutMutation,
} from "@/redux/api/BrandApi";
import { toast } from "react-toastify";

interface AdminBrandFormProps {
  brand?: any;
  onClose: () => void;
}

export function AdminBrandForm({ brand, onClose }: AdminBrandFormProps) {
  const isEditing = !!brand;
  const [brandPost, { isLoading: loading }] = useBrandPostMutation();
  const [brandPut] = useBrandPutMutation();

  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [formData, setFormData] = useState({
    brandName: "",
    brandDescription: "",
  });

  useEffect(() => {
    if (isEditing && brand) {
      setFormData({
        brandName: brand.brandName || "",
        brandDescription: brand.brandDescription || "",
      });
      setImagePreview(brand.brandImage || null);
    }
  }, [isEditing, brand]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setImageFile(file);
    setImagePreview(URL.createObjectURL(file));
  };


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const form = new FormData();

    try {
      form.append("brandName", formData.brandName);
      form.append("brandDescription", formData.brandDescription);
      if (imageFile) form.append("brandImage", imageFile);

      const res = isEditing
        ? await brandPut({ id: brand.id, data: form }).unwrap()
        : await brandPost(form).unwrap();
        toast.success(res?.message || "Brand saved successfully!");

      onClose();
    } catch (error: any) {
        toast.error(error?.data?.message || "Something went wrong!");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>{isEditing ? "Edit Brand" : "Add New Brand"}</CardTitle>
          <Button variant="ghost" size="icon" type="button" onClick={onClose}>
            <X className="h-4 w-4" />
          </Button>
        </CardHeader>

        <CardContent>
          <div className="grid gap-6">
            <div className="space-y-2">
              <Label htmlFor="brandName">Brand Name</Label>
              <Input
                id="brandName"
                name="brandName"
                value={formData.brandName}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="brandImage">Brand Image</Label>
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
                  id="brandImage"
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="brandDescription">Description</Label>
              <Input
                id="brandDescription"
                name="brandDescription"
                value={formData.brandDescription}
                onChange={handleInputChange}
              />
            </div>
          </div>
        </CardContent>

        <CardFooter className="flex justify-between">
          <Button type="button" variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button type="submit" disabled={loading}>
            {loading ? "Saving..." : isEditing ? "Update Brand" : "Add Brand"}
          </Button>
        </CardFooter>
      </Card>
    </form>
  );
}
