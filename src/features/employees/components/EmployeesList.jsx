import React, { useState } from "react";
import { toast } from "react-toastify";
import useEmployees from "../../store/employees/useEmployees";
import useEditIndex from "../../store/shared/useEditIndex";

function EmployeesList({ setActiveTab }) {
  const { employees, deleteEmployee } = useEmployees();
  const { setEditIndex } = useEditIndex();

  const [filters, setFilters] = useState({
    name: "",
    lastname: "",
  });

  const handleDelete = (id, name, lastname) => {
    const confirmDelete = () => {
      deleteEmployee(id);
      toast.success(`Employee "${name} ${lastname}" deleted successfully!`);
    };

    toast.warning(
      <div>
        <p>Are you sure you want to delete this employee?</p>
        <div className="mt-2 flex gap-2">
          <button
            onClick={() => {
              confirmDelete();
              toast.dismiss();
            }}
            className="px-4 py-2 bg-red-500 text-white rounded"
          >
            Yes
          </button>
          <button
            onClick={() => toast.dismiss()}
            className="px-4 py-2 bg-gray-300 rounded"
          >
            No
          </button>
        </div>
      </div>,
      {
        autoClose: false,
        closeOnClick: false,
      }
    );
  };

  const filteredEmployees = employees.filter((e) => {
    return (
      (filters.name === "" ||
        e.name.toLowerCase().includes(filters.name.toLowerCase())) &&
      (filters.lastname === "" ||
        e.lastname.toLowerCase().includes(filters.lastname.toLowerCase()))
    );
  });

  return (
    <div className="w-full px-6 py-10">
      <div className="max-w-full mx-auto">
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-10 gap-4 border-b border-slate-200 pb-8">
          <div>
            <h2 className="text-4xl font-extrabold text-slate-900 tracking-tight">
              Employee Directory
            </h2>
            <p className="text-slate-500 mt-2 text-lg">
              Manage your employee relationships and contact data.
            </p>
          </div>
          <button
            onClick={() => setActiveTab("add")}
            className="px-6 py-3 bg-slate-900 text-white rounded-xl font-bold hover:bg-slate-800 transition-all shadow-lg shadow-slate-200"
          >
            + Add New Employee
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-400 uppercase tracking-widest ml-1">
              First Name
            </label>
            <input
              type="text"
              value={filters.name}
              onChange={(e) => setFilters({ ...filters, name: e.target.value })}
              className="w-full px-5 py-4 bg-white border border-slate-200 rounded-2xl"
            />
          </div>
          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-400 uppercase tracking-widest ml-1">
              Last Name
            </label>
            <input
              type="text"
              value={filters.lastname}
              onChange={(e) =>
                setFilters({ ...filters, lastname: e.target.value })
              }
              className="w-full px-5 py-4 bg-white border border-slate-200 rounded-2xl"
            />
          </div>
        </div>

        <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50 text-slate-500 uppercase text-xs font-black tracking-widest">
                  <th className="px-6 py-5">Name</th>
                  <th className="px-6 py-5">Lastname</th>
                  <th className="px-6 py-5">Permissions</th>
                  <th className="px-6 py-5">Phone</th>
                  <th className="px-6 py-5">Email</th>
                  <th className="px-6 py-5 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredEmployees.map((e) => (
                  <tr key={e.id}>
                    <td className="px-6 py-5">{e.name}</td>
                    <td className="px-6 py-5">{e.lastname}</td>
                    <td className="px-6 py-5">{e.permissions || e.position || "N/A"}</td>
                    <td className="px-6 py-5">{e.phone || "N/A"}</td>
                    <td className="px-6 py-5">{e.email}</td>
                    <td className="px-6 py-5 text-right">
                      <button
                        onClick={() => {
                          setEditIndex(e.id);
                          setActiveTab("edit");
                        }}
                        className="px-4 py-2 bg-green-500 text-white rounded-lg mr-2 hover:bg-green-600 transition"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(e.id, e.name, e.lastname)}
                        className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EmployeesList;
