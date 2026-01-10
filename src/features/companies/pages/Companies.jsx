import { useState } from "react";
import CompaniesList from "../components/CompaniesList";
import AddCompany from "../components/AddCompany";
import EditCompany from "../components/EditCompany";

function Companies() {
  const [activeTab, setActiveTab] = useState("list");
  const [editCompany, setEditCompany] = useState(null);

  return (
    <div className="w-full max-w-5xl mx-auto p-6">
      {/* Tabs */}
      <div className="flex gap-2 mb-6 border-b">
        <TabButton label="Companies List" active={activeTab==="list"} onClick={()=>setActiveTab("list")} />
        <TabButton label="Add Company" active={activeTab==="add"} onClick={()=>setActiveTab("add")} />
        <TabButton label="Edit Company" active={activeTab==="edit"} onClick={()=>setActiveTab("edit")} />
      </div>

      {/* Content */}
      <div className="bg-white rounded-xl shadow p-6">
        {activeTab==="list" && (
          <CompaniesList setActiveTab={setActiveTab} setEditCompany={setEditCompany} />
        )}
        {activeTab==="add" && <AddCompany setActiveTab={setActiveTab} />}
        {activeTab==="edit" && <EditCompany setActiveTab={setActiveTab} company={editCompany} />}
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

export default Companies;
