const abi = [
    {
        "constant": true,
        "inputs": [],
        "name": "creator",
        "outputs": [
            {
                "name": "",
                "type": "address"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    },
    {
        "constant": false,
        "inputs": [
            {
                "name": "adr",
                "type": "address"
            }
        ],
        "name": "removeDevice",
        "outputs": [],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "constant": false,
        "inputs": [],
        "name": "finalize",
        "outputs": [],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [],
        "name": "eventCounter",
        "outputs": [
            {
                "name": "",
                "type": "uint256"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [
            {
                "name": "id",
                "type": "string"
            }
        ],
        "name": "getEventsByObjectId",
        "outputs": [
            {
                "components": [
                    {
                        "name": "id",
                        "type": "uint256"
                    },
                    {
                        "name": "createdAt",
                        "type": "uint256"
                    },
                    {
                        "name": "createdBy",
                        "type": "address"
                    },
                    {
                        "name": "eventType",
                        "type": "uint8"
                    },
                    {
                        "name": "value",
                        "type": "string"
                    },
                    {
                        "name": "objectId",
                        "type": "string"
                    }
                ],
                "name": "",
                "type": "tuple[]"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [
            {
                "name": "",
                "type": "uint256"
            }
        ],
        "name": "eventsById",
        "outputs": [
            {
                "name": "id",
                "type": "uint256"
            },
            {
                "name": "createdAt",
                "type": "uint256"
            },
            {
                "name": "createdBy",
                "type": "address"
            },
            {
                "name": "eventType",
                "type": "uint8"
            },
            {
                "name": "value",
                "type": "string"
            },
            {
                "name": "objectId",
                "type": "string"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    },
    {
        "constant": false,
        "inputs": [
            {
                "name": "adr",
                "type": "address"
            }
        ],
        "name": "registerDevice",
        "outputs": [],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "constant": false,
        "inputs": [
            {
                "name": "eventType",
                "type": "uint8"
            },
            {
                "name": "value",
                "type": "string"
            },
            {
                "name": "objectId",
                "type": "string"
            }
        ],
        "name": "registerEvent",
        "outputs": [],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [
            {
                "name": "",
                "type": "address"
            }
        ],
        "name": "administrators",
        "outputs": [
            {
                "name": "",
                "type": "bool"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    },
    {
        "constant": false,
        "inputs": [
            {
                "name": "adr",
                "type": "address"
            }
        ],
        "name": "registerAdministrator",
        "outputs": [],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [
            {
                "name": "",
                "type": "address"
            }
        ],
        "name": "devices",
        "outputs": [
            {
                "name": "deviceAddress",
                "type": "address"
            },
            {
                "name": "createdBy",
                "type": "address"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "constructor"
    }
];

export default abi;
