package com.elrapidin.api.dto.delivery;

import jakarta.validation.constraints.NotBlank;

public record ConfirmDeliveryRequest(
        @NotBlank String deliveryCode
) {}
