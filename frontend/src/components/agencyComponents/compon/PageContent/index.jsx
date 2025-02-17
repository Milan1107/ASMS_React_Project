// import { Routes, Route } from "react-router-dom";
// // import DashBoard from "../components/agencyComponents/Pages/DashBoard/DashBoard";
// import DashBoard from '../../Pages/DashBoard/DashBoard';
// // import Inventory from "../components/agencyComponents/Pages/Inventory/Inventory";
// import Inventory from '../../Pages/Inventory/Inventory';
// // import Customers from "../components/agencyComponents/Pages/Customer/Customer";
// import Customers from '../../Pages/Customer/Customer';
// // import Orders from "../components/agencyComponents/Pages/Order/Order";
// import Orders from '../../Pages/Order/Order';

// function PageContent() {
//   return (
//     <div className="PageContent">
//       <Routes>
//         <Route path="/agencydashboard" element={<DashBoard />} />
//         <Route path="/agencyinventory" element={<Inventory />} />
//         <Route path="/agencycustomers" element={<Customers />} />
//         <Route path="/agencyorders" element={<Orders />} />
//       </Routes>
//     </div>
//   );
// }

// export default PageContent;



import { Outlet } from "react-router-dom";

function PageContent() {
  return (
    <div className="PageContent">
      <Outlet /> {/* ✅ This renders the selected route dynamically */}
    </div>
  );
}

export default PageContent;
