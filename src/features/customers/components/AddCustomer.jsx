import React from "react";
import { useForm } from "react-hook-form";
import useCustomers from "../../store/customers/useCustomers";
import { toast } from "react-toastify";

function AddCustomer({ setActiveTab }) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const { addCustomer } = useCustomers();

  const submit = (data) => {
    const newCustomer = {
      ...data,
      id: Math.floor(Math.random()*9000),
    };

    addCustomer(newCustomer);

    toast.success(
      `Customer "${data.name} ${data.lastname}" added successfully!`
    );

    reset();
    setActiveTab("list");
  };

  const cancel = () => setActiveTab("list");

  return (
    <div className="w-full px-6 py-10">
      <div className="max-w-full mx-auto">
        <div className="mb-10 border-b border-slate-200 pb-6">
          <h2 className="text-3xl font-bold text-slate-800">Add Customer</h2>
        </div>

        <form onSubmit={handleSubmit(submit)} className="space-y-8">
          <div className="bg-white rounded-2xl border border-slate-200 p-10 shadow-sm space-y-8">
            <div className="space-y-2">
              <label className="block text-sm font-bold text-slate-700 uppercase tracking-wider">
                Name
              </label>
              <input
                {...register("name", { required: "Name is required" })}
                type="text"
                className="w-full px-6 py-4 border rounded-xl bg-slate-50 text-lg"
              />
              {errors.name && <p>{errors.name.message}</p>}
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-bold text-slate-700 uppercase tracking-wider">
                Lastname
              </label>
              <input
                {...register("lastname", { required: <span className="text-red-500">Lastname is required</span> })}
                type="text"
                className="w-full px-6 py-4 border rounded-xl bg-slate-50 text-lg"
              />
              {errors.lastname && <p>{errors.lastname.message}</p>}
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-bold text-slate-700 uppercase tracking-wider">
                Email
              </label>
              <input
                {...register("email", { required: "Email is required" })}
                type="email"
                className="w-full px-6 py-4 border rounded-xl bg-slate-50 text-lg"
              />
              {errors.email && <p>{errors.email.message}</p>}
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-bold text-slate-700 uppercase tracking-wider">
                Phone Number
              </label>
              <input
                {...register("phone", { required: "Phone number is required" })}
                type="tel"
                className="w-full px-6 py-4 border rounded-xl bg-slate-50 text-lg"
              />
              {errors.phone && <p>{errors.phone.message}</p>}
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-bold text-slate-700 uppercase tracking-wider">
                Address
              </label>
              <textarea
                {...register("address", { required: "Address is required" })}
                rows="3"
                className="w-full px-6 py-4 border rounded-xl bg-slate-50 text-lg"
              />
              {errors.address && <p>{errors.address.message}</p>}
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-bold text-slate-700 uppercase tracking-wider">
                Discount (%)
              </label>
              <input
                {...register("discount", { required: 'Discount is required' })}
                type="number"
                className="w-full px-6 py-4 border rounded-xl bg-slate-50 text-lg"
              />
            </div>
          </div>

          <div className="flex gap-6">
            <button type="submit" className="flex-1 bg-slate-900 text-white py-5">
              Add Customer
            </button>
            <button type="button" onClick={cancel} className="flex-1">
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddCustomer;
