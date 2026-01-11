import React from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

function EditProduct({ setActiveTab }) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const submit = (data) => {
    console.log("Submitted product:", data);
    toast.success(`Product "${data.name}" updated successfully!`);
    reset();
    setActiveTab("list");
  };

  const cancel = () => {
    setActiveTab("list");
  };

  return (
    <div className="w-full px-6 py-10">
      <div className="max-w-full mx-auto">
        {/* Header */}
        <div className="mb-10 border-b border-slate-200 pb-6">
          <h2 className="text-3xl font-bold text-slate-800">Edit Product</h2>
        </div>

        <form onSubmit={handleSubmit(submit)} className="space-y-8">
          <div className="bg-white rounded-2xl border border-slate-200 p-10 shadow-sm space-y-8">
            {/* Category */}
            <div className="space-y-2">
              <label className="block text-sm font-bold text-slate-700 uppercase tracking-wider">
                Category
              </label>
              <select
                {...register("category", { required: "Category is required" })}
                className="w-full px-6 py-4 border border-slate-300 rounded-xl bg-slate-50 text-lg focus:ring-4 focus:ring-sky-500/10 focus:border-sky-500 outline-none transition-all"
              >
                <option value="">Select category</option>
                <option value="electronics">Electronics</option>
                <option value="furniture">Furniture</option>
                <option value="grocery">Grocery</option>
                <option value="clothing">Clothing</option>
              </select>
              {errors.category && (
                <p className="text-red-500 text-sm font-medium">
                  {errors.category.message}
                </p>
              )}
            </div>

            {/* Name */}
            <div className="space-y-2">
              <label className="block text-sm font-bold text-slate-700 uppercase tracking-wider">
                Name
              </label>
              <input
                {...register("name", { required: "Name is required" })}
                type="text"
                placeholder="Enter product name"
                className="w-full px-6 py-4 border border-slate-300 rounded-xl bg-slate-50 text-lg focus:ring-4 focus:ring-sky-500/10 focus:border-sky-500 outline-none transition-all"
              />
              {errors.name && (
                <p className="text-red-500 text-sm font-medium">
                  {errors.name.message}
                </p>
              )}
            </div>

            {/* Unit */}
            <div className="space-y-2">
              <label className="block text-sm font-bold text-slate-700 uppercase tracking-wider">
                Unit
              </label>
              <input
                {...register("unit", { required: "Unit is required" })}
                type="text"
                placeholder="e.g. kg, pc, box"
                className="w-full px-6 py-4 border border-slate-300 rounded-xl bg-slate-50 text-lg focus:ring-4 focus:ring-sky-500/10 focus:border-sky-500 outline-none transition-all"
              />
              {errors.unit && (
                <p className="text-red-500 text-sm font-medium">
                  {errors.unit.message}
                </p>
              )}
            </div>

            {/* Image */}
            <div className="space-y-2">
              <label className="block text-sm font-bold text-slate-700 uppercase tracking-wider">
                Image (optional)
              </label>
              <div className="relative border-2 border-dashed border-slate-300 rounded-xl p-8 bg-slate-50 hover:bg-slate-100 transition-colors">
                <input
                  {...register("image")}
                  type="file"
                  className="w-full cursor-pointer opacity-0 absolute inset-0 z-10"
                />
                <div className="text-center">
                  <p className="text-slate-600 font-medium">
                    Click to upload product image
                  </p>
                  <p className="text-slate-400 text-sm">PNG, JPG or WebP</p>
                </div>
              </div>
            </div>
          </div>

          {/* Buttons */}
          <div className="flex gap-6">
            <button
              type="submit"
              className="flex-1 bg-slate-900 text-white py-5 px-8 rounded-xl font-bold text-xl hover:bg-slate-800 transition-all active:scale-[0.99] shadow-lg shadow-slate-200"
            >
              Update Product
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

export default EditProduct;
