import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import useEmployees from "../store/employees/useEmployees";
import { toast } from "react-toastify";
import useUser from "../store/auth/useUser";

function Login() {
  const navigate = useNavigate();
  const { register, handleSubmit } = useForm();
  const { setUser } = useUser();
  const { employees } = useEmployees();
  const signin = (data) => {
    const foundUser = employees.find(
      (employee) =>
        employee.email === data.email && employee.password === data.password
    );

    if (foundUser) {
      setUser(foundUser);
      toast.success(`Welcome ${foundUser.name}`);
      navigate("/products");
    } else {
      toast.error("Your email or password is incorrect!");
    }
  };

  return (
    <div className="w-full h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="bg-white shadow-lg rounded-2xl w-full max-w-md p-10">
        <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">
          Login
        </h2>

        <form className="space-y-6">
          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <input
              type="email"
              {...register("email")}
              placeholder="you@example.com"
              className="w-full px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent"
              required
            />
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <input
              type="password"
              {...register("password")}
              placeholder="••••••••"
              className="w-full px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent"
              required
            />
          </div>

          {/* Submit */}
          <button
            type="submit"
            onClick={handleSubmit(signin)}
            className="w-full bg-blue-500 text-white py-3 rounded-xl font-semibold hover:bg-blue-600 transition"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;
