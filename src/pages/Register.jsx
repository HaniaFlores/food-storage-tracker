import {
  useState,
} from 'react';

import {
  Link,
} from 'react-router-dom';

import {
  useAuth,
} from '../context/AuthContext';

function Register() {
  const {
    register,
  } = useAuth();

  const [form, setForm] =
    useState({
      name: '',
      email: '',
      password: '',
    });

  const [error, setError] =
    useState('');

  const [
    submitting,
    setSubmitting,
  ] = useState(false);

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
        [name]: value,
      })
    );
  }

  async function handleSubmit(
    event
  ) {
    event.preventDefault();

    setSubmitting(true);
    setError('');

    try {
      await register(form);
    } catch (error) {
      setError(
        error.message
      );
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <main className="auth-page">

      <div className="auth-card">

        <h1>
          Create Account
        </h1>

        <p>
          Create your Food Storage
          Tracker account.
        </p>

        {error && (
          <div className="auth-error">
            {error}
          </div>
        )}

        <form
          onSubmit={
            handleSubmit
          }
        >

          <div className="form-group">

            <label>
              Name
            </label>

            <input
              name="name"
              value={form.name}
              onChange={
                handleChange
              }
              required
            />

          </div>

          <div className="form-group">

            <label>
              Email
            </label>

            <input
              name="email"
              type="email"
              value={form.email}
              onChange={
                handleChange
              }
              required
            />

          </div>

          <div className="form-group">

            <label>
              Password
            </label>

            <input
              name="password"
              type="password"
              minLength="8"
              value={
                form.password
              }
              onChange={
                handleChange
              }
              required
            />

          </div>

          <button
            className="primary-button auth-submit"
            disabled={
              submitting
            }
          >
            {submitting
              ? 'Creating...'
              : 'Create Account'}
          </button>

        </form>

        <p className="auth-switch">

          Already have an account?{' '}

          <Link to="/login">
            Sign In
          </Link>

        </p>

      </div>

    </main>
  );
}

export default Register;