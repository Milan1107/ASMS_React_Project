import { Table, Tabs, Typography } from "antd";

function OrdersPage() {
  const orders = [
    { orderId: "001", customer: "Ramnikbhai", amount: "₹12000", status: "Completed" },
    { orderId: "002", customer: "Mukeshbhai", amount: "₹75000", status: "Pending" },
    { orderId: "003", customer: "Sanjaybhai", amount: "₹55000", status: "Completed" },
    { orderId: "004", customer: "Jigneshbhai", amount: "₹68000", status: "Pending" },
    { orderId: "005", customer: "Hiteshbhai", amount: "₹30000", status: "Completed" },
  ];

  const columns = [
    { title: "Order ID", dataIndex: "orderId", key: "orderId" },
    { title: "Customer", dataIndex: "customer", key: "customer" },
    { title: "Amount", dataIndex: "amount", key: "amount" },
    { title: "Status", dataIndex: "status", key: "status" },
  ];

  return (
    <div>
      <Typography.Title level={4}>Orders</Typography.Title>
      <Tabs defaultActiveKey="all">
        <Tabs.TabPane tab="All Orders" key="all">
          <Table columns={columns} dataSource={orders} pagination={{ pageSize: 5 }} />
        </Tabs.TabPane>
        <Tabs.TabPane tab="Pending Orders" key="pending">
          <Table columns={columns} dataSource={orders.filter(order => order.status === "Pending")} pagination={{ pageSize: 5 }} />
        </Tabs.TabPane>
        <Tabs.TabPane tab="Completed Orders" key="completed">
          <Table columns={columns} dataSource={orders.filter(order => order.status === "Completed")} pagination={{ pageSize: 5 }} />
        </Tabs.TabPane>
      </Tabs>
    </div>
  );
}

export default OrdersPage;
