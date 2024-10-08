export class NameAndLevelUi {
    #dataStores;

    #nameTextDiv;
    #levelTextDiv;

    constructor ({
        dataStores,
        elementIds: {
            nameTextDivId,
            levelTextDivId
        },
    }) {
        this.#dataStores = dataStores;

        this.#nameTextDiv = document.getElementById(nameTextDivId);
        this.#levelTextDiv = document.getElementById(levelTextDivId);
    }

    renderTable () {
        const name = this.#dataStores.creatureNameStore.get();
        const level = this.#dataStores.creatureLevelStore.get();

        this.#nameTextDiv.textContent = name;
        this.#levelTextDiv.textContent = level.toString();
    }
}

export class ViewProfileUi {
    #dataStores;
    #profileDetails
    #profileChangeFromGeneLookup;

    #profileTableBody;

    constructor ({
        dataStores,
        profileDetails,
		elementIds: {
			profileTableBodyId
		},
        profileChangeFromGeneLookup
    }) {
        this.#dataStores = dataStores;
        this.#profileDetails = profileDetails;
        this.#profileChangeFromGeneLookup = profileChangeFromGeneLookup;

        this.#profileTableBody = document.getElementById(profileTableBodyId);
    }

    renderTable () {
        const geneIds = this.#dataStores.geneIdsStore.get();
        const profileChanges = geneIds
            .map(geneId => this.#profileChangeFromGeneLookup[geneId])
            .filter(lookup => lookup !== undefined)
            .map(lookup => Object.entries(lookup))
            .flat();

        this.#profileTableBody.innerHTML = '';

        const firstRow = this.#profileTableBody.insertRow();
    	const firstRowDescriptionCell = firstRow.insertCell(0)
    	firstRowDescriptionCell.appendChild(document.createTextNode("(base stats before modifiers)"));
    	firstRow.insertCell(1).appendChild(document.createTextNode(`${this.#profileDetails.MOV}`));
    	firstRow.insertCell(2).appendChild(document.createTextNode(`${this.#profileDetails.A}+`));
    	firstRow.insertCell(3).appendChild(document.createTextNode(`${this.#profileDetails.SHO}+`));
    	firstRow.insertCell(4).appendChild(document.createTextNode(`${this.#dataStores.creatureLevelStore.get()}`));
    	firstRow.insertCell(5).appendChild(document.createTextNode(`${this.#profileDetails.DEF}+`));
    	firstRow.insertCell(6).appendChild(document.createTextNode(`${this.#profileDetails.NERVE}+`));
    	firstRow.insertCell(7).appendChild(document.createTextNode(`${this.#profileDetails.ESC}+`));

        const adjustedProfile = Object
    		.entries(this.#profileDetails)
    		.concat([['HP', this.#dataStores.creatureLevelStore.get()]])
            .reduce((adjustedProfile, [statName, startingStatValue]) => ({
    			...adjustedProfile,
    			[statName]: profileChanges
                    .map(([statChangeName, statChangeValue]) => (statChangeName === statName) ? statChangeValue : 0)
                    .reduce((newStatTotal, statChange) => newStatTotal + statChange, 0)
                    + startingStatValue
    		}), {});

        const secondRow = this.#profileTableBody.insertRow();
    	const secondRowDescriptionCell = secondRow.insertCell(0)
    	secondRowDescriptionCell.appendChild(document.createTextNode("(after modifiers)"));
    	secondRow.insertCell(1).appendChild(document.createTextNode(`${adjustedProfile.MOV}`));
    	secondRow.insertCell(2).appendChild(document.createTextNode(`${adjustedProfile.A}+`));
    	secondRow.insertCell(3).appendChild(document.createTextNode(`${adjustedProfile.SHO}+`));
    	secondRow.insertCell(4).appendChild(document.createTextNode(`${adjustedProfile.HP}`));
    	secondRow.insertCell(5).appendChild(document.createTextNode(`${adjustedProfile.DEF}+`));
    	secondRow.insertCell(6).appendChild(document.createTextNode(`${adjustedProfile.NERVE}+`));
    	secondRow.insertCell(7).appendChild(document.createTextNode(`${adjustedProfile.ESC}+`));
    }
}