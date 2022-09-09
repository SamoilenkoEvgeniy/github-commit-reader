export const getStorageValue = (key: string, defaultValue: string): string => {
    if (typeof window === "undefined") {
        throw new Error('localStorage is not working');
    }

    const saved = localStorage.getItem(key);
    return saved !== null ? saved : defaultValue;
}

export const setStorageValue = (key: string, value: string) => {
    if (typeof window === "undefined") {
        throw new Error('localStorage is not working');
    }

    return localStorage.setItem(key, value);
}
