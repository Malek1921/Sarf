import { useState } from "react";
import CustomersList from "../components/CustomersList";
import AddCustomer from "../components/AddCustomer";
import EditCustomer from "../components/EditCustomer";

function Customers() {
  const [activeTab, setActiveTab] = useState("list");
  const [editCustomer, setEditCustomer] = useState(null);

  return (
    <div className="w-full mx-auto p-6">
      <div className="flex gap-2 mb-6 border-b">
        <TabButton
          label="Customers List"
          active={activeTab === "list"}
          onClick={() => setActiveTab("list")}
        />
        <TabButton
          label="Add Customer"
          active={activeTab === "add"}
          onClick={() => setActiveTab("add")}
        />
        <TabButton
          label="Edit Customer"
          active={activeTab === "edit"}
          onClick={() => setActiveTab("edit")}
        />
      </div>

      <div className="bg-white rounded-xl shadow p-6">
        {activeTab === "list" && (
          <CustomersList
            setActiveTab={setActiveTab}
            setEditCustomer={setEditCustomer}
          />
        )}
        {activeTab === "add" && <AddCustomer setActiveTab={setActiveTab} />}
        {activeTab === "edit" && (
          <EditCustomer setActiveTab={setActiveTab} customer={editCustomer} />
        )}
      </div>
    </div>
  );
}

function TabButton({ label, active, onClick }) {
  return (
    <button
      onClick={onClick}
      className={`px-4 py-2 text-sm font-semibold border-b-2 transition ${
        active
          ? "border-black text-black"
          : "border-transparent text-gray-500 hover:text-black"
      }`}
    >
      {label}
    </button>
  );
}

export default Customers;
