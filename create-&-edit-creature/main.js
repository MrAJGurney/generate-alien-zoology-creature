import { CREATURE_GENES } from "../source-files/creature-genes.js";
import { CREATURE_ACTION_CARDS } from "../source-files/creature-action-cards.js";
import { EventBus } from "../utilities/event-bus.js";
import { SharedDataCache, IdsStore } from "../utilities/data-store.js";
import { CreateAndEditCreature } from "./create-and-edit-creature.js";

const MUTATED_IDS_EVENT_TYPE_KEY = 'traitIdsMutated';
const GENES_DATA_STORE_KEY = 'geneIds';
const ACTIONS_DATA_STORE_KEY = 'actionIds';

const main = () => {
    const sharedDataCache = new SharedDataCache({
        dataKeys:  [GENES_DATA_STORE_KEY, ACTIONS_DATA_STORE_KEY]
    });

    const eventBus = new EventBus({
        eventTypes: {
            traitIdsMutated: MUTATED_IDS_EVENT_TYPE_KEY,
        }
    });

    const geneIdsStore = new IdsStore({
        sharedDataCache,
        eventBus,
        dataKey: GENES_DATA_STORE_KEY,
        eventTypeKey: MUTATED_IDS_EVENT_TYPE_KEY
    });
    geneIdsStore.loadData();

    const actionIdsStore = new IdsStore({
        sharedDataCache,
        eventBus,
        dataKey: ACTIONS_DATA_STORE_KEY,
        eventTypeKey: MUTATED_IDS_EVENT_TYPE_KEY
    });
    actionIdsStore.loadData();

    new CreateAndEditCreature({
        eventBus,
        dataStores: {
            geneIdsStore,
            actionIdsStore
        },
        traitDetails: {
            genes: CREATURE_GENES,
            actionCards: CREATURE_ACTION_CARDS
        },
        eventTypeKeys: {
            traitIdsMutated: MUTATED_IDS_EVENT_TYPE_KEY
        }
    });
    
    eventBus.triggerEvent({
        type: MUTATED_IDS_EVENT_TYPE_KEY
    });

    window.addEventListener('popstate', () => {
        eventBus.triggerEvent({
            type: MUTATED_IDS_EVENT_TYPE_KEY
        });
    });
}

window.addEventListener('load', main);