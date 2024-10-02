import { TRAITS_DETAILS } from "./traits-store.js";
import { rollD50 } from "../utilities/roll-dice.js";

const assertIsNumber = (number) => {
	if (typeof number !== 'number') {
		throw new Error(`Must be a number: "${number}" has type ${typeof number}`);
	}	
}

export class ButtonPanel {
	constructor({
		traitDetails,
		section,
		subscribe,
		traitStore
	}) {
		this.traitDetails = traitDetails;
		this.section = section;
		this.subscribe = subscribe;
		this.traitStore = traitStore;

		this.addRandomButton = section.getElementsByClassName('add-random-button')[0];
        this.addSingleDropdown = section.getElementsByClassName('add-single-dropdown')[0];
        this.addSingleButton = section.getElementsByClassName('add-single-button')[0];
        this.removeAllButton = section.getElementsByClassName('remove-all-button')[0];
        this.table = section.querySelector('.table tbody');

        this.populateDropdown();

		this.addRandomButton.addEventListener(
			'click',
			() => this.addRandomTrait()
		);

        this.addSingleDropdown.addEventListener('change', () => this.updateButtons());

        this.addSingleButton.addEventListener(
			'click',
			() => this.addTraits([parseInt(this.addSingleDropdown.value)])
		);

        this.removeAllButton.addEventListener(
			'click',
			() => this.removeAllTraits()
		);

        this.subscribe({
            eventTypes: [this.traitDetails.CHANGED_EVENT],
            subscriber: this.renderTable.bind(this)
        });

		this.subscribe({
            eventTypes: [this.traitDetails.CHANGED_EVENT],
            subscriber: this.updateButtons.bind(this)
        });
	}

	isTraitMutable (traitId) {
		assertIsNumber(traitId);

		return true;
	}

    populateDropdown () {
        this.traitDetails.ITEMS.forEach(({ id, name }) => {
            const newOption = document.createElement('option');
            newOption.value = id;
            newOption.textContent = `${id}: ${name}`;
            this.addSingleDropdown.appendChild(newOption);
        });
    }

	addTraits (traitIds) {
		traitIds.forEach(traitId => assertIsNumber(traitId));

		this.traitStore.addTraitIds([[this.traitDetails.KEY, traitIds]])
	}

	removeTraits (traitIds) {
		traitIds.forEach(traitId => assertIsNumber(traitId));

		this.traitStore.removeTraitIds([[this.traitDetails.KEY, traitIds]])
	}

	addRandomTrait () {
		const traitIds = this.traitStore.getTraitIds(this.traitDetails.KEY);

		// this is not a good implementation for generating a new trait, but it is functional and readable
		let newTraitId;
		do {
			newTraitId = rollD50();
		} while (!this.isTraitMutable(newTraitId) || traitIds.includes(newTraitId))

		this.addTraits([newTraitId]);
	}

	removeAllTraits () {
		const unlockedIds = this.traitStore.getTraitIds(this.traitDetails.KEY).filter(id => this.isTraitMutable(id));
		this.removeTraits(unlockedIds);
	}

	updateButtons () {
		const addedIds = this.traitStore.getTraitIds(this.traitDetails.KEY);

		// update add random button
		const newMutableTraitAvailableToAdd = this.traitDetails.ITEMS
			.filter(({id}) => !addedIds.includes(id))
			.some(({id}) => this.isTraitMutable(id));
		this.addRandomButton.disabled = !newMutableTraitAvailableToAdd;

		// update add single dropdown
		 Array.from(this.addSingleDropdown.options).forEach(
			(option, index) => this.addSingleDropdown.options[index].disabled = (
				!this.isTraitMutable(parseInt(option.value)) || addedIds.includes(parseInt(option.value))
			)
		);

		// update add single button
		const selectedTraitId = this.addSingleDropdown.value;
		const dropdownSelectionValid = selectedTraitId !== "" && this.isTraitMutable(parseInt(selectedTraitId)) && !addedIds.includes(parseInt(selectedTraitId));
		this.addSingleButton.disabled = !dropdownSelectionValid;

		// update remove all button
        this.removeAllButton.disabled = addedIds.every(traitId => !this.isTraitMutable(traitId));
	}

