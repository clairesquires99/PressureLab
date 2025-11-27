import { useState } from "react";
import { deleteCase } from "../api/deleteCase";

export function useDeleteCase() {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const deleteCaseById = async (trialId: number) => {
    try {
      setLoading(true);
      setError(null);
      await deleteCase(trialId);
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
