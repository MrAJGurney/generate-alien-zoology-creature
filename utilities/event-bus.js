import { assertIsString } from "../utilities/asserts.js";

export class EventBus {
    constructor ({ eventTypes }) {
        this.subscribers = []

        this.eventTypes = eventTypes;
    }

    subscribe ({eventTypes, subscriber}) {
        eventTypes.forEach(eventType => {
            assertIsString(eventType);

            if (!Object.values(this.eventTypes).includes(eventType)) {
                throw new Error(`Invalid event type: Event type does not match the list of valid event types: ${eventType}`);
            }
        });

        this.subscribers.push({ eventTypes, subscriber });
    }

    triggerEvent (event) {
        if (event === undefined) {
            throw new Error("Invalid event type: Event must be defined");
        }

        if (event.type === undefined) {
            throw new Error(`Invalid event type: Event must have a type: ${JSON.stringify(event)}`);
        }

        if (!Object.values(this.eventTypes).includes(event.type)) {
            throw new Error(`Invalid event type: Event type does not match the list of valid event types: ${JSON.stringify(event)}`);
        }

        this.subscribers.forEach(({ eventTypes, subscriber }) => {
            if (eventTypes.includes(event.type)) {
                subscriber(event);
            }
        });
    }
}