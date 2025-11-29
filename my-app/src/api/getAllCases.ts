import { API_URL } from "./constants";

interface Case {
  id: number;
  title: string;
  case_background: string;
}

export async function getAllCases(headers: HeadersInit = {}): Promise<Case[]> {
  const response = await fetch(`${API_URL}/trials/`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      ...headers,
    },
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch cases: ${response.statusText}`);
  }

  const data: Case[] = await response.json();
  return data;
}
