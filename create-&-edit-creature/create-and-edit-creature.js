
import { rollD50 } from "../utilities/roll-dice.js";
import { TRAITS_DETAILS, TraitStore } from "./traits-store.js";
import { GenesButtonPanel, ActionsButtonPanel } from "./button-panel.js";

export class CreateAndEditCreature {
	constructor({
		genesSection,
		actionsSection
    }) {
        this.subscribers = [];

		this.actionsFromGenes = [];

		this.traitStore = new TraitStore({
			triggerEvent: this.triggerEvent.bind(this)
		})

		this.genesButtonPanel = new GenesButtonPanel({
			traitDetails: TRAITS_DETAILS.GENES,
			section: genesSection,
			subscribe: this.subscribe.bind(this),
			traitStore: this.traitStore,
			getActionsFromGenes: this.getActionsFromGenes.bind(this),
			setActionsFromGenes: this.setActionsFromGenes.bind(this)
		});

		this.actionsButtonPanel = new ActionsButtonPanel({
			traitDetails: TRAITS_DETAILS.ACTIONS,
			section: actionsSection,
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
}