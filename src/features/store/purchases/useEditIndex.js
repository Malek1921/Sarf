import { create } from "zustand";

const useEditIndex = create((set) => ({
  editIndex: null,
  setEditIndex: (id) => set({ editIndex: id }),
}));

export default useEditIndex;
