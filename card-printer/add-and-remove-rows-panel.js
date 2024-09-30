import { EVENT_TYPES } from "./event-types.js";

export class AddAndRemoveRowsPanel {
    constructor({section, cards, title, addRows, deleteAllRowsFromSourceTableName, subscribeToCardPrinter}) {
        this.section = section;
        this.cards = cards;
        this.title = title;
        this.addRows = addRows;
        this.deleteAllRowsFromSourceTableName = deleteAllRowsFromSourceTableName;
        this.subscribeToCardPrinter = subscribeToCardPrinter;

        this.subscribeToCardPrinter({
            eventTypes: [EVENT_TYPES.ROWS_ADDED, EVENT_TYPES.ROWS_REMOVED],
            subscriber: this.updateButtons.bind(this)
        })

        this.addSingleDropdown = section.getElementsByClassName('add-single-dropdown')[0],
        this.addSingleButton = section.getElementsByClassName('add-single-button')[0],
        this.addAllButton = section.getElementsByClassName('add-all-button')[0],
        this.removeAllButton = section.getElementsByClassName('remove-all-button')[0]

        this.populateDropdown();

        this.addSingleDropdown.addEventListener('change', () => {
            if (this.addSingleDropdown.value !== "") {
                this.addSingleButton.disabled = false;
            }
        });

        this.addSingleButton.addEventListener('click', () => {
            const creatureActionCard = this.cards.find(({id}) => id.toString() === this.addSingleDropdown.value);
            this.addRows([{ sourceTableName: this.title, cardId: creatureActionCard.id, cardName: creatureActionCard.name }]);
        });

        this.addAllButton.addEventListener('click', () => {
            this.addRows(
                this.cards.values().map(creatureActionCard => ({ sourceTableName: this.title, cardId: creatureActionCard.id, cardName: creatureActionCard.name }))
            );
        });

        this.removeAllButton.addEventListener('click', () => {
            this.deleteAllRowsFromSourceTableName(this.title);
        });
    }

    populateDropdown() {
        this.cards.forEach(({ id, name }) => {
            const newOption = document.createElement('option');
            newOption.value = id;
            newOption.textContent = `${id}: ${name}`;
            this.addSingleDropdown.appendChild(newOption);
        });
    }

    updateButtons (event) {
        const hasRelevantActionCards = event.tableRows.some(row => {
            const cells = row.querySelectorAll('td');
            const sourceTableName = cells[0].textContent;
            return sourceTableName === this.title;
        });

        this.removeAllButton.disabled = !hasRelevantActionCards;
    }
}