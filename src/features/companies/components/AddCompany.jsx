import React from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

function AddCompany({ setActiveTab }) {
  const { register, handleSubmit, formState:{ errors } } = useForm();

  const submit = (data) => {
    console.log("New Company:", data);
    toast.success("Company added (demo)");
    setActiveTab("list");
  };

  const cancel = () => setActiveTab("list");

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold text-gray-800 border-b pb-2">Add Company</h2>

      <form onSubmit={handleSubmit(submit)} className="space-y-5">
        {/* Name */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
          <input
            {...register("name",{required:"Name is required"})}
            type="text"
            className="w-full px-4 py-2 border rounded-lg"
          />
          {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>}
        </div>

        {/* Phone */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
          <input
            {...register("phone",{required:"Phone is required"})}
            type="tel"
            className="w-full px-4 py-2 border rounded-lg"
          />
          {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone.message}</p>}
        </div>

        {/* Address */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
          <textarea
            {...register("address")}
            rows="3"
            className="w-full px-4 py-2 border rounded-lg"
          />
        </div>

        {/* Buttons */}
        <div className="flex gap-4">
          <button
            type="submit"
            className="flex-1 bg-black text-white py-2 px-4 rounded-lg font-semibold hover:bg-gray-800 transition"
          >
            Add Company
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

export default AddCompany;
