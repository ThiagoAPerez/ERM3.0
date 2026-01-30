package com.elrapidin.api.dto.admin;

import java.math.BigDecimal;
import java.time.LocalDateTime;

import com.elrapidin.api.domain.enums.businesses.BusinessesCategory;
import com.elrapidin.api.domain.enums.product.ProductCategory;
import com.elrapidin.api.domain.enums.product.ProductStatus;

public class AdminProductResponse {

    private Long id;
    private String name;
    private String description;

    // ===== PROVIDER REAL =====
    private BusinessesCategory providerType;
    private Long providerId;

    private ProductCategory category;
    private ProductStatus status;

    private BigDecimal costPrice;
    private BigDecimal salePrice;

    private String currency;
    private String imageUrl;
    private boolean available;
    private LocalDateTime createdAt;

    public AdminProductResponse(
            Long id,
            String name,
            String description,
            BusinessesCategory providerType,
            Long providerId,
            ProductCategory category,
            ProductStatus status,
            BigDecimal costPrice,
            BigDecimal salePrice,
            String currency,
            String imageUrl,
            boolean available,
            LocalDateTime createdAt) {

        this.id = id;
        this.name = name;
        this.description = description;
        this.providerType = providerType;
        this.providerId = providerId;
        this.category = category;
        this.status = status;
        this.costPrice = costPrice;
        this.salePrice = salePrice;
        this.currency = currency;
        this.imageUrl = imageUrl;
        this.available = available;
        this.createdAt = createdAt;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public BusinessesCategory getProviderType() {
        return providerType;
    }

    public void setProviderType(BusinessesCategory providerType) {
        this.providerType = providerType;
    }

    public Long getProviderId() {
        return providerId;
    }

    public void setProviderId(Long providerId) {
        this.providerId = providerId;
    }

    public ProductCategory getCategory() {
        return category;
    }

    public void setCategory(ProductCategory category) {
        this.category = category;
    }

    public ProductStatus getStatus() {
        return status;
    }

    public void setStatus(ProductStatus status) {
        this.status = status;
    }

    public BigDecimal getCostPrice() {
        return costPrice;
    }

    public void setCostPrice(BigDecimal costPrice) {
        this.costPrice = costPrice;
    }

    public BigDecimal getSalePrice() {
        return salePrice;
    }

    public void setSalePrice(BigDecimal salePrice) {
        this.salePrice = salePrice;
    }

    public String getCurrency() {
        return currency;
    }

    public void setCurrency(String currency) {
        this.currency = currency;
    }

    public String getImageUrl() {
        return imageUrl;
    }

    public void setImageUrl(String imageUrl) {
        this.imageUrl = imageUrl;
    }

    public boolean isAvailable() {
        return available;
    }

    public void setAvailable(boolean available) {
        this.available = available;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }

    // ===== GETTERS & SETTERS =====

}
