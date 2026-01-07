import { NavLink, useLocation } from "react-router";

function Header() {
  const base = "px-4 py-2 rounded-lg text-sm font-semibold transition";
  const active = "bg-black text-white";
  const inactive = "text-gray-600 hover:bg-gray-100 hover:text-black";

  const location = useLocation();
  if (location.pathname == "/") {
    return null;
  } else {
    return (
      <nav className="w-full border-b bg-white">
        <div className="max-w-7xl mx-auto flex gap-2 p-4">
          <NavItem
            to="/"
            label="Logout"
            base={base}
            active={active}
            inactive={inactive}
          />
          <NavItem
            to="/sale"
            label="Sale"
            base={base}
            active={active}
            inactive={inactive}
          />
          <NavItem
            to="/purchase"
            label="Purchase"
            base={base}
            active={active}
            inactive={inactive}
          />
          <NavItem
            to="/products"
            label="Products"
            base={base}
            active={active}
            inactive={inactive}
          />
          <NavItem
            to="/customers"
            label="Customers"
            base={base}
            active={active}
            inactive={inactive}
          />
          <NavItem
            to="/companies"
            label="Companies"
            base={base}
            active={active}
            inactive={inactive}
          />
          <NavItem
            to="/employees"
            label="Employees"
            base={base}
            active={active}
            inactive={inactive}
          />
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
}
export default Header;
