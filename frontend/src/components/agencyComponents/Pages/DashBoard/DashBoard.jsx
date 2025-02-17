import {
  ShoppingCartOutlined,
  DollarCircleOutlined,
  UserOutlined,
  DatabaseOutlined,
} from "@ant-design/icons"; // Ant Design Icons

import { Card, Space, Statistic, Typography, Table } from "antd"; // Ant Design Components
import { Bar } from "@ant-design/plots"; // Ant Design Charts (for Bar Chart)

function DashBoard() {
  return (
    <div>
      <Typography.Title level={4}>DashBoard</Typography.Title>
      <Space direction="horizontal">
        <DashBoardCard title={"Orders"} value={82} icon={<ShoppingCartOutlined 
          style={{
            color:"green",
            backgroundColor:"rgba(0,255,0,0.25)",
            borderRadius:20,
            fontSize:20,
            padding:8
          }}
        />} />
        <DashBoardCard title={"Revenue"} value={"₹11,20,000"} icon={<DollarCircleOutlined 
          style={{
            color:"red",
            backgroundColor:"rgba(255,0,0,0.25)",
            borderRadius:20,
            fontSize:20,
            padding:8
          }}
        />} />
        <DashBoardCard title={"Customers"} value={120} icon={<UserOutlined
          style={{
            color:"blue",
            backgroundColor:"rgba(0, 60, 255, 0.25)",
            borderRadius:20,
            fontSize:20,
            padding:8
          }}
        />} />
        <DashBoardCard title={"Products"} value={340} icon={<DatabaseOutlined 
          style={{
            color:"orange",
            backgroundColor:"rgba(255, 251, 0, 0.25)",
            borderRadius:20,
            fontSize:20,
            padding:8
          }}
        />} />
      </Space>

      {/* Bar Chart Section */}
      <div style={{ width: "50%", marginTop: "20px" }}> 
        <BarChart />
      </div>
      
      {/* Order History Table */}
      <Typography.Title level={5} style={{ marginTop: "20px" }}>Order History</Typography.Title>
      <OrderHistoryTable />
    </div>
  );
}

function DashBoardCard({ title, value, icon }) {
  return (
    <Card style={{ width: 200 }}>
      <Space>
        {icon}
        <Statistic title={title} value={value} />
      </Space>
    </Card>
  );
}

// ✅ Bar Chart Component (Vertical & Smaller Width)
function BarChart() {
  const data = [
    { category: "Electronics", sales: 4000 },
    { category: "Clothing", sales: 3000 },
    { category: "Grocery", sales: 2500 },
    { category: "Books", sales: 2000 },
  ];

  const config = {
    data,
    xField: "sales",
    yField: "category",
    seriesField: "category",
    legend: false,
    barWidthRatio: 0.3, // Reducing bar width
    height: 250, // Smaller chart height
  };

  return <Bar {...config} />;
}

// ✅ Order History Table Component
function OrderHistoryTable() {
  const columns = [
    { title: "Order ID", dataIndex: "orderId", key: "orderId" },
    { title: "Customer", dataIndex: "customer", key: "customer" },
    { title: "Amount", dataIndex: "amount", key: "amount" },
    { title: "Status", dataIndex: "status", key: "status" },
  ];

  const data = [
    { orderId: "001", customer: "Ramnikbhai", amount: "₹12000", status: "Completed" },
    { orderId: "002", customer: "Mukeshbhai", amount: "₹75000", status: "Pending" },
    { orderId: "003", customer: "Sanjaybhai", amount: "₹55000", status: "Completed" },
  ];

  return <Table columns={columns} dataSource={data} pagination={{ pageSize: 5 }} />;
}

export default DashBoard;



// {"₹1,20,000"}