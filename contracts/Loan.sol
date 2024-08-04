// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

contract Loans {
    enum EstadoPago {
        Pendiente,
        Pagado,
        Incumplido
    }

    struct Prestamo {
        address prestatario;
        address prestamista;
        uint256 montoPrestamo;
        uint256 montoInteres;
        uint256 fechaDeFinPrestamo;
        uint256 fechaLimitePago;
        EstadoPago estadoPago;
        uint256 montoPagado;
    }

    mapping(uint256 => Prestamo) public prestamos;
    uint256 public contadorPrestamos = 0;

    constructor() {}

    function crearPrestamo(uint256 _montoPrestamo, uint256 _montoInteres, uint256 _duracionEnDias) external {
        require(msg.sender != address(0), "El prestamista debe ser una direccion valida.");

        Prestamo memory nuevoPrestamo;
        nuevoPrestamo.prestatario = address(0); // El prestatario se establecerá más tarde
        nuevoPrestamo.prestamista = msg.sender;
        nuevoPrestamo.montoPrestamo = _montoPrestamo;
        nuevoPrestamo.montoInteres = _montoInteres;
        nuevoPrestamo.fechaDeFinPrestamo = block.timestamp + _duracionEnDias * 1 days;
        nuevoPrestamo.fechaLimitePago = nuevoPrestamo.fechaDeFinPrestamo;
        nuevoPrestamo.estadoPago = EstadoPago.Pendiente;
        nuevoPrestamo.montoPagado = 0;

        prestamos[contadorPrestamos] = nuevoPrestamo;
        contadorPrestamos++;
    }

    function aceptarPrestamo(uint256 _prestamoId) external payable {
        require(_prestamoId < contadorPrestamos, "El prestamo no existe.");
        Prestamo storage prestamo = prestamos[_prestamoId];

        require(prestamo.prestatario == address(0), "El prestamo ya ha sido aceptado por un prestatario.");
        require(msg.value == prestamo.montoPrestamo, "Debe pagar el monto del prestamo.");

        prestamo.prestatario = msg.sender;
        prestamo.estadoPago = EstadoPago.Pendiente;
        payable(prestamo.prestamista).transfer(prestamo.montoPrestamo);
    }

    function pagarPrestamo(uint256 _prestamoId) external payable {
        require(_prestamoId < contadorPrestamos, "El prestamo no existe.");
        Prestamo storage prestamo = prestamos[_prestamoId];

        require(msg.sender == prestamo.prestatario, "Solo el prestatario puede realizar el pago.");
        require(prestamo.estadoPago == EstadoPago.Pendiente, "El prestamo no esta en estado de pago pendiente.");
        require(block.timestamp <= prestamo.fechaLimitePago, "El plazo para realizar el pago ha vencido.");

        uint256 montoTotalPendiente = prestamo.montoPrestamo + prestamo.montoInteres - prestamo.montoPagado;
        require(msg.value >= montoTotalPendiente, "El monto pagado no es suficiente.");

        prestamo.montoPagado += msg.value;

        if (prestamo.montoPagado >= prestamo.montoPrestamo + prestamo.montoInteres) {
            prestamo.estadoPago = EstadoPago.Pagado;
        }
    }

    function ejecutarPrestamo(uint256 _prestamoId) external {
        require(_prestamoId < contadorPrestamos, "El prestamo no existe.");
        Prestamo storage prestamo = prestamos[_prestamoId];

        require(msg.sender == prestamo.prestamista, "Solo el prestamista puede ejecutar el prestamo.");
        require(prestamo.estadoPago == EstadoPago.Pendiente, "El prestamo ya ha sido pagado o incumplido.");
        require(block.timestamp > prestamo.fechaDeFinPrestamo, "No ha pasado suficiente tiempo desde la fecha de finalizacin.");

        prestamo.estadoPago = EstadoPago.Incumplido;
        uint256 montoAdeudado = prestamo.montoPrestamo + prestamo.montoInteres;
        uint256 montoNoPagado = montoAdeudado - prestamo.montoPagado;
        payable(prestamo.prestamista).transfer(montoNoPagado);
    }

    function getPrestamos() public view returns (Prestamo[] memory) {
        Prestamo[] memory prestamoArray = new Prestamo[](contadorPrestamos);

        for (uint256 i = 0; i < contadorPrestamos; i++) {
            prestamoArray[i] = prestamos[i];
        }

        return prestamoArray;
    }
}
