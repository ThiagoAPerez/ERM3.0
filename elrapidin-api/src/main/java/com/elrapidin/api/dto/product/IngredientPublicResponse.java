package com.elrapidin.api.dto.product;

import java.math.BigDecimal;

public class IngredientPublicResponse {

    private Long id;
    private String name;
    private BigDecimal extraPrice;

    public IngredientPublicResponse(Long id, String name, BigDecimal extraPrice) {
        this.id = id;
        this.name = name;
        this.extraPrice = extraPrice;
    }

    public Long getId() {
        return id;
    }

    public String getName() {
        return name;
    }

    public BigDecimal getExtraPrice() {
        return extraPrice;
    }
}
