import { useEffect, useState } from 'react';
import {
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';

import Navbar from './components/Navbar';

import Dashboard from './pages/Dashboard';
import Inventory from './pages/Inventory';
import Profile from './pages/Profile';

import { inventoryItems } from './data/mockData';

function App() {
  const [items, setItems] = useState(() => {
    const savedItems = localStorage.getItem('foodItems');

    if (savedItems) {
      try {
        return JSON.parse(savedItems);
      } catch (error) {
        console.error(
          'Could not read saved inventory:',
          error
        );
      }
    }

    return inventoryItems;
  });

  useEffect(() => {
    localStorage.setItem(
      'foodItems',
      JSON.stringify(items)
    );
  }, [items]);

  function addItem(newItem) {
    const item = {
      id: Date.now(),
      name: newItem.name,
      quantity: newItem.quantity,
      category: newItem.category,
      expirationDate: newItem.expirationDate,
    };

    setItems((previousItems) => [
      ...previousItems,
      item,
    ]);
  }

  function editItem(updatedItem) {
    setItems((previousItems) =>
      previousItems.map((item) =>
        item.id === updatedItem.id
          ? {
              id: updatedItem.id,
              name: updatedItem.name,
              quantity: updatedItem.quantity,
              category: updatedItem.category,
              expirationDate:
                updatedItem.expirationDate,
            }
          : item
      )
    );
  }

  function removeItem(id) {
    setItems((previousItems) =>
      previousItems.filter(
        (item) => item.id !== id
      )
    );
  }

  return (
    <div className="app-shell">
      <Navbar />

      <main className="page-container">
        <Routes>

          <Route
            path="/"
            element={
              <Dashboard items={items} />
            }
          />

          <Route
            path="/inventory"
            element={
              <Inventory
                items={items}
                onAddItem={addItem}
                onEditItem={editItem}
                onRemoveItem={removeItem}
              />
            }
          />

          <Route
            path="/profile"
            element={<Profile />}
          />

          <Route
            path="*"
            element={
              <Navigate to="/" replace />
            }
          />

        </Routes>
      </main>
    </div>
  );
}

export default App;