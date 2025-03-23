// import {
//   Table,
//   Tag,
//   Typography,
//   Button,
//   Input,
//   Form,
//   Modal,
//   Select,
//   message,
//   Upload
// } from "antd";
// import { useState, useEffect } from "react";
// import { PlusOutlined, DeleteOutlined, ExclamationCircleOutlined, UploadOutlined } from "@ant-design/icons";
// import axios from "axios";

// const { confirm } = Modal;

// function InventoryPage() {
//   const [inventory, setInventory] = useState([]);
//   const [isModalOpen, setIsModalOpen] = false;
//   const [loading, setLoading] = false;
//   const [form] = Form.useForm();
//   const [imageUrl, setImageUrl] = useState(""); // Store image URL

//   const categories = [
//     "Detergent",
//     "Shampoo",
//     "Beverages",
//     "Oral Care",
//     "Skin Care",
//     "Food",
//     "Household Essentials"
//   ];

//   // ✅ Fetch Inventory from Backend
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

//    // ✅ Add New Inventory Item
//    const addInventory = async (values) => {
//     try {
//       const newItem = { ...values, imageUrl }; // Attach image URL
//       const { data } = await axios.post("http://localhost:8080/inventory", newItem);
//       setInventory((prev) => [...prev, data]);
//       message.success("Inventory item added!");
//       setIsModalOpen(false);
//       form.resetFields();
//       setImageUrl(""); // Reset image URL after adding
//     } catch (error) {
//       message.error("Failed to add inventory! " + error.message);
//     }
//   };




//   // ✅ Handle Image Upload
//   const handleImageUpload = async ({ file }) => {
//     const formData = new FormData();
//     formData.append("image", file);
//     formData.append("productName","aaaaa");

//     try {
//       const res = await axios.post("http://localhost:8080/upload/upload-image", formData, {
//         headers: { "Content-Type": "multipart/form-data" },
//       });
//       setImageUrl(res.data.imageUrl);
//       message.success("Image uploaded successfully!");
//     } catch (error) {
//       message.error("Image upload failed: " + error.message);
//     }
//   };

 

//   // ✅ Update Quantity
//   const updateQuantity = async (id, change) => {
//     try {
//       const { data } = await axios.put(`http://localhost:8080/inventory/${id}`, { change });
//       setInventory((prev) =>
//         prev.map((item) =>
//           item._id === id ? { ...item, qty: data.qty, status: data.status } : item
//         )
//       );
//       message.success("Quantity updated!");
//     } catch (error) {
//       message.error("Failed to update quantity! " + error.message);
//     }
//   };

//   // ✅ Delete Inventory Item with Confirmation
//   const deleteItem = async (productId) => {
//     confirm({
//       title: "Are you sure you want to delete this item?",
//       icon: <ExclamationCircleOutlined />,
//       content: "This action cannot be undone.",
//       onOk: async () => {
//         try {
//           await axios.delete(`http://localhost:8080/inventory/${productId}`);
//           setInventory((prev) => prev.filter((item) => item.productId !== productId));
//           message.success("Item deleted!");
//         } catch (error) {
//           message.error("Failed to delete item! " + error.message);
//         }
//       },
//       onCancel() {
//         message.info("Deletion cancelled.");
//       }
//     });
//   };

