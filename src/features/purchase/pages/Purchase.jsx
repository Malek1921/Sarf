import { useState } from "react";
import PurchaseList from "../components/PurchaseList";
import AddPurchase from "../components/AddPurchase";
import EditPurchase from "../components/EditPurchase";

function Purchases() {
  const [activeTab, setActiveTab] = useState("list");

  return (
    <div className="w-full max-w-5xl mx-auto p-6">
      {/* Tabs */}
      <div className="flex gap-2 mb-6 border-b">
        <TabButton
          label="Purchases List"
          active={activeTab === "list"}
          onClick={() => setActiveTab("list")}
        />
        <TabButton
          label="Add Purchase"
          active={activeTab === "add"}
          onClick={() => setActiveTab("add")}
        />
        <TabButton
          label="Edit Purchase"
          active={activeTab === "edit"}
          onClick={() => setActiveTab("edit")}
        />
      </div>

      {/* Content */}
      <div className="bg-white rounded-xl shadow p-6">
        {activeTab === "list" && <PurchaseList />}
        {activeTab === "add" && <AddPurchase />}
        {activeTab === "edit" && <EditPurchase />}
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

export default Purchases;
