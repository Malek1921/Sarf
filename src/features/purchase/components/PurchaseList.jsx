import React, { useState } from 'react';

const PurchaseList = ({ purchases, onEdit, onDelete, onView }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortConfig, setSortConfig] = useState({ key: 'purchaseDate', direction: 'desc' });

  // Filter purchases based on search term
  const filteredPurchases = purchases.filter(purchase => {
    const searchLower = searchTerm.toLowerCase();
    return (
      purchase.companyName.toLowerCase().includes(searchLower) ||
      purchase.employeeName.toLowerCase().includes(searchLower) ||
      purchase.id.toString().includes(searchLower)
    );
  });

  // Sort purchases
  const sortedPurchases = [...filteredPurchases].sort((a, b) => {
    if (a[sortConfig.key] < b[sortConfig.key]) {
      return sortConfig.direction === 'asc' ? -1 : 1;
    }
    if (a[sortConfig.key] > b[sortConfig.key]) {
      return sortConfig.direction === 'asc' ? 1 : -1;
    }
    return 0;
  });

  const handleSort = (key) => {
    setSortConfig(prev => ({
      key,
      direction: prev.key === key && prev.direction === 'asc' ? 'desc' : 'asc'
    }));
  };

  const getSortIcon = (key) => {
    if (sortConfig.key !== key) return '↕️';
    return sortConfig.direction === 'asc' ? '↑' : '↓';
  };

  // Calculate statistics
  const totalOrders = purchases.length;
  const totalValue = purchases.reduce((sum, purchase) => sum + purchase.total, 0);

  return (
    <div className="purchase-list">
      <div className="list-header">
        <h2>Purchase Orders ({totalOrders})</h2>
        <div className="controls">
          <div className="search-box">
            <input
              type="text"
              placeholder="Search by company, employee, or ID..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="search-input"
            />
            <span className="search-icon">🔍</span>
          </div>
          <div className="stats">
            <span className="stat-item">Total Value: ${totalValue.toFixed(2)}</span>
          </div>
        </div>
      </div>

      {sortedPurchases.length === 0 ? (
        <div className="empty-state">
          <p>No purchase orders found. Create your first purchase order!</p>
        </div>
      ) : (
        <div className="table-container">
          <table className="purchase-table">
            <thead>
              <tr>
                <th onClick={() => handleSort('id')}>
                  ID {getSortIcon('id')}
                </th>
                <th onClick={() => handleSort('purchaseDate')}>
                  Date {getSortIcon('purchaseDate')}
                </th>
                <th onClick={() => handleSort('companyName')}>
                  Company {getSortIcon('companyName')}
                </th>
                <th onClick={() => handleSort('employeeName')}>
                  Employee {getSortIcon('employeeName')}
                </th>
                <th onClick={() => handleSort('total')}>
                  Total {getSortIcon('total')}
                </th>
                <th>Items</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {sortedPurchases.map((purchase) => (
                <tr key={purchase.id} className="purchase-row">
                  <td className="purchase-id">#{purchase.id}</td>
                  <td className="purchase-date">
                    {new Date(purchase.purchaseDate).toLocaleDateString()}
                  </td>
                  <td className="purchase-company">{purchase.companyName}</td>
                  <td className="purchase-employee">{purchase.employeeName}</td>
                  <td className="purchase-total">${purchase.total.toFixed(2)}</td>
                  <td className="purchase-items">
                    <span className="items-count">{purchase.items.length} items</span>
                  </td>
                  <td className="purchase-actions">
                    <button
                      onClick={() => onView(purchase)}
                      className="action-btn view-btn"
                      title="View Details"
                    >
                      👁️
                    </button>
                    <button
                      onClick={() => onEdit(purchase)}
                      className="action-btn edit-btn"
                      title="Edit"
                    >
                      ✏️
                    </button>
                    <button
                      onClick={() => onDelete(purchase.id)}
                      className="action-btn delete-btn"
                      title="Delete"
                    >
                      🗑️
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Modal for viewing purchase details */}
      {sortedPurchases.length > 0 && (
        <div className="list-footer">
          <div className="pagination-info">
            Showing {sortedPurchases.length} of {purchases.length} orders
          </div>
        </div>
      )}
    </div>
  );
};

export default PurchaseList;
