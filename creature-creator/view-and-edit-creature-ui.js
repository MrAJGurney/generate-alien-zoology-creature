import { ResetCreatureUi } from "./reset-creature-ui.js"
import { EditNameUi, SelectLevelUi } from "./edit-profile-ui.js"
import { ViewProfileUi } from "./view-profile-ui.js"
import { EditGenesUi, EditActionsUi } from "./edit-traits-ui.js"
import { ViewGenesUi, ViewActionsUi } from "./view-traits-ui.js"

export class ViewAndEditCreatureUi {
    constructor ({
		eventBus,
		dataStores,
		details
    }) {
		const actionAddedByGeneLookup = details.geneDetails
			.filter(({actionCard}) => actionCard)
			.reduce((actionAddedByGeneLookup, {
				name: geneName,
				id: geneId,
				actionCard: {id: actionId}
			}) => ({
				...actionAddedByGeneLookup,
				[geneId]: {
					actionId,
					geneName,
				}
			}), {});

		const profileChangeFromGeneLookup = details.geneDetails
			.filter(({profile}) => profile)
			.reduce((profileChangeFromGeneLookup, {id: geneId, profile}) => ({
				...profileChangeFromGeneLookup,
				[geneId]: profile
			}), {});


		// reset creature
		const resetCreatureUi = new ResetCreatureUi({
			dataStores,
			elementIds: {
				generateNewRandomCreatureButtonId: 'generate-new-random-creature-button',
				removeAllGenesAndActionsButtonId: 'remove-all-genes-and-actions-button'
			},
			actionAddedByGeneLookupDict: actionAddedByGeneLookup
		});


		// edit and view profile
		const editNameUi = new EditNameUi({
			creatureNameStore: dataStores.creatureNameStore,
			elementIds: {
				nameTextInputId: 'name-text-input'
			}
		});

		const selectLevelUi = new SelectLevelUi({
			creatureLevelStore: dataStores.creatureLevelStore,
			elementIds: {
				selectLevelDropdownId: 'select-level-dropdown'
			}
		});

		const viewProfileUi = new ViewProfileUi({
			dataStores,
			profileDetails: details.profileDetails,
			elementIds: {
				profileTableBodyId: 'view-profile-table-body'
			},
			profileChangeFromGeneLookup
		});

		// edit and view genes
		const editGenesUi = new EditGenesUi({
			dataStore: dataStores.geneIdsStore,
			traitDetail: details.geneDetails,
			elementIds: {
				addRandomTraitButtonId: 'add-random-gene-button',
				selectSingleTraitDropdownId: 'select-single-gene-dropdown',
				addSingleTraitButtonId: 'add-single-gene-button',
				removeAllTraitsButtonId: 'remove-all-genes-button',
			},
			editGenesUiParams: {
				actionAddedByGeneLookupDict: actionAddedByGeneLookup,
				actionIdsStore: dataStores.actionIdsStore
			},
		});

		const viewGenesUi = new ViewGenesUi({
			dataStore: dataStores.geneIdsStore,
			traitDetail: details.geneDetails,
			elementIds: {
				traitsTableId: 'view-and-edit-genes-table'
			},
			renderOnlyPrintableColumns: false,
			viewGenesUiParams: {
				actionAddedByGeneLookupDict: actionAddedByGeneLookup,
				actionIdsStore: dataStores.actionIdsStore
			},
		});

		// edit and view actions
		const editActionsUi = new EditActionsUi({
			dataStore: dataStores.actionIdsStore,
			traitDetail: details.actionDetails,
			elementIds: {
				addRandomTraitButtonId: 'add-random-action-button',
				selectSingleTraitDropdownId: 'select-single-action-dropdown',
				addSingleTraitButtonId: 'add-single-action-button',
				removeAllTraitsButtonId: 'remove-all-actions-button',
			},
			editActionsUiParams: {
				actionAddedByGeneLookupDict: actionAddedByGeneLookup,
				geneIdsStore: dataStores.geneIdsStore
			},
		});

		const viewActionsUi = new ViewActionsUi({
			dataStore: dataStores.actionIdsStore,
			traitDetail: details.actionDetails,
			elementIds: {
				traitsTableId: 'view-and-edit-actions-table'
			},
			renderOnlyPrintableColumns: false,
			viewActionsUiParams: {
				actionAddedByGeneLookupDict: actionAddedByGeneLookup,
				geneIdsStore: dataStores.geneIdsStore
			},
		});

		eventBus.subscribe({
			eventTypes: [
				eventBus.eventTypes.initialiseDisplay,
				eventBus.eventTypes.traitIdsMutated,
				eventBus.eventTypes.creatureLevelMutated,
				eventBus.eventTypes.creatureNameMutated
			],
			subscriber: () => {
				resetCreatureUi.updateButtons();
				editNameUi.updateButtons();
				selectLevelUi.updateButtons();
				viewProfileUi.renderTable();

				editGenesUi.updateButtons();
				viewGenesUi.renderTable();

				editActionsUi.updateButtons();
				viewActionsUi.renderTable();
			}
		});
    }
}