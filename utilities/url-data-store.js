import { assertIsString } from "./asserts.js";

export const readSearchParams = () => {
    const searchParams = new URLSearchParams(window.location.search);

    const searchParamDict = Array
        .from(searchParams.entries())
        .reduce((searchParamDict, [key, stringifiedValue]) => ({...searchParamDict, [key]: stringifiedValue}), {});

    return searchParamDict;
}

export const writeSearchParams = (searchParamDict) => {
    const url = new URL(window.location);

    Object.entries(searchParamDict).forEach(([key, value]) => url.searchParams.set(key, value));

    window.history.pushState(null, '', url);
}