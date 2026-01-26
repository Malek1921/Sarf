import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import useCompanies from "../../store/companies/useCompanies";

function AddCompany({ setActiveTab }) {
  const { addCompany } = useCompanies();
  const { register, handleSubmit, reset } = useForm();

  const submit = (data) => {
    addCompany({ id: Date.now(), ...data });
    toast.success(`Company "${data.name}" added`);
    reset();
    setActiveTab("list");
  };

  return (
    <form onSubmit={handleSubmit(submit)} className="space-y-6 max-w-xl">
      <input {...register("name",{required:true})} placeholder="Name" className="w-full p-4 border rounded-xl" />
      <input {...register("phone",{required:true})} placeholder="Phone" className="w-full p-4 border rounded-xl" />
      <textarea {...register("address")} placeholder="Address" className="w-full p-4 border rounded-xl" />

      <div className="flex gap-4">
        <button className="flex-1 bg-slate-900 text-white py-4 rounded-xl">Add</button>
        <button type="button" onClick={()=>setActiveTab("list")} className="flex-1 border py-4 rounded-xl">
          Cancel
        </button>
      </div>
    </form>
  );
}

export default AddCompany;
