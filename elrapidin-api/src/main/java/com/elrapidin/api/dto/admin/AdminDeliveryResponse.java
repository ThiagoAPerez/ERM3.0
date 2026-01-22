package com.elrapidin.api.dto.admin;

import com.elrapidin.api.domain.enums.delivery.DeliveryStatus;
import com.elrapidin.api.domain.enums.delivery.ServiceType;
import com.elrapidin.api.domain.enums.delivery.VehicleType;

public class AdminDeliveryResponse {

    private Long id;
    private String nombre;
    private String telefono;
    private String email;

    private String placa;
    private VehicleType tipoVehiculo;
    private ServiceType tipoServicio;
    private DeliveryStatus estado;

    private String zona;

    private int pedidosActivos;
    private int pedidosHoy;

    public AdminDeliveryResponse(
            Long id,
            String nombre,
            String telefono,
            String email,
            String placa,
            VehicleType tipoVehiculo,
            ServiceType tipoServicio,
            DeliveryStatus estado,
            String zona
    ) {
        this.id = id;
        this.nombre = nombre;
        this.telefono = telefono;
        this.email = email;
        this.placa = placa;
        this.tipoVehiculo = tipoVehiculo;
        this.tipoServicio = tipoServicio;
        this.estado = estado;
        this.zona = zona;
        this.pedidosActivos = 0;
        this.pedidosHoy = 0;
    }

    public Long getId() { return id; }
    public String getNombre() { return nombre; }
    public String getTelefono() { return telefono; }
    public String getEmail() { return email; }
    public String getPlaca() { return placa; }
    public VehicleType getTipoVehiculo() { return tipoVehiculo; }
    public ServiceType getTipoServicio() { return tipoServicio; }
    public DeliveryStatus getEstado() { return estado; }
    public String getZona() { return zona; }
    public int getPedidosActivos() { return pedidosActivos; }
    public int getPedidosHoy() { return pedidosHoy; }
}