//   const columns = [
//     { title: "Product ID", dataIndex: "productId", key: "productId" },
//     { title: "Name", dataIndex: "name", key: "name" },
//     { title: "Category", dataIndex: "category", key: "category" },
//     { title: "Weight", dataIndex: "weight", key: "weight" },
//     { title: "Quantity (Lots)", dataIndex: "qty", key: "qty" },
//     {
//       title: "Status",
//       dataIndex: "status",
//       key: "status",
//       render: (status) => {
//         let color =
//           status === "Available"
//             ? "green"
//             : status === "Low Stock"
//             ? "orange"
//             : "red";
//         return <Tag color={color}>{status}</Tag>;
//       }
//     },
//     { title: "Description", dataIndex: "description", key: "description" },
//     { title: "Price", dataIndex: "price", key: "price" },
//     { title: "Expiry Date", dataIndex: "expiryDate", key: "expiryDate" },
//     {
//       title: "Image",
//       dataIndex: "imageUrl",
//       key: "imageUrl",
//       render: (url) => (url ? <img src={url} alt="product" width={50} /> : "No Image"),
//     },
//     {
//       title: "Actions",
//       key: "actions",
//       render: (_, record) => (
//         <>
//           <Button
//             type="primary"
//             icon={<PlusOutlined />}
//             onClick={() => updateQuantity(record._id, 5)}
//             style={{ marginRight: 8 }}
//           />
//           <Button
//             type="danger"
//             icon={<DeleteOutlined />}
//             onClick={() => deleteItem(record.productId)}
//           />
//         </>
//       )
//     }
//   ];

//   return (
//     <div>
//       <Typography.Title level={4}>Inventory</Typography.Title>
//       <Button
//         type="primary"
//         onClick={() => setIsModalOpen(true)}
//         style={{ marginBottom: 16 }}
//       >
//         Add New Inventory
//       </Button>
//       <Table
//         columns={columns}
//         dataSource={inventory}
//         rowKey="_id"
//         loading={loading}
//         pagination={{ pageSize: 5 }}
//       />

//       {/* ✅ Modal for Adding Inventory */}
//       <Modal
//         title="Add New Inventory"
//         open={isModalOpen}
//         onCancel={() => setIsModalOpen(false)}
//         onOk={() => form.submit()} 
//       >
//         <Form form={form} onFinish={addInventory} layout="vertical">
//           <Form.Item name="name" label="Name" rules={[{ required: true }]}>
//             <Input />
//           </Form.Item>
//           <Form.Item name="category" label="Category" rules={[{ required: true }]}>
//             <Select placeholder="Select category">
//               {categories.map((category) => (
//                 <Select.Option key={category} value={category}>
//                   {category}
//                 </Select.Option>
//               ))}
//             </Select>
//           </Form.Item>
//           <Form.Item name="weight" label="Weight" rules={[{ required: true }]}>
//             <Input />
//           </Form.Item>
//           <Form.Item name="qty" label="Quantity (in Lots)" rules={[{ required: true }]}>
//             <Select placeholder="Select lot size">
//               {[5, 10, 20, 50, 100, 200].map((lot) => (
//                 <Select.Option key={lot} value={lot}>
//                   {lot}
//                 </Select.Option>
//               ))}
//             </Select>
//           </Form.Item>
//           <Form.Item name="description" label="Description">
//             <Input.TextArea />
//           </Form.Item>
//           <Form.Item name="price" label="Price" rules={[{ required: true }]}>
//             <Input />
//           </Form.Item>
//           <Form.Item name="expiryDate" label="Expiry Date" rules={[{ required: true }]}>
//             <Input type="date" />
//           </Form.Item>
//           <Upload customRequest={handleImageUpload} showUploadList={false}>
//             <Button icon={<UploadOutlined />}>Upload Image</Button>
//           </Upload>
//           {imageUrl && <img src={imageUrl} alt="Uploaded" width={50} />}
//         </Form>
//       </Modal>
//     </div>
//   );
// }

// export default InventoryPage;

// import React from 'react'


// import { useState, useEffect } from "react";
// import {
//   Table,
//   Tag,
//   Typography,
//   Button,
//   Input,
//   Form,
//   Modal,
//   Select,
//   message,
//   Upload,
//   DatePicker
// } from "antd";
// import { PlusOutlined, DeleteOutlined, UploadOutlined, ExclamationCircleOutlined } from "@ant-design/icons";
// import axios from "axios";

// const { confirm } = Modal;

// function Inventory() {
//   const [inventory, setInventory] = useState([]);
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [loading, setLoading] = useState(false);
//   const [form] = Form.useForm();
//   const [imageUrl, setImageUrl] = useState("");
  
