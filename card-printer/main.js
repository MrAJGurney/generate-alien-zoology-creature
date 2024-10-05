import { CREATURE_ACTION_CARDS } from "../source-files/creature-action-cards.js";
import { EventBus } from "../utilities/event-bus.js";
import { SharedDataCache, IdsStore } from "../utilities/data-store.js";
import { AddRemoveCards as AddRemoveCards } from "./card-table.js";
import { CardPrintSheet } from "./card-print-sheet.js";

const EVENT_TYPE_KEYS = {
    INITIALISE_PAGE: 'initialisePage',
    ACTION_CARD_IDS_MUTATED: 'traitIdsMutated',
};

const DATA_STORE_KEYS = {
    ACTION_CARD_IDS: 'aIds'
}

const main = () => {
    const eventBus = new EventBus({
        eventTypes: {
            actionIdsMutated: EVENT_TYPE_KEYS.ACTION_CARD_IDS_MUTATED,
            initialisePage: EVENT_TYPE_KEYS.INITIALISE_PAGE
        }
    });

    const sharedDataCache = new SharedDataCache({
        dataKeys: [DATA_STORE_KEYS.ACTION_CARD_IDS]
    });

    const actionIdsStore = new IdsStore({
        eventBus,
        sharedDataCache,
        dataKey: DATA_STORE_KEYS.ACTION_CARD_IDS,
        eventTypeKey: EVENT_TYPE_KEYS.ACTION_CARD_IDS_MUTATED
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
            actionIdsMutated: EVENT_TYPE_KEYS.ACTION_CARD_IDS_MUTATED
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
            actionIdsMutated: EVENT_TYPE_KEYS.ACTION_CARD_IDS_MUTATED
        }
    });
    
    eventBus.triggerEvent({
        type: EVENT_TYPE_KEYS.ACTION_CARD_IDS_MUTATED
    });

    window.addEventListener('popstate', () => {
        eventBus.triggerEvent({
            type: EVENT_TYPE_KEYS.ACTION_CARD_IDS_MUTATED
        });
    });
}

window.addEventListener('load', main);