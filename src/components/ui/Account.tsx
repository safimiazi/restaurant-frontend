import { Dropdown, MenuProps } from "antd";
import { User, User2, LogOut } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { logout } from "../../redux/features/auth/authSlice"; // Import logout action

const Account = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state: RootState) => state.auth);

  const handleLogout = () => {
    dispatch(logout()); // Dispatch logout action
  };

  const items = [
    {
      key: "1",
      label: "My Account",
      icon: <User />,
    },
    {
      type: "divider",
    },
    {
      key: "2",
      label: "Profile",
    },
    user && {
      key: "3",
      label: "Logout",
      icon: <LogOut />,
      onClick: handleLogout, // Call logout function on click
    },
  ].filter(Boolean) as MenuProps["items"]; // Cast to MenuProps["items"] after filtering

  return (
    <Dropdown menu={{ items }}>
      <a onClick={(e) => e.preventDefault()}>
        <div className="p-2 rounded-full bg-gray-200">
          <User2
            className="text-gray-600 hover:text-blue-500 transition duration-300 cursor-pointer"
            size={24}
          />
        </div>
      </a>
    </Dropdown>
  );
};

export default Account;
