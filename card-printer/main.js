import { CREATURE_ACTION_CARDS } from "../source-files/creature-action-cards.js";
import { EventBus } from "../utilities/event-bus.js";
import { SharedDataCache, IdsStore } from "../utilities/data-store.js";
import { AddRemoveCards as AddRemoveCards } from "./card-table.js";
import { CardPrintSheet } from "./card-print-sheet.js";

const ACTION_KEYS = {
    DATA_STORE: 'actionIds',
    EVENT_TYPE: 'actionIds'
}

const main = () => {
    const eventBus = new EventBus({
        eventTypes: {
            actionIdsMutated: ACTION_KEYS.EVENT_TYPE
        }
    });

    const sharedDataCache = new SharedDataCache({
        dataKeys: [ACTION_KEYS.DATA_STORE]
    });

    const actionIdsStore = new IdsStore({
        eventBus,
        sharedDataCache,
        dataKey: ACTION_KEYS.DATA_STORE,
        eventTypeKey: ACTION_KEYS.EVENT_TYPE
    });

    new AddRemoveCards({
        eventBus,
        dataStores: {
            actionIdsStore
        },
        cardData: {
            actionCards: CREATURE_ACTION_CARDS
        },
        cardDeckLabels: {
            actionDeckLabel: '7.2 Creatures: Action Cards table'
        },
        eventTypeKeys: {
            actionIdsMutated: ACTION_KEYS.EVENT_TYPE
        }
    });

    new CardPrintSheet({
        eventBus,
        dataStores: {
            actionIds: actionIdsStore
        },
        cardData: {
            actionCards: CREATURE_ACTION_CARDS
        },
        eventTypeKeys: {
            actionIdsMutated: ACTION_KEYS.EVENT_TYPE
        }
    });
    
    eventBus.triggerEvent({
        type: ACTION_KEYS.EVENT_TYPE
    });

    window.addEventListener('popstate', () => {
        eventBus.triggerEvent({
            type: ACTION_KEYS.EVENT_TYPE
        });
    });
}

window.addEventListener('load', main);