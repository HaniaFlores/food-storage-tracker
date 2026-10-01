import {
  useState,
} from 'react';

import {
  Link,
} from 'react-router-dom';

import {
  useAuth,
} from '../context/AuthContext';

function Login() {
  const {
    login,
  } = useAuth();

  const [email, setEmail] =
    useState('');

  const [
    password,
    setPassword,
  ] = useState('');

  const [error, setError] =
    useState('');

  const [
    submitting,
    setSubmitting,
  ] = useState(false);

  async function handleSubmit(
    event
  ) {
    event.preventDefault();

    setError('');
    setSubmitting(true);

    try {
      await login(
        email,
        password
      );
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
          Welcome Back
        </h1>

        <p>
          Sign in to access your
          food storage.
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
              Email
            </label>

            <input
              type="email"
              value={email}
              onChange={(event) =>
                setEmail(
                  event.target.value
                )
              }
              required
            />

          </div>

          <div className="form-group">

            <label>
              Password
            </label>

            <input
              type="password"
              value={password}
              onChange={(event) =>
                setPassword(
                  event.target.value
                )
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
              ? 'Signing In...'
              : 'Sign In'}
          </button>

        </form>

        <p className="auth-switch">

          Don't have an account?{' '}

          <Link to="/register">
            Create Account
          </Link>

        </p>

      </div>

    </main>
  );
}

export default Login;