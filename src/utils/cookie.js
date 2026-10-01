/**
 * Cookie and Authentication Storage Utilities
 */

/**
 * Get a cookie value by name.
 * Robustly parses document.cookie, trims whitespace, handles '=' in values,
 * and decodes URL-encoded values.
 * @param {string} name
 * @returns {string|null}
 */
export function getCookie(name) {
  if (typeof document === "undefined" || !document.cookie) {
    return null;
  }

  const cookies = document.cookie.split(";");
  for (let i = 0; i < cookies.length; i++) {
    const trimmed = cookies[i].trim();
    const separatorIndex = trimmed.indexOf("=");
    if (separatorIndex === -1) continue;

    const key = trimmed.slice(0, separatorIndex).trim();
    if (key === name) {
      const rawValue = trimmed.slice(separatorIndex + 1);
      try {
        return decodeURIComponent(rawValue);
      } catch {
        return rawValue;
      }
    }
  }

  return null;
}

/**
 * Set a cookie with standard attributes.
 * @param {string} name
 * @param {string} value
 * @param {number} [days=7]
 * @param {string} [path="/"]
 */
export function setCookie(name, value, days = 7, path = "/") {
  if (typeof document === "undefined") return;

  const maxAge = days * 24 * 60 * 60;
  const expiresDate = new Date(Date.now() + maxAge * 1000).toUTCString();
  const encodedValue = encodeURIComponent(value);

  document.cookie = `${name}=${encodedValue}; max-age=${maxAge}; expires=${expiresDate}; path=${path}; SameSite=Lax`;
}

/**
 * Remove a cookie.
 * @param {string} name
 * @param {string} [path="/"]
 */
export function removeCookie(name, path = "/") {
  if (typeof document === "undefined") return;
  document.cookie = `${name}=; Max-Age=0; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=${path}; SameSite=Lax`;
}

/**
 * Get authentication token with cookie and localStorage fallback.
 * @returns {string|null}
 */
export function getToken() {
  const tokenFromCookie = getCookie("token");
  if (tokenFromCookie) {
    return tokenFromCookie;
  }

  if (typeof localStorage !== "undefined") {
    try {
      const tokenFromStorage = localStorage.getItem("token");
      if (tokenFromStorage) {
        return tokenFromStorage;
      }
    } catch {
      // Ignore localStorage access errors
    }
  }

  return null;
}

/**
 * Get stored user object with cookie and localStorage fallback.
 * @returns {object|null}
 */
export function getStoredUser() {
  const userCookie = getCookie("user");
  if (userCookie) {
    try {
      return typeof userCookie === "string"
        ? JSON.parse(userCookie)
        : userCookie;
    } catch (e) {
      console.error("Failed to parse user cookie:", e);
    }
  }

  if (typeof localStorage !== "undefined") {
    try {
      const userStorage = localStorage.getItem("user");
      if (userStorage) {
        return JSON.parse(userStorage);
      }
    } catch (e) {
      console.error("Failed to parse user from localStorage:", e);
    }
  }

  return null;
}

/**
 * Store auth token and user in both cookies (7 days) and localStorage.
 * @param {string} token
 * @param {object} user
 */
export function setAuth(token, user) {
  if (token) {
    setCookie("token", token, 7);
    if (typeof localStorage !== "undefined") {
      try {
        localStorage.setItem("token", token);
      } catch {}
    }
  }

  if (user) {
    const userString = typeof user === "string" ? user : JSON.stringify(user);
    setCookie("user", userString, 7);
    if (typeof localStorage !== "undefined") {
      try {
        localStorage.setItem("user", userString);
      } catch {}
    }
  }
}

/**
 * Clear auth token and user from both cookies and localStorage.
 */
export function clearAuth() {
  removeCookie("token");
  removeCookie("user");

  if (typeof localStorage !== "undefined") {
    try {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
    } catch {}
  }
}
