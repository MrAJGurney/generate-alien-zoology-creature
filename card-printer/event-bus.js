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
        if (event === undefined) {
            throw new Error("Invalid event trigger: Event must be defined");
        }

        if (event.type === undefined) {
            throw new Error(`Invalid event trigger: Event must have a type: ${JSON.stringify(event)}`);
        }

        if (!Object.values(this.eventTypes).includes(event.type)) {
            throw new Error(`Invalid event trigger: Event type does not match the list of valid event types: ${JSON.stringify(event)}`);
        }

        this.subscribers.forEach(({ eventTypes, subscriber }) => {
            if (eventTypes.includes(event.type)) {
                subscriber(event);
            }
        });
    }
}