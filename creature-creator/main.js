import { CREATURE_GENES } from "../source-files/creature-genes.js";
import { CREATURE_ACTION_CARDS } from "../source-files/creature-action-cards.js";
import { EventBus } from "../utilities/event-bus.js";
import { SharedDataCache, IdsStore, NumberStore, TextStore } from "../utilities/data-store.js";
import { ViewAndEditCreatureUi } from "./view-and-edit-creature-ui.js";



const main = () => {
    const eventBus = new EventBus({
        eventTypes: {
            initialiseData: 'initialiseData',
            initialiseDisplay: 'initialiseDisplay',
            traitIdsMutated: 'traitIdsMutated',
            creatureLevelMutated: 'levelMutated',
            creatureNameMutated: 'nameMutated'
        }
    });

    const sharedDataCache = new SharedDataCache({
        dataKeys:  {
            geneIds: 'gIds',
            actionIds: 'aIds',
            levelNumber: 'lvl',
            nameText: 'name'
        }
    });

    const geneIdsStore = new IdsStore({
        sharedDataCache,
        defaultValue: [],
        dataKey: sharedDataCache.dataKeys.geneIds,
        onSave: () => eventBus.triggerEvent({type: eventBus.eventTypes.traitIdsMutated})
    });

    const actionIdsStore = new IdsStore({
        sharedDataCache,
        defaultValue: [],
        dataKey: sharedDataCache.dataKeys.actionIds,
        onSave: () => eventBus.triggerEvent({type: eventBus.eventTypes.traitIdsMutated})
    });

    const creatureLevelStore = new NumberStore({
        sharedDataCache,
        defaultValue: 10,
        dataKey: sharedDataCache.dataKeys.levelNumber,
        onSave: () => eventBus.triggerEvent({type: eventBus.eventTypes.creatureLevelMutated})
    });

    const creatureNameStore = new TextStore({
        sharedDataCache,
        defaultValue: '',
        dataKey: sharedDataCache.dataKeys.nameText,
        onSave: () => eventBus.triggerEvent({type: eventBus.eventTypes.creatureNameMutated})
    });

    new ViewAndEditCreatureUi({
        eventBus,
        dataStores: {
            geneIdsStore,
            actionIdsStore,
            creatureLevelStore,
            creatureNameStore
        },
        details: {
            geneDetails: CREATURE_GENES,
            actionDetails: CREATURE_ACTION_CARDS,
            profileDetails: {
                MOV: 6,
                A: 6,
                SHO: 6,
                DEF: 6,
                NERVE: 6,
                ESC: 8,
            }
        }
    });

    eventBus.subscribe({
        eventTypes: [eventBus.eventTypes.initialiseData],
        subscriber: () => {
            geneIdsStore.loadData();
            actionIdsStore.loadData();
            creatureLevelStore.loadData();
            creatureNameStore.loadData();
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