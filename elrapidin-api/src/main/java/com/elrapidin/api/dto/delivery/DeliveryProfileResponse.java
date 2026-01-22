package com.elrapidin.api.dto.delivery;

import com.elrapidin.api.domain.enums.delivery.DeliveryStatus;
import com.elrapidin.api.domain.enums.delivery.DeliveryZone;
import com.elrapidin.api.domain.enums.delivery.ServiceType;
import com.elrapidin.api.domain.enums.delivery.VehicleType;

public class DeliveryProfileResponse {

    private Long userId;
    private VehicleType vehicleType;
    private String vehiclePlate;
    private ServiceType serviceType;
    private DeliveryStatus status;
    private DeliveryZone zone;

    // ✅ CONSTRUCTOR QUE FALTABA
    public DeliveryProfileResponse(
            Long userId,
            VehicleType vehicleType,
            String vehiclePlate,
            ServiceType serviceType,
            DeliveryStatus status,
            DeliveryZone zone) {
        this.userId = userId;
        this.vehicleType = vehicleType;
        this.vehiclePlate = vehiclePlate;
        this.serviceType = serviceType;
        this.status = status;
        this.zone = zone;
    }

    // ===== GETTERS =====

    public Long getUserId() {
        return userId;
    }

    public VehicleType getVehicleType() {
        return vehicleType;
    }

    public String getVehiclePlate() {
        return vehiclePlate;
    }

    public ServiceType getServiceType() {
        return serviceType;
    }

    public DeliveryStatus getStatus() {
        return status;
    }

    public DeliveryZone getZone() {
        return zone;
    }
}
