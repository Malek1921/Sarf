import { create } from "zustand";
import purchasesData from "./purchases";

const usePurchases = create((set) => ({
  purchases: purchasesData,

  addPurchase: (purchase) =>
    set((state) => ({
      purchases: [...state.purchases, purchase],
    })),

  editPurchase: (updated) =>
    set((state) => ({
      purchases: state.purchases.map((p) =>
        p.id === updated.id ? updated : p
      ),
    })),

  deletePurchase: (id) =>
    set((state) => ({
      purchases: state.purchases.filter((p) => p.id !== id),
    })),
}));

export default usePurchases;