import {
  useEffect,
  useState,
} from 'react';

import {
  Navigate,
  Route,
  Routes,
} from 'react-router-dom';

import Navbar
  from './components/Navbar';

import Dashboard
  from './pages/Dashboard';

import Inventory
  from './pages/Inventory';

import Categories
  from './pages/Categories';

import Profile
  from './pages/Profile';

import Login
  from './pages/Login';

import Register
  from './pages/Register';

import {
  useAuth,
} from './context/AuthContext';

import {
  apiRequest,
} from './services/api';

function App() {
  const {
    user,
    loading,
  } = useAuth();

  const [
    items,
    setItems,
  ] = useState([]);

  const [
    inventoryLoading,
    setInventoryLoading,
  ] = useState(false);

  useEffect(() => {
    if (user) {
      loadInventory();
    } else {
      setItems([]);
    }
  }, [user]);

  async function loadInventory() {
    setInventoryLoading(true);

    try {
      const data =
        await apiRequest(
          '/api/inventory'
        );

      setItems(
        data.items
      );
    } catch (error) {
      console.error(
        error
      );
    } finally {
      setInventoryLoading(
        false
      );
    }
  }

  async function addItem(
    newItem
  ) {
    const data =
      await apiRequest(
        '/api/inventory',
        {
          method: 'POST',

          body:
            JSON.stringify(
              newItem
            ),
        }
      );

    setItems(
      (previous) => [
        ...previous,
        data.item,
      ]
    );
  }

  async function editItem(
    updatedItem
  ) {
    const data =
      await apiRequest(
        `/api/inventory/${updatedItem._id}`,
        {
          method: 'PUT',

          body:
            JSON.stringify({
              name:
                updatedItem.name,

              quantity:
                updatedItem.quantity,

              category:
                updatedItem.category,

              expirationDate:
                updatedItem.expirationDate,
            }),
        }
      );

    setItems(
      (previous) =>
        previous.map(
          (item) =>
            item._id ===
            data.item._id
              ? data.item
              : item
        )
    );
  }

  async function removeItem(
    id
  ) {
    await apiRequest(
      `/api/inventory/${id}`,
      {
        method:
          'DELETE',
      }
    );

    setItems(
      (previous) =>
        previous.filter(
          (item) =>
            item._id !== id
        )
    );
  }

  if (loading) {
    return (
      <div className="app-loading">
        Loading...
      </div>
    );
  }

  if (!user) {
    return (
      <Routes>

        <Route
          path="/register"
          element={
            <Register />
          }
        />

        <Route
          path="*"
          element={
            <Login />
          }
        />

      </Routes>
    );
  }

  return (
    <div className="app-shell">

      <Navbar />

      <main className="page-container">

        {inventoryLoading ? (

          <div className="app-loading">
            Loading your food storage...
          </div>

        ) : (

          <Routes>

            <Route
              path="/"
              element={
                <Dashboard
                  items={items}
                />
              }
            />

            <Route
              path="/inventory"
              element={
                <Inventory
                  items={items}
                  onAddItem={
                    addItem
                  }
                  onEditItem={
                    editItem
                  }
                  onRemoveItem={
                    removeItem
                  }
                />
              }
            />

            <Route
              path="/categories"
              element={
                <Categories
                  items={items}
                />
              }
            />

            <Route
              path="/profile"
              element={
                <Profile />
              }
            />

            <Route
              path="*"
              element={
                <Navigate
                  to="/"
                  replace
                />
              }
            />

          </Routes>

        )}

      </main>

    </div>
  );
}

export default App;