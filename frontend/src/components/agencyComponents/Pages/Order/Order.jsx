import { Table, Tabs, Typography, Tag } from "antd";

const { TabPane } = Tabs;

function OrdersPage() {
  const orders = [
    { orderId: "001", customer: "Ramnikbhai", amount: "₹12,000", status: "Completed" },
    { orderId: "002", customer: "Mukeshbhai", amount: "₹75,000", status: "Pending" },
    { orderId: "003", customer: "Sanjaybhai", amount: "₹55,000", status: "Completed" },
    { orderId: "004", customer: "Jigneshbhai", amount: "₹68,000", status: "Pending" },
    { orderId: "005", customer: "Hiteshbhai", amount: "₹30,000", status: "Completed" },
  ];

  const columns = [
    { title: "Order ID", dataIndex: "orderId", key: "orderId" },
    { title: "Customer", dataIndex: "customer", key: "customer" },
    { title: "Amount", dataIndex: "amount", key: "amount" },
    { 
      title: "Status", 
      dataIndex: "status", 
      key: "status",
      render: (status) => {
        const color = status === "Completed" ? "green" : "orange";
        return <Tag color={color}>{status}</Tag>;
      }
    },
  ];

  return (
    <div>
      <Typography.Title level={3}>Orders Management</Typography.Title>
      <Tabs defaultActiveKey="all">
        <TabPane tab="All Orders" key="all">
          <Table columns={columns} dataSource={orders} pagination={{ pageSize: 5 }} />
        </TabPane>
        <TabPane tab="Pending Orders" key="pending">
          <Table 
            columns={columns} 
            dataSource={orders.filter(order => order.status === "Pending")} 
            pagination={{ pageSize: 5 }} 
          />
        </TabPane>
        <TabPane tab="Completed Orders" key="completed">
          <Table 
            columns={columns} 
            dataSource={orders.filter(order => order.status === "Completed")} 
            pagination={{ pageSize: 5 }} 
          />
        </TabPane>
      </Tabs>
    </div>
  );
}

export default OrdersPage;
