const API_URL =
  import.meta.env.VITE_API_URL ||
  'http://localhost:5000';

export async function apiRequest(
  path,
  options = {}
) {
  const response =
    await fetch(
      `${API_URL}${path}`,
      {
        credentials: 'include',

        ...options,

        headers: {
          'Content-Type':
            'application/json',

          ...options.headers,
        },
      }
    );

  const data =
    await response.json();

  if (!response.ok) {
    const error =
      new Error(
        data.message ||
        'Request failed.'
      );

    error.status =
      response.status;

    throw error;
  }

  return data;
}