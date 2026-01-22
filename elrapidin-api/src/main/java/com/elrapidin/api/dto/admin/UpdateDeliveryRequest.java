package com.elrapidin.api.dto.admin;

import com.elrapidin.api.domain.enums.delivery.DeliveryZone;
import com.elrapidin.api.domain.enums.delivery.ServiceType;
import com.elrapidin.api.domain.enums.delivery.VehicleType;

public record UpdateDeliveryRequest(
                String name,
                String phone,
                String temporaryPassword,
                VehicleType vehicleType,
                String vehiclePlate,
                ServiceType serviceType,
                DeliveryZone zone) {
}
