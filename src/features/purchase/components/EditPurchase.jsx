import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import useProducts from "../../store/products/useProducts";
import usePurchases from "../../store/purchases/usePurchases";
import useEditIndex from "../../store/shared/useEditIndex";

function EditPurchase({ setActiveTab }) {
  const { products } = useProducts();
  const { purchases, editPurchase } = usePurchases();
  const { editIndex, setEditIndex } = useEditIndex(); // Also need setEditIndex

  // find purchase to edit
  const purchaseToEdit = purchases.find((p) => p.id === editIndex);

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: purchaseToEdit || {},
  });

  const qty = watch("quantity");
  const price = watch("price");
  const total = (qty || 0) * (price || 0);

  useEffect(() => {
    if (purchaseToEdit) {
      reset(purchaseToEdit);
    }
  }, [purchaseToEdit, reset]);

  const submit = (data) => {
    const updatedPurchase = {
      ...purchaseToEdit,
      ...data,
      total: total.toFixed(2),
    };

    editPurchase(updatedPurchase);

    toast.success("Purchase updated successfully!");
    reset();
    setEditIndex(null); // Clear edit index
    setActiveTab("list");
  };

  const cancel = () => {
    setEditIndex(null); // Clear edit index
    setActiveTab("list");
  };

  if (!purchaseToEdit) {
    return (
      <div className="p-6 text-center text-slate-500">
        No purchase selected for editing.
      </div>
    );
  }

  return (
    <div className="w-full px-6 py-10">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-10 border-b border-slate-200 pb-6">
          <h2 className="text-3xl font-bold text-slate-800">Edit Purchase</h2>
        </div>

        <form onSubmit={handleSubmit(submit)} className="space-y-10">
          <div className="bg-white rounded-2xl border border-slate-200 p-10 shadow-sm">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {/* Supplier */}
              <div className="space-y-2">
                <label className="block text-sm font-bold uppercase text-slate-700">
                  Supplier
                </label>
                <input
                  {...register("supplier", { required: "Supplier required" })}
                  className="w-full px-5 py-4 border rounded-xl bg-slate-50"
                />
                {errors.supplier && (
                  <p className="text-red-500 text-sm">
                    {errors.supplier.message}
                  </p>
                )}
              </div>

              {/* Product */}
              <div className="space-y-2">
                <label className="block text-sm font-bold uppercase text-slate-700">
                  Product
                </label>
                <select
                  {...register("product", { required: "Product required" })}
                  className="w-full px-5 py-4 border rounded-xl bg-slate-50"
                >
                  <option value="">Select product</option>
                  {products?.map((p) => (
                    <option key={p.id} value={p.name}>
                      {p.name}
                    </option>
                  ))}
                </select>
                {errors.product && (
                  <p className="text-red-500 text-sm">
                    {errors.product.message}
                  </p>
                )}
              </div>

              {/* Date */}
              <div className="space-y-2">
                <label className="block text-sm font-bold uppercase text-slate-700">
                  Date
                </label>
                <input
                  type="date"
                  {...register("date", { required: "Date required" })}
                  className="w-full px-5 py-4 border rounded-xl bg-slate-50"
                />
                {errors.date && (
                  <p className="text-red-500 text-sm">{errors.date.message}</p>
                )}
              </div>

              {/* Quantity */}
              <div className="space-y-2">
                <label className="block text-sm font-bold uppercase text-slate-700">
                  Quantity
                </label>
                <input
                  type="number"
                  {...register("quantity", {
                    required: "Quantity required",
                    min: 1,
                  })}
                  className="w-full px-5 py-4 border rounded-xl bg-slate-50"
                />
                {errors.quantity && (
                  <p className="text-red-500 text-sm">
                    {errors.quantity.message}
                  </p>
                )}
              </div>

              {/* Price */}
              <div className="space-y-2">
                <label className="block text-sm font-bold uppercase text-slate-700">
                  Price
                </label>
                <input
                  type="number"
                  step="0.01"
                  {...register("price", {
                    required: "Price required",
                    min: 0.01,
                  })}
                  className="w-full px-5 py-4 border rounded-xl bg-slate-50"
                />
                {errors.price && (
                  <p className="text-red-500 text-sm">{errors.price.message}</p>
                )}
              </div>

              {/* Total */}
              <div className="space-y-2">
                <label className="block text-sm font-bold uppercase text-slate-700">
                  Total
                </label>
                <input
                  readOnly
                  value={total.toFixed(2)}
                  className="w-full px-5 py-4 border rounded-xl bg-slate-100 font-bold"
                />
              </div>
            </div>
          </div>

          {/* Buttons */}
          <div className="flex gap-6">
            <button
              type="submit"
              className="flex-1 bg-slate-900 text-white py-5 rounded-xl font-bold text-xl"
            >
              Update Purchase
            </button>

            <button
              type="button"
              onClick={cancel}
              className="flex-1 bg-white border py-5 rounded-xl font-bold text-xl"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EditPurchase;