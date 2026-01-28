package com.elrapidin.api.dto.admin;

import com.elrapidin.api.domain.enums.delivery.DeliveryZone;
import com.elrapidin.api.domain.enums.delivery.ServiceType;
import com.elrapidin.api.domain.enums.delivery.VehicleType;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

public record CreateDeliveryRequest(

        @NotBlank String name,

        @NotBlank String phone,

        @NotBlank String email,

        @NotBlank String temporaryPassword,

        @NotNull VehicleType vehicleType,

        String vehiclePlate,

        @NotNull ServiceType serviceType,

        DeliveryZone zone

) {
}
