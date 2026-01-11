import React from "react";
import { useForm } from "react-hook-form";
import useCustomers from "../../store/useCustomers";
import { toast } from "react-toastify";

function EditCustomer({ setActiveTab, customer }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: customer || {},
  });

  const { customers, setCustomers } = useCustomers();

  const submit = (data) => {
    const updated = customers.map((c) =>
      c.id === customer.id ? { ...c, ...data } : c
    );
    setCustomers(updated);
    toast.success(
      `Customer "${data.name} ${data.lastname}" updated successfully!`
    );
    setActiveTab("list");
  };

  const cancel = () => setActiveTab("list");

  if (!customer) return <p className="text-gray-500">No customer selected.</p>;

  return (
    <div className="w-full px-6 py-10">
      <div className="max-w-full mx-auto">
        <div className="mb-10 border-b border-slate-200 pb-6">
          <h2 className="text-3xl font-bold text-slate-800">Edit Customer</h2>
        </div>

        <form onSubmit={handleSubmit(submit)} className="space-y-8">
          <div className="bg-white rounded-2xl border border-slate-200 p-10 shadow-sm space-y-8">
            {/* ID */}
            <div className="space-y-2">
              <label className="block text-sm font-bold text-slate-700 uppercase tracking-wider">
                Customer ID
              </label>
              <input
                type="text"
                value={customer.id}
                disabled
                className="w-full px-6 py-4 border rounded-xl bg-gray-100 text-gray-600 cursor-not-allowed"
              />
            </div>

            {/* Name */}
            <div className="space-y-2">
              <label className="block text-sm font-bold text-slate-700 uppercase tracking-wider">
                Name
              </label>
              <input
                {...register("name", { required: "Name is required" })}
                type="text"
                className="w-full px-6 py-4 border rounded-xl bg-slate-50 text-lg focus:ring-4 focus:ring-sky-500/10 focus:border-sky-500 outline-none transition-all"
              />
              {errors.name && (
                <p className="text-red-500 text-sm font-medium">
                  {errors.name.message}
                </p>
              )}
            </div>

            {/* Lastname */}
            <div className="space-y-2">
              <label className="block text-sm font-bold text-slate-700 uppercase tracking-wider">
                Lastname
              </label>
              <input
                {...register("lastname", { required: "Lastname is required" })}
                type="text"
                className="w-full px-6 py-4 border rounded-xl bg-slate-50 text-lg focus:ring-4 focus:ring-sky-500/10 focus:border-sky-500 outline-none transition-all"
              />
              {errors.lastname && (
                <p className="text-red-500 text-sm font-medium">
                  {errors.lastname.message}
                </p>
              )}
            </div>

            {/* Email */}
            <div className="space-y-2">
              <label className="block text-sm font-bold text-slate-700 uppercase tracking-wider">
                Email
              </label>
              <input
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                    message: "Invalid email format",
                  },
                })}
                type="email"
                className="w-full px-6 py-4 border rounded-xl bg-slate-50 text-lg focus:ring-4 focus:ring-sky-500/10 focus:border-sky-500 outline-none transition-all"
              />
              {errors.email && (
                <p className="text-red-500 text-sm font-medium">
                  {errors.email.message}
                </p>
              )}
            </div>

            {/* Phone */}
            <div className="space-y-2">
              <label className="block text-sm font-bold text-slate-700 uppercase tracking-wider">
                Phone Number
              </label>
              <input
                {...register("phone", { required: "Phone number is required" })}
                type="tel"
                className="w-full px-6 py-4 border rounded-xl bg-slate-50 text-lg focus:ring-4 focus:ring-sky-500/10 focus:border-sky-500 outline-none transition-all"
              />
              {errors.phone && (
                <p className="text-red-500 text-sm font-medium">
                  {errors.phone.message}
                </p>
              )}
            </div>

            {/* Address */}
            <div className="space-y-2">
              <label className="block text-sm font-bold text-slate-700 uppercase tracking-wider">
                Address
              </label>
              <textarea
                {...register("address", { required: "Address is required" })}
                rows="3"
                className="w-full px-6 py-4 border rounded-xl bg-slate-50 text-lg focus:ring-4 focus:ring-sky-500/10 focus:border-sky-500 outline-none transition-all"
              />
              {errors.address && (
                <p className="text-red-500 text-sm font-medium">
                  {errors.address.message}
                </p>
              )}
            </div>

            {/* Discount */}
            <div className="space-y-2">
              <label className="block text-sm font-bold text-slate-700 uppercase tracking-wider">
                Discount (%)
              </label>
              <input
                {...register("discount", {
                  required: "Discount is required",
                  valueAsNumber: true,
                  min: { value: 0, message: "Cannot be negative" },
                  max: { value: 100, message: "Cannot exceed 100" },
                })}
                type="number"
                className="w-full px-6 py-4 border rounded-xl bg-slate-50 text-lg focus:ring-4 focus:ring-sky-500/10 focus:border-sky-500 outline-none transition-all"
                placeholder="Enter discount percentage"
              />
              {errors.discount && (
                <p className="text-red-500 text-sm font-medium">
                  {errors.discount.message}
                </p>
              )}
            </div>
          </div>

          {/* Buttons */}
          <div className="flex gap-6">
            <button
              type="submit"
              className="flex-1 bg-slate-900 text-white py-5 px-8 rounded-xl font-bold text-xl hover:bg-slate-800 transition-all active:scale-[0.99] shadow-lg shadow-slate-200"
            >
              Save Changes
            </button>
            <button
              type="button"
              onClick={cancel}
              className="flex-1 bg-white border border-slate-200 text-slate-600 py-5 px-8 rounded-xl font-bold text-xl hover:bg-slate-50 transition-all active:scale-[0.99]"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EditCustomer;
