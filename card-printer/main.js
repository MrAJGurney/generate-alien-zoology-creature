import { CardTable } from "./card-table.js";
import { EVENT_TYPES } from "./event-types.js";

const main = () => {
    const cardTable = new CardTable({
        cardsToPrintTableBody: document.querySelector("#cards-to-print-table tbody"),
        creatureActionCardsSection: document.getElementById('creature-action-cards-section')
    });

    window.addEventListener('popstate', () => {
        cardTable.reloadUrl();
    });
}

window.addEventListener('load', main);