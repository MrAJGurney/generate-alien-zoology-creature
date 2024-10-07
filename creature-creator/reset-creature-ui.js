import { newUniqueD50Roll } from "../utilities/roll-dice.js";

export class ResetCreatureUi {
    #dataStores;
    #actionAddedByGeneLookupDict;

    #removeAllGenesAndActionsButton;

    constructor ({
        dataStores,
        elementIds: {
            generateNewRandomCreatureButtonId,
            removeAllGenesAndActionsButtonId
        },
        actionAddedByGeneLookupDict
    }) {
        this.#dataStores = dataStores;
        this.#actionAddedByGeneLookupDict = actionAddedByGeneLookupDict;

        const generateNewRandomCreatureButton = document.getElementById(generateNewRandomCreatureButtonId);
        generateNewRandomCreatureButton.addEventListener('click', this.#onGenerateNewRandomCreatureClick.bind(this));

        this.#removeAllGenesAndActionsButton = document.getElementById(removeAllGenesAndActionsButtonId);
        this.#removeAllGenesAndActionsButton.addEventListener('click', this.#onRemoveAllGenesAndActionsButtonClick.bind(this));
    }

    updateButtons () {
        const addedGenesIds = this.#dataStores.geneIdsStore.get();
        const addedActionsIds = this.#dataStores.actionIdsStore.get();

        // update remove all button
        this.#removeAllGenesAndActionsButton.disabled = addedGenesIds.length === 0 && addedActionsIds.length === 0;
    }

    #onGenerateNewRandomCreatureClick () {
        const requiredGeneCount = 4;
        const requiredActionCount = 5;

        const geneIds = [];

        while (geneIds.length < requiredGeneCount) {
            geneIds.push(newUniqueD50Roll(geneIds));
        }

        const actionIdsFromGenes = geneIds
            .map(geneId => this.#actionAddedByGeneLookupDict[geneId])
            .filter(lookup => lookup !== undefined)
            .map(lookup => lookup.actionId);

        const actionIds = [];

        while (actionIds.length < requiredActionCount) {
            actionIds.push(newUniqueD50Roll([...actionIdsFromGenes, ...actionIds]));
        }

        this.#dataStores.geneIdsStore.replace(geneIds);
        this.#dataStores.actionIdsStore.replace([...actionIdsFromGenes, ...actionIds]);

        // saves for all tables
        this.#dataStores.geneIdsStore.saveData();
    }

    #onRemoveAllGenesAndActionsButtonClick () {
        this.#dataStores.geneIdsStore.replace([]);
        this.#dataStores.actionIdsStore.replace([]);

        // saves for all tables
        this.#dataStores.geneIdsStore.saveData();
    }
}
