"use client";

import { useEffect, useState } from "react";

// Browser-side client for the backend API. Requests go to this site's /api/auth/* and /api/admin/*,
// which next.config.ts forwards to rentomate-backend, so the session cookie stays first-party.

export class ApiError extends Error {}

export async function apiFetch<T = unknown>(
  path: string,
  { method = "GET", body, form }: { method?: string; body?: unknown; form?: FormData } = {},
): Promise<T> {
  const res = await fetch(`/api${path}`, {
    method,
    credentials: "same-origin",
    // Required by the backend on writes (CSRF protection).
    headers: { "x-rentomate-admin": "1", ...(body !== undefined ? { "Content-Type": "application/json" } : {}) },
    body: form ?? (body !== undefined ? JSON.stringify(body) : undefined),
  });
  const data = await res.json().catch(() => ({}));
  if (res.status === 401 && !path.startsWith("/auth/login")) {
    // Full reload so no admin data stays in memory after the session ends.
    window.location.replace("/admin/login");
    throw new ApiError("Your session has expired. Please log in again.");
  }
  if (!res.ok) throw new ApiError(data.error || `Request failed (${res.status}).`);
  return data as T;
}

/** Loads `path` on mount; `reload()` fetches it again (keeping the old data on screen meanwhile). */
export function useApi<T>(path: string) {
  const [state, setState] = useState<{ data?: T; error?: string; path?: string }>({});
  const [version, setVersion] = useState(0);

  useEffect(() => {
    let cancelled = false;
    apiFetch<T>(path)
      .then((data) => !cancelled && setState({ data, path }))
      .catch((error: Error) => !cancelled && setState({ error: error.message, path }));
    return () => {
      cancelled = true;
    };
  }, [path, version]);

  const current = state.path === path ? state : {};
  return { ...current, loading: !current.data && !current.error, reload: () => setVersion((v) => v + 1) };
}
