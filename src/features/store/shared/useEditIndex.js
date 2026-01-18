import { create } from "zustand";
const useEditIndex = create((set) => ({
  editIndex: null,
  setEditIndex: (currentIndex) => set(() => ({ editIndex: currentIndex })),
}));
export default useEditIndex;
