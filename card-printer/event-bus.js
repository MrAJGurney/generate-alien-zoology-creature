export class EventBus {
    constructor () {
        this.subscribers = []

        this.eventTypes = {
            idsMutated: 'ids mutated'
        };
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
}