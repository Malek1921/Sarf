export default function Sidebar() {
  const menuItems = [
    'Inventory Management',
    'Sales Analytics',
    'Purchase Management',
    'Employee Management',
    'POS Operations',
    'Notifications / Alerts',
    'Settings / Configuration',
    'Reporting Enhancements',
    'Customer Management',
  ];

  return (
    <aside className="w-64 bg-white/10 backdrop-blur-lg border-r border-white/20 text-white flex flex-col h-screen">
      <div className="p-6 border-b border-white/20">
        <div className="font-bold text-lg">Andrew Newton</div>
        <div className="flex space-x-4 mt-2 text-sm">
          <span className="cursor-pointer hover:text-yellow-300">Settings</span>
          <span className="cursor-pointer hover:text-yellow-300">Logout</span>
        </div>
      </div>
      <nav className="flex-1 p-4 space-y-2">
        {menuItems.map((label, index) => (
          <div
            key={index}
            className="px-3 py-2 rounded cursor-pointer hover:bg-white/20 transition"
          >
            {label}
          </div>
        ))}
      </nav>
    </aside>
  );
}