import { Table, Typography, Tag } from "antd";

function CustomerList() {
  const customers = [
    { id: "CUST001", name: "Rahul Shah", email: "rahul@example.com", orders: 5, status: "Active" },
    { id: "CUST002", name: "Priya Patel", email: "priya@example.com", orders: 2, status: "Inactive" },
    { id: "CUST003", name: "Amit Mehta", email: "amit@example.com", orders: 8, status: "Active" },
    { id: "CUST004", name: "Sneha Desai", email: "sneha@example.com", orders: 0, status: "Blocked" },
    { id: "CUST005", name: "Vikram Joshi", email: "vikram@example.com", orders: 3, status: "Active" },
    { id: "CUST006", name: "Neha Tiwari", email: "neha@example.com", orders: 1, status: "Inactive" },
    { id: "CUST007", name: "Suresh Kumar", email: "suresh@example.com", orders: 10, status: "Active" },
  ];

  const columns = [
    { title: "Customer ID", dataIndex: "id", key: "id" },
    { title: "Name", dataIndex: "name", key: "name" },
    { title: "Email", dataIndex: "email", key: "email" },
    { title: "Orders", dataIndex: "orders", key: "orders" },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status) => {
        let color =
          status === "Active" ? "green" :
          status === "Inactive" ? "orange" : "red";
        return <Tag color={color}>{status}</Tag>;
      },
    },
  ];

  return (
    <div>
      <Typography.Title level={4}>Customers</Typography.Title>
      <Table columns={columns} dataSource={customers} pagination={{ pageSize: 5 }} />
    </div>
  );
}

export default CustomerList;
