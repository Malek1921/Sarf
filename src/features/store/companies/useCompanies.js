import { create } from "zustand";
import companies from "./companies";

const useCompanies = create((set) => ({
  companies: companies,
  addCompany: (company) =>
    set((state) => ({
      companies: [...state.companies, company],
    })),

  editCompany: (updatedcompany) =>
    set((state) => ({
      companies: state.companies.map((company) =>
        company.id === updatedcompany.id ? updatedcompany : company,
      ),
    })),

  deleteCompany: (id) =>
    set((state) => ({
      companies: state.companies.filter((company) => company.id !== id),
    })),
}));

export default useCompanies;
