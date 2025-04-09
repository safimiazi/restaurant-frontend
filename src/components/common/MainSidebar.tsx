/* eslint-disable @typescript-eslint/no-explicit-any */
import Sidebar from "./Sidebar";

export const MainSidebar = ({isMobileMenuOpen, setIsMobileMenuOpen} :   any) => {
  

  
    return (
      <div>
        <Sidebar
          setIsMobileMenuOpen={setIsMobileMenuOpen}
          isMobileMenuOpen={isMobileMenuOpen}
        />
      </div>
    );
  };

 