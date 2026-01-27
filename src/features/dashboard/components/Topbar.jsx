export default function TopBar() {
  return (
    <header className="bg-white shadow p-4 flex justify-between items-center">
      <h1 className="text-xl font-bold text-gray-700">Dashboard</h1>
      <div className="space-x-4 text-gray-600">
        <span className="cursor-pointer hover:text-blue-600">Settings</span>
        <span className="cursor-pointer hover:text-blue-600">Logout</span>
      </div>
    </header>
  );
}