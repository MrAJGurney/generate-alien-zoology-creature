import { CardTable } from "./card-table.js";

const main = () => {
    new CardTable({
        cardsToPrintTableBody: document.querySelector("#cards-to-print-table tbody"),
        creatureActionCardsSection: document.getElementById('creature-action-cards-section')
    });
}

window.addEventListener('load', main);