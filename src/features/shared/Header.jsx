import { NavLink, useLocation } from "react-router";
import useUser from "../store/auth/useUser";

function Header() {
  const base = "px-4 py-2 rounded-lg text-sm font-semibold transition";
  const activeClass = "bg-black text-white";
  const inactiveClass = "text-gray-600 hover:bg-gray-100 hover:text-black";

  const { user } = useUser();
  const location = useLocation();

  // Hide header on login page
  if (location.pathname === "/") return null;

  const navItems = [
    { to: "/", label: "Logout" },
    { to: "/sale", label: "Sale" },
    { to: "/purchase", label: "Purchase" },
    { to: "/products", label: "Products" },
    { to: "/customers", label: "Customers" },
    { to: "/companies", label: "Companies" },
    { to: "/employees", label: "Employees" },
  ];

  return (
    <nav className="w-full border-b bg-white">
      <div className="max-w-7xl mx-auto flex items-center gap-2 p-4">
        <div className="font-medium text-gray-800">
          {user?.name} {user?.lastname}
        </div>
        {navItems.map((item) => (
          <NavItem
            key={item.to}
            to={item.to}
            label={item.label}
            base={base}
            active={activeClass}
            inactive={inactiveClass}
          />
        ))}
      </div>
    </nav>
  );
}

function NavItem({ to, label, base, active, inactive }) {
  return (
    <NavLink
      to={to}
      className={({ isActive }) => `${base} ${isActive ? active : inactive}`}
    >
      {label}
    </NavLink>
  );
}

export default Header;
