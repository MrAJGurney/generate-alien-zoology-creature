import { CREATURE_ACTION_CARDS } from "../source-files/creature-action-cards.js";
import { EVENT_TYPES } from "./event-types.js";
import { ButtonsPanel } from "./buttons-panel.js";
import { CardStore, CARD_DETAILS } from "./card-store.js";

export class CardTable {
    constructor({
        cardsToPrintTableBody,
        creatureActionCardsSection
    }) {
        this.cardsToPrintTableBody = cardsToPrintTableBody;

        this.subscribers = [];

        this.subscribe({
            eventTypes: [EVENT_TYPES.IDS_ADDED, EVENT_TYPES.IDS_REMOVED],
            subscriber: this.renderTable.bind(this)
        })

        this.cardStore = new CardStore({
            triggerEvent: this.triggerEvent.bind(this),
        });

        this.creatureActionCardsButtonsPanel = new ButtonsPanel({
            section: creatureActionCardsSection,
            cards: CREATURE_ACTION_CARDS,
            key: CARD_DETAILS.CREATURE_ACTIONS.KEY,
            cardStore: this.cardStore,
            subscribeToCardTable: this.subscribe.bind(this),
        });

        this.triggerEvent({
            type: EVENT_TYPES.IDS_ADDED
        });

        this.renderTable();
    }

    reloadUrl () {
        this.cardStore.reloadUrl();

        this.triggerEvent({
            type: EVENT_TYPES.IDS_ADDED
        });
    }

    subscribe ({eventTypes, subscriber}) {
        this.subscribers.push({ eventTypes, subscriber });
    }

    triggerEvent (event) {
        this.subscribers.forEach(({ eventTypes, subscriber }) => {
            if (eventTypes.includes(event.type)) {
                subscriber(event);
            }
        });
    }

    renderTable () {
        const creatureActionCardIds = this.cardStore.getCardIds(CARD_DETAILS.CREATURE_ACTIONS.KEY);
        const creatureActionCards = creatureActionCardIds.map(actionCardId => CREATURE_ACTION_CARDS.find(({id}) => actionCardId === id));

        this.cardsToPrintTableBody.innerHTML = '';
        creatureActionCards.forEach(({id, name}) => {
            const row = this.cardsToPrintTableBody.insertRow();
            row.insertCell(0).appendChild(document.createTextNode(CARD_DETAILS.CREATURE_ACTIONS.SOURCE_TABLE_NAME));
            row.insertCell(1).appendChild(document.createTextNode(id));
            row.insertCell(2).appendChild(document.createTextNode(name));

            const deleteRowButton = document.createElement('button');
            deleteRowButton.textContent = 'remove';
            deleteRowButton.onclick = () => this.cardStore.removeCardIds(CARD_DETAILS.CREATURE_ACTIONS.KEY, [id]);
            row.insertCell(3).appendChild(deleteRowButton);
        });
    }
}