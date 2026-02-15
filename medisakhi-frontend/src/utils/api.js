const API_BASE = import.meta.env.VITE_API_URL + "/api";

export const apiRequest = async (url, method = "GET", body = null) => {
  const token = localStorage.getItem("token");

  const res = await fetch(`${API_BASE}${url}`, {
    method,
    headers: {
      "Content-Type": "application/json",
      Authorization: token ? `Bearer ${token}` : "",
    },
    body: body ? JSON.stringify(body) : null,
  });

  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.message || "Something went wrong");
  }

  return res.json();
};