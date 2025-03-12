import {
  Table,
  Tag,
  Typography,
  Button,
  Input,
  Form,
  Modal,
  Select,
  message
} from "antd";
import { useState, useEffect } from "react";
import { PlusOutlined, DeleteOutlined, ExclamationCircleOutlined } from "@ant-design/icons";
import axios from "axios";

const { confirm } = Modal;

function InventoryPage() {
  const [inventory, setInventory] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();

  const categories = [
    "Detergent",
    "Shampoo",
    "Beverages",
    "Oral Care",
    "Skin Care",
    "Food",
    "Household Essentials"
  ];

  // ✅ Fetch Inventory from Backend
  const fetchInventory = async () => {
    setLoading(true);
    try {
      const res = await axios.get("http://localhost:8080/inventory");
      setInventory(res.data);
    } catch (error) {
      message.error("Failed to load inventory! " + error.message);
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
      message.error("Failed to add inventory! " + error.message);
    }
  };

  // ✅ Update Quantity
  const updateQuantity = async (id, change) => {
    try {
      const { data } = await axios.put(`http://localhost:8080/inventory/${id}`, { change });
      setInventory((prev) =>
        prev.map((item) =>
          item._id === id ? { ...item, qty: data.qty, status: data.status } : item
        )
      );
      message.success("Quantity updated!");
    } catch (error) {
      message.error("Failed to update quantity! " + error.message);
    }
  };

  // ✅ Delete Inventory Item with Confirmation
  const deleteItem = async (productId) => {
    confirm({
      title: "Are you sure you want to delete this item?",
      icon: <ExclamationCircleOutlined />,
      content: "This action cannot be undone.",
      onOk: async () => {
        try {
          await axios.delete(`http://localhost:8080/inventory/${productId}`);
          setInventory((prev) => prev.filter((item) => item.productId !== productId));
          message.success("Item deleted!");
        } catch (error) {
          message.error("Failed to delete item! " + error.message);
        }
      },
      onCancel() {
        message.info("Deletion cancelled.");
      }
    });
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
        let color =
          status === "Available"
            ? "green"
            : status === "Low Stock"
            ? "orange"
            : "red";
        return <Tag color={color}>{status}</Tag>;
      }
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
          <Button
            type="danger"
            icon={<DeleteOutlined />}
            onClick={() => deleteItem(record.productId)}
          />
        </>
      )
    }
  ];

  return (
    <div>
      <Typography.Title level={4}>Inventory</Typography.Title>
      <Button
        type="primary"
        onClick={() => setIsModalOpen(true)}
        style={{ marginBottom: 16 }}
      >
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
          <Form.Item
            name="expiryDate"
            label="Expiry Date"
            rules={[{ required: true }]}
          >
            <Input type="date" />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}

export default InventoryPage;










// import { Table, Tag, Typography, Button, Input, Form, Modal, Select, Upload, message } from "antd";
// import { PlusOutlined, DeleteOutlined, UploadOutlined } from "@ant-design/icons";
// import { useState, useEffect } from "react";
// import axios from "axios";

// function InventoryPage() {
//   const [inventory, setInventory] = useState([]);
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [loading, setLoading] = useState(false);
//   const [file, setFile] = useState(null); // Store the file object instead of base64
//   const [form] = Form.useForm();

//   const categories = ["Detergent", "Shampoo", "Beverages", "Oral Care", "Skin Care", "Food", "Household Essentials"];

//   const fetchInventory = async () => {
//     setLoading(true);
//     try {
//       const res = await axios.get("http://localhost:8080/inventory");
//       setInventory(res.data);
//     } catch (error) {
//       message.error("Failed to load inventory! " + error.message);
//     }
//     setLoading(false);
//   };

//   useEffect(() => {
//     fetchInventory();
//   }, []);

//   // Handle Image Upload
//   const handleImageUpload = (info) => {
//     setFile(info.file.originFileObj); // Store the raw file object
//   };

//   // Add New Inventory Item
//   const addInventory = async (values) => {
//     try {
//       const formData = new FormData();
//       formData.append("name", values.name);
//       formData.append("category", values.category);
//       formData.append("weight", values.weight);
//       formData.append("qty", values.qty);
//       formData.append("price", values.price);
//       if (file) {
//         formData.append("image", file); // Append the file to the FormData
//       }

//       const { data } = await axios.post("http://localhost:8080/inventory", formData, {
//         headers: { "Content-Type": "multipart/form-data" },
//       });

//       setInventory((prev) => [...prev, data]);
//       message.success("Inventory item added!");
//       setIsModalOpen(false);
//       form.resetFields();
//       setFile(null); // Reset file after upload
//     } catch (error) {
//       message.error("Failed to add inventory! " + error.message);
//     }
//   };

//   const columns = [
//     { title: "Product ID", dataIndex: "productId", key: "productId" },
//     { title: "Name", dataIndex: "name", key: "name" },
//     { title: "Category", dataIndex: "category", key: "category" },
//     { title: "Weight", dataIndex: "weight", key: "weight" },
//     { title: "Quantity", dataIndex: "qty", key: "qty" },
//     {
//       title: "Status",
//       dataIndex: "status",
//       key: "status",
//       render: (status) => {
//         let color = status === "Available" ? "green" : status === "Low Stock" ? "orange" : "red";
//         return <Tag color={color}>{status}</Tag>;
//       },
//     },
//     { title: "Price", dataIndex: "price", key: "price" },
//     {
//       title: "Image",
//       dataIndex: "image",
//       key: "image",
//       render: (image) => image && <img src={image} alt="Product" width="50" height="50" />,
//     },
//   ];

//   return (
//     <div>
//       <Typography.Title level={4}>Inventory</Typography.Title>
//       <Button type="primary" onClick={() => setIsModalOpen(true)} style={{ marginBottom: 16 }}>
//         Add New Inventory
//       </Button>
//       <Table columns={columns} dataSource={inventory} rowKey="_id" loading={loading} pagination={{ pageSize: 5 }} />

//       <Modal title="Add New Inventory" open={isModalOpen} onCancel={() => setIsModalOpen(false)} onOk={() => form.submit()}>
//         <Form form={form} onFinish={addInventory} layout="vertical">
//           <Form.Item name="name" label="Name" rules={[{ required: true }]}><Input /></Form.Item>
//           <Form.Item name="category" label="Category" rules={[{ required: true }]}><Select>{categories.map((c) => (<Select.Option key={c} value={c}>{c}</Select.Option>))}</Select></Form.Item>
//           <Form.Item name="weight" label="Weight" rules={[{ required: true }]}><Input /></Form.Item>
//           <Form.Item name="qty" label="Quantity (Lots)" rules={[{ required: true }]}><Input /></Form.Item>
//           <Form.Item name="price" label="Price" rules={[{ required: true }]}><Input /></Form.Item>

//           <Form.Item label="Product Image">
//             <Upload
//               beforeUpload={() => false} // Prevent automatic upload
//               onChange={handleImageUpload}
//               showUploadList={false}
//             >
//               <Button icon={<UploadOutlined />}>Upload Image</Button>
//             </Upload>
//             {file && (
//               <img
//                 src={URL.createObjectURL(file)} // Preview the file
//                 alt="Product Preview"
//                 style={{ marginTop: 10, width: 100 }}
//               />
//             )}
//           </Form.Item>
//         </Form>
//       </Modal>
//     </div>
//   );
// }

// export default InventoryPage;