import { CardPrinter } from "./card-printer.js";

const main = () => {
    new CardPrinter({
        cardsToPrintTableBody: document.querySelector("#cards-to-print-table tbody"),
        creatureActionCardsSection: document.getElementById('creature-action-cards-section')
    });
}

window.addEventListener('load', main);