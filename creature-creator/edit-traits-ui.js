import { newUniqueD50Roll } from "../utilities/roll-dice.js";
import { assertIsNumber } from "../utilities/asserts.js";

class EditTraitsUi {
	constructor({
		dataStore,
		traitDetail,
		elementIds: {
			addRandomTraitButtonId,
			selectSingleTraitDropdownId,
			addSingleTraitButtonId,
			removeAllTraitsButtonId,
		}
	}) {
		this.dataStore = dataStore;

		this.traitDetail = traitDetail;

		this.addRandomTraitButton = document.getElementById(addRandomTraitButtonId);
		this.selectSingleTraitDropdown = document.getElementById(selectSingleTraitDropdownId);
		this.addSingleTraitButton = document.getElementById(addSingleTraitButtonId);
		this.removeAllTraitsButton = document.getElementById(removeAllTraitsButtonId);

		// populate select single trait dropdown options
		this.traitDetail.forEach(({ id, name }) => {
            const option = document.createElement('option');
            option.value = id;
            option.textContent = `${id}: ${name}`;
            this.selectSingleTraitDropdown.appendChild(option);
        });

		this.addRandomTraitButton.addEventListener('click', this.onAddRandomTraitButtonClick.bind(this));
        this.selectSingleTraitDropdown.addEventListener('change', this.onSelectSingleTraitDropdownChange.bind(this));
		this.addSingleTraitButton.addEventListener('click', this.onAddSingleTraitButtonClick.bind(this));
		this.removeAllTraitsButton.addEventListener('click', this.onRemoveAllTraitsButtonClick.bind(this));
	}

	updateButtons () {
		const addedIds = this.dataStore.get();

		// add random trait button
		const newMutableTraitAvailableToAdd = this.traitDetail
			.filter(({id}) => !addedIds.includes(id))
			.some(({id}) => !this.getImmutableTraitIds().includes(id));
		this.addRandomTraitButton.disabled = !newMutableTraitAvailableToAdd;

		// select single trait dropdown
		 Array.from(this.selectSingleTraitDropdown.options).forEach(
			(option, index) => this.selectSingleTraitDropdown.options[index].disabled =
				this.getImmutableTraitIds().includes(parseInt(option.value)) || addedIds.includes(parseInt(option.value))
		);

		// add single trait button
		const selectedTraitId = this.selectSingleTraitDropdown.value;
		const dropdownSelectionValid = selectedTraitId !== "" && !this.getImmutableTraitIds().includes(parseInt(selectedTraitId)) && !addedIds.includes(parseInt(selectedTraitId));
		this.addSingleTraitButton.disabled = !dropdownSelectionValid;

		// remove all traits button
        this.removeAllTraitsButton.disabled = addedIds.every(traitId => this.getImmutableTraitIds().includes(traitId));
	}

	getImmutableTraitIds () {
		return [];
	}

	onTraitsAdded () {
		// do nothing
	}

	onTraitsRemoved () {
		// do nothing
	}

	onAddRandomTraitButtonClick () {
		const currentIds = this.dataStore.get();
		const traitId = newUniqueD50Roll(currentIds);
		this.dataStore.add([traitId])
		this.onTraitsAdded([traitId]);
		this.dataStore.saveData();
	}

	onSelectSingleTraitDropdownChange () {
		this.updateButtons();
	}

	onAddSingleTraitButtonClick () {
		const traitId = parseInt(this.selectSingleTraitDropdown.value);
		assertIsNumber(traitId);
		this.dataStore.add([traitId])
		this.onTraitsAdded([traitId]);
		this.dataStore.saveData();
	}

	onRemoveAllTraitsButtonClick () {
		const currentIds = this.dataStore.get();
		const idsToRemove = currentIds.filter(id => !this.getImmutableTraitIds().includes(id))
		this.dataStore.remove(idsToRemove);
		this.onTraitsRemoved(idsToRemove);
		this.dataStore.saveData();
	}
}

export class EditGenesUi extends EditTraitsUi {
	constructor ({
		editGenesUiParams: {
			actionAddedByGeneLookupDict,
			actionIdsStore,
		},
		...params
	}) {
		super(params);

		this.actionIdsStore = actionIdsStore;
		this.actionAddedByGeneLookupDict = actionAddedByGeneLookupDict;
	}

	onTraitsAdded (geneIds) {
		const currentActionIds = this.actionIdsStore.get();
		const actionIdsToAdd = geneIds
			.map(geneId => this.actionAddedByGeneLookupDict[geneId])
			.filter(lookup => lookup !== undefined)
			.map(lookup => lookup.actionId)
			.filter(actionId => !currentActionIds.includes(actionId));

		if (actionIdsToAdd.length > 0) {
			this.actionIdsStore.add(actionIdsToAdd);
		}
	}

	onTraitsRemoved (geneIds) {
		const currentActionIds = this.actionIdsStore.get();
		const actionsToRemove = geneIds
			.map(geneId => this.actionAddedByGeneLookupDict[geneId])
			.filter(lookup => lookup !== undefined)
			.map(lookup => lookup.actionId)
			.filter(actionId => currentActionIds.includes(actionId));

		if (actionsToRemove.length > 0) {
			this.actionIdsStore.remove(actionsToRemove);
		}
	}
}

export class EditActionsUi extends EditTraitsUi {
	constructor ({
		editActionsUiParams: {
			actionAddedByGeneLookupDict,
			geneIdsStore,
		},
		...params
	}) {
		super(params);

		this.geneIdsStore = geneIdsStore;
		this.actionAddedByGeneLookupDict = actionAddedByGeneLookupDict;
	}

	getImmutableTraitIds () {
		const currentGeneIds = this.geneIdsStore.get();
		const immutableActionIds = currentGeneIds
			.map(geneId => this.actionAddedByGeneLookupDict[geneId])
			.filter(lookup => lookup !== undefined)
			.map(lookup => lookup.actionId);

		return immutableActionIds;
	}
}
