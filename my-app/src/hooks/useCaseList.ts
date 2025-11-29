import { useState, useEffect } from "react";
import { getAllCases } from "../api/getAllCases";
import { useAuthContext } from "../contexts/AuthContext";

interface Case {
  id: number;
  title: string;
  case_background: string;
}

const AUTH_ENABLED = import.meta.env.VITE_AUTH_ENABLED === "true";

export function useCaseList() {
  const { getToken, userId } = useAuthContext();
  const [cases, setCases] = useState<Case[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchCases = async () => {
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

      const data = await getAllCases(headers);
      setCases(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCases();
  }, []);

  return { cases, loading, error, refetch: fetchCases };
}
