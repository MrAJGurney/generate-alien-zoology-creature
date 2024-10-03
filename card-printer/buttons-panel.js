export class ButtonsPanel {
    constructor({
        section,
        cardStore,
        eventBus
    }) {
        this.section = section;
        this.cardStore = cardStore;
        this.eventBus = eventBus;

        this.eventBus.subscribe({
            eventTypes: [this.eventBus.eventTypes.idsMutated],
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
                this.cardStore.cardDetails.creatureActions.key,
                [this.addSingleDropdown.value]
            );
        });

        this.addAllButton.addEventListener('click', () => {
            this.cardStore.addCardIds(
                this.cardStore.cardDetails.creatureActions.key,
                this.cardStore.cardDetails.creatureActions.data.map(({id}) => id)
            );
        });

        this.removeAllButton.addEventListener('click', () => {
            this.cardStore.removeCardIds(
                this.cardStore.cardDetails.creatureActions.key,
                this.cardStore.getCardIds(this.cardStore.cardDetails.creatureActions.key)
            );
        });
    }

    populateDropdown() {
        this.cardStore.cardDetails.creatureActions.data.forEach(({ id, name }) => {
            const newOption = document.createElement('option');
            newOption.value = id;
            newOption.textContent = `${id}: ${name}`;
            this.addSingleDropdown.appendChild(newOption);
        });
    }

    updateButtons () {
        const cardIdsExist = this.cardStore.getCardIds(this.cardStore.cardDetails.creatureActions.key).length > 0;
        this.removeAllButton.disabled = !cardIdsExist;
    }
}