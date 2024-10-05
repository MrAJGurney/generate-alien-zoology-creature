export class ButtonsPanel {
    constructor({
        eventBus,
        cardStore,
        cardData,
        eventTypeKey,
        section
    }) {
        this.eventBus = eventBus;
        this.cardStore = cardStore;
        this.cardData = cardData;
        this.eventTypeKey = eventTypeKey;
        this.section = section;

        this.eventBus.subscribe({
            eventTypes: [this.eventTypeKey],
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
            this.cardStore.add([parseInt(this.addSingleDropdown.value)]);
            this.cardStore.saveData();
        });

        this.addAllButton.addEventListener('click', () => {
            this.cardStore.add(this.cardData.map(({id}) => id));
            this.cardStore.saveData();
        });

        this.removeAllButton.addEventListener('click', () => {
            this.cardStore.replace([]);
            this.cardStore.saveData();
        });
    }

    populateDropdown() {
        this.cardData.forEach(({ id, name }) => {
            const newOption = document.createElement('option');
            newOption.value = id;
            newOption.textContent = `${id}: ${name}`;
            this.addSingleDropdown.appendChild(newOption);
        });
    }

    updateButtons () {
        const cardIdsExist = this.cardStore.get().length > 0;
        this.removeAllButton.disabled = !cardIdsExist;
    }
}