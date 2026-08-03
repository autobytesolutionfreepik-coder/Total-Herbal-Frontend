import { ApiError } from "./errors";
import { ENDPOINTS } from "./endpoints";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api/v1";

let isRefreshing = false;
let refreshSubscribers: Array<(token?: string) => void> = [];

function subscribeTokenRefresh(cb: (token?: string) => void) {
  refreshSubscribers.push(cb);
}

function onRefreshed(token?: string) {
  refreshSubscribers.map((cb) => cb(token));
  refreshSubscribers = [];
}

export interface RequestOptions extends Omit<RequestInit, "body"> {
  body?: unknown;
  params?: Record<string, string | number | boolean | undefined | null>;
  skipAuthRefresh?: boolean;
}

export async function apiClient<T = unknown>(
  endpoint: string,
  options: RequestOptions = {}
): Promise<T> {
  const { body, params, headers: customHeaders, skipAuthRefresh = false, ...restOptions } = options;

  let url = endpoint.startsWith("http") ? endpoint : `${BASE_URL}${endpoint}`;

  if (params) {
    const searchParams = new URLSearchParams();
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined && value !== null && value !== "") {
        searchParams.append(key, String(value));
      }
    });
    const queryString = searchParams.toString();
    if (queryString) {
      url += (url.includes("?") ? "&" : "?") + queryString;
    }
  }

  const isFormData = typeof FormData !== "undefined" && body instanceof FormData;

  const headers: HeadersInit = {
    ...(isFormData ? {} : { "Content-Type": "application/json" }),
    ...customHeaders,
  };

  const requestConfig: RequestInit = {
    ...restOptions,
    headers,
    credentials: "include", // Non-negotiable requirement
    body: isFormData ? (body as FormData) : body ? JSON.stringify(body) : undefined,
  };

  let response: Response;
  try {
    response = await fetch(url, requestConfig);
  } catch (err: unknown) {
    throw new ApiError("Network error or server unavailable.", 503);
  }

  // Handle 401 Unauthorized with token refresh deduplication
  if (response.status === 401 && !skipAuthRefresh && endpoint !== ENDPOINTS.AUTH.REFRESH && endpoint !== ENDPOINTS.AUTH.LOGIN) {
    if (!isRefreshing) {
      isRefreshing = true;
      try {
        const refreshRes = await fetch(`${BASE_URL}${ENDPOINTS.AUTH.REFRESH}`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
        });

        if (refreshRes.ok) {
          const refreshData = await refreshRes.json();
          isRefreshing = false;
          onRefreshed(refreshData?.data?.accessToken);
        } else {
          isRefreshing = false;
          onRefreshed(undefined);
          if (typeof window !== "undefined" && !window.location.pathname.startsWith("/login")) {
            window.location.href = `/login?redirect=${encodeURIComponent(window.location.pathname)}`;
          }
          throw new ApiError("Session expired. Please log in again.", 401);
        }
      } catch (refreshErr) {
        isRefreshing = false;
        onRefreshed(undefined);
        throw new ApiError("Session expired. Please log in again.", 401);
      }
    }

    // Wait for in-flight refresh to finish
    return new Promise((resolve, reject) => {
      subscribeTokenRefresh((newToken) => {
        if (!newToken && response.status === 401) {
          reject(new ApiError("Session expired.", 401));
          return;
        }
        // Retry initial request
        apiClient<T>(endpoint, { ...options, skipAuthRefresh: true })
          .then(resolve)
          .catch(reject);
      });
    });
  }

  const json = await response.json().catch(() => ({}));

  if (!response.ok) {
    const errorMessage = json?.message || `Request failed with status ${response.status}`;
    throw new ApiError(errorMessage, response.status, json?.errors);
  }

  return json as T;
}
