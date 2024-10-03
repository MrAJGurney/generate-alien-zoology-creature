import { CREATURE_ACTION_CARDS } from "../source-files/creature-action-cards.js";
import { ButtonsPanel } from "./buttons-panel.js";

export class CardTable {
    constructor({cardStore, eventBus}) {
        this.cardStore = cardStore;

        this.eventBus = eventBus;

        this.creatureActionCardsButtonsPanel = new ButtonsPanel({
            section: document.getElementById('creature-action-cards-section'),
            cardStore: this.cardStore,
            eventBus: this.eventBus
        });

        this.cardsToPrintTableBody = document.querySelector("#cards-to-print-table tbody");

        this.printCardsButton = document.getElementById('print-cards-button'),
        this.printCardsButton.addEventListener(
            'click',
            () => {window.print()}
        );

        this.eventBus.subscribe({
            eventTypes: [this.eventBus.eventTypes.idsMutated],
            subscriber: this.updateButtons.bind(this)
        })

        this.eventBus.subscribe({
            eventTypes: [this.eventBus.eventTypes.idsMutated],
            subscriber: this.renderTable.bind(this)
        })

        this.eventBus.triggerEvent({
            type: this.eventBus.eventTypes.idsMutated
        });
    }

    reloadUrl () {
        this.cardStore.reloadUrl();

        this.eventBus.triggerEvent({
            type: this.eventBus.eventTypes.idsMutated
        });
    }

    updateButtons () {
        const creatureActionCardIds = this.cardStore.getCardIds(this.cardStore.cardDetails.creatureActions.key);

        this.printCardsButton.disabled = creatureActionCardIds.length === 0;
    }

    renderTable () {
        const creatureActionCardIds = this.cardStore.getCardIds(this.cardStore.cardDetails.creatureActions.key);
        const creatureActionCards = creatureActionCardIds.map(actionCardId => CREATURE_ACTION_CARDS.find(({id}) => actionCardId === id));

        this.cardsToPrintTableBody.innerHTML = '';
        creatureActionCards.forEach(({id, name}) => {
            const row = this.cardsToPrintTableBody.insertRow();
            row.insertCell(0).appendChild(document.createTextNode(this.cardStore.cardDetails.creatureActions.sourceTableName));
            row.insertCell(1).appendChild(document.createTextNode(id));
            row.insertCell(2).appendChild(document.createTextNode(name));

            const deleteRowButton = document.createElement('button');
            deleteRowButton.textContent = 'remove';
            deleteRowButton.onclick = () => this.cardStore.removeCardIds(this.cardStore.cardDetails.creatureActions.key, [id]);
            row.insertCell(3).appendChild(deleteRowButton);
        });
    }
}