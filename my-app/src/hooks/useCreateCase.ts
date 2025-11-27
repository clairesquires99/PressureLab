import { useState } from "react";
import { createNewCase } from "../api/createNewCase";

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

export function useCreateCase() {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<CreateCaseResult | null>(null);

  const createCase = async (params: CreateCaseParams) => {
    try {
      setLoading(true);
      setError(null);
      const data = await createNewCase(params);
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
