package com.elrapidin.api.dto.order;

import jakarta.validation.constraints.NotBlank;

public class ConfirmDeliveryRequest {

    @NotBlank
    private String deliveryCode;

    public String getDeliveryCode() {
        return deliveryCode;
    }
}
