import { Package, Clock3, TriangleAlert, Plus } from 'lucide-react';
import { inventoryItems } from '../data/mockData';
import SummaryCard from '../components/SummaryCard';

function formatDate(dateString) {
  return new Date(dateString).toLocaleDateString('en-US', {
    month: 'short',
    day: '2-digit',
    year: 'numeric',
  });
}

function Dashboard() {
  const totalItems = inventoryItems.length;
  const expiringSoon = inventoryItems.filter(item => item.status === 'Expiring Soon').length;
  const expired = inventoryItems.filter(item => item.status === 'Expired').length;
  const alerts = inventoryItems.filter(item => item.status !== 'Good');

  return (
    <section className="page-section">
      <div className="hero-card">
        <div className="hero-text">
          <p className="eyebrow">WELCOME BACK</p>
          <h1>Your Food Storage at a Glance</h1>
          <p className="hero-description">
            Know what you have, what expires soon, and what should be used first.
          </p>
        </div>

        <button className="primary-button" type="button">
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
          subtitle="Items requiring attention soon"
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
            <h2>Recent Alerts</h2>
            <p className="panel-subtitle">Items that need your attention.</p>
          </div>
        </div>

        <div className="alerts-list">
          {alerts.length === 0 ? (
            <p className="empty-message">No alerts right now.</p>
          ) : (
            alerts.map((item) => (
              <div className="alert-item" key={item.id}>
                <div>
                  <h4>{item.name}</h4>
                  <p>
                    {item.status === 'Expired'
                      ? 'This item has already expired.'
                      : 'This item will expire soon.'}
                  </p>
                </div>

                <span className="alert-date">{formatDate(item.expirationDate)}</span>
              </div>
            ))
          )}
        </div>
      </div>
    </section>
  );
}

export default Dashboard;