import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import useProducts from "../../store/products/useProducts";
import useEditIndex from "../../store/shared/useEditIndex";

function EditProduct({ setActiveTab }) {
  const { products, editProduct } = useProducts();
  const { editIndex } = useEditIndex();

  // Find the product to edit
  const productToEdit = products.find((p) => p.id === editIndex);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: productToEdit || {}, // prefill form
  });

  // Reset form when productToEdit changes
  useEffect(() => {
    if (productToEdit) {
      reset(productToEdit);
    }
  }, [productToEdit, reset]);

  const submit = (data) => {
    const updatedProduct = {
      ...productToEdit,
      ...data,
    };

    editProduct(updatedProduct);

    toast.success(`Product "${data.name}" updated successfully!`);
    reset();
    setActiveTab("list");
  };

  const cancel = () => {
    setActiveTab("list");
  };

  if (!productToEdit) {
    return (
      <div className="p-6 text-center text-slate-500">
        No product selected for editing.
      </div>
    );
  }

  return (
    <div className="w-full px-6 py-10">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-10 border-b border-slate-200 pb-6">
          <h2 className="text-3xl font-bold text-slate-800">Edit Product</h2>
        </div>

        <form onSubmit={handleSubmit(submit)} className="space-y-10">
          {/* FORM GRID */}
          <div className="bg-white rounded-2xl border border-slate-200 p-10 shadow-sm">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {/* Category */}
              <div className="space-y-2">
                <label className="block text-sm font-bold text-slate-700 uppercase tracking-wider">
                  Category
                </label>
                <select
                  {...register("category", { required: "Category is required" })}
                  className="w-full px-5 py-4 border border-slate-300 rounded-xl bg-slate-50 
                             focus:ring-4 focus:ring-sky-500/10 focus:border-sky-500 outline-none"
                >
                  <option value="">Select category</option>
                  <option value="electronics">Electronics</option>
                  <option value="furniture">Furniture</option>
                  <option value="grocery">Grocery</option>
                  <option value="clothing">Clothing</option>
                </select>
                {errors.category && (
                  <p className="text-red-500 text-sm">{errors.category.message}</p>
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
                  placeholder="Product name"
                  className="w-full px-5 py-4 border border-slate-300 rounded-xl bg-slate-50 
                             focus:ring-4 focus:ring-sky-500/10 focus:border-sky-500 outline-none"
                />
                {errors.name && (
                  <p className="text-red-500 text-sm">{errors.name.message}</p>
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
                  placeholder="kg, pc, box"
                  className="w-full px-5 py-4 border border-slate-300 rounded-xl bg-slate-50 
                             focus:ring-4 focus:ring-sky-500/10 focus:border-sky-500 outline-none"
                />
                {errors.unit && (
                  <p className="text-red-500 text-sm">{errors.unit.message}</p>
                )}
              </div>

              {/* IMAGE — FULL WIDTH */}
              <div className="space-y-2 lg:col-span-3">
                <label className="block text-sm font-bold text-slate-700 uppercase tracking-wider">
                  Image (optional)
                </label>
                <div className="relative border-2 border-dashed border-slate-300 rounded-xl p-10 bg-slate-50 hover:bg-slate-100 transition">
                  <input
                    {...register("image")}
                    type="text"
                    placeholder="Image URL"
                    className="w-full px-5 py-4 border border-slate-300 rounded-xl bg-slate-50"
                  />
                  <div className="text-center mt-2 text-slate-500 text-sm">
                    Enter a valid image URL (PNG, JPG, WebP)
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* BUTTONS */}
          <div className="flex gap-6">
            <button
              type="submit"
              className="flex-1 bg-slate-900 text-white py-5 rounded-xl font-bold text-xl hover:bg-slate-800 transition"
            >
              Update Product
            </button>
            <button
              type="button"
              onClick={cancel}
              className="flex-1 bg-white border border-slate-200 text-slate-600 py-5 rounded-xl font-bold text-xl hover:bg-slate-50 transition"
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