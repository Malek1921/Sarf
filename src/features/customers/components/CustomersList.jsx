import React from "react";
import useCustomers from "../../store/useCustomers";
import { toast } from "react-toastify";

function CustomersList({ setActiveTab, setEditCustomer }) {
  const { customers, setCustomers } = useCustomers();

  const handleDelete = (id) => {
    const updated = customers.filter((c) => c.id !== id);
    setCustomers(updated);
    toast.error("Customer deleted successfully!");
  };

  const handleEdit = (customer) => {
    setEditCustomer(customer);   // save selected customer
    setActiveTab("edit");        // switch to edit tab
    toast.info(`Editing customer "${customer.fullname}"`);
  };

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold text-gray-800 border-b pb-2">Customers List</h2>

      {customers.length === 0 ? (
        <p className="text-gray-500">No customers found.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border rounded-lg shadow-sm">
            <thead className="bg-gray-100 text-left text-sm font-semibold text-gray-700">
              <tr>
                <th className="px-4 py-3 border-b">Name</th>
                <th className="px-4 py-3 border-b">Email</th>
                <th className="px-4 py-3 border-b">Phone</th>
                <th className="px-4 py-3 border-b">Location</th>
                <th className="px-4 py-3 border-b text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="text-sm text-gray-800">
              {customers.map((c) => (
                <tr key={c.id} className="hover:bg-gray-50 transition">
                  <td className="px-4 py-3 border-b">{c.fullname}</td>
                  <td className="px-4 py-3 border-b">{c.email}</td>
                  <td className="px-4 py-3 border-b">{c.phone}</td>
                  <td className="px-4 py-3 border-b">{c.address}</td>
                  <td className="px-4 py-3 border-b text-center">
                    <div className="flex justify-center gap-2">
                      <button
                        onClick={() => handleEdit(c)}
                        className="bg-blue-500 text-white px-3 py-1 rounded-md text-sm font-medium hover:bg-blue-600 transition"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(c.id)}
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