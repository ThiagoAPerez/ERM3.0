package com.elrapidin.api.dto.product;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;

import com.elrapidin.api.domain.enums.product.ProductCategory;

public class ProductWithIngredientsPublicResponse {

    private Long id;
    private String name;
    private String description;
    private BigDecimal price;
    private String currency;
    private String imageUrl;
    private boolean available;
    private LocalDateTime createdAt;
    private ProductCategory category;
    private List<IngredientPublicResponse> ingredients;

    public ProductWithIngredientsPublicResponse(
            Long id,
            String name,
            String description,
            BigDecimal price,
            String currency,
            String imageUrl,
            boolean available,
            LocalDateTime createdAt,
            ProductCategory category,
            List<IngredientPublicResponse> ingredients) {

        this.id = id;
        this.name = name;
        this.description = description;
        this.price = price;
        this.currency = currency;
        this.imageUrl = imageUrl;
        this.available = available;
        this.createdAt = createdAt;
        this.category = category;
        this.ingredients = ingredients;
    }

    public Long getId() {
        return id;
    }

    public String getName() {
        return name;
    }

    public String getDescription() {
        return description;
    }

    public BigDecimal getPrice() {
        return price;
    }

    public String getCurrency() {
        return currency;
    }

    public String getImageUrl() {
        return imageUrl;
    }

    public boolean isAvailable() {
        return available;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public ProductCategory getCategory() {
        return category;
    }

    public List<IngredientPublicResponse> getIngredients() {
        return ingredients;
    }
}
