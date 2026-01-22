package com.elrapidin.api.domain.entity.delivery;

import jakarta.persistence.*;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Entity
@Table(name = "delivery_earnings")
public class DeliveryEarningEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "order_id", nullable = false)
    private Long orderId;

    @Column(name = "delivery_user_id", nullable = false)
    private Long deliveryUserId;

    @Column(name = "delivery_fee", nullable = false)
    private BigDecimal deliveryFee;

    @Column(name = "delivery_earning", nullable = false)
    private BigDecimal deliveryEarning;

    @Column(name = "platform_margin", nullable = false)
    private BigDecimal platformMargin;

    @Column(nullable = false)
    private String status = "PENDING";

    @Column(name = "created_at", nullable = false)
    private LocalDateTime createdAt = LocalDateTime.now();

    // ===== GETTERS =====

    public Long getId() {
        return id;
    }

    public Long getOrderId() {
        return orderId;
    }

    public void setOrderId(Long orderId) {
        this.orderId = orderId;
    }

    public Long getDeliveryUserId() {
        return deliveryUserId;
    }

    public void setDeliveryUserId(Long deliveryUserId) {
        this.deliveryUserId = deliveryUserId;
    }

    public BigDecimal getDeliveryFee() {
        return deliveryFee;
    }

    public void setDeliveryFee(BigDecimal deliveryFee) {
        this.deliveryFee = deliveryFee;
    }

    public BigDecimal getDeliveryEarning() {
        return deliveryEarning;
    }

    public void setDeliveryEarning(BigDecimal deliveryEarning) {
        this.deliveryEarning = deliveryEarning;
    }

    public BigDecimal getPlatformMargin() {
        return platformMargin;
    }

    public void setPlatformMargin(BigDecimal platformMargin) {
        this.platformMargin = platformMargin;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }
}
