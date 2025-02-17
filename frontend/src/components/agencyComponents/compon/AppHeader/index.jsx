import { Badge, Space, Typography } from "antd";
import { BellFilled, MailOutlined } from "@ant-design/icons";

function AppHeader() {
  return (
    <div className="AppHeader">
      <Typography.Title>My Dashboard</Typography.Title>
      <Space>
        <Badge>
          <MailOutlined style={{ fontSize: 24 }} />
        </Badge>
        <Badge count={4}>
          <BellFilled style={{ fontSize: 24 }} />
        </Badge>
      </Space>
    </div>
  );
}

export default AppHeader;
