import React from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { toast } from "react-toastify";
import useProducts from "../../store/products/useProducts";
import usePurchases from "../../store/purchases/usePurchases";

function AddPurchase({ setActiveTab }) {
  const { products } = useProducts();
  const { addPurchase } = usePurchases();

  const {
    register,
    handleSubmit,
    watch,
    control,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      supplier: "",
      date: "",
      items: [{ product: "", quantity: 1, price: 0 }],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "items",
  });

  const items = watch("items");

  const grandTotal = items?.reduce((sum, item) => {
    return sum + (item.quantity || 0) * (item.price || 0);
  }, 0);

  const submit = (data) => {
    const newPurchase = {
      id: crypto.randomUUID(),
      supplier: data.supplier,
      date: data.date,
      items: data.items,
      total: grandTotal.toFixed(2),
    };

    addPurchase(newPurchase);

    toast.success("Purchase added successfully!");
    reset();
    setActiveTab("list");
  };

  const cancel = () => setActiveTab("list");

  return (
    <div className="w-full px-6 py-10">
      <div className="max-w-7xl mx-auto">
        <div className="mb-10 border-b border-slate-200 pb-6">
          <h2 className="text-3xl font-bold text-slate-800">Add Purchase</h2>
        </div>

        <form onSubmit={handleSubmit(submit)} className="space-y-10">
          <div className="bg-white rounded-2xl border p-10 space-y-8 shadow-sm">
            {/* Supplier & Date */}
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <label className="font-bold uppercase text-sm">Supplier</label>
                <input
                  {...register("supplier", { required: "Supplier required" })}
                  className="w-full px-5 py-4 border rounded-xl bg-slate-50"
                />
                {errors.supplier && (
                  <p className="text-red-500">{errors.supplier.message}</p>
                )}
              </div>

              <div>
                <label className="font-bold uppercase text-sm">Date</label>
                <input
                  type="date"
                  {...register("date", { required: "Date required" })}
                  className="w-full px-5 py-4 border rounded-xl bg-slate-50"
                />
                {errors.date && (
                  <p className="text-red-500">{errors.date.message}</p>
                )}
              </div>
            </div>

            {/* Items */}
            {fields.map((field, index) => {
              const rowTotal =
                (items[index]?.quantity || 0) * (items[index]?.price || 0);

              return (
                <div
                  key={field.id}
                  className="grid grid-cols-1 md:grid-cols-5 gap-6 items-end border p-6 rounded-xl"
                >
                  <select
                    {...register(`items.${index}.product`, {
                      required: true,
                    })}
                    className="px-4 py-3 border rounded-xl bg-slate-50"
                  >
                    <option value="">Select product</option>
                    {products?.map((p) => (
                      <option key={p.id} value={p.name}>
                        {p.name}
                      </option>
                    ))}
                  </select>

                  <input
                    type="number"
                    {...register(`items.${index}.quantity`, { min: 1 })}
                    className="px-4 py-3 border rounded-xl bg-slate-50"
                  />

                  <input
                    type="number"
                    step="0.01"
                    {...register(`items.${index}.price`, { min: 0.01 })}
                    className="px-4 py-3 border rounded-xl bg-slate-50"
                  />

                  <input
                    readOnly
                    value={rowTotal.toFixed(2)}
                    className="px-4 py-3 border rounded-xl bg-slate-100 font-bold"
                  />

                  <button
                    type="button"
                    onClick={() => remove(index)}
                    className="bg-red-500 text-white py-3 rounded-xl"
                  >
                    Remove
                  </button>
                </div>
              );
            })}

            <button
              type="button"
              onClick={() => append({ product: "", quantity: 1, price: 0 })}
              className="bg-slate-200 px-6 py-4 rounded-xl font-bold"
            >
              + Add Another Product
            </button>

            <div className="text-right text-2xl font-bold">
              Total: ${grandTotal.toFixed(2)}
            </div>
          </div>

          {/* Buttons */}
          <div className="flex gap-6">
            <button
              type="submit"
              className="flex-1 bg-slate-900 text-white py-5 rounded-xl font-bold text-xl"
            >
              Add Purchase
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

export default AddPurchase;
