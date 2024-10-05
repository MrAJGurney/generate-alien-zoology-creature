import { readSearchParams, writeSearchParams } from './url-data-store.js'
import { assertIsNumber, assertIsString } from "./asserts.js";

const LOCK_SYMBOL = Symbol("prevents non DataStore classes from called SharedDataCache functions");

export class SharedDataCache {
    constructor ({
        dataKeys,
    }) {
        this.dataKeys = dataKeys;
        this.dataKeys.forEach(key => assertIsString(key));

        this.stringifiedDataDict = {};
    }

    get (lockSymbol, key) {
        if (lockSymbol !== LOCK_SYMBOL) {
            throw new Error("Do not call SharedDataCache from non DataStore functions!");
        }

        assertIsString(key);

        if (!this.dataKeys.includes(key)) {
            throw new Error(`Invalid key: Key must me one of ${this.dataKeys}: ${key}`)
        }

        const data = this.stringifiedDataDict[key] ?? '';

        return data;
    }

    set (lockSymbol, key, data) {
        if (lockSymbol !== LOCK_SYMBOL) {
            throw new Error("Do not call SharedDataCache from non DataStore functions!");
        }

        assertIsString(key);

        if (!this.dataKeys.includes(key)) {
            throw new Error(`Invalid key: Key must me one of ${this.dataKeys}: ${key}`)
        }
        
        assertIsString(data);

        this.stringifiedDataDict[key] = data;      
    }

    populateDataCacheFromSearchParams (lockSymbol) {
        if (lockSymbol !== LOCK_SYMBOL) {
            throw new Error("Do not call SharedDataCache from non DataStore functions!");
        }

        this.stringifiedDataDict = readSearchParams();
    }

    persistDataCacheToSearchParams (lockSymbol) {
        if (lockSymbol !== LOCK_SYMBOL) {
            throw new Error("Do not call SharedDataCache from non DataStore functions!");
        }

        writeSearchParams(this.stringifiedDataDict);
    }
}

class DataStore {
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
            eventTypes: [this.eventTypeKey],
            subscriber: this.loadData.bind(this)
        });

    }

    static _parseSearchParam () {
		throw new Error(`"parseSearchParam" does not have an implementation`);
    }

    static _stringifySearchParam () {
		throw new Error(`"stringifySearchParam" does not have an implementation`);
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
    static #parseSearchParam (stringifiedData) {
        if (!stringifiedData) {
            return [];
        }

        const digits = stringifiedData.split('');
        const tensDigits = digits.filter((_, index) => index % 2 === 0);

        return tensDigits
            .map((tensDigit, index) => `${tensDigit}${digits[(2*index) + 1]}`)
            .map(stringId => parseInt(stringId));
    }

    static #stringifySearchParam (parsedData) {
        if (!parsedData) {
            return '';
        }

        const idLength = 2;

        const stringIds = parsedData.map(id => id.toString().padStart(idLength, '0'));

        return stringIds.join('');
    }

    get () {
        const stringifiedData = this.sharedDataCache.get(LOCK_SYMBOL, this.dataKey);
        const parsedData = IdsStore.#parseSearchParam(stringifiedData);
        return [...parsedData];
    }

    add (ids) {
        ids.forEach(id => assertIsNumber(id));

        const combinedIds = this.get().concat(ids);
        const stringifiedData = IdsStore.#stringifySearchParam(combinedIds);
        this.sharedDataCache.set(LOCK_SYMBOL, this.dataKey, stringifiedData);
    }

    remove (ids) {
        const x = [...ids];

        ids.forEach(id => assertIsNumber(id));

        const currentIds = this.get();

        const y = [...currentIds];

        ids.forEach(id => {
            // looping through it this way so if there are three copies of an id, just two could be deleted rather than all of them
            const index = currentIds.findIndex(cardId => cardId === id);
            currentIds.splice(index, 1);
        });

        const stringifiedData = IdsStore.#stringifySearchParam(currentIds);
        this.sharedDataCache.set(LOCK_SYMBOL, this.dataKey, stringifiedData);
    }

    replace (ids) {
        ids.forEach(id => assertIsNumber(id));

        const stringifiedData = IdsStore.#stringifySearchParam(ids);
        this.sharedDataCache.set(LOCK_SYMBOL, this.dataKey, stringifiedData);
    }
}
