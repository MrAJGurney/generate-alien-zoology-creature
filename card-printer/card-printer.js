import { CREATURE_ACTION_CARDS } from "../source-files/creature-action-cards.js";

const SOURCE_TABLES = {
    CREATURE_ACTION_CARDS: '7.2 Creatures: Action Cards table'
};

class CardPrinter {
    constructor({
        cardsToPrintTableBody,
        creatureActionCardAddSingleDropdown,
        creatureActionCardAddSingleButton,
        creatureActionCardsAddAllButton,
        creatureActionCardsRemoveAllButton,
    }) {
        this.cardsToPrintTableBody = cardsToPrintTableBody;

        this.creatureActionCard = {
            addSingleDropdown: creatureActionCardAddSingleDropdown,
            addSingleButton: creatureActionCardAddSingleButton,
            addAllButton: creatureActionCardsAddAllButton,
            removeAllButton: creatureActionCardsRemoveAllButton,
        }

        CardPrinter.populateDropdown(this.creatureActionCard.addSingleDropdown, CREATURE_ACTION_CARDS);

        this.creatureActionCard.addSingleDropdown.addEventListener('change', () => {
            if (this.creatureActionCard.addSingleDropdown.value !== "") {
                this.creatureActionCard.addSingleButton.disabled = false;
            }
        });

        this.creatureActionCard.addSingleButton.addEventListener('click', () => {
            const creatureActionCard = CREATURE_ACTION_CARDS.find(({id}) => id.toString() === this.creatureActionCard.addSingleDropdown.value);
            this.addRow(SOURCE_TABLES.CREATURE_ACTION_CARDS, creatureActionCard.id, creatureActionCard.name);

            this.handleRowAdded();
        });

        this.creatureActionCard.addAllButton.addEventListener('click', () => {
            CREATURE_ACTION_CARDS.forEach(creatureActionCard => {
                this.addRow(SOURCE_TABLES.CREATURE_ACTION_CARDS, creatureActionCard.id, creatureActionCard.name);
            });

            this.handleRowAdded();
        });

        this.creatureActionCard.removeAllButton.addEventListener('click', () => {
            this.cardsToPrintTableBody.querySelectorAll('tr').forEach(row => row.remove());

            this.handleRowDeleted();
        });
    }

    static populateDropdown(dropdown, cards) {
        cards.forEach(({ id, name }) => {
            const newOption = document.createElement('option');
            newOption.value = id;
            newOption.textContent = `${id}: ${name}`;
            dropdown.appendChild(newOption);
        });
    }

    updateButtons () {
        const hasCreatureActionCards = this.cardsToPrintTableBody.querySelectorAll('tr').values().some(row => {
            const cells = row.querySelectorAll('td');
            const sourceTableName = cells[0].textContent;
            return sourceTableName === SOURCE_TABLES.CREATURE_ACTION_CARDS
        });

        this.creatureActionCard.removeAllButton.disabled = !hasCreatureActionCards;
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

    handleRowAdded () {
        this.updateButtons();
        this.sortTable();
    }

    handleRowDeleted () {
        this.updateButtons();
    }

    deleteRow (row) {
        row.remove();
        this.handleRowDeleted();
    }

    addRow(sourceTableName, cardId, cardName) {
        const row = this.cardsToPrintTableBody.insertRow();
        row.insertCell(0).appendChild(document.createTextNode(sourceTableName));
        row.insertCell(1).appendChild(document.createTextNode(cardId));
        row.insertCell(2).appendChild(document.createTextNode(cardName));

        const deleteRowButton = document.createElement('button');
        deleteRowButton.textContent = 'remove card';
        deleteRowButton.onclick = () => this.deleteRow(row);
        row.insertCell(3).appendChild(deleteRowButton);
        this.handleRowAdded();
    }
}

const main = () => {
    const cardPrinter = new CardPrinter({
        cardsToPrintTableBody: document.querySelector("#cards-to-print-table tbody"),
        creatureActionCardAddSingleDropdown: document.getElementById('creature-action-card-add-single-dropdown'),
        creatureActionCardAddSingleButton: document.getElementById('creature-action-card-add-single-button'),
        creatureActionCardsAddAllButton: document.getElementById('creature-action-cards-add-all-button'),
        creatureActionCardsRemoveAllButton: document.getElementById('creature-action-cards-remove-all-button')
    });
}

window.addEventListener('load', main);