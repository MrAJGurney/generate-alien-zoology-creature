export class ButtonsPanel {
    #cardStore;
    #cardData;
    #section;
    #addSingleDropdown;
    #addSingleButton;
    #addAllButton;
    #removeAllButton;

    constructor({
        eventBus,
        cardStore,
        cardData,
        section
    }) {
        this.#cardStore = cardStore;
        this.#cardData = cardData;
        this.#section = section;

        eventBus.subscribe({
			eventTypes: [
				eventBus.eventTypes.initialiseDisplay,
				eventBus.eventTypes.actionCardIdsMutated
			],
			subscriber: this.updateButtons.bind(this)
		});

        this.#addSingleDropdown = this.#section.getElementsByClassName('add-single-dropdown')[0],
        this.#addSingleButton = this.#section.getElementsByClassName('add-single-button')[0],
        this.#addAllButton = this.#section.getElementsByClassName('add-all-button')[0],
        this.#removeAllButton = this.#section.getElementsByClassName('remove-all-button')[0]

        this.populateDropdown();

        this.#addSingleDropdown.addEventListener('change', () => {
            if (this.#addSingleDropdown.value !== "") {
                this.#addSingleButton.disabled = false;
            }
        });

        this.#addSingleButton.addEventListener('click', () => {
            this.#cardStore.add([parseInt(this.#addSingleDropdown.value)]);
            this.#cardStore.saveData();
        });

        this.#addAllButton.addEventListener('click', () => {
            this.#cardStore.add(this.#cardData.map(({id}) => id));
            this.#cardStore.saveData();
        });

        this.#removeAllButton.addEventListener('click', () => {
            this.#cardStore.replace([]);
            this.#cardStore.saveData();
        });
    }

    populateDropdown() {
        this.#cardData.forEach(({ id, name }) => {
            const newOption = document.createElement('option');
            newOption.value = id;
            newOption.textContent = `${id}: ${name}`;
            this.#addSingleDropdown.appendChild(newOption);
        });
    }

    updateButtons () {
        const cardIdsExist = this.#cardStore.get().length > 0;
        this.#removeAllButton.disabled = !cardIdsExist;
    }
}