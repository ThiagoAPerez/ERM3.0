package com.elrapidin.api.dto.admin;

import com.elrapidin.api.domain.enums.delivery.DeliveryStatus;
import jakarta.validation.constraints.NotNull;

public record UpdateDeliveryStatusRequest(
        @NotNull DeliveryStatus status) {
}
