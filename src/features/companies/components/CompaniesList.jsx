import { useState } from "react";
import { toast } from "react-toastify";
import useCompanies from "../../store/companies/useCompanies";
import useEditIndex from "../../store/shared/useEditIndex";

function CompaniesList({ setActiveTab }) {
  const { companies, deleteCompany } = useCompanies();
  const { setEditIndex } = useEditIndex();
  const [search, setSearch] = useState("");

  const filteredCompanies = companies.filter(c =>
    c.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="w-full px-6 py-10">
      <div className="flex justify-between mb-8 border-b pb-6">
        <div>
          <h2 className="text-3xl font-bold">Partner Companies</h2>
          <p className="text-slate-500">Manage companies</p>
        </div>
        <button
          onClick={() => setActiveTab("add")}
          className="px-6 py-3 bg-slate-900 text-white rounded-xl font-bold"
        >
          + Add Company
        </button>
      </div>

      <input
        value={search}
        onChange={(e)=>setSearch(e.target.value)}
        placeholder="Search company..."
        className="mb-6 w-full max-w-md px-4 py-3 border rounded-xl"
      />

      <div className="bg-white rounded-xl border overflow-hidden">
        <table className="w-full">
          <thead className="bg-slate-50 text-sm">
            <tr>
              <th className="p-4 text-left">ID</th>
              <th className="p-4 text-left">Name</th>
              <th className="p-4 text-left">Phone</th>
              <th className="p-4 text-left">Address</th>
              <th className="p-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredCompanies.map((c) => (
              <tr key={c.id} className="border-t">
                <td className="p-4">{c.id}</td>
                <td className="p-4 font-bold">{c.name}</td>
                <td className="p-4">{c.phone}</td>
                <td className="p-4">{c.address}</td>
                <td className="p-4 text-right space-x-2">
                  <button
                    onClick={() => {
                      setEditIndex(c.id);
                      setActiveTab("edit");
                    }}
                    className="px-4 py-2 bg-sky-100 text-sky-700 rounded"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => {
                      deleteCompany(c.id);
                      toast.error("Company deleted");
                    }}
                    className="px-4 py-2 bg-red-100 text-red-600 rounded"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {filteredCompanies.length === 0 && (
          <p className="p-10 text-center text-slate-400">No companies found</p>
        )}
      </div>
    </div>
  );
}

export default CompaniesList;
