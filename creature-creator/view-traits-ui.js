import { assertIsNumber } from "../utilities/asserts.js";

class ViewTraitsUi {
	constructor({
		dataStore,
		traitDetail,
		elementIds: {
			traitsTableId
		},
		renderOnlyPrintableColumns,
	}) {
		this.dataStore = dataStore;
		this.traitDetail = traitDetail;

		this.traitsTable = document.getElementById(traitsTableId);

		this.renderOnlyPrintableColumns = renderOnlyPrintableColumns;
	}

	getImmutableTraitIds () {
		return [];
	}

	addCellsToRow () {
		throw new Error(`"addCellsToRow" does not have an implementation`);
	}

	renderTable () {
		const traitIds = this.dataStore.get();
		const traits = traitIds.map(traitId => this.traitDetail.find(({id}) => id === traitId));

        this.traitsTable.innerHTML = '';
        traits.forEach(trait => {
			const row = this.traitsTable.insertRow();
			this.addCellsToRow(row, trait);
        });
	}

	getDeleteRowButtonForTraitId (traitId) {
		assertIsNumber(traitId);

		const deleteRowButton = document.createElement('button');
		deleteRowButton.textContent = 'remove';
		deleteRowButton.onclick = this.onRemoveRowButtonClick.bind(this, traitId);
		deleteRowButton.disabled = this.getImmutableTraitIds().includes(traitId);
	
		return deleteRowButton
	}

	onTraitsRemoved () {
		// do nothing
	}

	onRemoveRowButtonClick (traitId) {
		this.dataStore.remove([traitId]);
		this.onTraitsRemoved([traitId]);
		this.dataStore.saveData();
	}
}

export class ViewGenesUi extends ViewTraitsUi{
	constructor ({
		dataStore,
		traitDetail,
		elementIds,
		renderOnlyPrintableColumns,
		viewGenesUiParams: {
			actionAddedByGeneLookupDict,
			actionIdsStore
		}
	}) {
		super({
			dataStore,
			traitDetail,
			elementIds,
			renderOnlyPrintableColumns
		});

		this.actionAddedByGeneLookupDict = actionAddedByGeneLookupDict;
		this.actionIdsStore = actionIdsStore;
	}

	addCellsToRow (row, {id, name, description, effect }) {
		row.insertCell(0).appendChild(document.createTextNode(id));
		row.insertCell(1).appendChild(document.createTextNode(name));
		if (!this.renderOnlyPrintableColumns) {
			row.insertCell(2).appendChild(document.createTextNode(description));
			row.insertCell(3).appendChild(document.createTextNode(effect));
			row.insertCell(4).appendChild(this.getDeleteRowButtonForTraitId(id));
		} else {
			row.insertCell(2).appendChild(document.createTextNode(effect));
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

export class ViewActionsUi extends ViewTraitsUi {
	constructor ({
		dataStore,
		traitDetail,
		elementIds,
		renderOnlyPrintableColumns,
		viewActionsUiParams: {
			actionAddedByGeneLookupDict,
			geneIdsStore
		}
	}) {
		super({
			dataStore,
			traitDetail,
			elementIds,
			renderOnlyPrintableColumns
		});

		this.actionAddedByGeneLookupDict = actionAddedByGeneLookupDict;
		this.geneIdsStore = geneIdsStore;
	}

	getImmutableTraitIds () {
		const currentGeneIds = this.geneIdsStore.get();
		const immutableActionIds = currentGeneIds
			.map(geneId => this.actionAddedByGeneLookupDict[geneId])
			.filter(lookup => lookup !== undefined)
			.map(lookup => lookup.actionId);

		return immutableActionIds;
	}

	addCellsToRow (row, {id, name, effect }) {
		row.insertCell(0).appendChild(document.createTextNode(id));
		row.insertCell(1).appendChild(document.createTextNode(name));
		row.insertCell(2).appendChild(document.createTextNode(effect));
		if (!this.renderOnlyPrintableColumns) {
			row.insertCell(3).appendChild(this.getDeleteRowButtonForTraitId(id));
			row.insertCell(4).appendChild(document.createTextNode(
				this.getImmutableTraitIds().includes(id)
					? Object.values(this.actionAddedByGeneLookupDict).find(({actionId}) => actionId === id).geneName
					: '-'
				)
			);
		}
	}
}
