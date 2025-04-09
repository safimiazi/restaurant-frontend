import { ChevronDown, ChevronRight } from "lucide-react";
import { useState } from "react";
import { NavItem } from "./NavItem";
import { Link } from "react-router-dom";

/* eslint-disable @typescript-eslint/no-explicit-any */
export const SubNavItem = ({ items, name, id, onClick }: any) => {
  const [openSubMenu, setOpenSubMenu] = useState<string | null>(null);

  function toggleSubMenu(menu: string) {
    setOpenSubMenu((prev) => (prev === menu ? null : menu));
  }

  const isOpen = openSubMenu === name;
  return (
    <div>
      <button
        onClick={() => {
          // Run your custom onClick logic
          onClick(id);
          // Toggle the sub-menu
          toggleSubMenu(name);
        }}
        className="flex items-center w-full px-3 py-2 text-sm rounded-md transition-colors text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-50 dark:hover:bg-[#1F1F23]"
      >
        <span className="flex-1 text-left text-base">{name}</span>
        {isOpen ? (
          <ChevronDown className="h-4 w-4" />
        ) : (
          <ChevronRight className="h-4 w-4" />
        )}
      </button>
      {isOpen && (
        <div className="ml-3 space-y-1 relative">
          <div className="absolute border-l border-gray-200 left-0 top-0 h-full"></div>
          {items.length > 0
            ? items.map((item: any, inx: number) => (
                <div key={inx}>
                  {item?.subcategories && item?.subcategories.length > 0 ? (
                    <Link to={`/products/${item.id}`}>
                      <SubNavItem
                        items={item.subcategories}
                        name={item.name}
                        id={item.id} // Pass category ID
                        onClick={onClick} // Pass onClick handler
                      />
                    </Link>
                  ) : (
                    <Link to={`/products/${item.id}`}>
                      <NavItem id={item.id} onClick={onClick}>
                        {item.name}
                      </NavItem>
                    </Link>
                  )}
                </div>
              ))
            : null}
        </div>
      )}
    </div>
  );
};
