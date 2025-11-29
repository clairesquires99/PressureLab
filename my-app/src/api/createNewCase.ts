import { API_URL } from "./constants";

interface CreateCaseRequest {
  title: string;
  case_background: string;
  initial_arguments: string[];
  files?: File[];
}

interface CreateCaseResponse {
  trial_id: number;
  status: string;
  files_uploaded: number;
  threads_generated: number;
}

export async function createNewCase(
  request: CreateCaseRequest,
  headers: HeadersInit = {}
): Promise<CreateCaseResponse> {
  const formData = new FormData();

  formData.append("title", request.title);
  formData.append("case_background", request.case_background);
  formData.append("initial_arguments", JSON.stringify(request.initial_arguments));

  if (request.files && request.files.length > 0) {
    request.files.forEach((file) => {
      formData.append("files", file);
    });
  }

  const response = await fetch(`${API_URL}/trials/`, {
    method: "POST",
    headers: headers,
    body: formData,
  });

  if (!response.ok) {
    throw new Error(`Failed to create case: ${response.statusText}`);
  }

  const data: CreateCaseResponse = await response.json();
  return data;
}
