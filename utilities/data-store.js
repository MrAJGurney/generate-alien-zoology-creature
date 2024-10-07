import { readSearchParams, writeSearchParams } from './url-data-store.js'
import { assertIsNumber, assertIsString } from "./asserts.js";

const LOCK_SYMBOL = Symbol("prevents non DataStore classes from called SharedDataCache functions");

export class SharedDataCache {
    dataKeys;

    #encodedCacheDict;

    constructor ({
        dataKeys,
    }) {
        this.dataKeys = dataKeys;
        Object.values(this.dataKeys).forEach(key => assertIsString(key));

        this.#encodedCacheDict = {};
    }

    get (lockSymbol, key) {
        if (lockSymbol !== LOCK_SYMBOL) {
            throw new Error("Do not call SharedDataCache from non DataStore functions!");
        }

        assertIsString(key);

        if (!Object.values(this.dataKeys).includes(key)) {
            throw new Error(`Invalid key: Key must me one of ${Object.values(this.dataKeys)}: ${key}`)
        }

        const data = this.#encodedCacheDict[key] ?? '';

        return data;
    }

    set (lockSymbol, key, data) {
        if (lockSymbol !== LOCK_SYMBOL) {
            throw new Error("Do not call SharedDataCache from non DataStore functions!");
        }

        assertIsString(key);

        if (!Object.values(this.dataKeys).includes(key)) {
            throw new Error(`Invalid key: Key must me one of ${Object.values(this.dataKeys)}: ${key}`)
        }

        assertIsString(data);

        this.#encodedCacheDict[key] = data;
    }

    populateDataCacheFromSearchParams (lockSymbol) {
        if (lockSymbol !== LOCK_SYMBOL) {
            throw new Error("Do not call SharedDataCache from non DataStore functions!");
        }

        this.#encodedCacheDict = readSearchParams();
    }

    persistDataCacheToSearchParams (lockSymbol) {
        if (lockSymbol !== LOCK_SYMBOL) {
            throw new Error("Do not call SharedDataCache from non DataStore functions!");
        }

        writeSearchParams(this.#encodedCacheDict);
    }
}

class DataStore {
    sharedDataCache;
    dataKey;

    defaultValue
    #onSave;

    constructor ({
        sharedDataCache,
        dataKey,

        defaultValue,
        onSave
    }) {
        this.sharedDataCache = sharedDataCache;
        this.dataKey = dataKey;

        this.defaultValue = defaultValue;
        this.#onSave = onSave;
    }

    loadData () {
        this.sharedDataCache.populateDataCacheFromSearchParams(LOCK_SYMBOL);
    }

    saveData () {
        this.sharedDataCache.persistDataCacheToSearchParams(LOCK_SYMBOL);
        this.#onSave();
    }

    get () {
		throw new Error(`"get" does not have an implementation`);
    }

    add () {
		throw new Error(`"add" does not have an implementation`);
    }

    remove () {
		throw new Error(`"remove" does not have an implementation`);
    }

    replace () {
		throw new Error(`"replace" does not have an implementation`);
    }
}

export class IdsStore extends DataStore {
    #decodeIds (encodedIds) {
        if (!encodedIds) {
            return this.defaultValue;
        }

        const digits = encodedIds.split('');
        const tensDigits = digits.filter((_, index) => index % 2 === 0);

        return tensDigits
            .map((tensDigit, index) => `${tensDigit}${digits[(2*index) + 1]}`)
            .map(stringId => parseInt(stringId));
    }

    #encodeIds (decodedIds) {
        if (!decodedIds) {
            return '';
        }

        const idLength = 2;

        const stringIds = decodedIds.map(id => id.toString().padStart(idLength, '0'));

        return stringIds.join('');
    }

    get () {
        const encodedData = this.sharedDataCache.get(LOCK_SYMBOL, this.dataKey);
        const decodedData = this.#decodeIds(encodedData);

        return [...decodedData];
    }

    add (ids) {
        ids.forEach(id => assertIsNumber(id));

        const combinedIds = this.get().concat(ids);

        const sortedCombinedIds = combinedIds.toSorted((a, b) => a - b);

        const encodedIds = this.#encodeIds(sortedCombinedIds);
        this.sharedDataCache.set(LOCK_SYMBOL, this.dataKey, encodedIds);
    }

    remove (ids) {
        ids.forEach(id => assertIsNumber(id));

        const currentIds = this.get();

        ids.forEach(idToRemove => {
            // looping through it this way so if there are three copies of an id, just two could be deleted rather than all of them
            const idIndexToRemove = currentIds.findIndex(currentId => currentId === idToRemove);
            if (idIndexToRemove >= 0) {
                currentIds.splice(idIndexToRemove, 1);
            }
        });

        const encodedIds = this.#encodeIds(currentIds);
        this.sharedDataCache.set(LOCK_SYMBOL, this.dataKey, encodedIds);
    }

    replace (ids) {
        ids.forEach(id => assertIsNumber(id));

        const sortedIds = ids.toSorted((a, b) => a - b);

        const encodedIds = this.#encodeIds(sortedIds);
        this.sharedDataCache.set(LOCK_SYMBOL, this.dataKey, encodedIds);
    }
}

export class NumberStore extends DataStore {
    #decodeNumber (encodedNumber) {
        if (!encodedNumber) {
            return this.defaultValue;
        }

        return parseInt(encodedNumber);
    }

    #encodeNumber (decodedNumber) {
        if (decodedNumber !== 0 && !decodedNumber) {
            return this.defaultValue;
        }

        assertIsNumber(decodedNumber);

        return decodedNumber.toString();
    }

    get () {
        const encodedNumber = this.sharedDataCache.get(LOCK_SYMBOL, this.dataKey);
        const decodedNumber = this.#decodeNumber(encodedNumber);
        return decodedNumber;
    }

    replace (number) {
        assertIsNumber(number);

        const encodeNumber = this.#encodeNumber(number);
        this.sharedDataCache.set(LOCK_SYMBOL, this.dataKey, encodeNumber);
    }
}

export class TextStore extends DataStore {
    #decodeText (encodedText) {
        if (!encodedText) {
            return this.defaultValue;
        }

        return decodeURIComponent(encodedText);
    }

    #encodeText (decodedText) {
        if (!decodedText) {
            encodeURIComponent('');
        }

        assertIsString(decodedText);

        return encodeURIComponent(decodedText);
    }

    get () {
        const encodedText = this.sharedDataCache.get(LOCK_SYMBOL, this.dataKey);
        const decodedText = this.#decodeText(encodedText);
        return decodedText;
    }

    replace (text) {
        assertIsString(text);

        const encodedText = this.#encodeText(text);
        this.sharedDataCache.set(LOCK_SYMBOL, this.dataKey, encodedText);
    }
}