import React, { useState } from "react";
import useProducts from "../../store/products/useProducts";
import useEditIndex from "../../store/shared/useEditIndex";
import Modal from "react-modal";
import { IoMdCloseCircleOutline } from "react-icons/io";
import { IoIosWarning } from "react-icons/io";
import { toast } from "react-toastify";

function ProductsList({ setActiveTab }) {
  const { products, deleteProduct } = useProducts();
  const { setEditIndex } = useEditIndex();

  const [modalIsOpen, setIsOpen] = useState(false);
  const [selectedId, setSelectedId] = useState(null);

  const openModal = (id) => {
    setSelectedId(id);
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
    setSelectedId(null);
  };

  const customStyles = {
    overlay: {
      backgroundColor: "#ffffff00",
      backdropFilter: "blur(5px)",
      zIndex: 1000,
    },
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
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
    deleteProduct(id);
    toast.error(`Product with ID ${id} deleted (demo only)!`);
  };

  const [search, setSearch] = useState("");
  const [company, setCompany] = useState("");

  const companies = products.reduce((list, product) => {
    if (!list.includes(product.company)) {
      list.push(product.company);
    }
    return list;
  }, []);

  const filteredProducts = products.filter(
    (product) =>
      product.name.toLowerCase().includes(search.toLowerCase()) &&
      (company == "" || product.company == company),
  );

  return (
    <div className="min-h-screen bg-slate-50 p-6 lg:p-10 text-slate-900">
      <div className="max-w-full mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-10 gap-4 border-b border-slate-200 pb-8">
          <div>
            <h2 className="text-4xl font-extrabold text-slate-900 tracking-tight">
              Product Inventory
            </h2>
            <p className="text-slate-500 mt-2 text-lg">
              Manage and monitor your full catalog across all brands.
            </p>
          </div>
          <button
            onClick={() => setActiveTab("add")}
            className="px-6 py-3 bg-slate-900 text-white rounded-xl font-bold hover:bg-slate-800 transition-all shadow-lg shadow-slate-200"
          >
            + Add New Product
          </button>
        </div>

        {/* Filter Bar */}
        <div className="flex flex-col md:flex-row gap-6 mb-12">
          <div className="flex-1 relative">
            <input
              type="text"
              placeholder="Search by product name..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full rounded-2xl bg-white border border-slate-200 px-6 py-4 text-lg shadow-sm focus:outline-none focus:ring-4 focus:ring-sky-500/10 focus:border-sky-500 transition-all"
            />
          </div>

          <div className="w-full md:w-80">
            <select
              value={company}
              onChange={(e) => setCompany(e.target.value)}
              className="w-full rounded-2xl bg-white border border-slate-200 px-6 py-4 text-lg shadow-sm focus:outline-none focus:ring-4 focus:ring-sky-500/10 focus:border-sky-500 transition-all appearance-none"
            >
              <option value="">All Companies</option>
              {companies.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-10">
          {filteredProducts.map((p) => (
            <div
              key={p.id}
              className="group flex flex-col lg:flex-row rounded-3xl border border-slate-200 bg-white overflow-hidden transition-all duration-300 hover:shadow-2xl hover:border-sky-200"
            >
              {/* Image */}
              <div className="w-full lg:w-72 h-64 lg:h-auto overflow-hidden bg-slate-100 border-r border-slate-50">
                <img
                  src={p.image}
                  alt={p.name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
              </div>

              {/* Content */}
              <div className="flex-1 p-8 flex flex-col justify-between">
                <div>
                  <div className="flex justify-between items-start mb-4">
                    <span className="inline-block px-3 py-1 rounded-full bg-sky-100 text-sky-700 text-xs font-black uppercase tracking-widest">
                      {p.company}
                    </span>
                    <span className="text-slate-300 font-mono text-sm">
                      #{p.id}
                    </span>
                  </div>
                  <h4 className="text-2xl font-bold text-slate-800 leading-tight mb-4">
                    {p.name}
                  </h4>
                </div>

                <div className="flex gap-4 pt-6 border-t border-slate-100">
                  <button
                    onClick={() => {
                      setEditIndex(p.id);
                      setActiveTab("edit");
                    }}
                    className="flex-1 py-4 px-6 bg-slate-900 text-white rounded-xl font-bold hover:bg-slate-800 transition-all active:scale-[0.98]"
                  >
                    Edit Details
                  </button>
                  <button
                    onClick={() => openModal(p.id)}
                    className="flex-1 py-4 px-6 border border-red-100 text-red-500 rounded-xl font-bold hover:bg-red-50 transition-all active:scale-[0.98]"
                  >
                    Remove
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <Modal
          isOpen={modalIsOpen}
          onRequestClose={closeModal}
          style={customStyles}
          shouldCloseOnOverlayClick={false}
          shouldCloseOnEsc={true}
        >
          <IoIosWarning className="text-yellow-400" size={50} />
          <h2 className="text-center text-xl">
            Are you sure? <br />
            You want to delete it?
          </h2>
          <div className="w-full h-15 flex flex-row items-center justify-around">
            <button
              onClick={closeModal}
              className="border border-gray-300 font-bold hover:bg-gray-100 transition-all duration-100 w-60 h-10 rounded-md"
            >
              No, Cancel
            </button>
            <button
              onClick={() => {
                handleDelete(selectedId);
                closeModal();
              }}
              className="bg-blue-600 text-white font-bold hover:bg-blue-500 transition-all duration-100 border-0 w-60 h-10 rounded-md"
            >
              Yes, Delete it
            </button>
          </div>
        </Modal>

        {filteredProducts.length == 0 && (
          <div className="text-center py-32 bg-white rounded-3xl border-2 border-dashed border-slate-200">
            <p className="text-2xl font-medium text-slate-400">
              No products found matching your criteria.
            </p>
            <button
              onClick={() => {
                setSearch("");
                setCompany("");
              }}
              className="mt-4 text-sky-600 font-bold hover:underline"
            >
              Clear all filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default ProductsList;
