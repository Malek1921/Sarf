import Sidebar from '../components/Sidebar';
import TopBar from '../components/Topbar';
import MetricsPanel from '../components/MetricsPanel';
import ChartsPanel from '../components/ChartsPanel.jsx';
import SalesLocationPanel from '../components/SalesLocationPanel';
import ServerStatusPanel from '../components/ServerStatusPanel';
import OrdersPanel from '../components/OrdersPanel';
import OrderTable from '../components/OrderTable.jsx';
import WeatherPanel from '../components/WeatherPanel';

export default function DashboardLayout() {
  return (
    <div className="flex h-screen bg-gradient-to-br from-blue-900 via-purple-900 to-gray-900 text-white">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <TopBar />
        <main className="p-4 space-y-4 overflow-y-auto">
          <MetricsPanel />
          <ChartsPanel />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <SalesLocationPanel />
            <ServerStatusPanel />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <OrdersPanel />
            <WeatherPanel />
          </div>
          <OrderTable />
        </main>
      </div>
    </div>
  );
}