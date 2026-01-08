import { useState } from "react";
import products from "../../store/product";

function ProductsList() {
  const [search, setSearch] = useState("");
  const [company, setCompany] = useState("");

  const companies = products.reduce((list, product) => {
    if (!list.includes(product.company)) {
      list.push(product.company);
    }
    return list;
  }, []);

  const filteredProducts = products.filter(
    (p) =>
      p.name.toLowerCase().includes(search.toLowerCase()) &&
      (company == "" || p.company == company)
  );

  return (
    <div className="min-h-screen bg-linear-to-br p-8 text-slate-100">
      <h2 className="text-2xl text-black font-semibold mb-6">Product Inventory</h2>

      <div className="flex flex-wrap gap-4 mb-8">
        <input
          type="text"
          placeholder="Search products..."
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
          }}
          className="w-64 rounded-xl bg-slate-900 border border-slate-700 px-4 py-3 text-sm
                     placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-sky-500"
        />

        <select
          value={company}
          onChange={(e) => {
            setCompany(e.target.value);
          }}
          className="w-64 rounded-xl bg-slate-900 border border-slate-700 px-4 py-3 text-sm
                     focus:outline-none focus:ring-2 focus:ring-sky-500"
        >
          <option value="">All companies</option>
          {companies.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredProducts.map((p) => (
          <div
            key={p.id}
            className="rounded-2xl border border-slate-800 bg-slate-900/60 p-5
                       backdrop-blur transition hover:-translate-y-1 hover:shadow-2xl"
          >
            <h4 className="text-lg font-semibold mb-1">{p.name}</h4>
            <p className="text-sm text-slate-400 mb-3">{p.company}</p>

            <div className="flex justify-between text-sm text-slate-300 mb-2">
              <span>Qty: {p.quantity}</span>
              <span>{p.expireDate}</span>
            </div>

            <div className="mt-4 text-xl font-bold text-sky-400">
              ${p.price}
            </div>
          </div>
        ))}
      </div>

      {filteredProducts.length == 0 && (
        <p className="mt-10 text-slate-500 text-center">No products found</p>
      )}
    </div>
  );
}

export default ProductsList;
