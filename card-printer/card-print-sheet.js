export class CardPrintSheet {
    constructor ({
        eventBus,
        dataStores,
        cardData,
        eventTypeKeys
    }) {
        this.eventBus = eventBus;
        this.dataStores = dataStores;
        this.cardData = cardData;
        this.eventTypeKeys = eventTypeKeys;

        this.cardContainer = document.getElementsByClassName('card-container')[0];

        this.eventBus.subscribe({
            eventTypes: [this.eventTypeKeys.actionIdsMutated],
            subscriber: this.renderCards.bind(this)
        });
    }

    buildActionCards () {
        const actionIds = this.dataStores.actionIds.get();

        const actionCardDetails = actionIds.map(actionId => {
            const {id, name, prerequisite, effect, special} = this.cardData.actionCards.find(({id}) => actionId === id);

            return {
                header: `Alien Creature Action Card (${id.toString().padStart(2, '0')})`,
                title: name,
                ...(prerequisite && {subtitle: prerequisite}),
                body: effect
                    .split('\n')
                    .map(sentence => sentence.trim())
                    .filter(sentence => sentence.length > 0),
                special
            }
        });

        return actionCardDetails;
    }

    renderCards () {
        this.cardContainer.innerHTML = '';

        this.buildActionCards().forEach(({header, title, subtitle, body, special}) => {
            const card = document.createElement('div');
            card.classList.add('card');

            const headerElement = document.createElement("p");
            headerElement.appendChild(document.createTextNode(header));
            headerElement.classList.add('header');
            card.appendChild(headerElement);

            const titleElement = document.createElement("p");
            titleElement.appendChild(document.createTextNode(title));
            titleElement.classList.add('title');
            card.appendChild(titleElement);

            if (subtitle) {
                const subtitleElement = document.createElement("p");
                subtitleElement.appendChild(document.createTextNode(subtitle));
                subtitleElement.classList.add('subtitle');
                card.appendChild(subtitleElement);
            }

            const cardBodyElement = document.createElement("div");
            cardBodyElement.classList.add('body');
            body.map(sentence => {
                const sentenceElement = document.createElement("p");
                sentenceElement.appendChild(document.createTextNode(sentence));
                return sentenceElement;
            }).forEach((sentenceElement, index) => {
                if (index > 0) {
                    const spacerElement = document.createElement("div");
                    spacerElement.classList.add('spacer');
                    cardBodyElement.appendChild(spacerElement)
                }
                cardBodyElement.appendChild(sentenceElement);
            })
            card.appendChild(cardBodyElement);

            if (special) {
                // This is the only table within a card body, and only exists for one card: creature action card 09 - A baby hatches 🥚
                if (special.table) {
                    const headerRow = document.createElement('tr');
                    const bodyRow = document.createElement('tr');

                    special.table.forEach(([header, body], index) => {
                        const headerCell = document.createElement('th');
                        headerCell.appendChild(document.createTextNode(header));
                        headerRow.appendChild(headerCell);

                        const bodyCell = document.createElement('td');
                        bodyCell.appendChild(document.createTextNode(body));
                        bodyRow.appendChild(bodyCell);
                    });

                    const spacerElement = document.createElement("div");
                    spacerElement.classList.add('spacer');
                    cardBodyElement.appendChild(spacerElement)

                    const tableElement = document.createElement('table');
                    tableElement.classList.add('profile-table');
                    tableElement.appendChild(headerRow);
                    tableElement.appendChild(bodyRow);
                    cardBodyElement.appendChild(tableElement);
                }
            }

            this.cardContainer.appendChild(card);
        })
    }
}