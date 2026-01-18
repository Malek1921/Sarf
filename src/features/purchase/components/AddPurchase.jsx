import React, { useState, useEffect } from "react";
import "../index.css";

const PurchaseOrder = () => {
  // State for company data
  const [companies, setCompanies] = useState([
    { id: 1, name: "Company A" },
    { id: 2, name: "Company B" },
    { id: 3, name: "Company C" },
  ]);

  // State for employee data
  const [employees, setEmployees] = useState([
    { id: 1, name: "John Doe", companyId: 1 },
    { id: 2, name: "Jane Smith", companyId: 1 },
    { id: 3, name: "Bob Johnson", companyId: 2 },
    { id: 4, name: "Alice Brown", companyId: 3 },
  ]);

  // State for saved purchase orders
  const [purchaseOrders, setPurchaseOrders] = useState([]);

  // State for form data
  const [formData, setFormData] = useState({
    companyId: "",
    employeeId: "",
    purchaseDate: new Date().toISOString().split("T")[0],
    products: [{ id: 1, product: "", quantity: 1, unitPrice: 0, subtotal: 0 }],
  });

  // Edit mode state
  const [isEditMode, setIsEditMode] = useState(false);
  const [editingId, setEditingId] = useState(null);

  // State for filtered employees based on selected company
  const [filteredEmployees, setFilteredEmployees] = useState([]);

  // Load purchase orders from localStorage on component mount
  useEffect(() => {
    const savedOrders = localStorage.getItem("purchaseOrders");
    if (savedOrders) {
      setPurchaseOrders(JSON.parse(savedOrders));
    }
  }, []);

  // Save purchase orders to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem("purchaseOrders", JSON.stringify(purchaseOrders));
  }, [purchaseOrders]);

  // Filter employees when company changes
  useEffect(() => {
    if (formData.companyId) {
      const filtered = employees.filter(
        (emp) => emp.companyId === parseInt(formData.companyId),
      );
      setFilteredEmployees(filtered);
      // Reset employee if current selection is not in filtered list
      if (!filtered.some((emp) => emp.id === parseInt(formData.employeeId))) {
        setFormData((prev) => ({ ...prev, employeeId: "" }));
      }
    } else {
      setFilteredEmployees([]);
      setFormData((prev) => ({ ...prev, employeeId: "" }));
    }
  }, [formData.companyId, employees]);

  // Handle input changes in header section
  const handleHeaderChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Handle adding new product row
  const addProductRow = () => {
    const newId =
      formData.products.length > 0
        ? Math.max(...formData.products.map((p) => p.id)) + 1
        : 1;

    setFormData((prev) => ({
      ...prev,
      products: [
        ...prev.products,
        { id: newId, product: "", quantity: 1, unitPrice: 0, subtotal: 0 },
      ],
    }));
  };

  // Handle product row changes
  const handleProductChange = (id, field, value) => {
    setFormData((prev) => {
      const updatedProducts = prev.products.map((product) => {
        if (product.id === id) {
          const updatedProduct = { ...product, [field]: value };

          // Calculate subtotal if quantity or unitPrice changes
          if (field === "quantity" || field === "unitPrice") {
            const quantity =
              field === "quantity"
                ? parseFloat(value) || 0
                : parseFloat(product.quantity) || 0;
            const unitPrice =
              field === "unitPrice"
                ? parseFloat(value) || 0
                : parseFloat(product.unitPrice) || 0;
            updatedProduct.subtotal = quantity * unitPrice;
          }

          return updatedProduct;
        }
        return product;
      });

      return { ...prev, products: updatedProducts };
    });
  };

  // Delete a product row
  const deleteProductRow = (id) => {
    if (formData.products.length > 1) {
      setFormData((prev) => ({
        ...prev,
        products: prev.products.filter((product) => product.id !== id),
      }));
    }
  };

  // Calculate total
  const calculateTotal = () => {
    return formData.products.reduce(
      (sum, product) => sum + (parseFloat(product.subtotal) || 0),
      0,
    );
  };

  // Reset form to default state
  const resetForm = () => {
    setFormData({
      companyId: "",
      employeeId: "",
      purchaseDate: new Date().toISOString().split("T")[0],
      products: [
        { id: 1, product: "", quantity: 1, unitPrice: 0, subtotal: 0 },
      ],
    });
    setIsEditMode(false);
    setEditingId(null);
  };

  // Handle form submission (Save/Update)
  const handleSubmit = (e) => {
    e.preventDefault();

    // Prepare purchase data
    const purchaseData = {
      id: isEditMode ? editingId : Date.now(), // Use timestamp as ID for new orders
      companyId: formData.companyId,
      companyName:
        companies.find((c) => c.id === parseInt(formData.companyId))?.name ||
        "",
      employeeId: formData.employeeId,
      employeeName:
        employees.find((e) => e.id === parseInt(formData.employeeId))?.name ||
        "",
      purchaseDate: formData.purchaseDate,
      total: calculateTotal(),
      items: formData.products.map((product) => ({
        product: product.product,
        quantity: product.quantity,
        unitPrice: product.unitPrice,
        subtotal: product.subtotal,
      })),
      createdAt: isEditMode
        ? purchaseOrders.find((p) => p.id === editingId)?.createdAt
        : new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    if (isEditMode) {
      // Update existing purchase order
      setPurchaseOrders((prev) =>
        prev.map((order) => (order.id === editingId ? purchaseData : order)),
      );
      alert("Purchase order updated successfully!");
    } else {
      // Add new purchase order
      setPurchaseOrders((prev) => [...prev, purchaseData]);
      alert("Purchase order saved successfully!");
    }

    // Log to console
    console.log("Purchase Data:", purchaseData);
    console.log("Purchase Items:", purchaseData.items);

    // Reset form
    resetForm();
  };

  // Load purchase order for editing
  const loadPurchaseForEditing = (purchaseId) => {
    const purchase = purchaseOrders.find((p) => p.id === purchaseId);
    if (purchase) {
      setFormData({
        companyId: purchase.companyId.toString(),
        employeeId: purchase.employeeId.toString(),
        purchaseDate: purchase.purchaseDate,
        products: purchase.items.map((item, index) => ({
          id: index + 1,
          ...item,
        })),
      });
      setIsEditMode(true);
      setEditingId(purchaseId);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  // Delete a purchase order
  const deletePurchaseOrder = (purchaseId) => {
    if (
      window.confirm("Are you sure you want to delete this purchase order?")
    ) {
      setPurchaseOrders((prev) =>
        prev.filter((order) => order.id !== purchaseId),
      );
      if (isEditMode && editingId === purchaseId) {
        resetForm();
      }
    }
  };

  // View purchase order details
  const viewPurchaseDetails = (purchaseId) => {
    const purchase = purchaseOrders.find((p) => p.id === purchaseId);
    if (purchase) {
      const details = `
        Purchase Order Details:
        -----------------------
        Company: ${purchase.companyName}
        Employee: ${purchase.employeeName}
        Date: ${new Date(purchase.purchaseDate).toLocaleDateString()}
        Total: $${purchase.total.toFixed(2)}
        
        Items:
        ${purchase.items
          .map(
            (item, index) =>
              `${index + 1}. ${item.product} - Qty: ${item.quantity} - Price: $${item.unitPrice} - Subtotal: $${item.subtotal}`,
          )
          .join("\n")}
      `;
      alert(details);
    }
  };

  // Cancel edit mode
  const cancelEdit = () => {
    resetForm();
  };

  return (
    <div className="purchase-order">
      <h1>Purchase Order Form</h1>

      {/* Edit Mode Indicator */}
      {isEditMode && (
        <div className="edit-mode-indicator">
          <span>✏️ Editing Purchase Order #{editingId}</span>
          <button
            type="button"
            className="cancel-edit-btn"
            onClick={cancelEdit}
          >
            Cancel Edit
          </button>
        </div>
      )}

      <form onSubmit={handleSubmit}>
        {/* Header Section */}
        <div className="header-section">
          <h2>Purchase Details</h2>
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="companyId">Company:</label>
              <select
                id="companyId"
                name="companyId"
                value={formData.companyId}
                onChange={handleHeaderChange}
                required
              >
                <option value="">Select a company</option>
                {companies.map((company) => (
                  <option key={company.id} value={company.id}>
                    {company.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="employeeId">Employee:</label>
              <select
                id="employeeId"
                name="employeeId"
                value={formData.employeeId}
                onChange={handleHeaderChange}
                required
                disabled={!formData.companyId}
              >
                <option value="">Select an employee</option>
                {filteredEmployees.map((employee) => (
                  <option key={employee.id} value={employee.id}>
                    {employee.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="purchaseDate">Purchase Date:</label>
              <input
                type="date"
                id="purchaseDate"
                name="purchaseDate"
                value={formData.purchaseDate}
                onChange={handleHeaderChange}
                required
              />
            </div>
          </div>
        </div>

        {/* Body Section */}
        <div className="body-section">
          <h2>Products</h2>
          <div className="table-container">
            <table className="products-table">
              <thead>
                <tr>
                  <th>Product</th>
                  <th>Quantity</th>
                  <th>Unit Price ($)</th>
                  <th>Subtotal ($)</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {formData.products.map((product, index) => (
                  <tr key={product.id}>
                    <td>
                      <input
                        type="text"
                        value={product.product}
                        onChange={(e) =>
                          handleProductChange(
                            product.id,
                            "product",
                            e.target.value,
                          )
                        }
                        placeholder="Enter product name"
                        required
                      />
                    </td>
                    <td>
                      <input
                        type="number"
                        min="1"
                        step="1"
                        value={product.quantity}
                        onChange={(e) =>
                          handleProductChange(
                            product.id,
                            "quantity",
                            e.target.value,
                          )
                        }
                        required
                      />
                    </td>
                    <td>
                      <input
                        type="number"
                        min="0"
                        step="0.01"
                        value={product.unitPrice}
                        onChange={(e) =>
                          handleProductChange(
                            product.id,
                            "unitPrice",
                            e.target.value,
                          )
                        }
                        required
                      />
                    </td>
                    <td className="subtotal-cell">
                      ${product.subtotal.toFixed(2)}
                    </td>
                    <td>
                      {formData.products.length > 1 && (
                        <button
                          type="button"
                          className="delete-btn"
                          onClick={() => deleteProductRow(product.id)}
                          aria-label={`Delete product row ${index + 1}`}
                        >
                          Delete
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <button
            type="button"
            className="add-product-btn"
            onClick={addProductRow}
          >
            + Add Product
          </button>
        </div>

        {/* Footer Section */}
        <div className="footer-section">
          <div className="total-section">
            <div className="total-label">Total:</div>
            <div className="total-amount">${calculateTotal().toFixed(2)}</div>
          </div>
          <div className="form-actions">
            <button type="button" className="reset-btn" onClick={resetForm}>
              Reset Form
            </button>
            <button type="submit" className="submit-btn">
              {isEditMode ? "Update Purchase Order" : "Save Purchase Order"}
            </button>
          </div>
        </div>
      </form>

      {/* Purchase Orders List Section */}
      {purchaseOrders.length > 0 && (
        <div className="purchase-orders-list">
          <h2>Saved Purchase Orders</h2>
          <div className="table-container">
            <table className="orders-table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Date</th>
                  <th>Company</th>
                  <th>Employee</th>
                  <th>Total</th>
                  <th>Items</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {purchaseOrders.map((order) => (
                  <tr
                    key={order.id}
                    className={editingId === order.id ? "editing-row" : ""}
                  >
                    <td>#{order.id}</td>
                    <td>{new Date(order.purchaseDate).toLocaleDateString()}</td>
                    <td>{order.companyName}</td>
                    <td>{order.employeeName}</td>
                    <td>${order.total.toFixed(2)}</td>
                    <td>{order.items.length} items</td>
                    <td className="actions-cell">
                      <button
                        type="button"
                        className="view-btn"
                        onClick={() => viewPurchaseDetails(order.id)}
                      >
                        View
                      </button>
                      <button
                        type="button"
                        className="edit-btn"
                        onClick={() => loadPurchaseForEditing(order.id)}
                      >
                        Edit
                      </button>
                      <button
                        type="button"
                        className="delete-order-btn"
                        onClick={() => deletePurchaseOrder(order.id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="stats">
            <p>Total Orders: {purchaseOrders.length}</p>
            <p>
              Total Value: $
              {purchaseOrders
                .reduce((sum, order) => sum + order.total, 0)
                .toFixed(2)}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default PurchaseOrder;
