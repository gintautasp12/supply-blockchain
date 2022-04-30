import React from 'react';
import blockchainReader from '../services/blockchainReader';
import { LOCATION } from '../valueObjects/event';

class App extends React.Component {
    state = { objectEvents: [], query: null };

    componentDidMount = async () => {
        try {
            const query = this.getQueryParams();
            const events = await blockchainReader.readEvents(query?.objectId);
            
            this.setState({ objectEvents: events, query: query });
        } catch (error) {
            console.log(error);
        }
    }

    render = () => {
        return (
            <>
                <h1 className="mt-5 text-center">Supply Blockchain</h1>
                <div className="container mt-5">
                    <div className="row">
                        <div className="col-md-1"></div>
                        <div className="col-md-10">
                            <div className="card shadow rounded">
                                <div className="card-header">
                                    <h5 className="mt-2">Events for object { this.state.query?.objectId }</h5>
                                </div>

                                <div className="card-body table-responsive-sm">
                                    <table className="table">
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
                            </div>
                        </div>
                        <div className="col-md-1"></div>
                    </div>
                </div>
            </>
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
