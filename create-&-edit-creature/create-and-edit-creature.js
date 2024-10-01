
import { rollD50 } from "../utilities/roll-dice.js";
import { TRAITS_DETAILS, TraitStore } from "./traits-store.js";
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
	constructor () {
        this.subscribers = [];

		this.actionsFromGenes = [];

		this.traitStore = new TraitStore({
			triggerEvent: this.triggerEvent.bind(this)
		})

		this.genesButtonPanel = new GenesButtonPanel({
			traitDetails: TRAITS_DETAILS.GENES,
			section: document.getElementById('genes-section'),
			subscribe: this.subscribe.bind(this),
			traitStore: this.traitStore,
			getActionsFromGenes: this.getActionsFromGenes.bind(this),
			setActionsFromGenes: this.setActionsFromGenes.bind(this)
		});

		this.actionsButtonPanel = new ActionsButtonPanel({
			traitDetails: TRAITS_DETAILS.ACTIONS,
			section: document.getElementById('action-section'),
			subscribe: this.subscribe.bind(this),
			traitStore: this.traitStore,
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
					.map((geneId) => TRAITS_DETAILS.GENES.ITEMS.find(({id}) => geneId === id))
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

        this.levelSelectDropdown = generateNewSection.getElementsByClassName('level-dropdown')[0];
        this.populateDropdown();

		this.levelSelectDropdown.addEventListener(
			'change',
			() => this.renderTable()
		);

		this.subscribe({
            eventTypes: [TRAITS_DETAILS.GENES.CHANGED_EVENT],
            subscriber: this.setActionsFromGenes.bind(this)
        });

		this.subscribe({
            eventTypes: [TRAITS_DETAILS.GENES.CHANGED_EVENT, TRAITS_DETAILS.ACTIONS.CHANGED_EVENT],
            subscriber: this.updateButtons.bind(this)
        });

		this.subscribe({
            eventTypes: [TRAITS_DETAILS.GENES.CHANGED_EVENT],
            subscriber: this.renderTable.bind(this)
        });

		this.reloadUrl();
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

		const genesAddingActions = TRAITS_DETAILS.GENES.ITEMS
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

	renderTable () {
		const geneIds = this.traitStore.getTraitIds(TRAITS_DETAILS.GENES.KEY);

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
			.map(geneId => TRAITS_DETAILS.GENES.ITEMS.find(({id}) => geneId === id))
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