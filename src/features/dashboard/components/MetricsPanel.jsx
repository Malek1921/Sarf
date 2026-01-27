export default function MetricsPanel() {
  const metrics = [
    { label: 'Today Views', value: '2,547' },
    { label: 'Today Visitors', value: '8,547' },
    { label: 'Today Sales', value: '$42,547' },
    { label: 'Today Profit', value: '$2,547' },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {metrics.map(({ label, value }) => (
        <div
          key={label}
          className="bg-white/20 backdrop-blur-md border border-white/30 rounded-xl shadow-lg p-4 hover:bg-white/30 transition"
        >
          <div className="text-sm text-gray-200">{label}</div>
          <div className="text-xl font-bold text-white drop-shadow">{value}</div>
          <div className="text-xs text-gray-300">Last 30 days</div>
        </div>
      ))}
    </div>
  );
}