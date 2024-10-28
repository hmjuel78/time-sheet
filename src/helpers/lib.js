import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import LocalStorageManager from "./localStorageManager";
import { LOCAL_STORAGE_TOKEN_KEY } from "./constants";

export const sleep = (time) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve("success");
        }, time);
    });
};

export const cn = (...inputs) => {
    return twMerge(clsx(inputs));
};

export const subString = (str, length = 10) => {
    if (str.length > length) {
        return str.substring(0, length) + "...";
    } else {
        return str;
    }
};

export const clearTokenDataFromLocal = () => {
    LocalStorageManager.deleteAllItems();
    document.cookie.split(";").forEach((c) => {
        document.cookie = c
            .replace(/^ +/, "")
            .replace(/=.*/, `=;expires=${new Date().toUTCString()};path=/`);
    });
};

export const setTokenDataToLocal = (token) => {
    LocalStorageManager.setItem(LOCAL_STORAGE_TOKEN_KEY, token);
    // document.cookie.split(";").forEach((c) => {
    //     document.cookie = c
    //         .replace(/^ +/, "")
    //         .replace(/=.*/, `=;expires=${new Date().toUTCString()};path=/`);
    // });
};
