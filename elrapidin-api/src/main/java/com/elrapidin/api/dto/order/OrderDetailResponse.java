package com.elrapidin.api.dto.order;

import com.elrapidin.api.domain.enums.delivery.ServiceType;
import com.elrapidin.api.domain.enums.order.OrderStatus;
import com.elrapidin.api.domain.enums.order.OrderType;

import java.time.LocalDateTime;

public class OrderDetailResponse {

    private Long id;
    private String orderCode;
    private OrderStatus status;
    private OrderType orderType;
    private ServiceType serviceType;

    // 🔐 solo cliente
    private String deliveryCode;

    private LocalDateTime createdAt;

    public OrderDetailResponse(
            Long id,
            String orderCode,
            OrderStatus status,
            OrderType orderType,
            ServiceType serviceType,
            String deliveryCode,
            LocalDateTime createdAt) {
        this.id = id;
        this.orderCode = orderCode;
        this.status = status;
        this.orderType = orderType;
        this.serviceType = serviceType;
        this.deliveryCode = deliveryCode;
        this.createdAt = createdAt;
    }

    public Long getId() {
        return id;
    }

    public String getOrderCode() {
        return orderCode;
    }

    public OrderStatus getStatus() {
        return status;
    }

    public OrderType getOrderType() {
        return orderType;
    }

    public ServiceType getServiceType() {
        return serviceType;
    }

    public String getDeliveryCode() {
        return deliveryCode;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }
}
