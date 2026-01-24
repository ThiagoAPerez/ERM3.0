package com.elrapidin.api.dto.business;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;

public class BusinessOrderDetail {

    private Long orderId;
    private LocalDateTime createdAt;
    private String status;

    private String customerName;
    private String customerPhone;
    private String customerAddress;

    private String deliveryPhone;
    private String deliveryVehiclePlate;

    private List<String> products;
    private BigDecimal total;
    private String customerNotes;

    // ===== GETTERS & SETTERS =====

    public Long getOrderId() {
        return orderId;
    }

    public void setOrderId(Long orderId) {
        this.orderId = orderId;
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

    public String getCustomerName() {
        return customerName;
    }

    public void setCustomerName(String customerName) {
        this.customerName = customerName;
    }

    public String getCustomerPhone() {
        return customerPhone;
    }

    public void setCustomerPhone(String customerPhone) {
        this.customerPhone = customerPhone;
    }

    public String getCustomerAddress() {
        return customerAddress;
    }

    public void setCustomerAddress(String customerAddress) {
        this.customerAddress = customerAddress;
    }

    public String getDeliveryPhone() {
        return deliveryPhone;
    }

    public void setDeliveryPhone(String deliveryPhone) {
        this.deliveryPhone = deliveryPhone;
    }

    public String getDeliveryVehiclePlate() {
        return deliveryVehiclePlate;
    }

    public void setDeliveryVehiclePlate(String deliveryVehiclePlate) {
        this.deliveryVehiclePlate = deliveryVehiclePlate;
    }

    public List<String> getProducts() {
        return products;
    }

    public void setProducts(List<String> products) {
        this.products = products;
    }

    public BigDecimal getTotal() {
        return total;
    }

    public void setTotal(BigDecimal total) {
        this.total = total;
    }

    public String getCustomerNotes() {
        return customerNotes;
    }

    public void setCustomerNotes(String customerNotes) {
        this.customerNotes = customerNotes;
    }
}
