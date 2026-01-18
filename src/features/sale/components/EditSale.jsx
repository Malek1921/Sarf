import React from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

function EditSale({ setActiveTab }) {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      quantity: 1,
      discount: 0,
    },
  });

  const quantity = watch("quantity");
  const price = watch("price");
  const discount = watch("discount");

  const total =
    quantity && price ? Math.max(quantity * price - (discount || 0), 0) : 0;

  const submit = (data) => {
    const sale = {
      ...data,
      total,
      id: Math.floor(Math.random() * 9000),
      createdAt: new Date().toISOString(),
    };

    console.log("New Sale:", sale);
    toast.success("Sale added successfully");
    setActiveTab?.("list");
  };

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      <h2 className="text-xl font-semibold text-gray-800 border-b pb-2">
        Edit Sale
      </h2>

      <form onSubmit={handleSubmit(submit)} className="space-y-5">
        {/* Customer */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Customer Name
          </label>
          <input
            {...register("customer", { required: "Customer is required" })}
            className="w-full px-4 py-2 border rounded-lg"
            placeholder="John Doe"
          />
          {errors.customer && (
            <p className="text-red-500 text-sm mt-1">
              {errors.customer.message}
            </p>
          )}
        </div>

        {/* Product */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Product Name
          </label>
          <input
            {...register("product", { required: "Product is required" })}
            className="w-full px-4 py-2 border rounded-lg"
            placeholder="iPhone 15"
          />
          {errors.product && (
            <p className="text-red-500 text-sm mt-1">
              {errors.product.message}
            </p>
          )}
        </div>

        {/* Quantity */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Quantity
          </label>
          <input
            type="number"
            min="1"
            {...register("quantity", {
              required: true,
              valueAsNumber: true,
            })}
            className="w-full px-4 py-2 border rounded-lg"
          />
        </div>

        {/* Price */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Price (per unit)
          </label>
          <input
            type="number"
            min="0"
            step="0.01"
            {...register("price", {
              required: "Price is required",
              valueAsNumber: true,
            })}
            className="w-full px-4 py-2 border rounded-lg"
          />
          {errors.price && (
            <p className="text-red-500 text-sm mt-1">{errors.price.message}</p>
          )}
        </div>

        {/* Discount */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Discount
          </label>
          <input
            type="number"
            min="0"
            step="0.01"
            {...register("discount", {
              valueAsNumber: true,
            })}
            className="w-full px-4 py-2 border rounded-lg"
          />
        </div>

        {/* Total */}
        <div className="bg-gray-50 border rounded-lg px-4 py-3">
          <p className="text-sm text-gray-600">Total</p>
          <p className="text-lg font-semibold text-black">{total.toFixed(2)}</p>
        </div>

        {/* Buttons */}
        <div className="flex gap-4 pt-2">
          <button
            type="submit"
            className="flex-1 bg-black text-white py-2 px-4 rounded-lg font-semibold hover:bg-gray-800 transition"
          >
            Edit Sale
          </button>
          <button
            type="button"
            onClick={() => setActiveTab?.("list")}
            className="flex-1 bg-gray-200 text-gray-700 py-2 px-4 rounded-lg font-semibold hover:bg-gray-300 transition"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}

export default EditSale;
