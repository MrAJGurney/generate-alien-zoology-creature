import { CREATURE_GENES } from "../source-files/creature-genes.js";
import { CREATURE_ACTION_CARDS } from "../source-files/creature-action-cards.js";

export const EVENT_TYPES = {
	ROWS_ADDED: 'rows added',
	ROWS_REMOVED: 'rows added'
};

class ButtonPanel {
	constructor({
		options,
		section,
		hasDescription
	}) {
		this.options = options;
		this.section = section;
		this.hasDescription = hasDescription;

        this.addSingleDropdown = section.getElementsByClassName('add-single-dropdown')[0];
        this.addSingleButton = section.getElementsByClassName('add-single-button')[0];
        this.removeAllButton = section.getElementsByClassName('remove-all-button')[0];
        this.table = section.querySelector('.table tbody');

        this.populateDropdown();

        this.addSingleDropdown.addEventListener('change', () => this.updateButtons());

        this.addSingleButton.addEventListener('click', () => {
            const option = this.options.find(({id}) => id.toString() === this.addSingleDropdown.value);
            this.addRows([option]);
        });

        this.removeAllButton.addEventListener('click', () => this.removeAllRows(this.title));
	}

    populateDropdown() {
        this.options.forEach(({ id, name }) => {
            const newOption = document.createElement('option');
            newOption.value = id;
            newOption.textContent = `${id}: ${name}`;
            this.addSingleDropdown.appendChild(newOption);
        });
    }

    addRows(options) {
        options.forEach(({ id, name, description, effect }) => {
            const row = this.table.insertRow();
            row.insertCell(0).appendChild(document.createTextNode(id));
            row.insertCell(1).appendChild(document.createTextNode(name));

			const offset = this.hasDescription ? 1 : 0;

			if (this.hasDescription) {
				row.insertCell(2).appendChild(document.createTextNode(description));
			}

            row.insertCell(2 + offset).appendChild(document.createTextNode(effect));

            const deleteRowButton = document.createElement('button');
            deleteRowButton.textContent = 'remove';
            deleteRowButton.onclick = () => {
                row.remove();
                this.updateButtons();
            };
            row.insertCell(3 + offset).appendChild(deleteRowButton);
        });

		this.sortTable();
		this.updateButtons();
    }

	removeAllRows () {
		this.table.querySelectorAll('tr').forEach(row => row.remove());

		this.updateButtons();
	}

	updateButtons () {
		const tableRows = this.table.querySelectorAll('tr');

		// update add single dropdown
		const optionIndicesToDisable = [];
		const optionIndicesToEnable = [];
		 Array.from(this.addSingleDropdown.options).forEach(
			(option) => {
				// .index
				const shouldBeDisabled = Array.from(tableRows).map(row => row.querySelectorAll('td')[0].textContent).includes(option.value);
				if (shouldBeDisabled) {
					optionIndicesToDisable.push(option.index);
				} else {
					optionIndicesToEnable.push(option.index);
				}
			}
		)
		optionIndicesToDisable.forEach(index => this.addSingleDropdown.options.item(index).disabled = true);
		optionIndicesToEnable.forEach(index => this.addSingleDropdown.options.item(index).disabled = false);

		// update add single button
		const dropdownSelectionValid = this.addSingleDropdown.value !== "" && !this.addSingleDropdown.options[this.addSingleDropdown.selectedIndex].disabled;
		this.addSingleButton.disabled = !dropdownSelectionValid;

		// update remove all button
		const tableHasRows = tableRows.length >= 1;
        this.removeAllButton.disabled = !tableHasRows;
    }

	sortTable () {
        const rows = Array.from(this.table.querySelectorAll('tr'));
        rows.sort((a, b) => {
            const aId = a.cells[0].textContent;
            const bId = b.cells[0].textContent;

			return aId - bId;
        });

        this.table.innerHTML = '';
        rows.forEach(row => this.table.appendChild(row));
    }
}

class CreateAndEditCreature {
	constructor({
		genesSection,
		actionCardsSection
    }) {
		this.genes = new ButtonPanel({
			options: CREATURE_GENES,
			section: genesSection,
			hasDescription: true
		});
		this.actions = new ButtonPanel({
			options: CREATURE_ACTION_CARDS,
			section: actionCardsSection,
			hasDescription: false
		});
    }
}



const main = () => {
    new CreateAndEditCreature({
		genesSection: document.getElementById('genes-section'),
		actionCardsSection: document.getElementById('action-cards-section')
	});
}

window.addEventListener('load', main);