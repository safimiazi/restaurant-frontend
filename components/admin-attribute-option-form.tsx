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
import { toast } from "react-toastify";
import { useProductAttributeOptionPostMutation, useProductAttributeOptionPutMutation } from "@/redux/api/ProductAttributeOptionApi";
// import your attributeOptionPostMutation and attributeOptionPutMutation


interface FormProps {
  editingData?: any;
  onClose: () => void;
}

const AdminAttributeOptionForm = ({ editingData, onClose }: FormProps) => {
  const isEditing = !!editingData;
  const [productAttributeOptionPost, { isLoading: loading }] = useProductAttributeOptionPostMutation();
  const [productAttributeOptionPut] = useProductAttributeOptionPutMutation();

  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);

  const [formData, setFormData] = useState({
    name: "",
    price: 0,
    description: "",
    value: "",
    slug: "",
  });

  useEffect(() => {
    if (isEditing && editingData) {
      setFormData({
        name: editingData.name || "",
        price: editingData.price || 0,
        description: editingData.description || "",
        value: editingData.value || "",
        slug: editingData.slug || "",
      });
      setImagePreview(editingData.image || null);
    }
  }, [isEditing, editingData]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "price" ? parseFloat(value) || 0 : value,
    }));
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
      form.append("name", formData.name);
      form.append("price", formData.price.toString());
      form.append("description", formData.description);
      form.append("value", formData.value);
      form.append("slug", formData.slug);
      if (imageFile) form.append("image", imageFile);

      const res = isEditing
        ? await productAttributeOptionPut({ id: editingData._id, data: form }).unwrap()
        : await productAttributeOptionPost(form).unwrap();
      toast.success(res?.message || "Attribute Option saved successfully!");

      onClose();
    } catch (error: any) {
      toast.error(error?.data?.message || "Something went wrong!");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>{isEditing ? "Edit Attribute Option" : "Add New Attribute Option"}</CardTitle>
          <Button variant="ghost" size="icon" type="button" onClick={onClose}>
            <X className="h-4 w-4" />
          </Button>
        </CardHeader>

        <CardContent>
          <div className="grid gap-6">
            <div className="space-y-2">
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="price">Price</Label>
              <Input
                id="price"
                name="price"
                type="number"
                value={formData.price}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Input
                id="description"
                name="description"
                value={formData.description}
                onChange={handleInputChange}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="value">Value</Label>
              <Input
                id="value"
                name="value"
                value={formData.value}
                onChange={handleInputChange}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="slug">Slug</Label>
              <Input
                id="slug"
                name="slug"
                value={formData.slug}
                onChange={handleInputChange}
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
          </div>
        </CardContent>

        <CardFooter className="flex justify-between">
          <Button type="button" variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button type="submit" disabled={loading}>
            {loading ? "Saving..." : isEditing ? "Update" : "Add"}
          </Button>
        </CardFooter>
      </Card>
    </form>
  );
};

export default AdminAttributeOptionForm;
