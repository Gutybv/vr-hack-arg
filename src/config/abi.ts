export const loanContractAddress = '0x275d3df3d9b1d4dA2b6B66140F3Dece91FA31aa3'; // Reemplaza con la dirección de tu contrato desplegado

export const loanContractABI = [
    [
        {
            "inputs": [
                {
                    "internalType": "uint256",
                    "name": "_prestamoId",
                    "type": "uint256"
                }
            ],
            "name": "aceptarPrestamo",
            "outputs": [],
            "stateMutability": "payable",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "uint256",
                    "name": "_montoPrestamo",
                    "type": "uint256"
                },
                {
                    "internalType": "uint256",
                    "name": "_montoInteres",
                    "type": "uint256"
                },
                {
                    "internalType": "uint256",
                    "name": "_duracionEnDias",
                    "type": "uint256"
                }
            ],
            "name": "crearPrestamo",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "uint256",
                    "name": "_prestamoId",
                    "type": "uint256"
                }
            ],
            "name": "ejecutarPrestamo",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "uint256",
                    "name": "_prestamoId",
                    "type": "uint256"
                }
            ],
            "name": "pagarPrestamo",
            "outputs": [],
            "stateMutability": "payable",
            "type": "function"
        },
        {
            "inputs": [],
            "stateMutability": "nonpayable",
            "type": "constructor"
        },
        {
            "inputs": [],
            "name": "contadorPrestamos",
            "outputs": [
                {
                    "internalType": "uint256",
                    "name": "",
                    "type": "uint256"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [],
            "name": "getPrestamos",
            "outputs": [
                {
                    "components": [
                        {
                            "internalType": "address",
                            "name": "prestatario",
                            "type": "address"
                        },
                        {
                            "internalType": "address",
                            "name": "prestamista",
                            "type": "address"
                        },
                        {
                            "internalType": "uint256",
                            "name": "montoPrestamo",
                            "type": "uint256"
                        },
                        {
                            "internalType": "uint256",
                            "name": "montoInteres",
                            "type": "uint256"
                        },
                        {
                            "internalType": "uint256",
                            "name": "fechaDeFinPrestamo",
                            "type": "uint256"
                        },
                        {
                            "internalType": "uint256",
                            "name": "fechaLimitePago",
                            "type": "uint256"
                        },
                        {
                            "internalType": "enum Loans.EstadoPago",
                            "name": "estadoPago",
                            "type": "uint8"
                        },
                        {
                            "internalType": "uint256",
                            "name": "montoPagado",
                            "type": "uint256"
                        }
                    ],
                    "internalType": "struct Loans.Prestamo[]",
                    "name": "",
                    "type": "tuple[]"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "uint256",
                    "name": "",
                    "type": "uint256"
                }
            ],
            "name": "prestamos",
            "outputs": [
                {
                    "internalType": "address",
                    "name": "prestatario",
                    "type": "address"
                },
                {
                    "internalType": "address",
                    "name": "prestamista",
                    "type": "address"
                },
                {
                    "internalType": "uint256",
                    "name": "montoPrestamo",
                    "type": "uint256"
                },
                {
                    "internalType": "uint256",
                    "name": "montoInteres",
                    "type": "uint256"
                },
                {
                    "internalType": "uint256",
                    "name": "fechaDeFinPrestamo",
                    "type": "uint256"
                },
                {
                    "internalType": "uint256",
                    "name": "fechaLimitePago",
                    "type": "uint256"
                },
                {
                    "internalType": "enum Loans.EstadoPago",
                    "name": "estadoPago",
                    "type": "uint8"
                },
                {
                    "internalType": "uint256",
                    "name": "montoPagado",
                    "type": "uint256"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        }
    ]
  ];
  