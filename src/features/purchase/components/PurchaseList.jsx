import React, { useState } from "react";
import { toast } from "react-toastify";
import usePurchases from "../../store/purchases/usePurchases";
import useEditIndex from "../../store/shared/useEditIndex";
import Modal from "react-modal";
import { IoIosWarning } from "react-icons/io";

function PurchaseList({ setActiveTab }) {
  const { purchases, deletePurchase } = usePurchases();
  const { setEditIndex } = useEditIndex();

  const [modalIsOpen, setIsOpen] = useState(false);
  const [deleteId, setDeleteId] = useState("");

  const [filters, setFilters] = useState({
    product: "",
    supplier: "",
    date: "",
  });

  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);

  const customStyles = {
    overlay: {
      backgroundColor: "rgba(0, 0, 0, 0.5)",
      backdropFilter: "blur(5px)",
      zIndex: 1000,
    },
    content: {
      top: "50%",
      left: "50%",
      transform: "translate(-50%, -50%)",
      width: "35rem",
      height: "18rem",
      borderRadius: "10px",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "space-around",
    },
  };

  const handleDelete = (id) => {
    deletePurchase(id);
    toast.success("Purchase deleted successfully!");
    closeModal();
  };

  const filteredPurchases = purchases.filter((p) => {
    return (
      (filters.product === "" ||
        p.product.toLowerCase().includes(filters.product.toLowerCase())) &&
      (filters.supplier === "" ||
        p.supplier.toLowerCase().includes(filters.supplier.toLowerCase())) &&
      (filters.date === "" || p.date.includes(filters.date))
    );
  });

  return (
    <div className="w-full px-6 py-10">
      <div className="max-w-full mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between mb-10 gap-4 border-b border-slate-200 pb-8">
          <div>
            <h2 className="text-4xl font-extrabold text-slate-900">
              Purchase Records
            </h2>
            <p className="text-slate-500 mt-2 text-lg">
              Track and manage product purchases.
            </p>
          </div>
          <button
            onClick={() => setActiveTab("add")}
            className="px-6 py-3 bg-slate-900 text-white rounded-xl font-bold hover:bg-slate-800 shadow-lg"
          >
            + Add Purchase
          </button>
        </div>

        {/* Filters */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          <input
            placeholder="Search product"
            value={filters.product}
            onChange={(e) =>
              setFilters({ ...filters, product: e.target.value })
            }
            className="px-5 py-4 bg-white border rounded-2xl"
          />

          <input
            placeholder="Search supplier"
            value={filters.supplier}
            onChange={(e) =>
              setFilters({ ...filters, supplier: e.target.value })
            }
            className="px-5 py-4 bg-white border rounded-2xl"
          />

          <input
            type="date"
            value={filters.date}
            onChange={(e) => setFilters({ ...filters, date: e.target.value })}
            className="px-5 py-4 bg-white border rounded-2xl"
          />
        </div>

        {/* Table */}
        <div className="bg-white rounded-3xl border shadow-sm overflow-hidden">
          <table className="w-full">
            <thead className="bg-slate-50 text-xs uppercase font-black text-slate-500">
              <tr>
                <th className="px-6 py-5">ID</th>
                <th className="px-6 py-5">Product</th>
                <th className="px-6 py-5">Supplier</th>
                <th className="px-6 py-5">Quantity</th>
                <th className="px-6 py-5">Price</th>
                <th className="px-6 py-5">Total</th>
                <th className="px-6 py-5">Date</th>
                <th className="px-6 py-5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {filteredPurchases.map((p) => (
                <tr key={p.id}>
                  <td className="px-6 py-4">#{p.id}</td>
                  <td className="px-6 py-4">{p.product}</td>
                  <td className="px-6 py-4">{p.supplier}</td>
                  <td className="px-6 py-4">{p.quantity}</td>
                  <td className="px-6 py-4">
                    ${parseFloat(p.price).toFixed(2)}
                  </td>
                  <td className="px-6 py-4 font-bold">
                    ${parseFloat(p.total).toFixed(2)}
                  </td>
                  <td className="px-6 py-4">{p.date}</td>

                  <td className="px-6 py-4 text-right">
                    <button
                      onClick={() => {
                        setEditIndex(p.id);
                        setActiveTab("edit");
                      }}
                      className="px-4 py-2 bg-slate-100 rounded-lg mr-2 hover:bg-slate-200"
                    >
                      Edit
                    </button>

                    <button
                      onClick={() => {
                        setDeleteId(p.id);
                        openModal();
                      }}
                      className="px-4 py-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Modal */}
        <Modal
          isOpen={modalIsOpen}
          onRequestClose={closeModal}
          style={customStyles}
        >
          <IoIosWarning className="text-yellow-400" size={50} />
          <h2 className="text-xl text-center">
            Are you sure you want to delete this purchase?
          </h2>
          <div className="flex w-full justify-around">
            <button
              onClick={closeModal}
              className="border w-60 h-10 rounded-md font-bold hover:bg-slate-50"
            >
              Cancel
            </button>
            <button
              onClick={() => handleDelete(deleteId)}
              className="bg-red-600 text-white w-60 h-10 rounded-md font-bold hover:bg-red-700"
            >
              Yes, Delete
            </button>
          </div>
        </Modal>
      </div>
    </div>
  );
}

export default PurchaseList;
