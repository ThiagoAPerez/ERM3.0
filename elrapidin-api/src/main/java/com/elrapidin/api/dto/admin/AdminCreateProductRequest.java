package com.elrapidin.api.dto.admin;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

import java.math.BigDecimal;

import com.elrapidin.api.domain.enums.businesses.ProviderType;
import com.elrapidin.api.domain.enums.product.ProductCategory;

public class AdminCreateProductRequest {

    // ===== PROVIDER REAL =====

    @NotNull
    private ProviderType providerType;

    @NotNull
    private Long providerId;

    // ===== PRODUCTO =====

    @NotNull
    private ProductCategory category;

    @NotBlank
    private String name;

    private String description;

    @NotNull
    private BigDecimal costPrice;

    @NotNull
    private BigDecimal salePrice;

    private String imageUrl;

    public ProviderType getProviderType() {
        return providerType;
    }

    public void setProviderType(ProviderType providerType) {
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

    public String getImageUrl() {
        return imageUrl;
    }

    public void setImageUrl(String imageUrl) {
        this.imageUrl = imageUrl;
    }

    // ===== GETTERS & SETTERS =====

}
