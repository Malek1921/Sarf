import { create } from "zustand";
import employees from "./employees";

const useEmployees = create((set) => ({
  employees: employees,
  addEmployee: (employee) =>
    set((state) => ({
      employees: [...state.employees, employee],
    })),

  updateEmployee: (updatedEmployee) =>
    set((state) => ({
      employees: state.employees.map((emp) =>
        emp.id === updatedEmployee.id ? updatedEmployee : emp
      ),
    })),

  deleteEmployee: (id) =>
    set((state) => ({
      employees: state.employees.filter((emp) => emp.id !== id),
    })),
}));

export default useEmployees;
