export default function ServerStatusPanel() {
  const stats = [
    { label: 'Memory Usage', value: '70%', color: 'bg-yellow-400' },
    { label: 'CPU Usage', value: '55%', color: 'bg-red-400' },
    { label: 'Disk Usage', value: '80%', color: 'bg-green-400' },
  ];

  return (
    <div className="bg-gray-100 p-4 rounded shadow">
      <h2 className="text-lg font-bold mb-2 text-gray-700">Server Status</h2>
      <div className="space-y-3">
        {stats.map(({ label, value, color }) => (
          <div key={label}>
            <div className="text-sm text-gray-600">{label}</div>
            <div className="w-full bg-gray-300 rounded h-2">
              <div className={`${color} h-2 rounded`} style={{ width: value }}></div>
            </div>
            <div className="text-xs text-gray-500">{value}</div>
          </div>
        ))}
      </div>
    </div>
  );
}