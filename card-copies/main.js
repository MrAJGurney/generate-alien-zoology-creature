import { CREATURE_ACTION_CARDS } from "../source-files/creature-action-cards.js";
import { EventBus } from "../utilities/event-bus.js";
import { SharedDataCache, IdsStore } from "../utilities/data-store.js";
import { AddRemoveCards } from "./card-table.js";
import { CardPrintSheet } from "./card-print-sheet.js";

const main = () => {
    const eventBus = new EventBus({
        eventTypes: {
            initialiseData: 'initialiseData',
            initialiseDisplay: 'initialiseDisplay',
            actionCardIdsMutated: 'actionCardIdsMutated',
        }
    });

    const sharedDataCache = new SharedDataCache({
        dataKeys: {
            actionCardIds: 'aIds'
        }
    });

    const actionCardIdsStore = new IdsStore({
        sharedDataCache,
        defaultValue: [],
        dataKey: sharedDataCache.dataKeys.actionCardIds,
        onSave: () => eventBus.triggerEvent({type: eventBus.eventTypes.actionCardIdsMutated})
    });

    new AddRemoveCards({
        eventBus,
        dataStores: {
            actionCardIdsStore
        },
        cardData: {
            actionCards: CREATURE_ACTION_CARDS
        },
        cardDeckLabels: {
            actionDeckLabel: '7.2 Creatures: Action Cards table'
        }
    });

    new CardPrintSheet({
        eventBus,
        dataStores: {
            actionCardIdsStore
        },
        cardData: {
            actionCards: CREATURE_ACTION_CARDS
        }
    });

    eventBus.subscribe({
        eventTypes: [eventBus.eventTypes.initialiseData],
        subscriber: () => {
            actionCardIdsStore.loadData();
        }
    });

    eventBus.triggerEvent({
        type: eventBus.eventTypes.initialiseData
    });

    eventBus.triggerEvent({
        type: eventBus.eventTypes.initialiseDisplay
    });

    window.addEventListener('popstate', () => {
        eventBus.triggerEvent({
            type: eventBus.eventTypes.initialiseData
        });

        eventBus.triggerEvent({
            type: eventBus.eventTypes.initialiseDisplay
        });
    });
}

window.addEventListener('load', main);