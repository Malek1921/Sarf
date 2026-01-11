import { useState } from "react";

import SalesList from "../components/SalesList";
import AddSale from "../components/AddSale";
import EditSale from "../components/EditSale";

function Sale() {
  const [activeTab, setActiveTab] = useState("list");

  return (
    <div className="w-full mx-auto p-6">
      {/* Tabs */}
      <div className="flex gap-2 mb-6 border-b">
        <TabButton
          label="Sales List"
          active={activeTab === "list"}
          onClick={() => setActiveTab("list")}
        />
        <TabButton
          label="Add Sale"
          active={activeTab === "add"}
          onClick={() => setActiveTab("add")}
        />
        <TabButton
          label="Edit Sale"
          active={activeTab === "edit"}
          onClick={() => setActiveTab("edit")}
        />
      </div>

      {/* Content */}
      <div className="bg-white rounded-xl shadow p-6">
        {activeTab === "list" && <SalesList />}
        {activeTab === "add" && <AddSale />}
        {activeTab === "edit" && <EditSale />}
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
        ${
          active
            ? "border-black text-black"
            : "border-transparent text-gray-500 hover:text-black"
        }
      `}
    >
      {label}
    </button>
  );
}

export default Sale;
