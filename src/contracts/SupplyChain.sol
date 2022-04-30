// SPDX-License-Identifier: GPL-3.0

pragma solidity ^0.4.17;
pragma experimental ABIEncoderV2;

contract SupplyChain {
    enum EventType { TEMPERATURE, HUMIDITY, PRESSURE, SPEED, LOCATION }

    struct Event {
        uint id;
        uint createdAt;
        address createdBy;
        EventType eventType;
        string value;
        string objectId;
    }
    struct Device {
        address deviceAddress;
        address createdBy;
        mapping (uint => Event) events;
    }
    
    address public creator;
    mapping (address => bool) public administrators;
    mapping (uint => Event) public eventsById;
    mapping (address => Device) public devices;
    uint public eventCounter;

    mapping(string => Event[]) private eventsByObjectId;

    modifier onlyAdministrator {
        require(administrators[msg.sender]);
        _;
    }

    modifier onlyCreator {
        require(creator == msg.sender);
        _;
    }

    modifier onlyDevice {
        require(devices[msg.sender].deviceAddress > 0);
        _;
    }

    constructor() public {
        creator = msg.sender;
        administrators[msg.sender] = true;
    }

    function registerAdministrator(address adr) public onlyCreator {
        require(!administrators[adr]);

        administrators[adr] = true;
    }

    function registerDevice(address adr, address author) public onlyAdministrator {
        require(devices[adr].deviceAddress == 0);

        devices[adr] = Device({
            deviceAddress: adr,
            createdBy: author
        });
    }

    function removeDevice(address adr) public onlyAdministrator {
        require(devices[adr].deviceAddress > 0);

        Device memory empty;
        devices[adr] = empty;
    }

    function registerEvent(
        EventType eventType,
        string value,
        string objectId
    ) public onlyDevice {
        uint id = eventCounter;
        id++;
        require(eventsById[id].id == 0);
        require(devices[msg.sender].events[id].id == 0);

        Event memory newEvent = Event({
            id: id,
            createdAt: now,
            createdBy: msg.sender,
            eventType: eventType,
            value: value,
            objectId: objectId
        });
        eventsById[id] = newEvent;
        eventsByObjectId[objectId].push(newEvent);
        devices[msg.sender].events[id] = newEvent;
        eventCounter++;
    }

    function getEventsByObjectId(string id) public view returns(Event[]) {
        return eventsByObjectId[id];
    }

    function finalize() public onlyCreator {
        selfdestruct(creator);
    }
}

