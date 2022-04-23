// SPDX-License-Identifier: GPL-3.0

pragma solidity ^0.4.17;

contract SupplyChain {
    enum EventType { TEMPERATURE, HUMIDITY, LIGHT, SPEED, LOCATION }
    enum ValueType { STRING, INT, FLOAT }
    
    struct Event {
        uint id;
        uint createdAt;
        address createdBy;
        EventType eventType;
        ValueType valueType;
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
    mapping (uint => Event) public events;
    mapping (address => Device) public devices;
    uint public eventCounter;

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
    }

    function registerAdministrator(address adr) public onlyCreator {
        require(!administrators[adr]);

        administrators[adr] = true;
    }

    function registerDevice(address adr) public onlyAdministrator {
        require(!(devices[adr].deviceAddress > 0));

        devices[adr] = Device({
            deviceAddress: adr,
            createdBy: msg.sender
        });
    }

    function removeDevice(address adr) public onlyAdministrator {
        require(devices[adr].deviceAddress > 0);

        Device memory empty;
        devices[adr] = empty;
    }

    function registerEvent(
        EventType eventType,
        ValueType valueType,
        string value,
        string objectId
    ) public onlyDevice {
        uint id = eventCounter;
        id++;
        require(events[id].id == 0);
        require(devices[msg.sender].events[id].id == 0);

        Event memory newEvent = Event({
            id: id,
            createdAt: now,
            createdBy: msg.sender,
            eventType: eventType,
            valueType: valueType,
            value: value,
            objectId: objectId
        });
        events[id] = newEvent;
        devices[msg.sender].events[id] = newEvent;
        eventCounter++;
    }

    function finalize() public onlyCreator {
        selfdestruct(creator);
    }
}
