package com.elrapidin.api.dto.product;

import jakarta.validation.constraints.NotNull;

public class AddIngredientToProductRequest {

    @NotNull
    private Long ingredientId;

    public Long getIngredientId() {
        return ingredientId;
    }

    public void setIngredientId(Long ingredientId) {
        this.ingredientId = ingredientId;
    }
}
