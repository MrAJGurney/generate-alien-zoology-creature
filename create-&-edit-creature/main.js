import { CREATURE_GENES } from "../source-files/creature-genes.js";
import { CREATURE_ACTION_CARDS } from "../source-files/creature-action-cards.js";
import { EventBus } from "../utilities/event-bus.js";
import { SharedDataCache, IdsStore, NumberStore, TextStore } from "../utilities/data-store.js";
import { CreateAndEditCreature } from "./create-and-edit-creature.js";

const EVENT_TYPE_KEYS = {
    INITIALISE_PAGE: 'initialisePage',
    TRAIT_IDS_MUTATED: 'traitIdsMutated',
    LEVEL_MUTATED: 'levelMutated',
    NAME_MUTATED: 'nameMutated'
};

const DATA_STORE_KEYS = {
    GENE_IDS: 'gIds',
    ACTIONS_IDS: 'aIds',
    LEVEL_NUMBER: 'lvl',
    NAME_TEXT: 'name'
};

const main = () => {
    const sharedDataCache = new SharedDataCache({
        dataKeys:  [
            DATA_STORE_KEYS.GENE_IDS,
            DATA_STORE_KEYS.ACTIONS_IDS,
            DATA_STORE_KEYS.LEVEL_NUMBER,
            DATA_STORE_KEYS.NAME_TEXT
        ]
    });

    const eventBus = new EventBus({
        eventTypes: {
            initialisePage: EVENT_TYPE_KEYS.INITIALISE_PAGE,
            traitIdsMutated: EVENT_TYPE_KEYS.TRAIT_IDS_MUTATED,
            creatureLevelMutated: EVENT_TYPE_KEYS.LEVEL_MUTATED,
            creatureNameMutated: EVENT_TYPE_KEYS.NAME_MUTATED
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
        dataKey: DATA_STORE_KEYS.LEVEL_NUMBER,
        eventTypeKey: EVENT_TYPE_KEYS.LEVEL_MUTATED
    });

    const creatureNameStore = new TextStore({
        sharedDataCache,
        eventBus,
        dataKey: DATA_STORE_KEYS.NAME_TEXT,
        eventTypeKey: EVENT_TYPE_KEYS.NAME_MUTATED
    });

    new CreateAndEditCreature({
        eventBus,
        dataStores: {
            geneIdsStore,
            actionIdsStore,
            creatureLevelStore,
            creatureNameStore
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