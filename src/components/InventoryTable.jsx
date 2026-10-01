import {
  Wheat,
  Milk,
  Bean,
  Beef,
  Soup,
  Apple,
  Package,
} from 'lucide-react';

import {
  getFoodStatus,
  formatFoodDate,
} from '../utils/dateUtils';

function formatDate(dateString) {
  return new Date(
    `${dateString}T00:00:00`
  ).toLocaleDateString(
    'en-US',
    {
      month: 'short',
      day: '2-digit',
      year: 'numeric',
    }
  );
}

function getStatusClass(status) {
  if (status === 'Good') {
    return 'status good';
  }

  if (status === 'Expiring Soon') {
    return 'status warning';
  }

  return 'status danger';
}

function CategoryIcon({
  category,
}) {
  const iconProps = {
    size: 20,
    strokeWidth: 1.8,
  };

  switch (category) {

    case 'Grains':
      return (
        <div className="category-icon grains">
          <Wheat {...iconProps} />
        </div>
      );

    case 'Cereals':
      return (
        <div className="category-icon cereals">
          <Soup {...iconProps} />
        </div>
      );

    case 'Dairy':
      return (
        <div className="category-icon dairy">
          <Milk {...iconProps} />
        </div>
      );

    case 'Protein':
      return (
        <div className="category-icon protein">
          <Bean {...iconProps} />
        </div>
      );

    case 'Meat':
      return (
        <div className="category-icon meat">
          <Beef {...iconProps} />
        </div>
      );

    case 'Canned Goods':
      return (
        <div className="category-icon canned-goods">
          <Package {...iconProps} />
        </div>
      );

    case 'Fruits & Vegetables':
      return (
        <div className="category-icon produce">
          <Apple {...iconProps} />
        </div>
      );

    default:
      return (
        <div className="category-icon other">
          <Package {...iconProps} />
        </div>
      );
  }
}

function InventoryTable({
  items,
  onEdit,
  onRemove,
}) {
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

              <td
                colSpan="6"
                className="empty-state"
              >
                No items found.
              </td>

            </tr>

          ) : (

            items.map((item) => {

              const calculatedStatus =
                getFoodStatus(
                  item.expirationDate
                );

              return (
                <tr key={item._id}>

                  <td>

                    <div className="item-cell">

                      <CategoryIcon
                        category={
                          item.category
                        }
                      />

                      <span className="item-name">
                        {item.name}
                      </span>

                    </div>

                  </td>

                  <td>
                    {item.quantity}
                  </td>

                  <td>

                    <span className="category-pill">
                      {item.category}
                    </span>

                  </td>

                  <td>
                    {formatFoodDate(
                      item.expirationDate
                    )}
                  </td>

                  <td>

                    <span
                      className={
                        getStatusClass(
                          calculatedStatus
                        )
                      }
                    >
                      {calculatedStatus}
                    </span>

                  </td>

                  <td>

                    <div className="table-actions">

                      <button
                        className="table-btn"
                        type="button"
                        onClick={() =>
                          onEdit(item)
                        }
                      >
                        Edit
                      </button>

                      <button
                        className="table-btn danger-btn"
                        type="button"
                        onClick={() =>
                          onRemove(
                            item._id
                          )
                        }
                      >
                        Remove
                      </button>

                    </div>

                  </td>

                </tr>
              );
            })

          )}

        </tbody>

      </table>

    </div>
  );
}

export default InventoryTable;