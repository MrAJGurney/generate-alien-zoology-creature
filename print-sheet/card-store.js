import { loadIdsFromUrl } from '../utilities/url-data-store.js'

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