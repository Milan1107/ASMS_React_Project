import { useState, useEffect } from "react";
import {
  Table,
  Tag,
  Typography,
  Button,
  Input,
  Form,
  Modal,
  Select,
  message,
  Upload,
  DatePicker,
} from "antd";
import { PlusOutlined, DeleteOutlined, UploadOutlined, ExclamationCircleOutlined } from "@ant-design/icons";
import axios from "axios";

const { confirm } = Modal;

const Inventory = () => {
  const [inventory, setInventory] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();
  const [imageUrl, setImageUrl] = useState("");

  const categories = ["Detergent", "Shampoo", "Beverages", "Oral Care", "Skin Care", "Food", "Household Essentials"];
  const lotSizes = [10, 20, 50, 100, 200];

  useEffect(() => {
    fetchInventory();
  }, []);

  const fetchInventory = async () => {
    setLoading(true);
    try {
      const res = await axios.get("http://localhost:8080/inventory");
      setInventory(res.data);
    } catch (error) {
      message.error(`Failed to load inventory! ${error.message}`);
    }
    setLoading(false);
  };

  const addInventory = async (values) => {
    try {
      const newItem = { ...values, imageUrl };
      const { data } = await axios.post("http://localhost:8080/inventory", newItem);
      setInventory((prev) => [...prev, data]);
      message.success("Inventory item added successfully!");
      resetForm();
    } catch (error) {
      message.error(`Failed to add inventory! ${error.message}`);
    }
  };

  const resetForm = () => {
    setIsModalOpen(false);
    form.resetFields();
    setImageUrl("");
  };

  const handleImageUpload = async ({ file }) => {
    const formData = new FormData();
    try {
      const values = await form.validateFields(["name", "price", "weight"]);
      formData.append("image", file);
      formData.append("productName", values.name);
      formData.append("price", values.price);
      formData.append("weight", values.weight);

      const res = await axios.post("http://localhost:8080/upload/upload-image", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      setImageUrl(res.data.imageUrl);
      message.success("Image uploaded successfully!");
    } catch (error) {
      message.error(`Image upload failed: ${error.response?.data?.message || error.message}`);
    }
  };

  const deleteItem = (productId) => {
    confirm({
      title: "Are you sure you want to delete this item?",
      icon: <ExclamationCircleOutlined />,
      content: "This action cannot be undone.",
      onOk: async () => {
        try {
          await axios.delete(`http://localhost:8080/inventory/${productId}`); // ✅ Corrected URL
          setInventory((prev) => prev.filter((item) => item.productId !== productId));
          message.success("Item deleted successfully!");
        } catch (error) {
          message.error(`Failed to delete item! ${error.message}`);
        }
      },
    });
  };

  const incrementQty = async (productId, lotSize) => {
    try {
      const { data } = await axios.put(`http://localhost:8080/inventory/${productId}/increment`, { lotSize }); // ✅ Corrected URL
      setInventory((prev) =>
        prev.map((item) => (item.productId === productId ? { ...item, qty: data.qty } : item))
      );
      message.success("Quantity updated successfully!");
    } catch (error) {
      message.error(`Failed to update quantity! ${error.message}`);
    }
  };
  


  const columns = [
    { title: "Product ID", dataIndex: "productId", key: "productId" },
    { title: "Name", dataIndex: "name", key: "name" },
    { title: "Category", dataIndex: "category", key: "category" },
    { title: "Weight", dataIndex: "weight", key: "weight" },
    { title: "Quantity", dataIndex: "qty", key: "qty" },
    { title: "Price", dataIndex: "price", key: "price" },
    { title: "Expiry Date", dataIndex: "expiryDate", key: "expiryDate" },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status) => {
        let color = status === "Available" ? "green" : status === "Low Stock" ? "orange" : "red";
        return <Tag color={color}>{status}</Tag>;
      },
    },
    {
      title: "Image",
      dataIndex: "imageUrl",
      key: "imageUrl",
      render: (url) => (url ? <img src={url} alt="product" width={50} /> : "No Image"),
    },
    {
      title: "Actions",
      key: "actions",
      render: (_, record) => (
        <>
          <Button type="danger" icon={<DeleteOutlined />} onClick={() => deleteItem(record.productId)} />
          <Select defaultValue={10} style={{ width: 80, marginLeft: 10 }} onChange={(value) => incrementQty(record.productId, value)}>
            {lotSizes.map((size) => (
              <Select.Option key={size} value={size}>{size}</Select.Option>
            ))}
          </Select>
          <Button icon={<PlusOutlined />} onClick={() => incrementQty(record.productId, 10)} style={{ marginLeft: 10 }} />
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
      <Table columns={columns} dataSource={inventory} rowKey="_id" loading={loading} pagination={{ pageSize: 5 }} />

      <Modal title="Add New Inventory" open={isModalOpen} onCancel={resetForm} onOk={() => form.submit()}>
        <Form form={form} onFinish={addInventory} layout="vertical">
          <Form.Item name="name" label="Name" rules={[{ required: true }]}><Input /></Form.Item>
          <Form.Item name="category" label="Category" rules={[{ required: true }]}><Select>{categories.map((cat) => <Select.Option key={cat} value={cat}>{cat}</Select.Option>)}</Select></Form.Item>
          <Form.Item name="price" label="Price" rules={[{ required: true }]}><Input type="number" /></Form.Item>
          <Form.Item name="qty" label="Quantity in Lot" rules={[{ required: true }]}><Input type="number" /></Form.Item>
          <Form.Item name="weight" label="Weight"><Input /></Form.Item>
          <Form.Item name="expiryDate" label="Expiry Date"><DatePicker style={{ width: "100%" }} /></Form.Item>
          <Upload customRequest={handleImageUpload} showUploadList={false}><Button icon={<UploadOutlined />}>Upload Image</Button></Upload>
          {imageUrl && <img src={imageUrl} alt="Uploaded" width={50} />}
        </Form>
      </Modal>
    </div>
  );
};

export default Inventory;
