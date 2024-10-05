import { readSearchParams, writeSearchParams } from './url-data-store.js'
import { assertIsNumber, assertIsString } from "./asserts.js";

const LOCK_SYMBOL = Symbol("prevents non DataStore classes from called SharedDataCache functions");

export class SharedDataCache {
    #dataKeys;
    #stringifiedDataDict;

    constructor ({
        dataKeys,
    }) {
        this.#dataKeys = dataKeys;
        this.#dataKeys.forEach(key => assertIsString(key));

        this.#stringifiedDataDict = {};
    }

    get (lockSymbol, key) {
        if (lockSymbol !== LOCK_SYMBOL) {
            throw new Error("Do not call SharedDataCache from non DataStore functions!");
        }

        assertIsString(key);

        if (!this.#dataKeys.includes(key)) {
            throw new Error(`Invalid key: Key must me one of ${this.#dataKeys}: ${key}`)
        }

        const data = this.#stringifiedDataDict[key] ?? '';

        return data;
    }

    set (lockSymbol, key, data) {
        if (lockSymbol !== LOCK_SYMBOL) {
            throw new Error("Do not call SharedDataCache from non DataStore functions!");
        }

        assertIsString(key);

        if (!this.#dataKeys.includes(key)) {
            throw new Error(`Invalid key: Key must me one of ${this.#dataKeys}: ${key}`)
        }
 
        assertIsString(data);

        this.#stringifiedDataDict[key] = data;
    }

    populateDataCacheFromSearchParams (lockSymbol) {
        if (lockSymbol !== LOCK_SYMBOL) {
            throw new Error("Do not call SharedDataCache from non DataStore functions!");
        }

        this.#stringifiedDataDict = readSearchParams();
    }

    persistDataCacheToSearchParams (lockSymbol) {
        if (lockSymbol !== LOCK_SYMBOL) {
            throw new Error("Do not call SharedDataCache from non DataStore functions!");
        }

        writeSearchParams(this.#stringifiedDataDict);
    }
}

class DataStore {
    sharedDataCache;
    eventBus;
    dataKey;
    eventTypeKey;

    constructor ({
        sharedDataCache,
        eventBus,
        dataKey,
        eventTypeKey 
    }) {
        this.sharedDataCache = sharedDataCache;
        this.eventBus = eventBus;
        this.dataKey = dataKey;
        this.eventTypeKey = eventTypeKey;

        this.eventBus.subscribe({
            eventTypes: [this.eventBus.eventTypes.initialisePage],
            subscriber: this.loadData.bind(this)
        });
    }

    loadData () {
        this.sharedDataCache.populateDataCacheFromSearchParams(LOCK_SYMBOL);
    }

    saveData () {
        this.sharedDataCache.persistDataCacheToSearchParams(LOCK_SYMBOL);

        this.eventBus.triggerEvent({
            type: this.eventTypeKey
        });
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
    static #parseIds (stringifiedIds) {
        if (!stringifiedIds) {
            return [];
        }

        const digits = stringifiedIds.split('');
        const tensDigits = digits.filter((_, index) => index % 2 === 0);

        return tensDigits
            .map((tensDigit, index) => `${tensDigit}${digits[(2*index) + 1]}`)
            .map(stringId => parseInt(stringId));
    }

    static #stringifyIds (parsedIds) {
        if (!parsedIds) {
            return '';
        }

        const idLength = 2;

        const stringIds = parsedIds.map(id => id.toString().padStart(idLength, '0'));

        return stringIds.join('');
    }

    get () {
        const stringifiedData = this.sharedDataCache.get(LOCK_SYMBOL, this.dataKey);
        const parsedData = IdsStore.#parseIds(stringifiedData);
        return [...parsedData];
    }

    add (ids) {
        ids.forEach(id => assertIsNumber(id));

        const combinedIds = this.get().concat(ids);

        const sortedCombinedIds = combinedIds.toSorted((a, b) => a - b);

        const stringifiedData = IdsStore.#stringifyIds(sortedCombinedIds);
        this.sharedDataCache.set(LOCK_SYMBOL, this.dataKey, stringifiedData);
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

        const stringifiedData = IdsStore.#stringifyIds(currentIds);
        this.sharedDataCache.set(LOCK_SYMBOL, this.dataKey, stringifiedData);
    }

    replace (ids) {
        ids.forEach(id => assertIsNumber(id));

        const sortedIds = ids.toSorted((a, b) => a - b);

        const stringifiedData = IdsStore.#stringifyIds(sortedIds);
        this.sharedDataCache.set(LOCK_SYMBOL, this.dataKey, stringifiedData);
    }
}

export class NumberStore extends DataStore {
    static #defaultLevel = 10;

    static #parseNumber (stringifiedNumber) {
        if (!stringifiedNumber) {
            return NumberStore.#defaultLevel;
        }

        return parseInt(stringifiedNumber);
    }

    static #stringifyNumber (parsedNumber) {
        if (!parsedNumber) {
            return '';
        }

        assertIsNumber(parsedNumber);

        return parsedNumber.toString();
    }

    get () {
        this.loadData();
        const stringifiedData = this.sharedDataCache.get(LOCK_SYMBOL, this.dataKey);
        const parsedData = NumberStore.#parseNumber(stringifiedData);
        return parsedData;
    }

    replace (level) {
        assertIsNumber(level);

        const stringifiedData = NumberStore.#stringifyNumber(level);
        this.sharedDataCache.set(LOCK_SYMBOL, this.dataKey, stringifiedData);
    }
}

export class TextStore extends DataStore {
    static #defaultName = '';

    static #decodeText (encodedText) {
        if (!encodedText) {
            return TextStore.#defaultName;
        }

        return decodeURIComponent(encodedText);
    }

    static #encodeText (decodedText) {
        if (!decodedText) {
            encodeURIComponent('');
        }

        assertIsString(decodedText);

        return encodeURIComponent(decodedText);
    }

    get () {
        this.loadData();
        const encodedText = this.sharedDataCache.get(LOCK_SYMBOL, this.dataKey);
        const decodedText = TextStore.#decodeText(encodedText);
        return decodedText;
    }

    replace (decodedText) {
        assertIsString(decodedText);

        const encodedText = TextStore.#encodeText(decodedText);
        this.sharedDataCache.set(LOCK_SYMBOL, this.dataKey, encodedText);
    }
}