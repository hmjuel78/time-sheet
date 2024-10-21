class LocalStorageManager {
    static getItem(key) {
        const value = window.localStorage.getItem(key);
        try {
            return JSON.parse(value);
        } catch (e) {
            return value;
        }
    }

    static setItem(key, value) {
        if (typeof value === "object") {
            window.localStorage.setItem(key, JSON.stringify(value));
        } else {
            window.localStorage.setItem(key, value);
        }
    }

    static deleteItem(key) {
        window.localStorage.removeItem(key);
    }

    static deleteAllItems() {
        window.localStorage.clear();
    }
}

export default LocalStorageManager;
