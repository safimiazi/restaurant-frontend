import { LucideIcon, Monitor } from "lucide-react";

type ISubCategories = {
  name: string;
  icon?: LucideIcon;
  subcategories?: ISubCategories[];
};

type ICategoriesItems = {
  name: string;
  icon: LucideIcon;
  subcategories?: ISubCategories[];
};

export const CategoriesSidebarItems: ICategoriesItems[] = [
  {
    name: "Electronics",
    icon: Monitor,
  },

  {
    name: "Mobile Phones",
    icon: Monitor,
    subcategories: [
      {
        name: "Smartphones",
        icon: Monitor,
        subcategories: [
          {
            name: "Smartphones",
            icon: Monitor,
            subcategories: [
              {
                name: "Smartphones",
                icon: Monitor,
        
        
              },]
    
          },]

      },
    
    ],
  },
 
];
