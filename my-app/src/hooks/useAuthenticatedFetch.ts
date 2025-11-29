import { useAuthContext } from "../contexts/AuthContext";

const AUTH_ENABLED = import.meta.env.VITE_AUTH_ENABLED === "true";

export function useAuthenticatedFetch() {
  const { getToken, userId } = useAuthContext();

  const authenticatedFetch = async (
    url: string,
    options: RequestInit = {}
  ): Promise<Response> => {
    const headers: HeadersInit = {
      "Content-Type": "application/json",
      ...(options.headers || {}),
    };

    // Add auth token if auth is enabled
    if (AUTH_ENABLED) {
      const token = await getToken();
      if (token) {
        headers["Authorization"] = `Bearer ${token}`;
      }
    } else {
      // If auth is disabled, include the reserved user ID as a custom header
      if (userId) {
        headers["X-User-Id"] = userId;
      }
    }

    return fetch(url, {
      ...options,
      headers,
    });
  };

  return { authenticatedFetch, userId };
}
