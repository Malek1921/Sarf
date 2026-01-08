import { create } from "zustand";

const useCustomers = create((set) => ({
  customers: [],
  setCustomers: (newCustomers) => set({ customers: newCustomers }),
}));

export default useCustomers;