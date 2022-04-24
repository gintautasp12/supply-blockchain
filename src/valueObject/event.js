const TEMPERATURE = 'temperature'; 
const HUMIDITY = 'humidity'; 
const LIGHT = 'light'; 
const SPEED = 'speed';
const LOCATION = 'location';

class Event {
    constructor(
        id,
        createdAt,
        eventType,
        value,
        objectId
    ) {
        this.id = id;
        this.createdAt = createdAt;
        this.eventType = eventType;
        this.value = value;
        this.objectId = objectId;
    }

    getId = () => this.id;

    getCreatedAt = () => this.createdAt;

    getEventType = () => this.eventType;

    getValue = () => this.value;

    getObjectId = () => this.objectId;
}

export {
    Event,
    TEMPERATURE,
    HUMIDITY,
    LOCATION,
    LIGHT,
    SPEED
}
