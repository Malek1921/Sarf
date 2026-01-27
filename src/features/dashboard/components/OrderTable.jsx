export default function OrderTable() {
  const orders = [
    { invoice: '1247565', user: 'Jhon Smith', date: 'May 17, 2017', amount: '$349.49', status: 'Shipped', tracking: 'TXCH548022914' },
    { invoice: '1247566', user: 'Richard Newman', date: 'May 17, 2017', amount: '$179.99', status: 'Pending', tracking: 'TXCH548022195' },
    { invoice: '1247567', user: 'Chelsea Carter', date: 'May 17, 2017', amount: '$179.99', status: 'Delivered', tracking: 'TXCH548022059' },
  ];

  return (
    <div className="bg-slate-100 p-4 rounded shadow overflow-x-auto">
      <h2 className="text-lg font-bold mb-2 text-slate-700">Order Status</h2>
      <table className="min-w-full text-sm">
        <thead>
          <tr className="text-left border-b bg-slate-200 text-slate-800">
            <th className="p-2">Invoice</th>
            <th className="p-2">User</th>
            <th className="p-2">Order Date</th>
            <th className="p-2">Amount</th>
            <th className="p-2">Status</th>
            <th className="p-2">Tracking</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order, i) => (
            <tr key={order.invoice} className={i % 2 === 0 ? 'bg-white' : 'bg-slate-50'}>
              <td className="p-2">{order.invoice}</td>
              <td className="p-2">{order.user}</td>
              <td className="p-2">{order.date}</td>
              <td className="p-2">{order.amount}</td>
              <td className="p-2">{order.status}</td>
              <td className="p-2">{order.tracking}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}