function formatDate(dateString) {
  return new Date(dateString).toLocaleDateString('en-US', {
    month: 'short',
    day: '2-digit',
    year: 'numeric',
  });
}

function getStatusClass(status) {
  if (status === 'Good') return 'status good';
  if (status === 'Expiring Soon') return 'status warning';
  return 'status danger';
}

function getCategoryClass(category) {
  return `category-icon ${category.toLowerCase().replace(/\s+/g, '-')}`;
}

function getCategoryInitial(category) {
  return category.charAt(0).toUpperCase();
}

function InventoryTable({ items }) {
  return (
    <div className="table-wrapper">
      <table className="inventory-table">
        <thead>
          <tr>
            <th>Item</th>
            <th>Qty</th>
            <th>Category</th>
            <th>Expiration Date</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {items.length === 0 ? (
            <tr>
              <td colSpan="6" className="empty-state">
                No items found.
              </td>
            </tr>
          ) : (
            items.map((item) => (
              <tr key={item.id}>
                <td>
                  <div className="item-cell">
                    <div className={getCategoryClass(item.category)}>
                      {getCategoryInitial(item.category)}
                    </div>

                    <span className="item-name">{item.name}</span>
                  </div>
                </td>

                <td>{item.quantity}</td>
                <td>
                  <span className="category-pill">{item.category}</span>
                </td>
                <td>{formatDate(item.expirationDate)}</td>
                <td>
                  <span className={getStatusClass(item.status)}>
                    {item.status}
                  </span>
                </td>
                <td>
                  <div className="table-actions">
                    <button className="table-btn" type="button">Edit</button>
                    <button className="table-btn danger-btn" type="button">Remove</button>
                  </div>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}

export default InventoryTable;