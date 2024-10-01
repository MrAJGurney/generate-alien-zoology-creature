import { CREATURE_GENES } from "../source-files/creature-genes.js";
import { CREATURE_ACTION_CARDS } from "../source-files/creature-action-cards.js";
import { TRAITS_DETAILS, TraitStore } from "./traits-store.js";
import { rollD50 } from "../utilities/roll-dice.js";

class ButtonPanel {
	constructor({
		traitDetails,
		availableTraits,
		section,
		subscribe,
		traitStore
	}) {
		this.traitDetails = traitDetails;
		this.availableTraits = availableTraits;
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
			() => this.addTraits([this.addSingleDropdown.value])
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
		return true;
	}

    populateDropdown () {
        this.availableTraits.forEach(({ id, name }) => {
            const newOption = document.createElement('option');
            newOption.value = id;
            newOption.textContent = `${id}: ${name}`;
            this.addSingleDropdown.appendChild(newOption);
        });
    }

	addTraits (traitIds) {
		this.traitStore.addTraitIds([[this.traitDetails.KEY, traitIds]])
	}

	removeTraits (traitIds) {
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
        this.addRandomButton.disabled = addedIds.length >= this.availableTraits.length;

		// update add single dropdown
		 Array.from(this.addSingleDropdown.options).forEach(
			(option, index) => this.addSingleDropdown.options[index].disabled = (
				!this.isTraitMutable(parseInt(option.value)) || addedIds.includes(parseInt(option.value))
			)
		);

		// update add single button
		const selectedTraitId = this.addSingleDropdown.value;
		const dropdownSelectionValid = selectedTraitId !== "" && this.isTraitMutable(selectedTraitId) && !addedIds.includes(parseInt(selectedTraitId));
		this.addSingleButton.disabled = !dropdownSelectionValid;

		// update remove all button
        this.removeAllButton.disabled = addedIds.every(traitId => !this.isTraitMutable(traitId));
	}

	addCellsToRow (row, trait) {
		throw new Error(`"addCellsToRow" does not have an implementation`);
	}

	getDeleteRowButtonForTraitId (traitId) {
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
		const traits = traitIds.map(traitId => this.availableTraits.find(({id}) => id === traitId));

        this.table.innerHTML = '';
        traits.forEach((trait) => {
			const row = this.table.insertRow();
			this.addCellsToRow(row, trait);
        });
	}
}

class GenesButtonPanel extends ButtonPanel{
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

class ActionsButtonPanel extends ButtonPanel{
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
				: CREATURE_GENES.find(({actionCard}) => actionCard?.id === id ).name
			));
	}

	renderTable () {
		const actionIds = this.traitStore.getTraitIds(this.traitDetails.KEY)
			.concat(this.getActionsFromGenes())
			.sort((a, b) => a - b);
		const traits = actionIds.map(traitId => this.availableTraits.find(({id}) => id === traitId));

        this.table.innerHTML = '';
        traits.forEach((trait) => {
			const row = this.table.insertRow();
			this.addCellsToRow(row, trait);
        });
	}
}

