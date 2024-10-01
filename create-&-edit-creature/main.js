import { CreateAndEditCreature } from "./create-and-edit-creature.js";


const main = () => {
    const createAndEditCreature = new CreateAndEditCreature({
		genesSection: document.getElementById('genes-section'),
		actionsSection: document.getElementById('action-section')
	});

	window.addEventListener('popstate', () => {
        createAndEditCreature.reloadUrl();
    });
}

window.addEventListener('load', main);