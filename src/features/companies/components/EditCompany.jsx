import React from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

function EditCompany({ setActiveTab, company }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: company || {},
  });

  if (!company) return <p className="text-gray-500">No company selected.</p>;

  const submit = (data) => {
    console.log("Updated Company:", data);
    toast.success(`Company "${data.name}" updated`);
    setActiveTab("list");
  };

  const cancel = () => setActiveTab("list");

  return (
    <div className="w-full px-6 py-10">
      <div className="max-w-full mx-auto">
        <div className="mb-10 border-b border-slate-200 pb-6">
          <h2 className="text-3xl font-bold text-slate-800">Edit Company</h2>
        </div>

        <form onSubmit={handleSubmit(submit)} className="space-y-8">
          <div className="bg-white rounded-2xl border border-slate-200 p-10 shadow-sm space-y-8">
            {/* Company ID */}
            <div className="space-y-2">
              <label className="block text-sm font-bold text-slate-700 uppercase tracking-wider">
                Company ID
              </label>
              <input
                type="text"
                value={company.id}
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
                placeholder="Enter company name"
                className="w-full px-6 py-4 border border-slate-300 rounded-xl bg-slate-50 text-lg focus:ring-4 focus:ring-sky-500/10 focus:border-sky-500 outline-none transition-all"
              />
              {errors.name && (
                <p className="text-red-500 text-sm font-medium">
                  {errors.name.message}
                </p>
              )}
            </div>

            {/* Phone */}
            <div className="space-y-2">
              <label className="block text-sm font-bold text-slate-700 uppercase tracking-wider">
                Phone
              </label>
              <input
                {...register("phone", { required: "Phone is required" })}
                type="tel"
                placeholder="Enter phone number"
                className="w-full px-6 py-4 border border-slate-300 rounded-xl bg-slate-50 text-lg focus:ring-4 focus:ring-sky-500/10 focus:border-sky-500 outline-none transition-all"
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
                {...register("address")}
                rows="3"
                placeholder="Enter company address"
                className="w-full px-6 py-4 border border-slate-300 rounded-xl bg-slate-50 text-lg focus:ring-4 focus:ring-sky-500/10 focus:border-sky-500 outline-none transition-all"
              />
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

export default EditCompany;
