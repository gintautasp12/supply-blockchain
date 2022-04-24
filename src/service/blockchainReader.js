import { Event, TEMPERATURE, HUMIDITY, LIGHT, SPEED, LOCATION } from '../valueObject/event';
import contractProvider from './contractProvider';

class BlockChainReader {
    readEvents = async (id) => {
        if (!id) {
            return [];
        }

        const contract = contractProvider.getContract();
        const result = await contract.methods.getEventsByObjectId(id).call();
        
        return result.map(event => new Event(
            event.id,
            new Date(1000 * Number(event.createdAt)),
            this.resolveEventType(event.eventType),
            event.value,
            event.objectId
        ));
    }

    resolveEventType = (typeId) => {
        let eventType = '';
        
        switch (typeId) {
            case '0':
                eventType = TEMPERATURE;
                break;
            case '1':
                eventType = HUMIDITY;
                break;
            case '2':
                eventType = LIGHT;
                break;
            case '3':
                eventType = SPEED;
                break;
            case '4':
                eventType = LOCATION;
                break;
            default:
                break;
        }

        return eventType;
    }
}

export default new BlockChainReader();
