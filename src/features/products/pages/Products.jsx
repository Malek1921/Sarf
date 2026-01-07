import { useState } from "react";
import ProductsList from "../components/ProductsList";
import AddProduct from "../components/addProducts/AddProduct";
import EditProduct from "../components/editProduct/EditProduct";

function Products() {
  const [activeTab, setActiveTab] = useState("list");

  return (
    <div className="w-full max-w-5xl mx-auto p-6">
      {/* Tabs */}
      <div className="flex gap-2 mb-6 border-b">
        <TabButton
          label="Products List"
          active={activeTab === "list"}
          onClick={() => setActiveTab("list")}
        />
        <TabButton
          label="Add Product"
          active={activeTab === "add"}
          onClick={() => setActiveTab("add")}
        />
        <TabButton
          label="Edit Product"
          active={activeTab === "edit"}
          onClick={() => setActiveTab("edit")}
        />
      </div>

      {/* Content */}
      <div className="bg-white rounded-xl shadow p-6">
        {activeTab === "list" && <ProductsList />}
        {activeTab === "add" && <AddProduct />}
        {activeTab === "edit" && <EditProduct />}
      </div>
    </div>
  );
}

function TabButton({ label, active, onClick }) {
  return (
    <button
      onClick={onClick}
      className={`
        px-4 py-2 text-sm font-semibold
        border-b-2 transition
        ${active
          ? "border-black text-black"
          : "border-transparent text-gray-500 hover:text-black"
        }
      `}
    >
      {label}
    </button>
  );
}

export default Products;
