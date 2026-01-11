import { create } from "zustand";

const useUser = create((set) => ({
  user: {},
  setUser: (currentUser) => set(() => ({ user: currentUser })),
}));
export default useUser;
