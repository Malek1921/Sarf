import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import useCustomers from "../../store/customers/useCustomers";
import useEditIndex from "../../store/shared/useEditIndex";
import Modal from 'react-modal';
import { IoMdCloseCircleOutline } from "react-icons/io";
import { IoIosWarning } from "react-icons/io";

function CustomersList({ setActiveTab }) {
  const { customers } = useCustomers();
  const { editIndex, setEditIndex } = useEditIndex();
  const { deleteCustomer } = useCustomers();
  const [modalIsOpen, setIsOpen] = useState(false)
  const [deCustomerId, setDeCustomerId] = useState('')

  const openModal = () => {
    setIsOpen(true);
  }

  const closeModal = () => {
    setIsOpen(false);
  }

  const [filters, setFilters] = useState({
    id: "",
    name: "",
    lastname: "",
  });

  const customStyles = {
    overlay: {
      backgroundColor: '#ffffff00',
      backdropFilter: 'blur(5px)',
      zIndex: 1000,
    },
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
      width: '35rem',
      height: '18rem',
      borderRadius: '10px',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'space-around'
    }, 
  };

  const handleDelete = (id) => {
    deleteCustomer(id)
    toast.error(`Customer with ID ${id} deleted (demo only)!`);
  };



  useEffect(() => {
    console.log(editIndex);
  }, [editIndex]);

  const filteredCustomers = customers.filter((c) => {
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

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-400 uppercase tracking-widest ml-1">
              Search ID
            </label>
            <input
              type="number"
              value={filters.id}
              onChange={(e) => setFilters({ ...filters, id: e.target.value })}
              className="w-full px-5 py-4 bg-white border border-slate-200 rounded-2xl"
            />
          </div>
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
                  <th className="px-6 py-5">ID</th>
                  <th className="px-6 py-5">Full Name</th>
                  <th className="px-6 py-5">Contact Info</th>
                  <th className="px-6 py-5">Location</th>
                  <th className="px-6 py-5 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredCustomers.map((c) => (
                  <tr key={c.id}>
                    <td className="px-6 py-5">#{c.id}</td>
                    <td className="px-6 py-5">
                      {c.name} {c.lastname}
                    </td>
                    <td className="px-6 py-5">
                      {c.email}
                      <br />
                      {c.phone}
                    </td>
                    <td className="px-6 py-5">{c.address}</td>
                    <td className="px-6 py-5 text-right">
                      <button
                        onClick={() => {
                          setEditIndex(c.id);
                          setActiveTab("edit");
                        }}
                        className="px-4 py-2 bg-slate-100 rounded-lg mr-2"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => {
                          openModal()
                          setDeCustomerId(c.id)
                        }}
                        className="px-4 py-2 bg-red-50 rounded-lg"
                      >
                        Delete
                      </button>
                      
                      <Modal
                        isOpen={modalIsOpen}
                        onRequestClose={closeModal}
                        style={customStyles}
                        shouldCloseOnOverlayClick={false}
                        shouldCloseOnEsc={true}
                      >
                        <IoIosWarning className="text-yellow-400" size={50} />
                        <h2 className="text-center text-xl">Are you shure? <br />You want to delete it?</h2>
                        <div className="w-full h-15 flex flex-row items-center justify-around">
                          <button onClick={() => {
                            closeModal()
                          }} className="border border-gray-300 font-bold hover:bg-gray-100 transition-all duration-100 w-60 h-10 rounded-md">No, Cancle</button>
                          <button onClick={() => {
                            handleDelete(deCustomerId)
                            closeModal()
                          }} className="bg-blue-600 text-white font-bold hover:bg-blue-500 transition-all duration-100 border-0 w-60 h-10 rounded-md">Yes, Delete it</button>
                        </div>
                      </Modal>
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

export default CustomersList;
