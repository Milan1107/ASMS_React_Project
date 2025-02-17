import { Space } from "antd";
import AppHeader from "./compon/AppHeader";
import SideMenu from "./compon/SideMenu";
import PageContent from "./compon/PageContent";
import AppFooter from "./compon/AppFooter";
import "./SideBar.css";

function SideBar() {
  return (
    <div className="sidebar">
      <AppHeader />
      <Space className="SideMenuAndPageContent">
        <SideMenu />
        <PageContent />
      </Space>
      <AppFooter />
    </div>
  );
}

export default SideBar;