//   const categories = ["Detergent", "Shampoo", "Beverages", "Oral Care", "Skin Care", "Food", "Household Essentials"];
//   const lotSizes = [10, 20, 50, 100, 200];

//   useEffect(() => {
//     fetchInventory();
//   }, []);

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

//   const addInventory = async (values) => {
//     try {
//       const newItem = { ...values, imageUrl };
//       const { data } = await axios.post("http://localhost:8080/inventory", newItem);
//       setInventory((prev) => [...prev, data]);
//       message.success("Inventory item added!");
//       setIsModalOpen(false);
//       form.resetFields();
//       setImageUrl("");
//     } catch (error) {
//       message.error("Failed to add inventory! " + error.message);
//     }
//   };

//   const handleImageUpload = async ({ file }) => {
//     const formData = new FormData();
//     formData.append("image", file);
//     formData.append("productName", "Sample Product");
//     formData.append("price", "100");
//     formData.append("weight", "500g");
  
//     try {
//       const res = await axios.post("http://localhost:8080/upload/upload-image", formData, {
//         headers: { "Content-Type": "multipart/form-data" },
//       });
  
//       console.log("Response:", res.data);
//       message.success("Image uploaded and stored successfully!");
//     } catch (error) {
//       console.error("Upload error:", error.response?.data || error.message);
//       message.error("Image upload failed: " + (error.response?.data?.message || error.message));
//     }
//   };
  

//   const deleteItem = async (productId) => {
//     confirm({
//       title: "Are you sure you want to delete this item?",
//       icon: <ExclamationCircleOutlined />,
//       content: "This action cannot be undone.",
//       onOk: async () => {
//         try {
//           await axios.delete(`http://localhost:8080/inventory/${productId}`);
//           setInventory((prev) => prev.filter((item) => item.productId !== productId));
//           message.success("Item deleted!");
//         } catch (error) {
//           message.error("Failed to delete item! " + error.message);
//         }
//       },
//     });
//   };

//   const incrementQty = async (productId, lotSize) => {
//     try {
//       await axios.put(`http://localhost:8080/inventory/${productId}/increment`, { lotSize });
//       setInventory((prev) =>
//         prev.map((item) => (item.productId === productId ? { ...item, qty: item.qty + lotSize } : item))
//       );
//       message.success("Quantity updated!");
//     } catch (error) {
//       message.error("Failed to update quantity! " + error.message);
//     }
//   };

//   const columns = [
//     { title: "Product ID", dataIndex: "productId", key: "productId" },
//     { title: "Name", dataIndex: "name", key: "name" },
//     { title: "Category", dataIndex: "category", key: "category" },
//     { title: "Weight", dataIndex: "weight", key: "weight" },
//     { title: "Quantity", dataIndex: "qty", key: "qty" },
//     { title: "Price", dataIndex: "price", key: "price" },
//     { title: "Expiry Date", dataIndex: "expiryDate", key: "expiryDate" },
//     {
//       title: "Status",
//       dataIndex: "status",
//       key: "status",
//       render: (status) => {
//         let color = status === "Available" ? "green" : status === "Low Stock" ? "orange" : "red";
//         return <Tag color={color}>{status}</Tag>;
//       },
//     },
//     {
//       title: "Image",
//       dataIndex: "imageUrl",
//       key: "imageUrl",
//       render: (url) => (url ? <img src={url} alt="product" width={50} /> : "No Image"),
//     },
//     {
//       title: "Actions",
//       key: "actions",
//       render: (_, record) => (
//         <>
//           <Button type="danger" icon={<DeleteOutlined />} onClick={() => deleteItem(record.productId)} />
//           <Select
//             defaultValue={10}
//             style={{ width: 80, marginLeft: 10 }}
//             onChange={(value) => incrementQty(record.productId, value)}
//           >
//             {lotSizes.map((size) => (
//               <Select.Option key={size} value={size}>{size}</Select.Option>
//             ))}
//           </Select>
//           <Button icon={<PlusOutlined />} onClick={() => incrementQty(record.productId, 10)} style={{ marginLeft: 10 }} />
//         </>
//       ),
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
//           <Form.Item name="name" label="Name" rules={[{ required: true }]}>
//             <Input />
//           </Form.Item>
//           <Form.Item name="category" label="Category" rules={[{ required: true }]}>
//             <Select>{categories.map((cat) => (<Select.Option key={cat} value={cat}>{cat}</Select.Option>))}</Select>
//           </Form.Item>
//           <Form.Item name="price" label="Price" rules={[{ required: true }]}>
//             <Input type="number" />
//           </Form.Item>
//           <Form.Item name="qty" label="Quantity in Lot" rules={[{ required: true }]}>
//             <Input type="number" />
//           </Form.Item>
//           <Form.Item name="weight" label="Weight">
//             <Input />
//           </Form.Item>
//           <Form.Item name="expiryDate" label="Expiry Date">
//             <DatePicker style={{ width: "100%" }} />
//           </Form.Item>
//           <Upload customRequest={handleImageUpload} showUploadList={false}>
//             <Button icon={<UploadOutlined />}>Upload Image</Button>
//           </Upload>
//           {imageUrl && <img src={imageUrl} alt="Uploaded" width={50} />}
//         </Form>
//       </Modal>
//     </div>
//   );
// }

