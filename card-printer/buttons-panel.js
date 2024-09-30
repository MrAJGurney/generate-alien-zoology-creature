import { EVENT_TYPES } from "./event-types.js";

export class ButtonsPanel {
    constructor({
        section,
        cards,
        key,
        cardStore,
        subscribeToCardTable
    }) {
        this.section = section;
        this.cards = cards;
        this.key = key;
        this.cardStore = cardStore;
        this.subscribeToCardTable = subscribeToCardTable;

        this.subscribeToCardTable({
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
            this.cardStore.addCardIds(
                this.key,
                [this.addSingleDropdown.value]
            );
        });

        this.addAllButton.addEventListener('click', () => {
            this.cardStore.addCardIds(
                this.key,
                this.cards.map(({id}) => id)
            );
        });

        this.removeAllButton.addEventListener('click', () => {
            this.cardStore.removeCardIds(
                this.key,
                this.cardStore.getCardIds(this.key)
            );
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

    updateButtons () {
        const cardIdsExist = this.cardStore.getCardIds(this.key).length > 0;
        this.removeAllButton.disabled = !cardIdsExist;
    }
}