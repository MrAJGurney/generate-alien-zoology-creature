import { CREATURE_ACTION_CARDS } from "../source-files/creature-action-cards.js";
import { loadIdsFromUrl, saveIdsToUrl } from '../utilities/url-data-store.js'

export class CardStore {
    constructor ({
        eventBus
    }) {
        this.cardDetails = {
            creatureActions: {
                key: 'actionids',
                sourceTableName: '7.2 Creatures: Action Cards table',
                data: CREATURE_ACTION_CARDS
            }
        }
        this.eventBus = eventBus;

        this.creatureActionCardIds = [];

        this.eventBus.subscribe({
            eventTypes: [this.eventBus.eventTypes.idsMutated],
            subscriber: this.reloadUrl.bind(this)
        });
    }

    reloadUrl () {
        const {
            [this.cardDetails.creatureActions.key]: creatureActionCardIds
        } = loadIdsFromUrl();

        this.creatureActionCardIds = creatureActionCardIds ?? [];
    }

    updateUrl () {
        saveIdsToUrl({
            [this.cardDetails.creatureActions.key]: this.creatureActionCardIds
        });
    }

    addCardIds (cardKey, cardIds) {
        if (cardKey === this.cardDetails.creatureActions.key) {
            this.creatureActionCardIds = this.creatureActionCardIds.concat(cardIds.map(id => parseInt(id)));
            this.creatureActionCardIds.sort((a, b) => a - b);
            this.updateUrl();
            this.eventBus.triggerEvent({
                type: this.eventBus.eventTypes.idsMutated
            });
            return;
        }

        throw new Error(`Unexpected card key: "${cardKey}"`)
    }

    removeCardIds (cardKey, cardIds) {
        if (cardKey === this.cardDetails.creatureActions.key) {
            cardIds.forEach(id => {
                // looping through it this way so if there are three copies of an id, just two could be deleted rather than all of them
                const index = this.creatureActionCardIds.findIndex(cardId => cardId === id);
                this.creatureActionCardIds.splice(index, 1);
            });

            this.updateUrl();
            this.eventBus.triggerEvent({
                type: this.eventBus.eventTypes.idsMutated
            });
            return;
        }

        throw new Error(`Unexpected card key: "${cardKey}"`)
    }

    getCardIds (cardKey) {
        if (cardKey === this.cardDetails.creatureActions.key) {

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