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
import { Checkbox } from "@/components/ui/checkbox";
import { X } from "lucide-react";
import { toast } from "react-toastify";
import { useProductAttributePostMutation, useProductAttributePutMutation } from "@/redux/api/ProductAttributeApi";
import { useProductAttributeOptionGetAllQuery } from "@/redux/api/ProductAttributeOptionApi";

interface FormProps {
  editingData?: any;
  onClose: () => void;
}

const AdminAttributeForm = ({ editingData, onClose }: FormProps) => {
  const isEditing = !!editingData;
  const [productAttributePost, { isLoading: loading }] = useProductAttributePostMutation();
  const [productAttributePut] = useProductAttributePutMutation();
  const { data: attributeOptionsData } = useProductAttributeOptionGetAllQuery({
    isDelete: false,
  });

  const [formData, setFormData] = useState({
    name: "",
    slug: "",
    description: "",
    attributeOption: [] as string[],
    isActive: true,
  });

  useEffect(() => {
    if (isEditing && editingData) {
      setFormData({
        name: editingData.name || "",
        slug: editingData.slug || "",
        description: editingData.description || "",
        attributeOption: editingData.attributeOption?.map((opt: any) => opt._id) || [],
        isActive: editingData.isActive ?? true,
      });
    }
  }, [isEditing, editingData]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleCheckboxChange = (checked: boolean) => {
    setFormData((prev) => ({
      ...prev,
      isActive: checked,
    }));
  };

  const handleAttributeOptionChange = (value: string) => {
    setFormData((prev) => ({
      ...prev,
      attributeOption: prev.attributeOption.includes(value)
        ? prev.attributeOption.filter((v) => v !== value)
        : [...prev.attributeOption, value],
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const payload = {
        name: formData.name,
        slug: formData.slug,
        description: formData.description,
        attributeOption: formData.attributeOption,
        isActive: formData.isActive,
      };

      const res = isEditing
        ? await productAttributePut({ id: editingData._id, data: payload }).unwrap()
        : await productAttributePost(payload).unwrap();
      toast.success(res?.message || "Attribute saved successfully!");

      onClose();
    } catch (error: any) {
      toast.error(error?.data?.message || "Something went wrong!");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>{isEditing ? "Edit Attribute" : "Add New Attribute"}</CardTitle>
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
              <Label htmlFor="slug">Slug</Label>
              <Input
                id="slug"
                name="slug"
                value={formData.slug}
                onChange={handleInputChange}
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
              <Label>Attribute</Label>
              <div className="flex flex-wrap gap-2">
                {attributeOptionsData?.data?.result?.map((option: any) => (
                  <Button
                    key={option._id}
                    type="button"
                    variant={formData.attributeOption.includes(option._id) ? "default" : "outline"}
                    size="sm"
                    onClick={() => handleAttributeOptionChange(option._id)}
                  >
                    {option.name}
                  </Button>
                ))}
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <Checkbox
                id="isActive"
                checked={formData.isActive}
                onCheckedChange={handleCheckboxChange}
              />
              <Label htmlFor="isActive">Is Active</Label>
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

export default AdminAttributeForm;
