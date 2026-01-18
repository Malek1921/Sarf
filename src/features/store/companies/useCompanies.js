import { create } from "zustand";
import products from "./product";

const useProducts = create((set) => ({
  products: products,
  addProducts: (product) =>
    set((state) => ({
      products: [...state.products, product],
    })),

  EditProducts: (updatedProduct) =>
    set((state) => ({
      products: state.products.map((product) =>
        product.id === updatedProduct.id ? updatedProduct : product
      ),
    })),

  DeleteProducts: (id) =>
    set((state) => ({
      products: state.products.filter((product) => product.id !== id),
    })),
}));

export default useProducts;
