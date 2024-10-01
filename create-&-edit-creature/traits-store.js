import { loadIdsFromUrl, saveIdsToUrl } from '../utilities/url-data-store.js'

export const TRAITS_DETAILS = {
    GENES: {
        KEY: 'geneIds',
        CHANGED_EVENT: 'gene-ids-changed'
    },
    ACTIONS: {
        KEY: 'actionIds',
        CHANGED_EVENT: 'action-ids-changed'
    }
}

export class TraitStore {
    constructor ({
        triggerEvent
    }) {
        this.triggerEvent = triggerEvent;

        this.geneIds = [];
        this.actionIds = [];

        this.reloadUrl()
    }

    reloadUrl () {
        const {
            [TRAITS_DETAILS.GENES.KEY]: geneIds,
            [TRAITS_DETAILS.ACTIONS.KEY]: actionIds,
            ...unhandledParams
        } = loadIdsFromUrl();

        if (Object.keys(unhandledParams).length > 0) {
            throw new Error(`Unexpected search params: "${Object.keys(unhandledParams)}"`)
        }

        this.geneIds = geneIds ?? [];
        this.actionIds = actionIds ?? [];
    }

    updateUrl () {
        saveIdsToUrl({
            [TRAITS_DETAILS.GENES.KEY]: this.geneIds,
            [TRAITS_DETAILS.ACTIONS.KEY]: this.actionIds
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
                this.actionIds = this.actionIds.concat(traitIds.map(id => parseInt(id)));
                this.actionIds.sort((a, b) => a - b);
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
            this.actionIds = [];
        }

        this.addTraitIds(traitsWithIds);
    }

    removeTraitIds (traitsWithIds) {
        traitsWithIds.forEach(([traitKey, traitIds]) => {
            if (traitKey === TRAITS_DETAILS.GENES.KEY) {
                traitIds.forEach(id => {
                    // looping through it this way so if there are three copies of an id, just two could be deleted rather than all of them
                    const index = this.geneIds.findIndex(geneId => geneId === id);
if (index < 0) {
                        return;
                    }
                    this.geneIds.splice(index, 1);
                });
                return;
            }
            if (traitKey === TRAITS_DETAILS.ACTIONS.KEY) {
                traitIds.forEach(id => {
                    // looping through it this way so if there are three copies of an id, just two could be deleted rather than all of them
                    const index = this.actionIds.findIndex(actionId => actionId === id);
if (index < 0) {
                        return;
                    }
                    this.actionIds.splice(index, 1);
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
            // passing by reference risks allowing editing, which should only be through the other class methods
            return [...this.geneIds];
        }

        if (traitKey === TRAITS_DETAILS.ACTIONS.KEY) {
            // passing by reference risks allowing editing, which should only be through the other class methods
            return [...this.actionIds];
        }

        throw new Error(`Unexpected trait key: "${traitKey}"`)

    }
}