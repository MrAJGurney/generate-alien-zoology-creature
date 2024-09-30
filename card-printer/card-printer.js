import { CREATURE_ACTION_CARDS } from "../source-files/creature-action-cards.js";
import { EVENT_TYPES } from "./event-types.js";
import { AddAndRemoveRowsPanel } from "./add-and-remove-rows-panel.js";

const SOURCE_TABLE_NAMES = {
    CREATURE_ACTION_CARDS: '7.2 Creatures: Action Cards table'
};

export class CardPrinter {
    constructor({
        cardsToPrintTableBody,
        creatureActionCardsSection
    }) {
        this.cardsToPrintTableBody = cardsToPrintTableBody;

        this.subscribers = [];

        this.subscribe({
            eventTypes: [EVENT_TYPES.ROWS_ADDED],
            subscriber: this.sortTable.bind(this)
        })

        this.addAndRemoveCreatureActionCards = new AddAndRemoveRowsPanel({
            section: creatureActionCardsSection,
            cards: CREATURE_ACTION_CARDS,
            title: SOURCE_TABLE_NAMES.CREATURE_ACTION_CARDS,
            addRows: this.addRows.bind(this),
            deleteAllRowsFromSourceTableName: this.deleteAllRowsFromSourceTableName.bind(this),
            subscribeToCardPrinter: this.subscribe.bind(this)
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

    sortTable () {
        const rows = Array.from(this.cardsToPrintTableBody.querySelectorAll('tr'));
        rows.sort((a, b) => {
            const aSourceTable = a.cells[0].textContent;
            const bSourceTable = b.cells[0].textContent;

            if (aSourceTable !== bSourceTable) {
                return aSourceTable - bSourceTable
            }

            const aCardNumber = parseInt(a.cells[1].textContent);
            const bCardNumber = parseInt(b.cells[1].textContent);

            return aCardNumber - bCardNumber;
        });

        this.cardsToPrintTableBody.innerHTML = '';
        rows.forEach(row => this.cardsToPrintTableBody.appendChild(row));
    }

    deleteAllRowsFromSourceTableName (sourceTableName) {
        this.cardsToPrintTableBody.querySelectorAll('tr').forEach(row => {
            if (row.querySelectorAll('td')[0].textContent === sourceTableName) {
                row.remove();
            }
        });

        this.triggerEvent({
            type: EVENT_TYPES.ROWS_REMOVED,
            tableRows: this.cardsToPrintTableBody.querySelectorAll('tr').values()
        });
    }

    addRows(rows) {
        rows.forEach(({ sourceTableName, cardId, cardName }) => {
            const row = this.cardsToPrintTableBody.insertRow();
            row.insertCell(0).appendChild(document.createTextNode(sourceTableName));
            row.insertCell(1).appendChild(document.createTextNode(cardId));
            row.insertCell(2).appendChild(document.createTextNode(cardName));
    
            const deleteRowButton = document.createElement('button');
            deleteRowButton.textContent = 'remove card';
            deleteRowButton.onclick = () => {
                row.remove();
                this.triggerEvent({
                    type: EVENT_TYPES.ROWS_REMOVED,
                    tableRows: this.cardsToPrintTableBody.querySelectorAll('tr').values()
                });
            };
            row.insertCell(3).appendChild(deleteRowButton);
        });

        this.triggerEvent({
            type: EVENT_TYPES.ROWS_ADDED,
            tableRows: this.cardsToPrintTableBody.querySelectorAll('tr').values()
        });
    }
}