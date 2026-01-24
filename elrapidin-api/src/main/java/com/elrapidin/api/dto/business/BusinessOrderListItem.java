package com.elrapidin.api.dto.business;

import java.math.BigDecimal;
import java.time.LocalDateTime;

public class BusinessOrderListItem {

    private Long orderId;
    private String customerName;
    private String address;
    private Integer productsCount;
    private BigDecimal total;
    private LocalDateTime createdAt;
    private String status;
    private String deliverySummary;

    // ===== GETTERS & SETTERS =====

    public Long getOrderId() {
        return orderId;
    }

    public void setOrderId(Long orderId) {
        this.orderId = orderId;
    }

    public String getCustomerName() {
        return customerName;
    }

    public void setCustomerName(String customerName) {
        this.customerName = customerName;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public Integer getProductsCount() {
        return productsCount;
    }

    public void setProductsCount(Integer productsCount) {
        this.productsCount = productsCount;
    }

    public BigDecimal getTotal() {
        return total;
    }

    public void setTotal(BigDecimal total) {
        this.total = total;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public String getDeliverySummary() {
        return deliverySummary;
    }

    public void setDeliverySummary(String deliverySummary) {
        this.deliverySummary = deliverySummary;
    }
}
