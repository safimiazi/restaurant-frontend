"use client"
import { FoodCategory } from '@/components/food-category';
import { useGetAllCategoryQuery } from '@/redux/api/CategoryApi';
import React, { useState } from 'react';
import { Skeleton } from '@/components/ui/skeleton'; // Assuming you're using shadcn/ui or similar

const Categories = () => {
    const [pageIndex, setPageIndex] = useState(1);
    const [pageSize, setPageSize] = useState(10);
    const { data: categoryData, isLoading } = useGetAllCategoryQuery({
        isDelete: false,
        pageIndex: pageIndex - 1, 
        pageSize,
    });

    if (isLoading) {
        return (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {[...Array(8)].map((_, index) => (
                    <Skeleton key={index} className="h-40 rounded-lg" />
                ))}
            </div>
        );
    }

    if (!categoryData?.data?.result?.length) {
        return (
            <div className="flex flex-col items-center justify-center py-12 bg-gray-50 rounded-lg">
                <div className="text-center space-y-4 max-w-md">
                    <svg
                        className="mx-auto h-12 w-12 text-gray-400"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        aria-hidden="true"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                    </svg>
                    <h3 className="text-lg font-medium text-gray-900">No categories found</h3>
                    <p className="text-gray-500">
                        It looks like there are no food categories available at the moment. Please check back later.
                    </p>
                </div>
            </div>
        );
    }

    return (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {categoryData.data.result.map((item: any, index: number) => (
                <FoodCategory key={index} item={item} />
            ))}
        </div>
    );
};

export default Categories;