import React from "react";
import { useForm } from "react-hook-form";
import useCustomers from "../../store/useCustomers";
import { toast } from "react-toastify";

function EditProduct({ setActiveTab, customer }) {
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

  const cancel = () => {
    setActiveTab("list");
  };

  if (!customer) return <p className="text-gray-500">No customer selected.</p>;

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold text-gray-800 border-b pb-2">
        Edit Customer
      </h2>

      <form onSubmit={handleSubmit(submit)} className="space-y-5">
        {/* ID (disabled) */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Customer ID
          </label>
          <input
            type="text"
            value={customer.id}
            disabled
            className="w-full px-4 py-2 border rounded-lg bg-gray-100 text-gray-600 cursor-not-allowed"
          />
        </div>

        {/* Name */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Name
          </label>
          <input
            {...register("name", { required: "Name is required" })}
            type="text"
            className="w-full px-4 py-2 border rounded-lg"
          />
          {errors.name && (
            <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
          )}
        </div>

        {/* Lastname */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Lastname
          </label>
          <input
            {...register("lastname", { required: "Lastname is required" })}
            type="text"
            className="w-full px-4 py-2 border rounded-lg"
          />
          {errors.lastname && (
            <p className="text-red-500 text-sm mt-1">{errors.lastname.message}</p>
          )}
        </div>

        {/* Email */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Email Address
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
            className="w-full px-4 py-2 border rounded-lg"
          />
          {errors.email && (
            <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
          )}
        </div>

        {/* Phone */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Phone Number
          </label>
          <input
            {...register("phone", { required: "Phone number is required" })}
            type="tel"
            className="w-full px-4 py-2 border rounded-lg"
          />
          {errors.phone && (
            <p className="text-red-500 text-sm mt-1">{errors.phone.message}</p>
          )}
        </div>

        {/* Address */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Address
          </label>
          <textarea
            {...register("address", { required: "Address is required" })}
            rows="3"
            className="w-full px-4 py-2 border rounded-lg"
          />
          {errors.address && (
            <p className="text-red-500 text-sm mt-1">{errors.address.message}</p>
          )}
        </div>

        {/* Buttons */}
        <div className="flex gap-4">
          <button
            type="submit"
            className="flex-1 bg-black text-white py-2 px-4 rounded-lg font-semibold hover:bg-gray-800 transition"
          >
            Save Changes
          </button>
          <button
            type="button"
            onClick={cancel}
            className="flex-1 bg-gray-200 text-gray-700 py-2 px-4 rounded-lg font-semibold hover:bg-gray-300 transition"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}

export default EditProduct;