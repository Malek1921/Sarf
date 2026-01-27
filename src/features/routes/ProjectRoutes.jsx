import { Route, Routes } from "react-router";
import Sale from "../sale/pages/Sale";
import Purchase from "../purchase/pages/Purchase";
import Products from "../products/pages/Products";
import Customers from "../customers/pages/Customers";
import Companies from "../companies/pages/Companies";
import Employees from "../employees/pages/Employees";
import Login from "../auth/Login";

function ProjectRoutes() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/sale" element={<Sale />} />
        <Route path="/purchase" element={<Purchase />} />
        <Route path="/products" element={<Products />} />
        <Route path="/customers" element={<Customers />} />
        <Route path="/companies" element={<Companies />} />
        <Route path="/employees" element={<Employees />} />
      </Routes>
    </>
  );
}

export default ProjectRoutes;