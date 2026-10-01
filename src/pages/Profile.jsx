import {
  useEffect,
  useState,
} from 'react';

import {
  useAuth,
} from '../context/AuthContext';

function Profile() {
  const {
    user,
    logout,
    updateProfile,
  } = useAuth();

  const [form, setForm] =
    useState({
      name: '',
      householdSize: 1,
      location: '',
      preferredAlertDays: 30,
    });

  const [editing, setEditing] =
    useState(false);

  useEffect(() => {
    if (user) {
      setForm({
        name:
          user.name ||
          '',

        householdSize:
          user.householdSize ||
          1,

        location:
          user.location ||
          '',

        preferredAlertDays:
          user.preferredAlertDays ||
          30,
      });
    }
  }, [user]);

  function handleChange(
    event
  ) {
    const {
      name,
      value,
    } = event.target;

    setForm(
      (previous) => ({
        ...previous,

        [name]:
          name ===
            'householdSize' ||
          name ===
            'preferredAlertDays'
            ? Number(value)
            : value,
      })
    );
  }

  async function handleSave(
    event
  ) {
    event.preventDefault();

    try {
      await updateProfile(
        form
      );

      setEditing(false);
    } catch (error) {
      alert(
        error.message
      );
    }
  }

  return (
    <section className="page-section">

      <div className="panel">

        <div className="profile-top">

          <div className="profile-main">

            <div className="avatar">
              {user.name
                .charAt(0)
                .toUpperCase()}
            </div>

            <div>

              <h1>
                {user.name}
              </h1>

              <p className="profile-email">
                {user.email}
              </p>

            </div>

          </div>

          {!editing && (
            <button
              className="secondary-button"
              onClick={() =>
                setEditing(true)
              }
            >
              Edit Profile
            </button>
          )}

        </div>

      </div>

      <div className="panel">

        <h2>
          Household Information
        </h2>

        <form
          onSubmit={
            handleSave
          }
          className="profile-form"
        >

          <div className="form-group">

            <label>
              Name
            </label>

            <input
              name="name"
              value={
                form.name
              }
              onChange={
                handleChange
              }
              disabled={
                !editing
              }
            />

          </div>

          <div className="form-group">

            <label>
              Email
            </label>

            <input
              value={
                user.email
              }
              disabled
            />

          </div>

          <div className="form-group">

            <label>
              Household Size
            </label>

            <input
              name="householdSize"
              type="number"
              min="1"
              value={
                form.householdSize
              }
              onChange={
                handleChange
              }
              disabled={
                !editing
              }
            />

          </div>

          <div className="form-group">

            <label>
              Location
            </label>

            <input
              name="location"
              value={
                form.location
              }
              onChange={
                handleChange
              }
              disabled={
                !editing
              }
            />

          </div>

          <div className="form-group">

            <label>
              Expiration Warning
            </label>

            <input
              name="preferredAlertDays"
              type="number"
              min="1"
              max="365"
              value={
                form.preferredAlertDays
              }
              onChange={
                handleChange
              }
              disabled={
                !editing
              }
            />

          </div>

          {editing && (

            <div className="profile-actions">

              <button
                type="button"
                className="secondary-button"
                onClick={() =>
                  setEditing(false)
                }
              >
                Cancel
              </button>

              <button
                className="primary-button"
              >
                Save Changes
              </button>

            </div>

          )}

        </form>

      </div>

      <div className="panel">

        <h2>
          Account
        </h2>

        <button
          className="sign-out-button"
          type="button"
          onClick={
            logout
          }
        >
          Sign Out
        </button>

      </div>

    </section>
  );
}

export default Profile;