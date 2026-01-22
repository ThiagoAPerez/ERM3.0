package com.elrapidin.api.dto.product;

import java.math.BigDecimal;
import java.time.LocalDateTime;

public class ProductPublicResponse {

    private Long id;
    private String name;
    private String description;
    private BigDecimal price;
    private String currency;
    private String imageUrl;
    private boolean available;
    private LocalDateTime createdAt;

    public ProductPublicResponse(
            Long id,
            String name,
            String description,
            BigDecimal price,
            String currency,
            String imageUrl,
            boolean available,
            LocalDateTime createdAt) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.price = price;
        this.currency = currency;
        this.imageUrl = imageUrl;
        this.available = available;
        this.createdAt = createdAt;
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
}
