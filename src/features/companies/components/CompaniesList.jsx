import React, { useState } from "react";
import { toast } from "react-toastify";
import companiesList from "../../store/companies/companiesList";

function CompaniesList({ setActiveTab, setEditCompany }) {
  const [filters, setFilters] = useState({ name: "" });

  const handleDelete = (id) => {
    // Note: To make deletion work visually, you'd usually lift state
    // to the parent or use a local state initialized with companiesList
    toast.error(`Company with ID ${id} deleted (demo only)`);
  };

  const handleEdit = (company) => {
    setEditCompany(company);
    setActiveTab("edit");
    toast.info(`Editing company "${company.name}"`);
  };

  const filteredCompanies = companiesList.filter((c) =>
    c.name.toLowerCase().includes(filters.name.toLowerCase())
  );

  return (
    <div className="w-full px-6 py-10">
      <div className="max-w-full mx-auto">
        {/* Full Length Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-10 gap-4 border-b border-slate-200 pb-8">
          <div>
            <h2 className="text-4xl font-extrabold text-slate-900 tracking-tight">
              Partner Companies
            </h2>
            <p className="text-slate-500 mt-2 text-lg">
              Manage corporate entities and supplier information.
            </p>
          </div>
          <button
            onClick={() => setActiveTab("add")}
            className="px-6 py-3 bg-slate-900 text-white rounded-xl font-bold hover:bg-slate-800 transition-all shadow-lg shadow-slate-200"
          >
            + Register Company
          </button>
        </div>

        {/* Filter Section - Full Width */}
        <div className="mb-10">
          <div className="max-w-md space-y-2">
            <label className="text-xs font-bold text-slate-400 uppercase tracking-widest ml-1">
              Search by Brand Name
            </label>
            <div className="relative">
              <input
                type="text"
                placeholder="e.g. Apple, Nike, Starbucks..."
                value={filters.name}
                onChange={(e) =>
                  setFilters({ ...filters, name: e.target.value })
                }
                className="w-full px-6 py-4 bg-white border border-slate-200 rounded-2xl focus:ring-4 focus:ring-sky-500/10 focus:border-sky-500 outline-none transition-all shadow-sm text-lg"
              />
            </div>
          </div>
        </div>

        {/* Full-Length Table Section */}
        {filteredCompanies.length === 0 ? (
          <div className="text-center py-24 bg-slate-50 rounded-3xl border-2 border-dashed border-slate-200">
            <p className="text-slate-400 text-xl font-medium">
              No brands found matching your search.
            </p>
          </div>
        ) : (
          <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-slate-50 text-slate-500 uppercase text-[11px] font-black tracking-[0.15em]">
                    <th className="px-8 py-5 border-b border-slate-100">ID</th>
                    <th className="px-8 py-5 border-b border-slate-100">
                      Company Name
                    </th>
                    <th className="px-8 py-5 border-b border-slate-100">
                      Phone Support
                    </th>
                    <th className="px-8 py-5 border-b border-slate-100">
                      Headquarters
                    </th>
                    <th className="px-8 py-5 border-b border-slate-100 text-right">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {filteredCompanies.map((c) => (
                    <tr
                      key={c.id}
                      className="hover:bg-slate-50/50 transition-colors group"
                    >
                      <td className="px-8 py-6 text-slate-400 font-mono text-sm">
                        {String(c.id).padStart(3, "0")}
                      </td>
                      <td className="px-8 py-6">
                        <div className="flex items-center gap-4">
                          <div className="h-12 w-12 rounded-2xl bg-slate-900 text-white flex items-center justify-center font-bold text-lg shadow-inner">
                            {c.name[0]}
                          </div>
                          <span className="font-bold text-slate-800 text-lg">
                            {c.name}
                          </span>
                        </div>
                      </td>
                      <td className="px-8 py-6 text-slate-600 font-medium italic">
                        {c.phone}
                      </td>
                      <td className="px-8 py-6">
                        <p className="text-sm text-slate-500 max-w-xs truncate">
                          {c.address}
                        </p>
                      </td>
                      <td className="px-8 py-6">
                        <div className="flex justify-end gap-3 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                          <button
                            onClick={() => handleEdit(c)}
                            className="px-5 py-2.5 bg-sky-50 text-sky-600 rounded-xl text-sm font-bold hover:bg-sky-600 hover:text-white transition-all shadow-sm shadow-sky-100"
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => handleDelete(c.id)}
                            className="px-5 py-2.5 bg-red-50 text-red-500 rounded-xl text-sm font-bold hover:bg-red-500 hover:text-white transition-all shadow-sm shadow-red-100"
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
          </div>
        )}
      </div>
    </div>
  );
}

export default CompaniesList;
