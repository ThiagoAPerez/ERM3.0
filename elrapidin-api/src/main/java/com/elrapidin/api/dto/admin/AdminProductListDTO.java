package com.elrapidin.api.dto.admin;

import com.elrapidin.api.domain.enums.businesses.BusinessesCategory;
import com.elrapidin.api.domain.enums.product.ProductCategory;
import com.elrapidin.api.domain.enums.product.ProductStatus;

import java.math.BigDecimal;

public class AdminProductListDTO {

    private Long id;
    private String name;
    private String description;

    private BusinessesCategory providerType;
    private Long providerId;
    private String providerName;
    private BusinessesCategory providerCateory;

    private ProductCategory category;
    private String imageUrl;

    public BusinessesCategory getProviderCateory() {
        return providerCateory;
    }

    public void setProviderCateory(BusinessesCategory providerCateory) {
        this.providerCateory = providerCateory;
    }

    public String getImageUrl() {
        return imageUrl;
    }

    public void setImageUrl(String imageUrl) {
        this.imageUrl = imageUrl;
    }

    private BigDecimal costPrice;
    private BigDecimal salePrice;

    private ProductStatus status;

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

    public String getProviderName() {
        return providerName;
    }

    public void setProviderName(String providerName) {
        this.providerName = providerName;
    }

    public ProductCategory getCategory() {
        return category;
    }

    public void setCategory(ProductCategory category) {
        this.category = category;
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

    public ProductStatus getStatus() {
        return status;
    }

    public void setStatus(ProductStatus status) {
        this.status = status;
    }

    // getters / setters

}
