package com.elrapidin.api.dto.product;

import java.math.BigDecimal;
import java.time.LocalDateTime;

import com.elrapidin.api.domain.enums.product.ProductCategory;

public class ProductPublicResponse {

    private Long id;
    private String name;
    private String description;
    private BigDecimal price;
    private String currency;
    private String imageUrl;
    private boolean available;
    private LocalDateTime createdAt;
    private ProductCategory category;

    public ProductPublicResponse(
            Long id,
            String name,
            String description,
            BigDecimal price,
            String currency,
            String imageUrl,
            boolean available,
            LocalDateTime createdAt,
            ProductCategory category) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.price = price;
        this.currency = currency;
        this.imageUrl = imageUrl;
        this.available = available;
        this.createdAt = createdAt;
        this.category = category;
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

    public void setId(Long id) {
        this.id = id;
    }

    public void setName(String name) {
        this.name = name;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public void setPrice(BigDecimal price) {
        this.price = price;
    }

    public void setCurrency(String currency) {
        this.currency = currency;
    }

    public void setImageUrl(String imageUrl) {
        this.imageUrl = imageUrl;
    }

    public void setAvailable(boolean available) {
        this.available = available;
    }

    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }

    public ProductCategory getCategory() {
        return category;
    }

    public void setCategory(ProductCategory category) {
        this.category = category;
    }

   

}
