import { CreateAndEditCreature } from "./create-and-edit-creature.js";


const main = () => {
    const createAndEditCreature = new CreateAndEditCreature();

	window.addEventListener('popstate', () => {
        createAndEditCreature.reloadUrl();
    });
}

window.addEventListener('load', main);