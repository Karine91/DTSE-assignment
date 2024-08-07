import { API_URL } from "@/config/constants";

interface IOptions extends RequestInit {
  fullPath?: boolean;
  getParams?: Record<string, string>;
}

export async function client(
  endpoint: string,
  { fullPath = false, getParams, ...config }: IOptions = {}
) {
  let path = fullPath ? endpoint : `${API_URL}/${endpoint}`;
  if (getParams) {
    path += "?" + new URLSearchParams(getParams).toString();
  }

  return fetch(path, config).then(async (response) => {
    const data = await response.json();
    if (response.ok) {
      return data;
    } else {
      return Promise.reject(data);
    }
  });
}
