import React, { useState } from "react";
import { toast } from "react-toastify";

function CompaniesList({ setActiveTab, setEditCompany }) {
  const [filters, setFilters] = useState({ name: "" });

  const [companyList, setCompanyList] = useState([
    { id: 1, name: "Company A", phone: "0700000001", address: "Kabul" },
    { id: 2, name: "Company B", phone: "0700000002", address: "Herat" },
    { id: 3, name: "Company C", phone: "0700000003", address: "Mazar" },
  ]);

  const handleDelete = (id) => {
    setCompanyList(companyList.filter(c=>c.id!==id));
    toast.error(`Company with ID ${id} deleted`);
  };

  const handleEdit = (company) => {
    setEditCompany(company);
    setActiveTab("edit");
    toast.info(`Editing company "${company.name}"`);
  };

  const filteredCompanies = companyList.filter(c =>
    c.name.toLowerCase().includes(filters.name.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold text-gray-800 border-b pb-2">Companies List</h2>

      <div className="max-w-xs">
        <input
          type="text"
          placeholder="Filter by name"
          value={filters.name}
          onChange={(e)=>setFilters({ ...filters, name: e.target.value })}
          className="w-full px-4 py-2 border rounded-lg"
        />
      </div>

      {filteredCompanies.length === 0 ? (
        <p className="text-gray-500">No companies found.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border rounded-lg shadow-sm">
            <thead className="bg-gray-100 text-left text-sm font-semibold text-gray-700">
              <tr>
                <th className="px-4 py-3 border-b">ID</th>
                <th className="px-4 py-3 border-b">Name</th>
                <th className="px-4 py-3 border-b">Phone</th>
                <th className="px-4 py-3 border-b">Address</th>
                <th className="px-4 py-3 border-b text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="text-sm text-gray-800">
              {filteredCompanies.map(c => (
                <tr key={c.id} className="hover:bg-gray-50 transition">
                  <td className="px-4 py-3 border-b">{c.id}</td>
                  <td className="px-4 py-3 border-b">{c.name}</td>
                  <td className="px-4 py-3 border-b">{c.phone}</td>
                  <td className="px-4 py-3 border-b">{c.address}</td>
                  <td className="px-4 py-3 border-b text-center">
                    <div className="flex justify-center gap-2">
                      <button
                        onClick={()=>handleEdit(c)}
                        className="bg-blue-500 text-white px-3 py-1 rounded-md text-sm font-medium hover:bg-blue-600 transition"
                      >
                        Edit
                      </button>
                      <button
                        onClick={()=>handleDelete(c.id)}
                        className="bg-red-500 text-white px-3 py-1 rounded-md text-sm font-medium hover:bg-red-600 transition"
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default CompaniesList;
