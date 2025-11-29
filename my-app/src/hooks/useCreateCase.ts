import { useState } from "react";
import { createNewCase } from "../api/createNewCase";
import { useAuthContext } from "../contexts/AuthContext";

interface CreateCaseParams {
  title: string;
  case_background: string;
  initial_arguments: string[];
  files?: File[];
}

interface CreateCaseResult {
  trial_id: number;
  status: string;
  files_uploaded: number;
  threads_generated: number;
}

const AUTH_ENABLED = import.meta.env.VITE_AUTH_ENABLED === "true";

export function useCreateCase() {
  const { getToken, userId } = useAuthContext();
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<CreateCaseResult | null>(null);

  const createCase = async (params: CreateCaseParams) => {
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

      const data = await createNewCase(params, headers);
      setResult(data);
      return data;
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "An error occurred";
      setError(errorMessage);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { createCase, loading, error, result };
}
