import { create } from "zustand";
import products from "./products";

const useProducts = create((set) => ({
  products: products,
  addEmployee: (product) =>
    set((state) => ({
      products: [...state.products, product],
    })),

  updateEmployee: (updatedProduct) =>
    set((state) => ({
      products: state.products.map((product) =>
        product.id === updatedProduct.id ? updatedProduct : product
      ),
    })),

  deleteEmployee: (id) =>
    set((state) => ({
      products: state.products.filter((product) => product.id !== id),
    })),
}));

export default useProducts;
