package com.elrapidin.api.dto.order;

import com.elrapidin.api.domain.enums.delivery.ServiceType;
import com.elrapidin.api.domain.enums.order.OrderType;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

import java.util.List;

public record CreateOrderRequest(

        @NotNull OrderType orderType, // BUSINESS | STORE | SERVICE

        Long providerId, // requerido si BUSINESS / STORE

        ServiceType serviceType, // requerido si SERVICE

        @NotBlank String deliveryAddress,
        @NotBlank String deliveryMunicipality,
        @NotBlank String deliveryContactName,
        @NotBlank String deliveryContactPhone,

        List<CreateOrderItemRequest> items) {
}
