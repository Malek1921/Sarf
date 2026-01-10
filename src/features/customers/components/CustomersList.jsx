import React, { useState } from "react";
import { toast } from "react-toastify";
import customerlist from "../../store/customerslist";

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

  const filteredCustomers = customerlist.filter((c) => {
    return (
      (filters.id == "" || c.id.toString().includes(filters.id)) &&
      (filters.name == "" ||
        c.name.toLowerCase().includes(filters.name.toLowerCase())) &&
      (filters.lastname == "" ||
        c.lastname.toLowerCase().includes(filters.lastname.toLowerCase()))
    );
  });

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold text-gray-800 border-b pb-2">
        Customers List
      </h2>

      {/* Filter Form */}
      <div className="grid grid-cols-3 gap-4">
        <input
          type="number"
          placeholder="Filter by ID"
          value={filters.id}
          onChange={(e) => {
            setFilters({ ...filters, id: e.target.value });
          }}
          className="px-4 py-2 border rounded-lg"
        />
        <input
          type="text"
          placeholder="Filter by Name"
          value={filters.name}
          onChange={(e) => {
            setFilters({ ...filters, name: e.target.value });
          }}
          className="px-4 py-2 border rounded-lg"
        />
        <input
          type="text"
          placeholder="Filter by Lastname"
          value={filters.lastname}
          onChange={(e) => {
            setFilters({ ...filters, lastname: e.target.value });
          }}
          className="px-4 py-2 border rounded-lg"
        />
      </div>

      {filteredCustomers.length == 0 ? (
        <p className="text-gray-500">No customers found.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border rounded-lg shadow-sm">
            <thead className="bg-gray-100 text-left text-sm font-semibold text-gray-700">
              <tr>
                <th className="px-4 py-3 border-b">ID</th>
                <th className="px-4 py-3 border-b">Name</th>
                <th className="px-4 py-3 border-b">Lastname</th>
                <th className="px-4 py-3 border-b">Email</th>
                <th className="px-4 py-3 border-b">Phone</th>
                <th className="px-4 py-3 border-b">Location</th>
                <th className="px-4 py-3 border-b text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="text-sm text-gray-800">
              {filteredCustomers.map((c) => (
                <tr key={c.id} className="hover:bg-gray-50 transition">
                  <td className="px-4 py-3 border-b">{c.id}</td>
                  <td className="px-4 py-3 border-b">{c.name}</td>
                  <td className="px-4 py-3 border-b">{c.lastname}</td>
                  <td className="px-4 py-3 border-b">{c.email}</td>
                  <td className="px-4 py-3 border-b">{c.phone}</td>
                  <td className="px-4 py-3 border-b">{c.address}</td>
                  <td className="px-4 py-3 border-b text-center">
                    <div className="flex justify-center gap-2">
                      <button
                        onClick={() => {
                          handleEdit(c);
                        }}
                        className="bg-blue-500 text-white px-3 py-1 rounded-md text-sm font-medium hover:bg-blue-600 transition"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => {
                          handleDelete(c.id);
                        }}
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

export default CustomersList;
