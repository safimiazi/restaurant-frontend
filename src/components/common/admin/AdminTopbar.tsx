/* eslint-disable @typescript-eslint/no-explicit-any */
import { MenuIcon } from "lucide-react";

const AdminTopbar = ({setIsMobileMenuOpen, isMobileMenuOpen}: any) => {
    return (
        <div className="h-16 border-b border-gray-200  flex items-center justify-between px-4 md:px-10 bg-white shadow-sm">
              <button
        type="button"
        className="md:hidden z-50 p-2  mr-2 rounded-lg bg-white dark:bg-[#0F0F12] shadow-md"
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
      >
        <MenuIcon className="h-5 w-5 text-gray-600 dark:text-gray-300" />
      </button>
        </div>
    );
};

export default AdminTopbar;