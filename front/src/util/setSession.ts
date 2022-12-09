type STORAGE_KEY = "accessToken" | "refreshToken";

export function setSession(key: STORAGE_KEY, value: string) {
    sessionStorage.setItem(key, value);
}

export function removeSession(key: STORAGE_KEY) {
    sessionStorage.removeItem(key);
}
