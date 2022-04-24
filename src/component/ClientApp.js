import React from 'react';
import blockchainReader from '../service/blockchainReader';
import './ClientApp.css';
import { LOCATION } from '../valueObject/event';

class App extends React.Component {
    state = { objectEvents: [], query: null };

    componentDidMount = async () => {
        try {
            const query = this.getQueryParams();
            const events = await blockchainReader.readEvents(query.objectId);
            
            this.setState({ objectEvents: events, query: query });
        } catch (error) {
            console.log(error);
        }
    }

    render = () => {
        return (
            <div className='mt-3 p-2 card container events-container'>
                <h1>Events for object { this.state.query?.objectId }</h1>
                <table className="table mt-5">
                    <thead>
                        <tr>
                            <th scope="col">Event ID</th>
                            <th scope="col">Time</th>
                            <th scope="col">Event type</th>
                            <th scope="col">Value</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.objectEvents.map(item => (
                            <tr key={item.getId()}>
                                <td>{item.getId()}</td>
                                <td>{item.getCreatedAt().toLocaleString("lt-LT")}</td>
                                <td>{item.getEventType()}</td>
                                <td>{this.resolveValue(item)}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        );
    }

    resolveValue = (event) => {
        if (event.getEventType() !== LOCATION) {
            return event.getValue();
        }

        const coords = event.getValue().replaceAll(' ', '').split(',');
        const url = `https://www.google.com/maps/search/?api=1&query=${coords[0]},${coords[1]}`;

        return (
            <a href={url}>{event.getValue()}</a>
        );
    }

    getQueryParams = () => {
        return new Proxy(new URLSearchParams(window.location.search), {
            get: (searchParams, prop) => searchParams.get(prop),
        });
    }
}

export default App;
