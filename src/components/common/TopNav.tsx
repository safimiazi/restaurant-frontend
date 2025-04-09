import { DownOutlined } from "@ant-design/icons";
import type { MenuProps } from "antd";
import { Dropdown, Space } from "antd";
import { CategoriesSidebarItems } from "../../utils/CategoriesSidebarItem";

const categoriesMenu: MenuProps["items"] = CategoriesSidebarItems.map(
  (category, index) => ({
    key: `category-${index}`,
    label: category.name,
    children: category.subcategories?.map((sub, subIndex) => ({
      key: `sub-${index}-${subIndex}`,
      label: sub.name,
    })),
  })
);

const TopNav = () => {
  return (
    <div className="p-3 sm:px-6 flex items-center justify-between bg-white border-b border-gray-200 h-full">
      {/* Category Dropdown */}
      <Dropdown menu={{ items: categoriesMenu }}>
        <a onClick={(e) => e.preventDefault()}>
          <Space>
            Categories
            <DownOutlined />
          </Space>
        </a>
      </Dropdown>
    </div>
  );
};

export default TopNav;
