import React from "react";
import { useForm } from "react-hook-form";
import useCustomers from "../../store/useCustomers";
import { toast } from "react-toastify";

function EditCustomer({ setActiveTab, customer }) {
  const { register, handleSubmit } = useForm({
    defaultValues: customer || {},
  });
  const { customers, setCustomers } = useCustomers();

  const submit = (data) => {
    const updated = customers.map((c) =>
      c.id == customer.id ? { ...c, ...data } : c
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
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Name
          </label>
          <input
            {...register("name")}
            type="text"
            className="w-full px-4 py-2 border rounded-lg"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            lastame
          </label>
          <input
            {...register("lastname")}
            type="text"
            className="w-full px-4 py-2 border rounded-lg"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Email Address
          </label>
          <input
            {...register("email")}
            type="email"
            className="w-full px-4 py-2 border rounded-lg"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Phone Number
          </label>
          <input
            {...register("phone")}
            type="tel"
            className="w-full px-4 py-2 border rounded-lg"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Address
          </label>
          <textarea
            {...register("address")}
            rows="3"
            className="w-full px-4 py-2 border rounded-lg"
          />
        </div>

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

export default EditCustomer;