	addCellsToRow (row, trait) {
		throw new Error(`"addCellsToRow" does not have an implementation`);
	}

	getDeleteRowButtonForTraitId (traitId) {
		assertIsNumber(traitId);

		const deleteRowButton = document.createElement('button');
		deleteRowButton.textContent = 'remove';
		deleteRowButton.onclick = () => this.removeTraits([traitId]);
		if (!this.isTraitMutable(traitId)) {
			deleteRowButton.disabled = true;
		}
		return deleteRowButton
	}

	renderTable () {
		const traitIds = this.traitStore.getTraitIds(this.traitDetails.KEY);
		const traits = traitIds.map(traitId => this.traitDetails.ITEMS.find(({id}) => id === traitId));

        this.table.innerHTML = '';
        traits.forEach((trait) => {
			const row = this.table.insertRow();
			this.addCellsToRow(row, trait);
        });
	}
}

export class GenesButtonPanel extends ButtonPanel{
	constructor ({
		getActionsFromGenes,
		setActionsFromGenes,
		...params
	}) {
		super(params);

		this.getActionsFromGenes = getActionsFromGenes;
		this.setActionsFromGenes = setActionsFromGenes;
	}

	addTraits (geneIds) {
		super.addTraits(geneIds);

		this.setActionsFromGenes();

		this.traitStore.removeTraitIds([[TRAITS_DETAILS.ACTIONS.KEY, this.getActionsFromGenes()]])
	}

	removeTraits (geneIds) {
		super.removeTraits(geneIds);

		this.setActionsFromGenes();
	}

	addCellsToRow (row, {id, name, description, effect }) {
		row.insertCell(0).appendChild(document.createTextNode(id));
		row.insertCell(1).appendChild(document.createTextNode(name));
		row.insertCell(2).appendChild(document.createTextNode(description));
		row.insertCell(3).appendChild(document.createTextNode(effect));
		row.insertCell(4).appendChild(this.getDeleteRowButtonForTraitId(id));
	}
}

export class ActionsButtonPanel extends ButtonPanel{
	constructor ({
		getActionsFromGenes,
		...params
	}) {
		super(params);

		this.getActionsFromGenes = getActionsFromGenes;

		this.subscribe({
            eventTypes: [TRAITS_DETAILS.GENES.CHANGED_EVENT],
            subscriber: this.renderTable.bind(this)
        });
	}

	isTraitMutable (actionId) {
		assertIsNumber(actionId);

		const actionIdsFromGenes = this.getActionsFromGenes();
		return !actionIdsFromGenes.includes(actionId);
	}

	addCellsToRow (row, {id, name, effect }) {
		row.insertCell(0).appendChild(document.createTextNode(id));
		row.insertCell(1).appendChild(document.createTextNode(name));
		row.insertCell(2).appendChild(document.createTextNode(effect));
		row.insertCell(3).appendChild(this.getDeleteRowButtonForTraitId(id));
		row.insertCell(4).appendChild(document.createTextNode(
			this.isTraitMutable(id)
				? '-'
				: TRAITS_DETAILS.GENES.ITEMS.find(({actionCard}) => actionCard && (actionCard.id === id) ).name
			));
	}

	renderTable () {
		const actionIds = this.traitStore.getTraitIds(this.traitDetails.KEY)
			.concat(this.getActionsFromGenes())
			.sort((a, b) => a - b);
		const traits = actionIds.map(traitId => this.traitDetails.ITEMS.find(({id}) => id === traitId));

        this.table.innerHTML = '';
        traits.forEach((trait) => {
			const row = this.table.insertRow();
			this.addCellsToRow(row, trait);
        });
	}
}