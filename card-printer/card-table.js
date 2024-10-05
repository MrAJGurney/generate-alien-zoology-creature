import { ButtonsPanel } from "./buttons-panel.js"

export class AddRemoveCards {
    #eventBus;
    #dataStores;
    #cardData;
    #cardDeckLabels;
    #eventTypeKeys;
    #creatureActionCardsButtonsPanel;
    #cardsToPrintTableBody;
    #printCardsButton;

    constructor({
        eventBus,
        dataStores,
        cardData,
        cardDeckLabels,
        eventTypeKeys
    }) {
        this.#eventBus = eventBus;
        this.#dataStores = dataStores;
        this.#cardData = cardData;
        this.#cardDeckLabels = cardDeckLabels;
        this.#eventTypeKeys = eventTypeKeys;

        this.#creatureActionCardsButtonsPanel = new ButtonsPanel({
            eventBus: this.#eventBus,
            cardStore: this.#dataStores.actionIdsStore,
            cardData: this.#cardData.actionCards,
            eventTypeKey: eventTypeKeys.actionIdsMutated,
            section: document.getElementById('creature-action-cards-section')
        });

        this.#cardsToPrintTableBody = document.querySelector("#cards-to-print-table tbody");

        this.#printCardsButton = document.getElementById('print-cards-button'),
        this.#printCardsButton.addEventListener(
            'click',
            () => {window.print()}
        );

        this.#eventBus.subscribe({
            eventTypes: [this.#eventTypeKeys.actionIdsMutated],
            subscriber: this.updateButtons.bind(this)
        })

        this.#eventBus.subscribe({
            eventTypes: [this.#eventTypeKeys.actionIdsMutated],
            subscriber: this.renderTable.bind(this)
        })
    }

    updateButtons () {
        const creatureActionCardIds = this.#dataStores.actionIdsStore.get();

        this.#printCardsButton.disabled = creatureActionCardIds.length === 0;
    }

    renderTable () {
        const creatureActionCardIds = this.#dataStores.actionIdsStore.get();
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
                this.#dataStores.actionIdsStore.remove([id])
                this.#dataStores.actionIdsStore.saveData();
            };
            row.insertCell(3).appendChild(deleteRowButton);
        });
    }
}