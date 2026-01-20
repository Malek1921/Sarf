import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import useCompanies from "../../store/companies/useCompanies";
import useEditIndex from "../../store/shared/useEditIndex";

function EditCompany({ setActiveTab }) {
  const { companies, editCompany } = useCompanies();
  const { editIndex } = useEditIndex();

  const company = companies.find(c => c.id === editIndex);

  const { register, handleSubmit, reset } = useForm({
    defaultValues: company || {},
  });

  useEffect(() => {
    if (company) reset(company);
  }, [company, reset]);

  if (!company) {
    return <p className="p-6 text-slate-500">No company selected</p>;
  }

  const submit = (data) => {
    editCompany({ ...company, ...data });
    toast.success("Company updated");
    setActiveTab("list");
  };

  return (
    <form onSubmit={handleSubmit(submit)} className="space-y-6 max-w-xl">
      <input disabled value={company.id} className="w-full p-4 border rounded-xl bg-gray-100" />
      <input {...register("name",{required:true})} className="w-full p-4 border rounded-xl" />
      <input {...register("phone",{required:true})} className="w-full p-4 border rounded-xl" />
      <textarea {...register("address")} className="w-full p-4 border rounded-xl" />

      <div className="flex gap-4">
        <button className="flex-1 bg-slate-900 text-white py-4 rounded-xl">Save</button>
        <button type="button" onClick={()=>setActiveTab("list")} className="flex-1 border py-4 rounded-xl">
          Cancel
        </button>
      </div>
    </form>
  );
}

export default EditCompany;
