import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import useCustomers from "../../store/customers/useCustomers";
import { toast } from "react-toastify";
import useEditIndex from "../../store/shared/useEditIndex";
import customers from "../../store/customers/customers";

function EditCustomer({ setActiveTab }) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const { editIndex } = useEditIndex();
  const { editCustomer } = useCustomers();
  useEffect(() => {
    if (editIndex === null || editIndex === undefined) return;

    const customer = customers.find((c) => c.id === editIndex);
    if (!customer) return;

    reset(customer);
  }, [editIndex, reset]);

  const submit = (data) => {
    editCustomer(data);
    toast.success(`${data.name} ${data.lastname} updated`);
    setActiveTab("list");
  };

  if (!editIndex) return null;

  return (
    <div className="w-full px-6 py-10">
      <div className="max-w-full mx-auto">
        <div className="mb-10 border-b border-slate-200 pb-6">
          <h2 className="text-3xl font-bold text-slate-800">Edit Customer</h2>
        </div>

        <form onSubmit={handleSubmit(submit)} className="space-y-8">
          <div className="bg-white rounded-2xl border border-slate-200 p-10 shadow-sm space-y-6">
            <input
              type="text"
              {...register("id")}
              disabled
              className="w-full px-6 py-4 border rounded-xl bg-gray-100"
            />

            <div>
              <input
                {...register("name", { required: true })}
                className="w-full px-6 py-4 border rounded-xl"
              />
              {errors.name && (
                <p className="text-red-500 text-sm mt-2">Name is required</p>
              )}
            </div>

            <div>
              <input
                {...register("lastname", { required: true })}
                className="w-full px-6 py-4 border rounded-xl"
              />
              {errors.lastname && (
                <p className="text-red-500 text-sm mt-2">
                  Last name is required
                </p>
              )}
            </div>

            <div>
              <input
                {...register("email", { required: true })}
                className="w-full px-6 py-4 border rounded-xl"
              />
              {errors.email && (
                <p className="text-red-500 text-sm mt-2">Email is required</p>
              )}
            </div>

            <div>
              <input
                {...register("phone", { required: true })}
                className="w-full px-6 py-4 border rounded-xl"
              />
              {errors.phone && (
                <p className="text-red-500 text-sm mt-2">Phone is required</p>
              )}
            </div>

            <div>
              <textarea
                {...register("address", { required: true })}
                className="w-full px-6 py-4 border rounded-xl"
              />
              {errors.address && (
                <p className="text-red-500 text-sm mt-2">Address is required</p>
              )}
            </div>
          </div>

          <div className="flex gap-6">
            <button
              type="submit"
              className="flex-1 bg-slate-900 text-white py-5"
            >
              Save Changes
            </button>
            <button
              type="button"
              onClick={() => setActiveTab("list")}
              className="flex-1 bg-white border py-5"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EditCustomer;
