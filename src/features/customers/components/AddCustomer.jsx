import React, { useState } from "react";
import { useForm } from "react-hook-form";
import useCustomers from "../../store/useCustomers";
import { toast } from "react-toastify";

function AddCustomer({ setActiveTab }) {
  const { register, handleSubmit, reset } = useForm();
  const { customers, setCustomers } = useCustomers();

 const submit = (data) => {
  const newCustomer = { ...data };
  setCustomers([...customers, newCustomer]);

  toast.success(`Customer "${data.fullname}" added successfully!`);
  reset();

  // ✅ Switch back to list tab
  setActiveTab("list");
};

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold text-gray-800 border-b pb-2">
        Add New Customer
      </h2>

      <form onSubmit={handleSubmit(submit)} className="space-y-5">
        {/* Full Name */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Full Name
          </label>
          <input
            {...register("fullname", { required: "This field is required" })}
            type="text"
            placeholder="Enter customer name"
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-black focus:outline-none"
          />
        </div>

        {/* Email */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Email Address
          </label>
          <input
            {...register("email", { required: "This field is required" })}
            type="email"
            placeholder="Enter email"
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-black focus:outline-none"
          />
        </div>

        {/* Phone */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Phone Number
          </label>
          <input
            {...register("phone", { required: "This field is required" })}
            type="number"
            placeholder="Enter phone number"
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-black focus:outline-none"
          />
        </div>

        {/* Address */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Address
          </label>
          <textarea
            {...register("address", { required: "This field is required" })}
            placeholder="Enter address"
            rows="3"
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-black focus:outline-none"
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-black text-white py-2 px-4 rounded-lg font-semibold hover:bg-gray-800 transition"
        >
          Add Customer
        </button>
      </form>
    </div>
  );
}

export default AddCustomer;