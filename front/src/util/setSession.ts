type STORAGE_KEY = "accessToken" | "refreshToken";

export default function setSession(key: STORAGE_KEY, value: string) {
    sessionStorage.setItem(key, value);
}
