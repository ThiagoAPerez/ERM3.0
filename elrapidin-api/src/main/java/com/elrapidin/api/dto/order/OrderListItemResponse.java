package com.elrapidin.api.dto.order;

import com.elrapidin.api.domain.enums.delivery.ServiceType;
import com.elrapidin.api.domain.enums.order.OrderStatus;
import com.elrapidin.api.domain.enums.order.OrderType;

import java.time.LocalDateTime;

public class OrderListItemResponse {

    private Long id;
    private String orderCode;
    private OrderType orderType;
    private ServiceType serviceType;
    private OrderStatus status;
    private LocalDateTime createdAt;

    public OrderListItemResponse(
            Long id,
            String orderCode,
            OrderType orderType,
            ServiceType serviceType,
            OrderStatus status,
            LocalDateTime createdAt) {
        this.id = id;
        this.orderCode = orderCode;
        this.orderType = orderType;
        this.serviceType = serviceType;
        this.status = status;
        this.createdAt = createdAt;
    }

    public Long getId() {
        return id;
    }

    public String getOrderCode() {
        return orderCode;
    }

    public OrderType getOrderType() {
        return orderType;
    }

    public ServiceType getServiceType() {
        return serviceType;
    }

    public OrderStatus getStatus() {
        return status;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }
}
