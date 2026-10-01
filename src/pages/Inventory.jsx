import {
  useEffect,
  useMemo,
  useState,
} from 'react';

import {
  Search,
  Plus,
} from 'lucide-react';

import {
  useSearchParams,
} from 'react-router-dom';

import InventoryTable from '../components/InventoryTable';
import ItemForm from '../components/ItemForm';

import {
  getFoodStatus,
} from '../utils/dateUtils';

function Inventory({
  items,
  onAddItem,
  onEditItem,
  onRemoveItem,
}) {
  const [
    searchParams,
    setSearchParams,
  ] = useSearchParams();

  const [searchTerm, setSearchTerm] =
    useState('');

  const [category, setCategory] =
    useState('All');

  const [status, setStatus] =
    useState('All');

  const [sortBy, setSortBy] =
    useState('expiration');

  const [showForm, setShowForm] =
    useState(false);

  const [itemToEdit, setItemToEdit] =
    useState(null);

  /*
    If user came from Dashboard using:
    /inventory?add=true

    automatically open the Add Item form.
  */
  useEffect(() => {
    const shouldOpenAddForm =
      searchParams.get('add');

    if (shouldOpenAddForm === 'true') {
      setItemToEdit(null);
      setShowForm(true);

      /*
        Remove ?add=true after opening
        so refreshing does not reopen it.
      */
      setSearchParams(
        {},
        { replace: true }
      );
    }
  }, [
    searchParams,
    setSearchParams,
  ]);

  const categories = [
    'All',
    ...new Set(
      items.map(
        (item) => item.category
      )
    ),
  ];

  const statuses = [
    'All',
    'Good',
    'Expiring Soon',
    'Expired',
  ];

  const filteredItems = useMemo(() => {
    let filtered = [...items];

    if (searchTerm.trim() !== '') {
      const search =
        searchTerm
          .trim()
          .toLowerCase();

      filtered = filtered.filter(
        (item) =>
          item.name
            .toLowerCase()
            .includes(search) ||
          item.category
            .toLowerCase()
            .includes(search)
      );
    }

    if (category !== 'All') {
      filtered = filtered.filter(
        (item) =>
          item.category === category
      );
    }

    if (status !== 'All') {
      filtered = filtered.filter(
        (item) =>
          getFoodStatus(
            item.expirationDate
          ) === status
      );
    }

    if (sortBy === 'expiration') {
      filtered.sort(
        (a, b) =>
          new Date(a.expirationDate) -
          new Date(b.expirationDate)
      );
    }

    if (sortBy === 'name') {
      filtered.sort(
        (a, b) =>
          a.name.localeCompare(
            b.name
          )
      );
    }

    if (sortBy === 'quantity') {
      filtered.sort(
        (a, b) =>
          b.quantity -
          a.quantity
      );
    }

    return filtered;
  }, [
    items,
    searchTerm,
    category,
    status,
    sortBy,
  ]);

  function handleOpenAddForm() {
    setItemToEdit(null);
    setShowForm(true);
  }

  function handleEdit(item) {
    setItemToEdit(item);
    setShowForm(true);
  }

  function handleSave(formData) {
    if (itemToEdit) {
      onEditItem({
        ...formData,
        id: itemToEdit.id,
      });
    } else {
      onAddItem(formData);
    }

    setShowForm(false);
    setItemToEdit(null);
  }

  function handleCancel() {
    setShowForm(false);
    setItemToEdit(null);
  }

  function handleRemove(id) {
    const item =
      items.find(
        (item) => item.id === id
      );

    const confirmed =
      window.confirm(
        `Remove ${
          item?.name ||
          'this item'
        } from your inventory?`
      );

    if (confirmed) {
      onRemoveItem(id);
    }
  }

  return (
    <section className="page-section">

      <div className="panel">

        <div className="panel-header inventory-header">

          <div>

            <h1>
              Inventory
            </h1>

            <p className="panel-subtitle">
              Search, filter, and manage
              your stored food items.
            </p>

          </div>

          <button
            className="primary-button"
            type="button"
            onClick={handleOpenAddForm}
          >
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
              onChange={(event) =>
                setSearchTerm(
                  event.target.value
                )
              }
            />

          </div>

          <select
            value={category}
            onChange={(event) =>
              setCategory(
                event.target.value
              )
            }
          >

            {categories.map(
              (categoryItem) => (
                <option
                  key={categoryItem}
                  value={categoryItem}
                >
                  {categoryItem}
                </option>
              )
            )}

          </select>

          <select
            value={status}
            onChange={(event) =>
              setStatus(
                event.target.value
              )
            }
          >

            {statuses.map(
              (statusItem) => (
                <option
                  key={statusItem}
                  value={statusItem}
                >
                  {statusItem}
                </option>
              )
            )}

          </select>

          <select
            value={sortBy}
            onChange={(event) =>
              setSortBy(
                event.target.value
              )
            }
          >

            <option value="expiration">
              Sort by Expiration
            </option>

            <option value="name">
              Sort by Name
            </option>

            <option value="quantity">
              Sort by Quantity
            </option>

          </select>

        </div>

        <p className="inventory-count">
          Showing {filteredItems.length}
          {' '}of{' '}
          {items.length} items
        </p>

        <InventoryTable
          items={filteredItems}
          onEdit={handleEdit}
          onRemove={handleRemove}
        />

      </div>

      {showForm && (
        <ItemForm
          itemToEdit={itemToEdit}
          onSave={handleSave}
          onCancel={handleCancel}
        />
      )}

    </section>
  );
}

export default Inventory;