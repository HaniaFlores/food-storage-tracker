import {
  Wheat,
  Milk,
  Bean,
  Beef,
  Soup,
  Apple,
  Package,
  Boxes,
} from 'lucide-react';

import {
  useNavigate,
} from 'react-router-dom';

const categoryDefinitions = [
  {
    name: 'Grains',
    Icon: Wheat,
    className: 'grains',
  },

  {
    name: 'Cereals',
    Icon: Soup,
    className: 'cereals',
  },

  {
    name: 'Dairy',
    Icon: Milk,
    className: 'dairy',
  },

  {
    name: 'Protein',
    Icon: Bean,
    className: 'protein',
  },

  {
    name: 'Meat',
    Icon: Beef,
    className: 'meat',
  },

  {
    name: 'Canned Goods',
    Icon: Package,
    className:
      'canned-goods',
  },

  {
    name:
      'Fruits & Vegetables',
    Icon: Apple,
    className: 'produce',
  },

  {
    name: 'Other',
    Icon: Boxes,
    className: 'other',
  },
];

function Categories({
  items,
}) {
  const navigate =
    useNavigate();

  function openCategory(
    category
  ) {
    navigate(
      `/inventory?category=${encodeURIComponent(
        category
      )}`
    );
  }

  return (
    <section className="page-section">

      <div className="categories-header">

        <div>

          <h1>
            Categories
          </h1>

          <p>
            Browse your food items
            by category.
          </p>

        </div>

      </div>

      <div className="categories-grid">

        {categoryDefinitions.map(
          ({
            name,
            Icon,
            className,
          }) => {
            const categoryItems =
              items.filter(
                (item) =>
                  item.category ===
                  name
              );

            const totalUnits =
              categoryItems.reduce(
                (
                  sum,
                  item
                ) =>
                  sum +
                  Number(
                    item.quantity
                  ),
                0
              );

            return (
              <button
                type="button"
                className="category-card"
                key={name}
                onClick={() =>
                  openCategory(
                    name
                  )
                }
              >

                <div
                  className={`category-large-icon ${className}`}
                >

                  <Icon
                    size={30}
                    strokeWidth={1.8}
                  />

                </div>

                <div className="category-card-content">

                  <h2>
                    {name}
                  </h2>

                  <p>
                    {
                      categoryItems.length
                    }{' '}
                    {categoryItems.length ===
                    1
                      ? 'item'
                      : 'items'}
                  </p>

                  <span>
                    {totalUnits}{' '}
                    total units
                  </span>

                </div>

                <span className="category-arrow">
                  →
                </span>

              </button>
            );
          }
        )}

      </div>

    </section>
  );
}

export default Categories;