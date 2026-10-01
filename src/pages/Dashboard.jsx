import {
  Package,
  Clock3,
  TriangleAlert,
  Plus,
} from 'lucide-react';

import { useNavigate } from 'react-router-dom';

import SummaryCard from '../components/SummaryCard';

import {
  getFoodStatus,
  formatFoodDate,
} from '../utils/dateUtils';

function Dashboard({ items }) {
  const navigate = useNavigate();

  const totalItems = items.length;

  const expiringSoon = items.filter(
    (item) =>
      getFoodStatus(item.expirationDate) ===
      'Expiring Soon'
  ).length;

  const expired = items.filter(
    (item) =>
      getFoodStatus(item.expirationDate) ===
      'Expired'
  ).length;

  const alerts = items
    .filter((item) => {
      const status =
        getFoodStatus(item.expirationDate);

      return status !== 'Good';
    })
    .sort(
      (a, b) =>
        new Date(a.expirationDate) -
        new Date(b.expirationDate)
    );

  function handleAddFoodItem() {
    navigate('/inventory?add=true');
  }

  return (
    <section className="page-section">

      <div className="hero-card">

        <div className="hero-text">

          <p className="eyebrow">
            WELCOME BACK
          </p>

          <h1>
            Your Food Storage at a Glance
          </h1>

          <p className="hero-description">
            Know what you have, what expires soon,
            and what should be used first.
          </p>

        </div>

        <button
          className="primary-button"
          type="button"
          onClick={handleAddFoodItem}
        >
          <Plus size={18} />

          Add Food Item
        </button>

      </div>

      <div className="summary-grid">

        <SummaryCard
          title="TOTAL ITEMS"
          count={totalItems}
          subtitle="Items in your inventory"
          icon={<Package size={22} />}
          variant="success"
        />

        <SummaryCard
          title="EXPIRING SOON"
          count={expiringSoon}
          subtitle="Items expiring within 30 days"
          icon={<Clock3 size={22} />}
          variant="warning"
        />

        <SummaryCard
          title="EXPIRED"
          count={expired}
          subtitle="Items past expiration date"
          icon={<TriangleAlert size={22} />}
          variant="danger"
        />

      </div>

      <div className="panel">

        <div className="panel-header">

          <div>

            <h2>
              Recent Alerts
            </h2>

            <p className="panel-subtitle">
              Items that need your attention.
            </p>

          </div>

        </div>

        <div className="alerts-list">

          {alerts.length === 0 ? (

            <div className="empty-dashboard">

              <Package size={28} />

              <p>
                No alerts right now.
              </p>

            </div>

          ) : (

            alerts.map((item) => {

              const status =
                getFoodStatus(
                  item.expirationDate
                );

              return (
                <div
                  className={`alert-item ${
                    status === 'Expired'
                      ? 'alert-expired'
                      : 'alert-expiring'
                  }`}
                  key={item.id}
                >

                  <div>

                    <h4>
                      {item.name}
                    </h4>

                    <p>
                      {status === 'Expired'
                        ? 'This item has expired.'
                        : 'This item will expire within 30 days.'}
                    </p>

                  </div>

                  <span className="alert-date">
                    {formatFoodDate(
                      item.expirationDate
                    )}
                  </span>

                </div>
              );
            })

          )}

        </div>

      </div>

    </section>
  );
}

export default Dashboard;