import { rollD50 } from "../utilities/roll-dice.js";
import { assertIsNumber } from "../utilities/asserts.js";

export class ButtonPanel {
	constructor({
		eventBus,
		dataStore,
		traitDetail,
		eventTypeKey,
		section
	}) {
		this.eventBus = eventBus;
		this.dataStore = dataStore;
		this.traitDetail = traitDetail;
		this.eventTypeKey = eventTypeKey;
		this.section = section;

		this.addRandomButton = section.getElementsByClassName('add-random-button')[0];
        this.addSingleDropdown = section.getElementsByClassName('add-single-dropdown')[0];
        this.addSingleButton = section.getElementsByClassName('add-single-button')[0];
        this.removeAllButton = section.getElementsByClassName('remove-all-button')[0];
        this.table = section.querySelector('.table tbody');

        this.populateDropdown();

		this.addRandomButton.addEventListener(
			'click',
			() => {
				const newTraits = this.newRandomMutableTraits(1);
				this.addTraits(newTraits);
			}
		);

        this.addSingleDropdown.addEventListener('change', () => this.updateButtons());

        this.addSingleButton.addEventListener(
			'click',
			() => this.addTraits([parseInt(this.addSingleDropdown.value)])
		);

        this.removeAllButton.addEventListener(
			'click',
			() => this.removeAll()
		);

        this.eventBus.subscribe({
            eventTypes: [eventTypeKey],
            subscriber: this.renderTable.bind(this)
        });

		this.eventBus.subscribe({
            eventTypes: [eventTypeKey],
            subscriber: this.updateButtons.bind(this)
        });
	}

	isTraitMutable (traitId) {
		assertIsNumber(traitId);

		return true;
	}

    populateDropdown () {
        this.traitDetail.forEach(({ id, name }) => {
            const newOption = document.createElement('option');
            newOption.value = id;
            newOption.textContent = `${id}: ${name}`;
            this.addSingleDropdown.appendChild(newOption);
        });
    }

	addTraits (traitIds) {
		traitIds.forEach(traitId => assertIsNumber(traitId));

		this.dataStore.add(traitIds)
		this.dataStore.saveData();
	}

	remove (traitIds) {
		traitIds.forEach(traitId => assertIsNumber(traitId));

		this.dataStore.remove(traitIds)
		this.dataStore.saveData();
	}

	newRandomMutableTraits (traitCount) {
		const newTraitIds = [];
		const oldTraitIds = this.dataStore.get();

		while (newTraitIds.length < traitCount) {
			let newTraitId;

			// this is not a good implementation for generating a new trait, but it is functional and readable
			do {
				newTraitId = rollD50();
			} while (
				!this.isTraitMutable(newTraitId)
				|| newTraitIds.includes(newTraitId)
				|| oldTraitIds.includes(newTraitId)
			)

			newTraitIds.push(newTraitId);
		}

		return(newTraitIds);
	}

	removeAll () {
		this.dataStore.replace([]);
		this.dataStore.saveData();
	}

	updateButtons () {
		const addedIds = this.dataStore.get();

		// update add random button
		const newMutableTraitAvailableToAdd = this.traitDetail
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
		deleteRowButton.onclick = () => this.remove([traitId]);
	
		if (!this.isTraitMutable(traitId)) {
			deleteRowButton.disabled = true;
		}
		return deleteRowButton
	}

	renderTable () {
		const traitIds = this.dataStore.get();
		const traits = traitIds.map(traitId => this.traitDetail.find(({id}) => id === traitId));

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
		geneIds.forEach(geneId => assertIsNumber(geneId));

		this.dataStore.add(geneIds);
		this.setActionsFromGenes();

		this.dataStore.saveData();
	}

	remove (geneIds) {
		geneIds.forEach(geneId => assertIsNumber(geneId));

		this.dataStore.remove(geneIds)
		this.setActionsFromGenes();

		this.dataStore.saveData();
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
		genes,
		getActionsFromGenes,
		...params
	}) {
		super(params);

		this.genes = genes;
		this.getActionsFromGenes = getActionsFromGenes;
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
				: this.genes.traitDetail.find(({actionCard}) => actionCard && (actionCard.id === id) ).name
			));
	}

	renderTable () {
		const actionIds = this.dataStore.get()
			.concat(this.getActionsFromGenes())
			.sort((a, b) => a - b);
		const traits = actionIds.map(traitId => this.traitDetail.find(({id}) => id === traitId));

		this.table.innerHTML = '';
        traits.forEach((trait) => {
			const row = this.table.insertRow();
			this.addCellsToRow(row, trait);
        });
	}
}