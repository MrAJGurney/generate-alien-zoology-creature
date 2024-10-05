import { CREATURE_GENES } from "../source-files/creature-genes.js";
import { CREATURE_ACTION_CARDS } from "../source-files/creature-action-cards.js";
import { EventBus } from "../utilities/event-bus.js";
import { SharedDataCache, IdsStore, NumberStore } from "../utilities/data-store.js";
import { CreateAndEditCreature } from "./create-and-edit-creature.js";

const EVENT_TYPE_KEYS = {
    INITIALISE_PAGE: 'initialisePage',
    TRAIT_IDS_MUTATED: 'traitIdsMutated',
    CREATURE_LEVEL_MUTATED: 'creatueLevelMutated'
};

const DATA_STORE_KEYS = {
    GENE_IDS: 'gIds',
    ACTIONS_IDS: 'aIds',
    CREATURE_LEVEL: 'lvl'
};

const main = () => {
    const sharedDataCache = new SharedDataCache({
        dataKeys:  [
            DATA_STORE_KEYS.GENE_IDS,
            DATA_STORE_KEYS.ACTIONS_IDS,
            DATA_STORE_KEYS.CREATURE_LEVEL
        ]
    });

    const eventBus = new EventBus({
        eventTypes: {
            traitIdsMutated: EVENT_TYPE_KEYS.TRAIT_IDS_MUTATED,
            creatureLevelMutated: EVENT_TYPE_KEYS.CREATURE_LEVEL_MUTATED,
            initialisePage: EVENT_TYPE_KEYS.INITIALISE_PAGE
        }
    });

    const geneIdsStore = new IdsStore({
        sharedDataCache,
        eventBus,
        dataKey: DATA_STORE_KEYS.GENE_IDS,
        eventTypeKey: EVENT_TYPE_KEYS.TRAIT_IDS_MUTATED
    });

    const actionIdsStore = new IdsStore({
        sharedDataCache,
        eventBus,
        dataKey: DATA_STORE_KEYS.ACTIONS_IDS,
        eventTypeKey: EVENT_TYPE_KEYS.TRAIT_IDS_MUTATED
    });

    const creatureLevelStore = new NumberStore({
        sharedDataCache,
        eventBus,
        dataKey: DATA_STORE_KEYS.CREATURE_LEVEL,
        eventTypeKey: EVENT_TYPE_KEYS.CREATURE_LEVEL_MUTATED
    })

    new CreateAndEditCreature({
        eventBus,
        dataStores: {
            geneIdsStore,
            actionIdsStore,
            creatureLevelStore
        },
        traitDetails: {
            genes: CREATURE_GENES,
            actionCards: CREATURE_ACTION_CARDS
        }
    });

    eventBus.triggerEvent({
        type: EVENT_TYPE_KEYS.INITIALISE_PAGE
    });

    window.addEventListener('popstate', () => {
        eventBus.triggerEvent({
            type: EVENT_TYPE_KEYS.INITIALISE_PAGE
        });
    });
}

window.addEventListener('load', main);