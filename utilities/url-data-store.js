const MAX_ID_LENGTH = 2;

const joinIds = (ids) => {
    const stringIds = ids.map(id => id.toString().padStart(MAX_ID_LENGTH, '0'));
    return stringIds.join('');
}

const splitIds = (stringIds) => {
    const digits = stringIds.split('');
    const tensDigits = digits.filter((_, index) => index % 2 === 0);

    return tensDigits
        .map((tensDigit, index) => `${tensDigit}${digits[(2*index) + 1]}`)
        .map(stringId => parseInt(stringId));
}

export const loadIdsFromUrl = () => {
    const searchParams = new URLSearchParams(window.location.search);

    const dataReducer = (data, [paramName, idsString]) => ({
        ...data,
        [paramName]: splitIds(idsString)
    });

    const data = Array.from(searchParams.entries()).reduce(dataReducer, {});

    return data;
}

export const saveIdsToUrl = (newParams) => {
    const currentUrl = new URL(window.location);
    const currentParams = currentUrl.searchParams;

    Object.entries(newParams).forEach(([paramName, ids]) => currentParams.set(paramName, joinIds(ids)));

    window.history.pushState(null, '', currentUrl);
}