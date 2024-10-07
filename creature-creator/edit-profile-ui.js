export class EditNameUi {
    #creatureNameStore;

    #nameTextInput;

    constructor ({
        creatureNameStore,
        elementIds: {
            nameTextInputId
        }
    }) {
        this.#creatureNameStore = creatureNameStore;

        this.#nameTextInput = document.getElementById(nameTextInputId);
        this.#nameTextInput.value = this.#creatureNameStore.get();

        this.#nameTextInput.addEventListener('input', this.#onNameTextInputInput.bind(this));
    }

    updateButtons () {
    	this.#nameTextInput.value = this.#creatureNameStore.get();
    }

    #onNameTextInputInput (event) {
        const nameText = event.target.value;
        this.#creatureNameStore.replace(nameText);
        this.#creatureNameStore.saveData();
    }
}

export class SelectLevelUi {
    #creatureLevelStore;

    #selectLevelDropdown;

    constructor ({
        creatureLevelStore,
        elementIds: {
            selectLevelDropdownId
        }
    }) {
        this.#creatureLevelStore = creatureLevelStore;

        this.#selectLevelDropdown = document.getElementById(selectLevelDropdownId);
        this.#selectLevelDropdown.addEventListener('change', this.#onSelectLevelDropdownChange.bind(this));

        // populate select level dropdown options
        Array(30)
            .fill(null)
            .map((_, index) => index + 1)
            .forEach(level => {
                const newOption = document.createElement('option');
                newOption.value = level;
                newOption.textContent = `level ${level}`;
                this.#selectLevelDropdown.appendChild(newOption);
            });
    }

    updateButtons () {
    	this.#selectLevelDropdown.value = this.#creatureLevelStore.get();
    }

    #onSelectLevelDropdownChange () {
		const selectedLevel = parseInt(this.#selectLevelDropdown.value);
        this.#creatureLevelStore.replace(selectedLevel);
        this.#creatureLevelStore.saveData();
    }
}
