
import { rollD50 } from "../utilities/roll-dice.js";
import { GenesButtonPanel, ActionsButtonPanel } from "./button-panel.js";

const DEFAULT_LEVEL = 10;

const BASE_PROFILE = {
	MOV: 6,
	A: 6,
	SHO: 6,
	DEF: 6,
	NERVE: 6,
	ESC: 8,
}

export class CreateAndEditCreature {
	constructor ({
        eventBus,
        dataStores,
		traitDetails,
		eventTypeKeys
    }) {
		this.eventBus = eventBus;
		this.dataStores = dataStores;
		this.traitDetails = traitDetails;
		this.eventTypeKeys = eventTypeKeys;

		this.actionsFromGenes = [];

		this.genesButtonPanel = new GenesButtonPanel({
			eventBus: this.eventBus,
			dataStore: this.dataStores.geneIdsStore,
			traitDetail: this.traitDetails.genes,
			eventTypeKey: this.eventTypeKeys.traitIdsMutated,
			section: document.getElementById('genes-section'),
			getActionsFromGenes: this.getActionsFromGenes.bind(this),
			setActionsFromGenes: this.setActionsFromGenes.bind(this)
		});

		this.actionsButtonPanel = new ActionsButtonPanel({
			eventBus: this.eventBus,
			dataStore: this.dataStores.actionIdsStore,
			traitDetail: this.traitDetails.actionCards,
			eventTypeKey: this.eventTypeKeys.traitIdsMutated,
			section: document.getElementById('action-section'),
			genes: {
				traitDetail: this.traitDetails.genes
			},
			getActionsFromGenes: this.getActionsFromGenes.bind(this)
		});

		const generateNewSection = document.getElementById('creature-summary-section');

		this.table = generateNewSection.querySelector('.table tbody');

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
					.map((geneId) => this.traitDetails.genes.find(({id}) => geneId === id))
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

				this.dataStores.geneIdsStore.replace(geneIds);
				this.dataStores.actionIdsStore.replace(actionIds);

				// saves for all tables
				this.dataStores.geneIdsStore.saveData();
			}
		);

		this.removeAllGenesAndActionsButton = generateNewSection.getElementsByClassName('remove-all-genes-and-actions-button')[0];
		this.removeAllGenesAndActionsButton.addEventListener(
			'click',
			() => {
				const geneIds = this.dataStores.geneIdsStore.get();
				this.dataStores.geneIdsStore.remove(geneIds);

				const actionIds = this.dataStores.actionIdsStore.get();
				this.dataStores.actionIdsStore.remove(actionIds);

				// saves for all tables
				this.dataStores.geneIdsStore.saveData();
			}
		);

        this.levelSelectDropdown = generateNewSection.getElementsByClassName('level-dropdown')[0];
        this.populateDropdown();

		this.levelSelectDropdown.addEventListener(
			'change',
			() => this.renderTable()
		);

		this.eventBus.subscribe({
            eventTypes: [this.eventTypeKeys.traitIdsMutated],
            subscriber: this.updateButtons.bind(this)
        });

		this.eventBus.subscribe({
            eventTypes: [this.eventTypeKeys.traitIdsMutated],
            subscriber: this.renderTable.bind(this)
        });
    }

    populateDropdown () {
        Array(30)
			.fill(null)
			.map((_, index) => index + 1)
			.forEach(level => {
				const newOption = document.createElement('option');
				newOption.value = level;
				newOption.textContent = `level ${level}`;
				this.levelSelectDropdown.appendChild(newOption);
			});

		this.levelSelectDropdown.value = DEFAULT_LEVEL;
    }

	setActionsFromGenes () {
		const addedGeneIds = this.dataStores.geneIdsStore.get();

		const genesAddingActions = this.traitDetails.genes
			.filter(({actionCard}) => actionCard)
			.filter(({id}) => addedGeneIds.includes(id));

		const actionIdsAddedByGenes = genesAddingActions.map(({actionCard: {id}}) => id);

		this.actionsFromGenes = actionIdsAddedByGenes;

		this.dataStores.actionIdsStore.remove(actionIdsAddedByGenes);
	}

	getActionsFromGenes () {
		return [...this.actionsFromGenes]
	}

	updateButtons () {
		const addedGenesIds = this.dataStores.geneIdsStore.get();
		const addedActionsIds = this.dataStores.actionIdsStore.get();

		// update remove all button
        this.removeAllGenesAndActionsButton.disabled = !(addedGenesIds.length > 0 || addedActionsIds.length > 0);
	}

	renderTable () {
		const geneIds = this.dataStores.geneIdsStore.get();

		this.table.innerHTML = '';

		const firstRow = this.table.insertRow();
		const firstRowDescriptionCell = firstRow.insertCell(0)
		firstRowDescriptionCell.appendChild(document.createTextNode("Creature"))
		firstRowDescriptionCell.appendChild(document.createElement("br"))
		firstRowDescriptionCell.appendChild(document.createTextNode("(base stats before modifiers)"));
		firstRow.insertCell(1).appendChild(document.createTextNode(`${BASE_PROFILE.MOV}`));
		firstRow.insertCell(2).appendChild(document.createTextNode(`${BASE_PROFILE.A}+`));
		firstRow.insertCell(3).appendChild(document.createTextNode(`${BASE_PROFILE.SHO}+`));
		firstRow.insertCell(4).appendChild(document.createTextNode(`${this.levelSelectDropdown.value}`));
		firstRow.insertCell(5).appendChild(document.createTextNode(`${BASE_PROFILE.DEF}+`));
		firstRow.insertCell(6).appendChild(document.createTextNode(`${BASE_PROFILE.NERVE}+`));
		firstRow.insertCell(7).appendChild(document.createTextNode(`${BASE_PROFILE.ESC}+`));

		const profileChanges = geneIds
			.map(geneId => this.traitDetails.genes.find(({id}) => geneId === id))
			.filter(({profile}) => profile)
			.map(({profile}) => profile);

		const adjustedProfile = Object
			.entries(BASE_PROFILE)
			.concat([['HP', parseInt(this.levelSelectDropdown.value)]])
			.reduce((adjustedProfile, [key, value]) => ({
				...adjustedProfile,
				[key]: value + profileChanges.map(({[key]: value}) => value ?? 0).reduce((total, value) => total + value, 0)
			}), {});

		const secondRow = this.table.insertRow();
		const secondRowDescriptionCell = secondRow.insertCell(0)
		secondRowDescriptionCell.appendChild(document.createTextNode("Creature"))
		secondRowDescriptionCell.appendChild(document.createElement("br"))
		secondRowDescriptionCell.appendChild(document.createTextNode("(after modifiers)"));
		secondRow.insertCell(1).appendChild(document.createTextNode(`${adjustedProfile.MOV}`));
		secondRow.insertCell(2).appendChild(document.createTextNode(`${adjustedProfile.A}+`));
		secondRow.insertCell(3).appendChild(document.createTextNode(`${adjustedProfile.SHO}+`));
		secondRow.insertCell(4).appendChild(document.createTextNode(`${adjustedProfile.HP}`));
		secondRow.insertCell(5).appendChild(document.createTextNode(`${adjustedProfile.DEF}+`));
		secondRow.insertCell(6).appendChild(document.createTextNode(`${adjustedProfile.NERVE}+`));
		secondRow.insertCell(7).appendChild(document.createTextNode(`${adjustedProfile.ESC}+`));
	}
}