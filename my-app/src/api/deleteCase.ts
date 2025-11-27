import { API_URL } from "./constants";

interface DeleteCaseResponse {
  status: string;
}

export async function deleteCase(trialId: number): Promise<DeleteCaseResponse> {
  const response = await fetch(`${API_URL}/trials/${trialId}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    throw new Error(`Failed to delete case: ${response.statusText}`);
  }

  const data: DeleteCaseResponse = await response.json();
  return data;
}
