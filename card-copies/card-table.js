import { ButtonsPanel } from "./buttons-panel.js"

export class AddRemoveCards {
    #eventBus;
    #dataStores;
    #cardData;
    #cardDeckLabels;
    #cardsToPrintTableBody;
    #printCardsButton;

    constructor({
        eventBus,
        dataStores,
        cardData,
        cardDeckLabels,
    }) {
        this.#eventBus = eventBus;
        this.#dataStores = dataStores;
        this.#cardData = cardData;
        this.#cardDeckLabels = cardDeckLabels;

        new ButtonsPanel({
            eventBus: this.#eventBus,
            cardStore: this.#dataStores.actionCardIdsStore,
            cardData: this.#cardData.actionCards,
            section: document.getElementById('creature-action-cards-section')
        });

        this.#cardsToPrintTableBody = document.querySelector("#cards-to-print-table tbody");

        this.#printCardsButton = document.getElementById('print-cards-button'),
        this.#printCardsButton.addEventListener(
            'click',
            () => {window.print()}
        );

        eventBus.subscribe({
			eventTypes: [
				eventBus.eventTypes.initialiseDisplay,
				eventBus.eventTypes.actionCardIdsMutated
			],
			subscriber: () => {
				this.updateButtons();
				this.renderTable();
			}
		});
    }

    updateButtons () {
        const creatureActionCardIds = this.#dataStores.actionCardIdsStore.get();

        this.#printCardsButton.disabled = creatureActionCardIds.length === 0;
    }

    renderTable () {
        const creatureActionCardIds = this.#dataStores.actionCardIdsStore.get();
        const creatureActionCards = creatureActionCardIds.map(actionCardId => this.#cardData.actionCards.find(({id}) => actionCardId === id));

        this.#cardsToPrintTableBody.innerHTML = '';
        creatureActionCards.forEach(({id, name}) => {
            const row = this.#cardsToPrintTableBody.insertRow();
            row.insertCell(0).appendChild(document.createTextNode(this.#cardDeckLabels.actionDeckLabel));
            row.insertCell(1).appendChild(document.createTextNode(id));
            row.insertCell(2).appendChild(document.createTextNode(name));

            const deleteRowButton = document.createElement('button');
            deleteRowButton.textContent = 'remove';
            deleteRowButton.onclick = () => {
                this.#dataStores.actionCardIdsStore.remove([id])
                this.#dataStores.actionCardIdsStore.saveData();
            };
            row.insertCell(3).appendChild(deleteRowButton);
        });
    }
}