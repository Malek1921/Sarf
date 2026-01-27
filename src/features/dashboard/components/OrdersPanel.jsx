export default function OrdersPanel() {
  const totalOrders = 124;
  const completedOrders = 98;
  const completionRate = Math.round((completedOrders / totalOrders) * 100);

  return (
    <div className="bg-teal-600 text-white p-4 rounded shadow">
      <h2 className="text-lg font-bold mb-2">Orders</h2>
      <div className="text-sm">Total Orders: {totalOrders}</div>
      <div className="text-sm">Completed: {completedOrders}</div>
      <div className="w-full bg-teal-300 rounded h-2 mt-2">
        <div className="bg-green-400 h-2 rounded" style={{ width: `${completionRate}%` }}></div>
      </div>
      <div className="text-xs mt-1">{completionRate}% Completed</div>
    </div>
  );
}