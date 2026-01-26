import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import useEmployees from "../../store/employees/useEmployees";
import { toast } from "react-toastify";

function AddEmployee({ setActiveTab }) {
  const [step, setStep] = useState(1);
  const [step1Data, setStep1Data] = useState(null);
  
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
    setValue,
  } = useForm();

  const { addEmployee } = useEmployees();

  // Pre-fill name and email when moving to step 2
  useEffect(() => {
    if (step === 2 && step1Data) {
      setValue("name", step1Data.name);
      setValue("email", step1Data.email);
    }
  }, [step, step1Data, setValue]);

  const submitStep1 = (data) => {
    if (data.password !== data.passwordConfirmation) {
      toast.error("Passwords do not match");
      return;
    }
    setStep1Data(data);
    setStep(2);
  };

  const onErrorStep1 = (errors) => {
    toast.error("Please fill in all required fields correctly");
  };

  const submitStep2 = (data) => {
    const newEmployee = {
      ...data,
      id: Math.floor(Math.random() * 9000),
      password: step1Data.password,
    };

    addEmployee(newEmployee);

    toast.success(
      `Employee "${data.name} ${data.lastname}" added successfully!`
    );

    reset();
    setStep1Data(null);
    setStep(1);
    setActiveTab("list");
  };

  const onErrorStep2 = (errors) => {
    toast.error("Please fill in all required fields correctly");
  };

  const cancel = () => {
    reset();
    setStep1Data(null);
    setStep(1);
    setActiveTab("list");
  };

  return (
    <div className="w-full px-6 py-10">
      <div className="max-w-full mx-auto">
        <div className="mb-10 border-b border-slate-200 pb-6">
          <h2 className="text-3xl font-bold text-slate-800">Add Employee</h2>
        </div>

        {step === 1 ? (
          <form onSubmit={handleSubmit(submitStep1, onErrorStep1)} className="space-y-8">
            <div className="bg-white rounded-2xl border border-slate-200 p-10 shadow-sm space-y-8">
              <div className="space-y-2">
                <label className="block text-sm font-bold text-slate-700 uppercase tracking-wider">
                  Name
                </label>
                <input
                  {...register("name", { required: "Name is required" })}
                  type="text"
                  className="w-full px-6 py-4 border rounded-xl bg-slate-50 text-lg"
                />
                {errors.name && (
                  <p className="text-red-500 text-sm mt-2">{errors.name.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-bold text-slate-700 uppercase tracking-wider">
                  Email
                </label>
                <input
                  {...register("email", { 
                    required: "Email is required",
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: "Invalid email address"
                    }
                  })}
                  type="email"
                  className="w-full px-6 py-4 border rounded-xl bg-slate-50 text-lg"
                />
                {errors.email && (
                  <p className="text-red-500 text-sm mt-2">{errors.email.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-bold text-slate-700 uppercase tracking-wider">
                  Password
                </label>
                <input
                  {...register("password", { required: "Password is required" })}
                  type="password"
                  className="w-full px-6 py-4 border rounded-xl bg-slate-50 text-lg"
                />
                {errors.password && (
                  <p className="text-red-500 text-sm mt-2">{errors.password.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-bold text-slate-700 uppercase tracking-wider">
                  Password Confirmation
                </label>
                <input
                  {...register("passwordConfirmation", { required: "Password confirmation is required" })}
                  type="password"
                  className="w-full px-6 py-4 border rounded-xl bg-slate-50 text-lg"
                />
                {errors.passwordConfirmation && (
                  <p className="text-red-500 text-sm mt-2">{errors.passwordConfirmation.message}</p>
                )}
              </div>
            </div>

            <div className="flex gap-6">
              <button type="submit" className="flex-1 bg-slate-900 text-white py-5 rounded-xl">
                Submit
              </button>
              <button type="button" onClick={cancel} className="flex-1 bg-white border py-5 rounded-xl">
                Cancel
              </button>
            </div>
          </form>
        ) : (
          <form onSubmit={handleSubmit(submitStep2, onErrorStep2)} className="space-y-8">
            <div className="bg-white rounded-2xl border border-slate-200 p-10 shadow-sm space-y-8">
              <div className="space-y-2">
                <label className="block text-sm font-bold text-slate-700 uppercase tracking-wider">
                  Name
                </label>
                <input
                  {...register("name", { required: "Name is required" })}
                  type="text"
                  className="w-full px-6 py-4 border rounded-xl bg-slate-50 text-lg"
                />
                {errors.name && (
                  <p className="text-red-500 text-sm mt-2">{errors.name.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-bold text-slate-700 uppercase tracking-wider">
                  Lastname
                </label>
                <input
                  {...register("lastname", { required: "Lastname is required" })}
                  type="text"
                  className="w-full px-6 py-4 border rounded-xl bg-slate-50 text-lg"
                />
                {errors.lastname && (
                  <p className="text-red-500 text-sm mt-2">{errors.lastname.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-bold text-slate-700 uppercase tracking-wider">
                  Permissions
                </label>
                <select
                  {...register("permissions", { required: "Permissions is required" })}
                  className="w-full px-6 py-4 border rounded-xl bg-slate-50 text-lg"
                >
                  <option value="">Select Permissions</option>
                  <option value="Manager">Manager</option>
                  <option value="Cashier">Cashier</option>
                  <option value="Sales">Sales</option>
                  <option value="Admin">Admin</option>
                </select>
                {errors.permissions && (
                  <p className="text-red-500 text-sm mt-2">{errors.permissions.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-bold text-slate-700 uppercase tracking-wider">
                  Phone (Optional)
                </label>
                <input
                  {...register("phone")}
                  type="number"
                  className="w-full px-6 py-4 border rounded-xl bg-slate-50 text-lg"
                />
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-bold text-slate-700 uppercase tracking-wider">
                  Email
                </label>
                <input
                  {...register("email", { 
                    required: "Email is required",
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: "Invalid email address"
                    }
                  })}
                  type="email"
                  className="w-full px-6 py-4 border rounded-xl bg-slate-50 text-lg"
                />
                {errors.email && (
                  <p className="text-red-500 text-sm mt-2">{errors.email.message}</p>
                )}
              </div>
            </div>

            <div className="flex gap-6">
              <button type="submit" className="flex-1 bg-slate-900 text-white py-5 rounded-xl">
                Add Employee
              </button>
              <button type="button" onClick={cancel} className="flex-1 bg-white border py-5 rounded-xl">
                Cancel
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}

export default AddEmployee;
