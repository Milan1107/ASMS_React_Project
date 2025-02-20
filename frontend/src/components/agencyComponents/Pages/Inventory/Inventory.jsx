import { Table, Tag, Typography, Button, Input, Form, Modal, Select, message } from "antd";
import { useState, useEffect } from "react";
import { PlusOutlined, DeleteOutlined } from "@ant-design/icons";
import axios from "axios";

function InventoryPage() {
  const [inventory, setInventory] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();

  const categories = ["Detergent", "Shampoo", "Beverages", "Oral Care", "Skin Care", "Food", "Household Essentials"];

  // ✅ Fetch Inventory from Backend
  const fetchInventory = async () => {
    setLoading(true);
    try {
      const res = await axios.get("http://localhost:8080/inventory");
      setInventory(res.data);
    } catch (error) {
      message.error("Failed to load inventory!"+error.message());
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchInventory();
  }, []);

  // ✅ Add New Inventory Item
  const addInventory = async (values) => {
    try {
      const { data } = await axios.post("http://localhost:8080/inventory", values);
      setInventory((prev) => [...prev, data]);
      message.success("Inventory item added!");
      setIsModalOpen(false);
      form.resetFields();
    } catch (error) {
      message.error("Failed to add inventory!"+error.message());
    }
  };

  // ✅ Update Quantity
  const updateQuantity = async (id, change) => {
    try {
      const { data } = await axios.put(`http://localhost:8080/inventory/${id}`, { change });
      setInventory((prev) =>
        prev.map((item) => (item._id === id ? { ...item, qty: data.qty, status: data.status } : item))
      );
      message.success("Quantity updated!");
    } catch (error) {
      message.error("Failed to update quantity!"+error.message());
    }
  };

  // ✅ Delete Inventory Item
  const deleteItem = async (id) => {
    try {
      await axios.delete(`http://localhost:8080/inventory/${id}`);
      setInventory((prev) => prev.filter((item) => item._id !== id));
      message.success("Item deleted!");
    } catch (error) {
      message.error("Failed to delete item!"+error.message());
    }
  };

  const columns = [
    { title: "Product ID", dataIndex: "productId", key: "productId" },
    { title: "Name", dataIndex: "name", key: "name" },
    { title: "Category", dataIndex: "category", key: "category" },
    { title: "Weight", dataIndex: "weight", key: "weight" },
    { title: "Quantity (Lots)", dataIndex: "qty", key: "qty" },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status) => {
        let color = status === "Available" ? "green" : status === "Low Stock" ? "orange" : "red";
        return <Tag color={color}>{status}</Tag>;
      },
    },
    { title: "Description", dataIndex: "description", key: "description" },
    { title: "Price", dataIndex: "price", key: "price" },
    { title: "Expiry Date", dataIndex: "expiryDate", key: "expiryDate" },
    {
      title: "Actions",
      key: "actions",
      render: (_, record) => (
        <>
          <Button
            type="primary"
            icon={<PlusOutlined />}
            onClick={() => updateQuantity(record._id, 5)}
            style={{ marginRight: 8 }}
          />
          <Button type="danger" icon={<DeleteOutlined />} onClick={() => deleteItem(record._id)} />
        </>
      ),
    },
  ];

  return (
    <div>
      <Typography.Title level={4}>Inventory</Typography.Title>
      <Button type="primary" onClick={() => setIsModalOpen(true)} style={{ marginBottom: 16 }}>
        Add New Inventory
      </Button>
      <Table
        columns={columns}
        dataSource={inventory}
        rowKey="_id"
        loading={loading}
        pagination={{ pageSize: 5 }}
      />

      {/* ✅ Modal for Adding Inventory */}
      <Modal
        title="Add New Inventory"
        open={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
        onOk={() => form.submit()}
      >
        <Form form={form} onFinish={addInventory} layout="vertical">
          <Form.Item name="name" label="Name" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item name="category" label="Category" rules={[{ required: true }]}>
            <Select placeholder="Select category">
              {categories.map((category) => (
                <Select.Option key={category} value={category}>
                  {category}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item name="weight" label="Weight" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item name="qty" label="Quantity (in Lots)" rules={[{ required: true }]}>
            <Select placeholder="Select lot size">
              {[5, 10, 20, 50, 100, 200].map((lot) => (
                <Select.Option key={lot} value={lot}>
                  {lot}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item name="description" label="Description">
            <Input.TextArea />
          </Form.Item>
          <Form.Item name="price" label="Price" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item name="expiryDate" label="Expiry Date" rules={[{ required: true }]}>
            <Input type="date" />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}

export default InventoryPage;
