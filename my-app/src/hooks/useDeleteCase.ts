import { useState } from "react";
import { deleteCase } from "../api/deleteCase";
import { useAuthContext } from "../contexts/AuthContext";

const AUTH_ENABLED = import.meta.env.VITE_AUTH_ENABLED === "true";

export function useDeleteCase() {
  const { getToken, userId } = useAuthContext();
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const deleteCaseById = async (trialId: number) => {
    try {
      setLoading(true);
      setError(null);

      // Build auth headers
      const headers: HeadersInit = {};
      if (AUTH_ENABLED) {
        const token = await getToken();
        if (token) {
          headers["Authorization"] = `Bearer ${token}`;
        }
      } else if (userId) {
        headers["X-User-Id"] = userId;
      }

      await deleteCase(trialId, headers);
      return true;
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
      return false;
    } finally {
      setLoading(false);
    }
  };

  return { deleteCaseById, loading, error };
}
