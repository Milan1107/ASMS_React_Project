import {
  ShoppingCartOutlined,
  DollarCircleOutlined,
  UserOutlined,
  DatabaseOutlined,
} from "@ant-design/icons";

import { Card, Space, Statistic, Typography, Table } from "antd";
import { useNavigate } from "react-router-dom";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from "chart.js";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

function DashBoard() {
  const navigate = useNavigate();

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
        />} onClick={() => navigate('/agency/orders')} />
        
        <DashBoardCard title={"Revenue"} value={"₹11,20,000"} icon={<DollarCircleOutlined 
          style={{
            color:"red",
            backgroundColor:"rgba(255,0,0,0.25)",
            borderRadius:20,
            fontSize:20,
            padding:8
          }}
        />} onClick={() => navigate('/agency/revenue')} />
        
        <DashBoardCard title={"Customers"} value={120} icon={<UserOutlined
          style={{
            color:"blue",
            backgroundColor:"rgba(0, 60, 255, 0.25)",
            borderRadius:20,
            fontSize:20,
            padding:8
          }}
        />} onClick={() => navigate('/agency/customers')} />
        
        <DashBoardCard title={"Products"} value={340} icon={<DatabaseOutlined 
          style={{
            color:"orange",
            backgroundColor:"rgba(255, 251, 0, 0.25)",
            borderRadius:20,
            fontSize:20,
            padding:8
          }}
        />} onClick={() => navigate('/agency/inventory')} />
      </Space>

      <div style={{ width: "50%", marginTop: "20px" }}> 
        <BarChart />
      </div>
      
      <Typography.Title level={5} style={{ marginTop: "20px" }}>Order History</Typography.Title>
      <OrderHistoryTable />
    </div>
  );
}

function DashBoardCard({ title, value, icon, onClick }) {
  return (
    <Card style={{ width: 200, cursor: 'pointer' }} onClick={onClick} hoverable>
      <Space>
        {icon}
        <Statistic title={title} value={value} />
      </Space>
    </Card>
  );
}

function BarChart() {
  const data = {
    labels: ["Electronics", "Clothing", "Grocery", "Books"],
    datasets: [
      {
        label: "Sales",
        data: [4000, 3000, 2500, 2000],
        backgroundColor: ["rgba(75, 192, 192, 0.2)"],
        borderColor: ["rgba(75, 192, 192, 1)"],
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: { display: false },
      title: { display: true, text: "Sales by Category" },
    },
    scales: {
      x: { beginAtZero: true },
      y: { beginAtZero: true },
    },
  };

  return <Bar data={data} options={options} />;
}

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