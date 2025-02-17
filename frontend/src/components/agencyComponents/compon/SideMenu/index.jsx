import {
  AppstoreTwoTone,
  ShoppingTwoTone,
  ShopTwoTone,
  TeamOutlined,
} from "@ant-design/icons";
import { Menu } from "antd";
import "./SideMenu.css";
import { useNavigate } from "react-router-dom";

function SideMenu() {
  const navigate = useNavigate();
  return (
    <div className="SideMenu">
      <Menu
        onClick={(item) => {
          navigate(`/agency/${item.key}`);
        }}
        items={[
          {
            label: "DashBoard",
            icon: <AppstoreTwoTone />,
            key: "dashboard", // ✅ Updated key to match nested route
          },
          {
            label: "Inventory",
            icon: <ShopTwoTone />,
            key: "inventory", // ✅ Updated key
          },
          {
            label: "Orders",
            icon: <ShoppingTwoTone />,
            key: "orders", // ✅ Updated key
          },
          {
            label: "Customers",
            icon: <TeamOutlined />,
            key: "customers", // ✅ Updated key
          },
        ]}
      ></Menu>
    </div>
  );
}

export default SideMenu;
