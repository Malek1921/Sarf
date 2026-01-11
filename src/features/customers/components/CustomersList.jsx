import React, { useState } from "react";
import { toast } from "react-toastify";
import customerList from "../../store/customers/customersList";

function CustomersList({ setActiveTab, setEditCustomer }) {
  const [filters, setFilters] = useState({
    id: "",
    name: "",
    lastname: "",
  });

  const handleDelete = (id) => {
    toast.error(`Customer with ID ${id} deleted (demo only)!`);
  };

  const handleEdit = (customer) => {
    setEditCustomer(customer);
    setActiveTab("edit");
    toast.info(`Editing customer "${customer.name} ${customer.lastname}"`);
  };

  const filteredCustomers = customerList.filter((c) => {
    return (
      (filters.id === "" || c.id.toString().includes(filters.id)) &&
      (filters.name === "" ||
        c.name.toLowerCase().includes(filters.name.toLowerCase())) &&
      (filters.lastname === "" ||
        c.lastname.toLowerCase().includes(filters.lastname.toLowerCase()))
    );
  });

  return (
    <div className="w-full px-6 py-10">
      <div className="max-w-full mx-auto">
        {/* Full Length Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-10 gap-4 border-b border-slate-200 pb-8">
          <div>
            <h2 className="text-4xl font-extrabold text-slate-900 tracking-tight">
              Customer Directory
            </h2>
            <p className="text-slate-500 mt-2 text-lg">
              Manage your client relationships and contact data.
            </p>
          </div>
          <button
            onClick={() => setActiveTab("add")}
            className="px-6 py-3 bg-slate-900 text-white rounded-xl font-bold hover:bg-slate-800 transition-all shadow-lg shadow-slate-200"
          >
            + Add New Customer
          </button>
        </div>

        {/* Premium Filter Form */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-400 uppercase tracking-widest ml-1">
              Search ID
            </label>
            <input
              type="number"
              placeholder="e.g. 1042"
              value={filters.id}
              onChange={(e) => setFilters({ ...filters, id: e.target.value })}
              className="w-full px-5 py-4 bg-white border border-slate-200 rounded-2xl focus:ring-4 focus:ring-sky-500/10 focus:border-sky-500 outline-none transition-all shadow-sm"
            />
          </div>
          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-400 uppercase tracking-widest ml-1">
              First Name
            </label>
            <input
              type="text"
              placeholder="Filter by name..."
              value={filters.name}
              onChange={(e) => setFilters({ ...filters, name: e.target.value })}
              className="w-full px-5 py-4 bg-white border border-slate-200 rounded-2xl focus:ring-4 focus:ring-sky-500/10 focus:border-sky-500 outline-none transition-all shadow-sm"
            />
          </div>
          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-400 uppercase tracking-widest ml-1">
              Last Name
            </label>
            <input
              type="text"
              placeholder="Filter by lastname..."
              value={filters.lastname}
              onChange={(e) =>
                setFilters({ ...filters, lastname: e.target.value })
              }
              className="w-full px-5 py-4 bg-white border border-slate-200 rounded-2xl focus:ring-4 focus:ring-sky-500/10 focus:border-sky-500 outline-none transition-all shadow-sm"
            />
          </div>
        </div>

        {/* Table Section */}
        {filteredCustomers.length === 0 ? (
          <div className="text-center py-20 bg-slate-50 rounded-3xl border-2 border-dashed border-slate-200">
            <p className="text-slate-400 text-xl font-medium">
              No customers found matching these filters.
            </p>
          </div>
        ) : (
          <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-slate-50 text-slate-500 uppercase text-xs font-black tracking-widest">
                    <th className="px-6 py-5 border-b border-slate-100">ID</th>
                    <th className="px-6 py-5 border-b border-slate-100">
                      Full Name
                    </th>
                    <th className="px-6 py-5 border-b border-slate-100">
                      Contact Info
                    </th>
                    <th className="px-6 py-5 border-b border-slate-100">
                      Location
                    </th>
                    <th className="px-6 py-5 border-b border-slate-100 text-right">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {filteredCustomers.map((c) => (
                    <tr
                      key={c.id}
                      className="hover:bg-slate-50/50 transition-colors group"
                    >
                      <td className="px-6 py-5 text-slate-400 font-mono text-sm">
                        #{c.id}
                      </td>
                      <td className="px-6 py-5">
                        <div className="flex items-center gap-3">
                          <div className="h-10 w-10 rounded-full bg-sky-100 text-sky-600 flex items-center justify-center font-bold text-sm">
                            {c.name[0]}
                            {c.lastname[0]}
                          </div>
                          <div>
                            <p className="font-bold text-slate-800">
                              {c.name} {c.lastname}
                            </p>
                            <p className="text-xs text-slate-400">Customer</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-5">
                        <p className="text-sm font-medium text-slate-700">
                          {c.email}
                        </p>
                        <p className="text-xs text-slate-400">{c.phone}</p>
                      </td>
                      <td className="px-6 py-5 text-sm text-slate-600">
                        {c.address}
                      </td>
                      <td className="px-6 py-5">
                        <div className="flex justify-end gap-3 opacity-0 group-hover:opacity-100 transition-opacity">
                          <button
                            onClick={() => handleEdit(c)}
                            className="px-4 py-2 bg-slate-100 text-slate-600 rounded-lg text-sm font-bold hover:bg-slate-900 hover:text-white transition-all"
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => handleDelete(c.id)}
                            className="px-4 py-2 bg-red-50 text-red-600 rounded-lg text-sm font-bold hover:bg-red-600 hover:text-white transition-all"
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

export default CustomersList;
