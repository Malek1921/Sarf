import { create } from "zustand";
import customers from "./customers";

const useCustomers = create((set) => ({
  customers: customers,
  addCustomer: (customer) =>
    set((state) => ({
      customers: [...state.customers, customer],
    })),

  editCustomer: (updatedCustomer) =>
    set((state) => ({
      customers: state.customers.map((customer) =>
        customer.id === updatedCustomer.id ? updatedCustomer : customer,
      ),
    })),

  deleteCustomer: (id) =>
    set((state) => ({
      customers: state.customers.filter((customer) => customer.id !== id),
    })),
}));

export default useCustomers;