class CreateAndEditCreature {
	constructor({
		genesSection,
		actionCardsSection
    }) {
        this.subscribers = [];

		this.actionsFromGenes = [];

		this.traitStore = new TraitStore({
			triggerEvent: this.triggerEvent.bind(this)
		})

		this.genesButtonPanel = new GenesButtonPanel({
			traitDetails: TRAITS_DETAILS.GENES,
			availableTraits: CREATURE_GENES,
			section: genesSection,
			subscribe: this.subscribe.bind(this),
			traitStore: this.traitStore,
			getActionsFromGenes: this.getActionsFromGenes.bind(this),
			setActionsFromGenes: this.setActionsFromGenes.bind(this)
		});

		this.actionsButtonPanel = new ActionsButtonPanel({
			traitDetails: TRAITS_DETAILS.ACTIONS,
			availableTraits: CREATURE_ACTION_CARDS,
			section: actionCardsSection,
			subscribe: this.subscribe.bind(this),
			traitStore: this.traitStore,
			getActionsFromGenes: this.getActionsFromGenes.bind(this)
		});

		const generateNewSection = document.getElementById('generate-new-creature-section');

		this.generateNewRandomCreatureButton = generateNewSection.getElementsByClassName('generate-new-random-creature-button')[0];
		this.generateNewRandomCreatureButton.addEventListener(
			'click',
			() => {
				const geneIds = Array(4)
					.fill(null)
					.reduce((geneIds) => {
						let newGeneId;
						do {
							newGeneId = rollD50();
						} while (geneIds.includes(newGeneId));
						geneIds.push(newGeneId)
						return geneIds;
					}, []);

				const actionIdsFromGenes = geneIds
					.map((geneId) => CREATURE_GENES.find(({id}) => geneId === id))
					.filter(({actionCard}) => actionCard)
					.map(({actionCard: {id}}) => id);

				const actionIds = Array(5)
					.fill(null)
					.reduce((actionIds) => {
						let newActionId;
						do {
							newActionId = rollD50();
						} while (actionIds.includes(newActionId) || actionIdsFromGenes.includes(newActionId));
						actionIds.push(newActionId)
						return actionIds;
						}, []);

				this.traitStore.replaceTraitIds([
					[TRAITS_DETAILS.GENES.KEY, geneIds],
					[TRAITS_DETAILS.ACTIONS.KEY, actionIds]
				])
			}
		);

		this.removeAllGenesAndActionsButton = generateNewSection.getElementsByClassName('remove-all-genes-and-actions-button')[0];
		this.removeAllGenesAndActionsButton.addEventListener(
			'click',
			() => {
				const geneIds = this.traitStore.getTraitIds(TRAITS_DETAILS.GENES.KEY);
				const actionIds = this.traitStore.getTraitIds(TRAITS_DETAILS.ACTIONS.KEY);
				this.traitStore.removeTraitIds([
					[TRAITS_DETAILS.GENES.KEY, geneIds],
					[TRAITS_DETAILS.ACTIONS.KEY, actionIds]
				])
			}
		);

		this.subscribe({
            eventTypes: [TRAITS_DETAILS.GENES.CHANGED_EVENT],
            subscriber: this.setActionsFromGenes.bind(this)
        });

		this.subscribe({
            eventTypes: [TRAITS_DETAILS.GENES.CHANGED_EVENT, TRAITS_DETAILS.ACTIONS.CHANGED_EVENT],
            subscriber: this.updateButtons.bind(this)
        });

		this.reloadUrl();
    }

	reloadUrl () {
        this.traitStore.reloadUrl();

        this.triggerEvent({
            type: TRAITS_DETAILS.GENES.CHANGED_EVENT
        });

        this.triggerEvent({
            type: TRAITS_DETAILS.ACTIONS.CHANGED_EVENT
        });
    }

    subscribe ({eventTypes, subscriber}) {
        this.subscribers.push({ eventTypes, subscriber });
    }

    triggerEvent (event) {
        this.subscribers.forEach(({ eventTypes, subscriber }) => {
            if (eventTypes.includes(event.type)) {
                subscriber(event);
            }
        });
    }

	setActionsFromGenes () {
		const addedGeneIds = this.traitStore.getTraitIds(TRAITS_DETAILS.GENES.KEY);

		const genesAddingActions = CREATURE_GENES
			.filter(({actionCard}) => actionCard)
			.filter(({id}) => addedGeneIds.includes(id));

		this.actionsFromGenes = genesAddingActions.map(({actionCard: {id}}) => id)

        this.triggerEvent({
            type: TRAITS_DETAILS.ACTIONS.CHANGED_EVENT
        });
	}

	getActionsFromGenes () {
		return [...this.actionsFromGenes]
	}

	updateButtons () {
		const addedGenesIds = this.traitStore.getTraitIds(TRAITS_DETAILS.GENES.KEY);
		const addedActionsIds = this.traitStore.getTraitIds(TRAITS_DETAILS.ACTIONS.KEY);

		// update remove all button
        this.removeAllGenesAndActionsButton.disabled = !(addedGenesIds.length > 0 || addedActionsIds.length > 0);
	}
}

const main = () => {
    const createAndEditCreature = new CreateAndEditCreature({
		genesSection: document.getElementById('genes-section'),
		actionCardsSection: document.getElementById('action-cards-section')
	});

	window.addEventListener('popstate', () => {
        createAndEditCreature.reloadUrl();
    });
}

window.addEventListener('load', main);