// export default Inventory;





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
  DatePicker
} from "antd";
import { PlusOutlined, DeleteOutlined, UploadOutlined, ExclamationCircleOutlined } from "@ant-design/icons";
import axios from "axios";

const { confirm } = Modal;

function Inventory() {
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
      message.error("Failed to load inventory! " + error.message);
    }
    setLoading(false);
  };

  const addInventory = async (values) => {
    try {
      const newItem = { ...values, imageUrl };
      const { data } = await axios.post("http://localhost:8080/inventory", newItem);
      setInventory((prev) => [...prev, data]);
      message.success("Inventory item added!");
      setIsModalOpen(false);
      form.resetFields();
      setImageUrl("");
    } catch (error) {
      message.error("Failed to add inventory! " + error.message);
    }
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
      message.success("Image uploaded and stored successfully!");
    } catch (error) {
      message.error("Image upload failed: " + (error.response?.data?.message || error.message));
    }
  };

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
    });
  };

  const incrementQty = async (productId, lotSize) => {
    try {
      await axios.put(`http://localhost:8080/inventory/${productId}/increment`, { lotSize });
      setInventory((prev) =>
        prev.map((item) => (item.productId === productId ? { ...item, qty: item.qty + lotSize } : item))
      );
      message.success("Quantity updated!");
    } catch (error) {
      message.error("Failed to update quantity! " + error.message);
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
          <Select
            defaultValue={10}
            style={{ width: 80, marginLeft: 10 }}
            onChange={(value) => incrementQty(record.productId, value)}
          >
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

      <Modal title="Add New Inventory" open={isModalOpen} onCancel={() => setIsModalOpen(false)} onOk={() => form.submit()}>
        <Form form={form} onFinish={addInventory} layout="vertical">
          <Form.Item name="name" label="Name" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item name="category" label="Category" rules={[{ required: true }]}>
            <Select>{categories.map((cat) => (<Select.Option key={cat} value={cat}>{cat}</Select.Option>))}</Select>
          </Form.Item>
          <Form.Item name="price" label="Price" rules={[{ required: true }]}>
            <Input type="number" />
          </Form.Item>
          <Form.Item name="qty" label="Quantity in Lot" rules={[{ required: true }]}>
            <Input type="number" />
          </Form.Item>
          <Form.Item name="weight" label="Weight">
            <Input />
          </Form.Item>
          <Form.Item name="expiryDate" label="Expiry Date">
            <DatePicker style={{ width: "100%" }} />
          </Form.Item>
          <Upload customRequest={handleImageUpload} showUploadList={false}>
            <Button icon={<UploadOutlined />}>Upload Image</Button>
          </Upload>
          {imageUrl && <img src={imageUrl} alt="Uploaded" width={50} />}
        </Form>
      </Modal>
    </div>
  );
}

export default Inventory;
