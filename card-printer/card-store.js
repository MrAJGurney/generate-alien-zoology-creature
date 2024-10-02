import { loadIdsFromUrl, saveIdsToUrl } from '../utilities/url-data-store.js'
import { EVENT_TYPES } from './event-types.js';

export const CARD_DETAILS = {
    CREATURE_ACTIONS: {
        KEY: 'actionIds',
        SOURCE_TABLE_NAME: '7.2 Creatures: Action Cards table'
    }
}

export class CardStore {
    constructor ({
        triggerEvent
    }) {
        this.triggerEvent = triggerEvent;

        this.creatureActionCardIds = [];

        this.reloadUrl();
    }

    reloadUrl () {
        const {
            [CARD_DETAILS.CREATURE_ACTIONS.KEY]: creatureActionCardIds
        } = loadIdsFromUrl();

        this.creatureActionCardIds = creatureActionCardIds ?? [];
    }

    updateUrl () {
        saveIdsToUrl({
            [CARD_DETAILS.CREATURE_ACTIONS.KEY]: this.creatureActionCardIds
        });
    }

    addCardIds (cardKey, cardIds) {
        if (cardKey === CARD_DETAILS.CREATURE_ACTIONS.KEY) {
            this.creatureActionCardIds = this.creatureActionCardIds.concat(cardIds.map(id => parseInt(id)));
            this.creatureActionCardIds.sort((a, b) => a - b);
            this.updateUrl();
            this.triggerEvent({
                type: EVENT_TYPES.IDS_ADDED
            });
            return;
        }

        throw new Error(`Unexpected card key: "${cardKey}"`)
    }

    removeCardIds (cardKey, cardIds) {
        if (cardKey === CARD_DETAILS.CREATURE_ACTIONS.KEY) {
            cardIds.forEach(id => {
                // looping through it this way so if there are three copies of an id, just two could be deleted rather than all of them
                const index = this.creatureActionCardIds.findIndex(cardId => cardId === id);
                this.creatureActionCardIds.splice(index, 1);
            });

            this.updateUrl();
            this.triggerEvent({
                type: EVENT_TYPES.IDS_REMOVED
            });
            return;
        }

        throw new Error(`Unexpected card key: "${cardKey}"`)
    }

    getCardIds (cardKey) {
        if (cardKey === CARD_DETAILS.CREATURE_ACTIONS.KEY) {

            /*
            * Without the shallow copy using the spread operator, there would be problems when removing cards.
            * 
            * When "removing all", the code would delete items from the array it was looping through (despite
            * them appearing different from looking at the code), and only some ids would be deleted.
            */
            return [...this.creatureActionCardIds];
        }

        throw new Error(`Unexpected card key: "${cardKey}"`)

    }
}