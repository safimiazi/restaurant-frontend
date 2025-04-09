export const NavItem = ({
    children,
    id,
    onClick,
  }: {
    children: React.ReactNode;
    id: string; // Category ID
    onClick: (id: string) => void; // Click handler
  }) => {
    return (
      <div
        onClick={() => onClick(id)} // Trigger onClick with category ID
        className="flex items-center px-3 py-2 text-sm rounded-md transition-colors text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-50 dark:hover:bg-[#1F1F23] cursor-pointer"
      >
        <div className="text-base">{children}</div>
      </div>
    );
  };