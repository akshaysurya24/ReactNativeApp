// Update this to your machine's IP when testing on a physical device
// e.g. http://192.168.1.10:4000
export const API_BASE_URL = "http://192.168.29.253:4000";

export async function api(path, options = {}) {
  const res = await fetch(`${API_BASE_URL}${path}`, {
    headers: { "Content-Type": "application/json", ...(options.headers || {}) },
    ...options,
  });
  const text = await res.text();
  const data = text ? JSON.parse(text) : null;
  if (!res.ok) {
    const msg = data?.error || `Request failed: ${res.status}`;
    throw new Error(msg);
  }
  return data;
}
