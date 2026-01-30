package com.elrapidin.api.dto.product;

import java.math.BigDecimal;

import jakarta.validation.constraints.NotBlank;

public class CreateIngredientRequest {

    @NotBlank
    private String name;

    private BigDecimal extraPrice;

    public String getName() {
        return name;
    }

    public BigDecimal getExtraPrice() {
        return extraPrice;
    }

    public void setName(String name) {
        this.name = name;
    }

    public void setExtraPrice(BigDecimal extraPrice) {
        this.extraPrice = extraPrice;
    }
}
