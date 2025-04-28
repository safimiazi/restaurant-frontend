"use client";

import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { X, Plus, ImageIcon, Trash, VideoIcon, Tag } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  useProductGetSingleQuery,
  useProductPostMutation,
  useProductPutMutation,
} from "@/redux/api/ProductApi";
import { objectToFormData } from "@/utils/FormDataUtils";
import { useProductAttributeGetAllQuery } from "@/redux/api/ProductAttributeApi";
import { useGetAllBrandQuery } from "@/redux/api/BrandApi";
import { useGetAllCategoryQuery } from "@/redux/api/CategoryApi";
import { Badge } from "@/components/ui/badge";

interface ProductFormValues {
  name: string;
  slug: string;
  description: string;
  category: string;
  brand: string;
  subcategories: string[];
  price: number;
  discount: number;
  stock: number;
  sku: string;
  images: File[];
  thumbnail?: File;
  video?: File;
  tags: string[];
  variant: string[];
  shipping: {
    weight?: number;
    dimensions?: {
      length?: number;
      width?: number;
      height?: number;
    };
  };
  warranty: string;
  isFeatured: boolean;
  isActive: boolean;
}

interface AdminProductFormProps {
  product?: any;
  onClose: () => void;
  onSuccess?: () => void;
}

export function AdminProductForm({ product, onClose }: AdminProductFormProps) {
  const isEditing = !!product;
  const [previewImages, setPreviewImages] = useState<string[]>([]);
  const [thumbnailPreview, setThumbnailPreview] = useState<string | null>(null);
  const [videoPreview, setVideoPreview] = useState<string | null>(null);
  const [tagInput, setTagInput] = useState("");

  // Initialize form
  const form = useForm<ProductFormValues>({
    defaultValues: {
      name: "",
      slug: "",
      description: "",
      category: "",
      brand: "",
      subcategories: [],
      price: 0,
      discount: 0,
      stock: 0,
      sku: "",
      images: [],
      tags: [],
      variant: [],
      shipping: {},
      warranty: "",
      isFeatured: false,
      isActive: true,
    },
  });

  // API hooks
  const [productPost] = useProductPostMutation();
  const [updateProduct] = useProductPutMutation();

  // Fetch data
  const { data: attributesData } = useProductAttributeGetAllQuery({
    isDelete: false,
  });
  const { data: brandData } = useGetAllBrandQuery({
    isDelete: false,
  });
  const { data: categoryData } = useGetAllCategoryQuery({
    isDelete: false,
  });

  // Load product data when editing
  useEffect(() => {
    if (isEditing && product) {
      form.reset({
        ...product,
        images: [],
        brand: product?.brand?._id,
        category:product?.category?._id,
        variant: product?.variant?.map((v: any) => v._id) || [],
        subcategories: product?.subcategories?.map((sc: any) => sc._id) || [],
      });

      // Set previews
      if (product?.images?.length) {
        setPreviewImages(product.images);
      }
      if (product?.thumbnail) {
        setThumbnailPreview(product.thumbnail);
      }
      if (product?.video) {
        setVideoPreview(product?.video);
      }
    }
  }, [isEditing, product, form]);

  // Handle file changes
  const handleFileChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    type: "images" | "thumbnail" | "video"
  ) => {
    const files = e.target.files;
    if (!files?.length) return;

    const file = files[0];

    if (type === "images") {
      const newImages = Array.from(files);
      form.setValue("images", [...form.getValues("images"), ...newImages]);
      setPreviewImages([
        ...previewImages,
        ...newImages.map((file) => URL.createObjectURL(file)),
      ]);
    } else if (type === "thumbnail") {
      form.setValue("thumbnail", file);
      setThumbnailPreview(URL.createObjectURL(file));
    } else if (type === "video") {
      form.setValue("video", file);
      setVideoPreview(URL.createObjectURL(file));
    }
  };

  const removeImage = (index: number) => {
    const updatedImages = form
      .getValues("images")
      .filter((_, i) => i !== index);
    form.setValue("images", updatedImages);
    setPreviewImages(previewImages.filter((_, i) => i !== index));
  };

  // Tags management
  const addTag = () => {
    if (tagInput.trim() && !form.getValues("tags").includes(tagInput.trim())) {
      form.setValue("tags", [...form.getValues("tags"), tagInput.trim()]);
      setTagInput("");
    }
  };

  const removeTag = (tagToRemove: string) => {
    form.setValue(
      "tags",
      form.getValues("tags").filter((tag) => tag !== tagToRemove)
    );
  };

  const onSubmit = async (values: ProductFormValues) => {
    console.log("values", values);
    try {
      const formData = objectToFormData(values);
      let res;
      if (isEditing && product) {
        res = await updateProduct({ data: formData, id: product._id }).unwrap();
        if(res?.message == "Validation error"){
          res?.errorSource?.map((item : any) => {
            return toast.success(item.message);
          })
        }else{

          toast.success(res.message);
        }
      } else {
        res = await productPost(formData).unwrap();
        if(res?.message == "Validation error"){
          res?.errorSource?.map((item : any) => {
            return toast.success(item.message);
          })
        }else{

          toast.success(res.message);
        }
      }

      onClose();
    } catch (error: any) {
      toast.error(error?.data?.message || "Failed to save product");
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <Tabs defaultValue="basic" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="basic">Basic Info</TabsTrigger>
            <TabsTrigger value="media">Media</TabsTrigger>
            <TabsTrigger value="shipping">Shipping</TabsTrigger>
          </TabsList>

          <ScrollArea className="h-[calc(100vh-220px)] p-4">
            <TabsContent value="basic">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Product Name</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="slug"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Slug</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          placeholder="auto-generated-if-empty"
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem className="md:col-span-2">
                      <FormLabel>Description</FormLabel>
                      <FormControl>
                        <Textarea {...field} rows={4} />
                      </FormControl>
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="category"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Category</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        value={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select category" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {categoryData?.data?.result?.map((category: any) => (
                            <SelectItem key={category._id} value={category._id}>
                              {category.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="brand"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Brand</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        value={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select brand" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {brandData?.data?.result?.map((brand: any) => (
                            <SelectItem key={brand._id} value={brand._id}>
                              {brand.brandName}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="subcategories"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Subcategories</FormLabel>
                      <Select
                        onValueChange={(value) => {
                          if (!field.value.includes(value)) {
                            field.onChange([...field.value, value]);
                          }
                        }}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select subcategories" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {categoryData?.data?.result
                            ?.filter((cat: any) => cat.parentCategory)
                            .map((subcategory: any) => (
                              <SelectItem
                                key={subcategory._id}
                                value={subcategory._id}
                                disabled={field.value.includes(subcategory._id)}
                              >
                                {subcategory.name}
                              </SelectItem>
                            ))}
                        </SelectContent>
                      </Select>
                      <div   className="mt-2 flex flex-wrap gap-2">
                        {field.value.map((subcatId) => {
                          const subcat = categoryData?.data?.result?.find(
                            (c: any) => c._id === subcatId
                          );
                          return (
                            <Badge
                              key={subcatId}
                              className="flex items-center gap-1"
                            >
                              {subcat?.name}
                              <button
                                type="button"
                                onClick={() =>
                                  field.onChange(
                                    field.value.filter((id) => id !== subcatId)
                                  )
                                }
                                className="ml-1"
                              >
                                <X className="h-3 w-3" />
                              </button>
                            </Badge>
                          );
                        })}
                      </div>
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="price"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Price</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          min="0"
                          step="0.01"
                          {...field}
                          onChange={(e) =>
                            field.onChange(parseFloat(e.target.value))
                          }
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="discount"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Discount (%)</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          min="0"
                          max="100"
                          {...field}
                          onChange={(e) =>
                            field.onChange(parseFloat(e.target.value))
                          }
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="stock"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Stock Quantity</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          min="0"
                          {...field}
                          onChange={(e) =>
                            field.onChange(parseInt(e.target.value))
                          }
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="sku"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>SKU</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="warranty"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Warranty</FormLabel>
                      <FormControl>
                        <Input {...field} placeholder="e.g. 1 year warranty" />
                      </FormControl>
                    </FormItem>
                  )}
                />

                <div className="space-y-2 md:col-span-2">
                  <FormLabel>Tags</FormLabel>
                  <div className="flex gap-2">
                    <Input
                      value={tagInput}
                      onChange={(e) => setTagInput(e.target.value)}
                      onKeyDown={(e) =>
                        e.key === "Enter" && (e.preventDefault(), addTag())
                      }
                      placeholder="Add tags"
                    />
                    <Button type="button" onClick={addTag}>
                      Add
                    </Button>
                  </div>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {form.getValues("tags").map((tag) => (
                      <Badge key={tag} className="flex items-center gap-1">
                        {tag}
                        <button
                          type="button"
                          onClick={() => removeTag(tag)}
                          className="ml-1"
                        >
                          <X className="h-3 w-3" />
                        </button>
                      </Badge>
                    ))}
                  </div>
                </div>

                <FormField
                  control={form.control}
                  name="isFeatured"
                  render={({ field }) => (
                    <FormItem className="flex items-center justify-between p-4 border rounded-md">
                      <div className="space-y-0.5">
                        <FormLabel>Featured Product</FormLabel>
                        <p className="text-sm text-muted-foreground">
                          Show this product in featured sections
                        </p>
                      </div>
                      <FormControl>
                        <Switch
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="isActive"
                  render={({ field }) => (
                    <FormItem className="flex items-center justify-between p-4 border rounded-md">
                      <div className="space-y-0.5">
                        <FormLabel>Active Status</FormLabel>
                        <p className="text-sm text-muted-foreground">
                          Product will be visible to customers
                        </p>
                      </div>
                      <FormControl>
                        <Switch
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </div>
              <div className="space-y-4">
                <FormField
                  control={form.control}
                  name="variant"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Select Attributes</FormLabel>
                      <Select
                        onValueChange={(value) => {
                          if (!field.value.includes(value)) {
                            field.onChange([...field.value, value]);
                          }
                        }}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select attributes" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {attributesData?.data?.result?.map(
                            (attribute: any) => (
                              <SelectItem
                                key={attribute._id}
                                value={attribute._id}
                                disabled={field.value.includes(attribute._id)}
                              >
                                {attribute.name}
                              </SelectItem>
                            )
                          )}
                        </SelectContent>
                      </Select>

                      <div className="mt-4 space-y-2">
                        {field.value.length > 0 && (
                          <>
                            <Label>Selected Attributes</Label>
                            <div className="flex flex-wrap gap-2">
                              {field.value.map((attrId) => {
                                const attr = attributesData?.data?.result?.find(
                                  (a: any) => a._id === attrId
                                );
                                return (
                                  <Badge
                                    key={attrId}
                                    className="flex items-center gap-1"
                                  >
                                    {attr?.name}
                                    <button
                                      type="button"
                                      onClick={() => {
                                        field.onChange(
                                          field.value.filter(
                                            (id) => id !== attrId
                                          )
                                        );
                                      }}
                                      className="ml-1"
                                    >
                                      <X className="h-3 w-3" />
                                    </button>
                                  </Badge>
                                );
                              })}
                            </div>
                          </>
                        )}
                      </div>
                    </FormItem>
                  )}
                />
              </div>
            </TabsContent>

            <TabsContent value="media">
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label>Product Images</Label>
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                    {previewImages.map((img, index) => (
                      <div key={index} className="relative group">
                        <img
                          src={img}
                          alt={`Product preview ${index}`}
                          className="h-32 w-full object-cover rounded-md"
                        />
                        <Button
                          type="button"
                          variant="destructive"
                          size="icon"
                          className="absolute top-1 right-1 opacity-0 group-hover:opacity-100 transition-opacity"
                          onClick={() => removeImage(index)}
                        >
                          <Trash className="h-4 w-4" />
                        </Button>
                      </div>
                    ))}
                    <label className="flex h-32 w-full cursor-pointer flex-col items-center justify-center rounded-md border-2 border-dashed border-muted-foreground/25 hover:border-primary">
                      <ImageIcon className="h-8 w-8 text-muted-foreground" />
                      <span className="text-sm text-muted-foreground">
                        Add Images
                      </span>
                      <input
                        type="file"
                        multiple
                        accept="image/*"
                        className="hidden"
                        onChange={(e) => handleFileChange(e, "images")}
                      />
                    </label>
                  </div>
                </div>

                <Separator />

                <div className="space-y-2">
                  <Label>Thumbnail Image</Label>
                  <div className="flex items-center gap-4">
                    {thumbnailPreview ? (
                      <div className="relative">
                        <img
                          src={thumbnailPreview}
                          alt="Thumbnail preview"
                          className="h-32 w-32 object-cover rounded-md"
                        />
                        <Button
                          type="button"
                          variant="destructive"
                          size="icon"
                          className="absolute top-1 right-1"
                          onClick={() => {
                            form.setValue("thumbnail", undefined);
                            setThumbnailPreview(null);
                          }}
                        >
                          <Trash className="h-4 w-4" />
                        </Button>
                      </div>
                    ) : (
                      <label className="flex h-32 w-32 cursor-pointer flex-col items-center justify-center rounded-md border-2 border-dashed border-muted-foreground/25 hover:border-primary">
                        <ImageIcon className="h-8 w-8 text-muted-foreground" />
                        <span className="text-sm text-muted-foreground">
                          Add Thumbnail
                        </span>
                        <input
                          type="file"
                          accept="image/*"
                          className="hidden"
                          onChange={(e) => handleFileChange(e, "thumbnail")}
                        />
                      </label>
                    )}
                  </div>
                </div>

                <Separator />

                <div className="space-y-2">
                  <Label>Product Video</Label>
                  <div className="flex items-center gap-4">
                    {videoPreview ? (
                      <div className="relative">
                        <video
                          src={videoPreview}
                          className="h-32 w-full object-cover rounded-md"
                          controls
                        />
                        <Button
                          type="button"
                          variant="destructive"
                          size="icon"
                          className="absolute top-1 right-1"
                          onClick={() => {
                            form.setValue("video", undefined);
                            setVideoPreview(null);
                          }}
                        >
                          <Trash className="h-4 w-4" />
                        </Button>
                      </div>
                    ) : (
                      <label className="flex h-32 w-full cursor-pointer flex-col items-center justify-center rounded-md border-2 border-dashed border-muted-foreground/25 hover:border-primary">
                        <VideoIcon className="h-8 w-8 text-muted-foreground" />
                        <span className="text-sm text-muted-foreground">
                          Add Video
                        </span>
                        <input
                          type="file"
                          accept="video/*"
                          className="hidden"
                          onChange={(e) => handleFileChange(e, "video")}
                        />
                      </label>
                    )}
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="shipping">
              <div className="space-y-4">
                <FormField
                  control={form.control}
                  name="shipping.weight"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Weight (kg)</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          min="0"
                          step="0.01"
                          {...field}
                          onChange={(e) =>
                            field.onChange(parseFloat(e.target.value))
                          }
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />

                <div className="space-y-2">
                  <Label>Dimensions (cm)</Label>
                  <div className="grid grid-cols-3 gap-4">
                    <FormField
                      control={form.control}
                      name="shipping.dimensions.length"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Length</FormLabel>
                          <FormControl>
                            <Input
                              type="number"
                              min="0"
                              step="0.1"
                              {...field}
                              onChange={(e) =>
                                field.onChange(parseFloat(e.target.value))
                              }
                            />
                          </FormControl>
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="shipping.dimensions.width"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Width</FormLabel>
                          <FormControl>
                            <Input
                              type="number"
                              min="0"
                              step="0.1"
                              {...field}
                              onChange={(e) =>
                                field.onChange(parseFloat(e.target.value))
                              }
                            />
                          </FormControl>
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="shipping.dimensions.height"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Height</FormLabel>
                          <FormControl>
                            <Input
                              type="number"
                              min="0"
                              step="0.1"
                              {...field}
                              onChange={(e) =>
                                field.onChange(parseFloat(e.target.value))
                              }
                            />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                  </div>
                </div>
              </div>
            </TabsContent>
          </ScrollArea>
        </Tabs>

        <div className="flex justify-end gap-4 pt-4">
          <Button type="button" variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button type="submit" disabled={form.formState.isSubmitting}>
            {form.formState.isSubmitting ? (
              <>
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
              </>
            ) : isEditing ? (
              "Update Product"
            ) : (
              "Create Product"
            )}
          </Button>
        </div>
      </form>
    </Form>
  );
}
