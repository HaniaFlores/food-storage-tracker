import { useMemo, useState } from 'react';
import { Search, Plus } from 'lucide-react';
import { inventoryItems } from '../data/mockData';
import InventoryTable from '../components/InventoryTable';

function Inventory() {
  const [searchTerm, setSearchTerm] = useState('');
  const [category, setCategory] = useState('All');
  const [status, setStatus] = useState('All');
  const [sortBy, setSortBy] = useState('expiration');

  const categories = ['All', ...new Set(inventoryItems.map(item => item.category))];
  const statuses = ['All', 'Good', 'Expiring Soon', 'Expired'];

  const filteredItems = useMemo(() => {
    let items = [...inventoryItems];

    if (searchTerm.trim() !== '') {
      items = items.filter(item =>
        item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.category.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (category !== 'All') {
      items = items.filter(item => item.category === category);
    }

    if (status !== 'All') {
      items = items.filter(item => item.status === status);
    }

    if (sortBy === 'expiration') {
      items.sort((a, b) => new Date(a.expirationDate) - new Date(b.expirationDate));
    } else if (sortBy === 'name') {
      items.sort((a, b) => a.name.localeCompare(b.name));
    }

    return items;
  }, [searchTerm, category, status, sortBy]);

  return (
    <section className="page-section">
      <div className="panel">
        <div className="panel-header inventory-header">
          <div>
            <h1>Inventory</h1>
            <p className="panel-subtitle">Search, filter, and manage your stored food items.</p>
          </div>

          <button className="primary-button" type="button">
            <Plus size={18} />
            Add Food Item
          </button>
        </div>

        <div className="inventory-controls">
          <div className="search-box">
            <Search size={18} />
            <input
              type="text"
              placeholder="Search items or categories..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <select value={category} onChange={(e) => setCategory(e.target.value)}>
            {categories.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>

          <select value={status} onChange={(e) => setStatus(e.target.value)}>
            {statuses.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>

          <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
            <option value="expiration">Sort by Expiration</option>
            <option value="name">Sort by Name</option>
          </select>
        </div>

        <InventoryTable items={filteredItems} />
      </div>
    </section>
  );
}

export default Inventory;