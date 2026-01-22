package com.elrapidin.api.dto.delivery;

import com.elrapidin.api.domain.enums.delivery.ServiceType;
import com.elrapidin.api.domain.enums.order.OrderType;

import java.time.LocalDateTime;

public class DeliveryOrderResponse {

    private Long id;
    private String orderCode;
    private OrderType orderType;
    private ServiceType serviceType;
    private LocalDateTime createdAt;

    public DeliveryOrderResponse(
            Long id,
            String orderCode,
            OrderType orderType,
            ServiceType serviceType,
            LocalDateTime createdAt) {
        this.id = id;
        this.orderCode = orderCode;
        this.orderType = orderType;
        this.serviceType = serviceType;
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

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }
}
