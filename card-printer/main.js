import { EventBus } from "./event-bus.js";
import { CardStore } from "./card-store.js";
import { CardTable } from "./card-table.js";
import { PrintSheet } from "./print-sheet.js";

const main = () => {
    const eventBus = new EventBus();

    const cardStore = new CardStore({eventBus});

    new PrintSheet({cardStore, eventBus});

    new CardTable({cardStore, eventBus});

    window.addEventListener('popstate', () => {
        eventBus.triggerEvent(eventBus.eventTypes.idsRemoved);
    });
}

window.addEventListener('load', main);