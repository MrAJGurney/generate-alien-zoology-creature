import { loadIdsFromUrl, saveIdsToUrl } from '../utilities/url-data-store.js'

export const TRAITS_DETAILS = {
    GENES: {
        KEY: 'geneIds',
        CHANGED_EVENT: 'gene-ids-changed'
    },
    ACTIONS: {
        KEY: 'actionCardIds',
        CHANGED_EVENT: 'action-ids-changed'
    }
}

export class TraitStore {
    constructor ({
        triggerEvent
    }) {
        this.triggerEvent = triggerEvent;

        this.geneIds = [];
        this.actionCardIds = [];

        this.reloadUrl()
    }

    reloadUrl () {
        const {
            [TRAITS_DETAILS.GENES.KEY]: geneIds,
            [TRAITS_DETAILS.ACTIONS.KEY]: actionCardIds,
            ...unhandledParams
        } = loadIdsFromUrl();

        if (Object.keys(unhandledParams).length > 0) {
            throw new Error(`Unexpected search params: "${Object.keys(unhandledParams)}"`)
        }

        this.geneIds = geneIds ?? [];
        this.actionCardIds = actionCardIds ?? [];
    }

    updateUrl () {
        saveIdsToUrl({
            [TRAITS_DETAILS.GENES.KEY]: this.geneIds,
            [TRAITS_DETAILS.ACTIONS.KEY]: this.actionCardIds
        });
    }

    addTraitIds (traitsWithIds) {
        traitsWithIds.forEach(([traitKey, traitIds]) => {
            if (traitKey === TRAITS_DETAILS.GENES.KEY) {
                this.geneIds = this.geneIds.concat(traitIds.map(id => parseInt(id)));
                this.geneIds.sort((a, b) => a - b);
                return;
            }
    
            if (traitKey === TRAITS_DETAILS.ACTIONS.KEY) {
                this.actionCardIds = this.actionCardIds.concat(traitIds.map(id => parseInt(id)));
                this.actionCardIds.sort((a, b) => a - b);
                return;
            }
    
            throw new Error(`Unexpected trait key: "${traitKey}"`);
        });

        const traitKeys = traitsWithIds.map(([key, _]) => key);

        this.updateUrl();

        if (traitKeys.includes(TRAITS_DETAILS.GENES.KEY)) {
            this.triggerEvent({
                type: TRAITS_DETAILS.GENES.CHANGED_EVENT
            });
        }

        if (traitKeys.includes(TRAITS_DETAILS.ACTIONS.KEY)) {
            this.triggerEvent({
                type: TRAITS_DETAILS.ACTIONS.CHANGED_EVENT
            });
        }
    }

    replaceTraitIds (traitsWithIds)  {
        const traitKeys = traitsWithIds.map(([key, _]) => key);

        if (traitKeys.includes(TRAITS_DETAILS.GENES.KEY)) {
            this.geneIds = [];
        }

        if (traitKeys.includes(TRAITS_DETAILS.ACTIONS.KEY)) {
            this.actionCardIds = [];
        }

        this.addTraitIds(traitsWithIds);
    }

    removeTraitIds (traitsWithIds) {
        traitsWithIds.forEach(([traitKey, traitIds]) => {
            if (traitKey === TRAITS_DETAILS.GENES.KEY) {
                traitIds.forEach(id => {
                    // looping through it this way so if there are three copies of an id, just two could be deleted rather than all of them
                    const index = this.geneIds.findIndex(cardId => cardId === id);
                    this.geneIds.splice(index, 1);
                });
                return;
            }
            if (traitKey === TRAITS_DETAILS.ACTIONS.KEY) {
                traitIds.forEach(id => {
                    // looping through it this way so if there are three copies of an id, just two could be deleted rather than all of them
                    const index = this.actionCardIds.findIndex(cardId => cardId === id);
                    this.actionCardIds.splice(index, 1);
                });
                return;
            }

            throw new Error(`Unexpected trait key: "${traitKey}"`);
        });

        const traitKeys = traitsWithIds.map(([key, _]) => key);

        this.updateUrl();

        if (traitKeys.includes(TRAITS_DETAILS.GENES.KEY)) {
            this.triggerEvent({
                type: TRAITS_DETAILS.GENES.CHANGED_EVENT
            });
        }

        if (traitKeys.includes(TRAITS_DETAILS.ACTIONS.KEY)) {
            this.triggerEvent({
                type: TRAITS_DETAILS.ACTIONS.CHANGED_EVENT
            });
        }
    }

    getTraitIds (traitKey) {
        if (traitKey === TRAITS_DETAILS.GENES.KEY) {

            /*
            * Without the shallow copy using the spread operator, there would be problems when removing cards.
            * 
            * When "removing all", the code would delete items from the array it was looping through (despite
            * them appearing different from looking at the code), and only some ids would be deleted.
            */
            return [...this.geneIds];
        }

        if (traitKey === TRAITS_DETAILS.ACTIONS.KEY) {

            /*
            * Without the shallow copy using the spread operator, there would be problems when removing cards.
            * 
            * When "removing all", the code would delete items from the array it was looping through (despite
            * them appearing different from looking at the code), and only some ids would be deleted.
            */
            return [...this.actionCardIds];
        }

        throw new Error(`Unexpected trait key: "${traitKey}"`)

    }
}