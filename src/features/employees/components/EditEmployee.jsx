import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import useEmployees from "../../store/employees/useEmployees";
import { toast } from "react-toastify";
import useEditIndex from "../../store/shared/useEditIndex";

function EditEmployee({ setActiveTab }) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const { editIndex, setEditIndex } = useEditIndex();
  const { employees, updateEmployee } = useEmployees();

  useEffect(() => {
    if (editIndex === null || editIndex === undefined) return;

    const employee = employees.find((e) => e.id === editIndex);
    if (!employee) return;

    // Reset form with employee data, but don't pre-fill password for security
    const { password, ...employeeData } = employee;
    reset({
      ...employeeData,
      permissions: employee.permissions || employee.position || "",
      password: "", // Password field should be empty
    });
  }, [editIndex, reset, employees]);

  const submit = (data) => {
    const employee = employees.find((e) => e.id === editIndex);
    const updatedData = {
      ...data,
      id: editIndex,
      // If password is not provided or empty, keep the existing password
      password: data.password && data.password.trim() !== "" 
        ? data.password 
        : (employee?.password || ""),
    };
    updateEmployee(updatedData);
    toast.success(`${data.name} ${data.lastname} updated successfully!`);
    reset(); // Clear all fields
    setEditIndex(null); // Clear edit index
    setActiveTab("list");
  };

  const onError = (errors) => {
    toast.error("Please fill in all required fields correctly");
  };

  const handleCancel = () => {
    reset(); // Clear all fields
    setEditIndex(null); // Clear edit index
    setActiveTab("list");
  };

  if (!editIndex) return null;

  return (
    <div className="w-full px-6 py-10">
      <div className="max-w-full mx-auto">
        <div className="mb-10 border-b border-slate-200 pb-6">
          <h2 className="text-3xl font-bold text-slate-800">Edit Employee</h2>
        </div>

        <form onSubmit={handleSubmit(submit, onError)} className="space-y-8">
          <div className="bg-white rounded-2xl border border-slate-200 p-10 shadow-sm space-y-6">
            <input
              type="text"
              {...register("id")}
              disabled
              className="w-full px-6 py-4 border rounded-xl bg-gray-100"
            />

            <div>
              <input
                {...register("name", { required: "Name is required" })}
                placeholder="Name"
                className="w-full px-6 py-4 border rounded-xl"
              />
              {errors.name && (
                <p className="text-red-500 text-sm mt-2">Name is required</p>
              )}
            </div>

            <div>
              <input
                {...register("lastname", { required: "Lastname is required" })}
                placeholder="Lastname"
                className="w-full px-6 py-4 border rounded-xl"
              />
              {errors.lastname && (
                <p className="text-red-500 text-sm mt-2">
                  Lastname is required
                </p>
              )}
            </div>

            <div>
              <select
                {...register("permissions", { required: "Permissions is required" })}
                className="w-full px-6 py-4 border rounded-xl"
              >
                <option value="">Select Permissions</option>
                <option value="Manager">Manager</option>
                <option value="Cashier">Cashier</option>
                <option value="Sales">Sales</option>
                <option value="Admin">Admin</option>
              </select>
              {errors.permissions && (
                <p className="text-red-500 text-sm mt-2">Permissions is required</p>
              )}
            </div>

            <div>
              <input
                {...register("phone")}
                type="number"
                placeholder="Phone (Optional)"
                className="w-full px-6 py-4 border rounded-xl"
              />
            </div>

            <div>
              <input
                {...register("email", { 
                  required: "Email is required",
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: "Invalid email address"
                  }
                })}
                type="email"
                placeholder="Email"
                className="w-full px-6 py-4 border rounded-xl"
              />
              {errors.email && (
                <p className="text-red-500 text-sm mt-2">
                  {errors.email.message || "Email is required"}
                </p>
              )}
            </div>

            <div>
              <input
                {...register("password")}
                type="password"
                placeholder="Password (Leave blank to keep current password)"
                className="w-full px-6 py-4 border rounded-xl"
              />
            </div>
          </div>

          <div className="flex gap-6">
            <button
              type="submit"
              className="flex-1 bg-slate-900 text-white py-5 rounded-xl"
            >
              Save Changes
            </button>
            <button
              type="button"
              onClick={handleCancel}
              className="flex-1 bg-white border py-5 rounded-xl"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EditEmployee;
