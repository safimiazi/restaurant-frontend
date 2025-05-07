"use client"
import { FoodCategory } from '@/components/food-category';
import { useGetAllCategoryQuery } from '@/redux/api/CategoryApi';
import React, { useState } from 'react';

const Categories = () => {
    const [pageIndex, setPageIndex] = useState(1)
    const [pageSize, setPageSize] = useState(10)
    const { data: categoryData, isLoading } = useGetAllCategoryQuery({
      isDelete: false,
      pageIndex: pageIndex - 1, 
      pageSize,
    })
    return (
         <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {
                    categoryData?.data?.result?.map((item : any, inx : number) => {
                        return (
                            <FoodCategory key={inx} item={item}  />

                        )
                    })
                }
               </div>
    );
};

export default Categories;