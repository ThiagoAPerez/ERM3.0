package com.elrapidin.api.domain.entity.order;

import com.elrapidin.api.domain.enums.delivery.ServiceType;
import com.elrapidin.api.domain.enums.order.OrderStatus;
import com.elrapidin.api.domain.enums.order.OrderType;
import com.elrapidin.api.domain.enums.payments.PaymentMethod;
import com.elrapidin.api.domain.enums.payments.PaymentStatus;

import jakarta.persistence.*;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.UUID;

@Entity
@Table(name = "orders")
public class OrderEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "order_code", nullable = false, unique = true)
    private String orderCode;

    @Column(name = "client_user_id", nullable = false)
    private Long clientUserId;

    @Enumerated(EnumType.STRING)
    @Column(name = "order_type", nullable = false)
    private OrderType orderType;

    @Enumerated(EnumType.STRING)
    @Column(name = "service_type")
    private ServiceType serviceType;

    @Column(name = "provider_id")
    private Long providerId;

    @Column(name = "delivery_user_id")
    private Long deliveryUserId;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private OrderStatus status = OrderStatus.CREATED;

    @Enumerated(EnumType.STRING)
    @Column(name = "payment_method", nullable = false)
    private PaymentMethod paymentMethod = PaymentMethod.CASH;

    @Enumerated(EnumType.STRING)
    @Column(name = "payment_status", nullable = false)
    private PaymentStatus paymentStatus = PaymentStatus.PENDING;

    // ===== FINANZAS =====

    @Column(name = "subtotal_sale", nullable = false)
    private BigDecimal subtotalSale;

    @Column(name = "subtotal_cost", nullable = false)
    private BigDecimal subtotalCost;

    @Column(name = "platform_margin", nullable = false)
    private BigDecimal platformMargin;

    @Column(name = "delivery_fee", nullable = false)
    private BigDecimal deliveryFee;

    @Column(name = "delivery_commission", nullable = false)
    private BigDecimal deliveryCommission;

    @Column(name = "delivery_earning", nullable = false)
    private BigDecimal deliveryEarning;

    @Column(name = "total_price", nullable = false)
    private BigDecimal totalPrice;

    // ===== ENTREGA =====

    @Column(name = "delivery_address", nullable = false)
    private String deliveryAddress;

    @Column(name = "delivery_municipality", nullable = false)
    private String deliveryMunicipality;

    @Column(name = "delivery_contact_name", nullable = false)
    private String deliveryContactName;

    @Column(name = "delivery_contact_phone", nullable = false)
    private String deliveryContactPhone;

    @Column(name = "delivery_code_hash", nullable = false)
    private String deliveryCodeHash;

    private LocalDateTime estimatedPickupAt;
    private LocalDateTime estimatedDeliveryAt;

    @Column(name = "created_at", nullable = false)
    private LocalDateTime createdAt = LocalDateTime.now();

    @Column(name = "updated_at")
    private LocalDateTime updatedAt;

    @PrePersist
    public void prePersist() {
        if (this.orderCode == null) {
            this.orderCode = "RPD-" + UUID.randomUUID()
                    .toString()
                    .substring(0, 8)
                    .toUpperCase();
        }
    }

    // ===== GETTERS & SETTERS =====

    public Long getId() {
        return id;
    }

    public Long getClientUserId() {
        return clientUserId;
    }

    public void setClientUserId(Long clientUserId) {
        this.clientUserId = clientUserId;
    }

    public OrderType getOrderType() {
        return orderType;
    }

    public void setOrderType(OrderType orderType) {
        this.orderType = orderType;
    }

    public ServiceType getServiceType() {
        return serviceType;
    }

    public void setServiceType(ServiceType serviceType) {
        this.serviceType = serviceType;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public Long getProviderId() {
        return providerId;
    }

    public String getOrderCode() {
        return orderCode;
    }

    public void setProviderId(Long providerId) {
        this.providerId = providerId;
    }

    public Long getDeliveryUserId() {
        return deliveryUserId;
    }

    public void setDeliveryUserId(Long deliveryUserId) {
        this.deliveryUserId = deliveryUserId;
    }

    public OrderStatus getStatus() {
        return status;
    }

    public void setStatus(OrderStatus status) {
        this.status = status;
    }

    public BigDecimal getSubtotalSale() {
        return subtotalSale;
    }

    public BigDecimal getSubtotalCost() {
        return subtotalCost;
    }

    public BigDecimal getPlatformMargin() {
        return platformMargin;
    }

    public BigDecimal getDeliveryFee() {
        return deliveryFee;
    }

    public BigDecimal getDeliveryCommission() {
        return deliveryCommission;
    }

    public BigDecimal getDeliveryEarning() {
        return deliveryEarning;
    }

    public void setOrderCode(String orderCode) {
        this.orderCode = orderCode;
    }

    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }

    public String getDeliveryCodeHash() {
        return deliveryCodeHash;
    }

    public BigDecimal getTotalPrice() {
        return totalPrice;
    }

    public void setSubtotalSale(BigDecimal subtotalSale) {
        this.subtotalSale = subtotalSale;
    }

    public void setSubtotalCost(BigDecimal subtotalCost) {
        this.subtotalCost = subtotalCost;
    }

    public void setPlatformMargin(BigDecimal platformMargin) {
        this.platformMargin = platformMargin;
    }

    public void setDeliveryFee(BigDecimal deliveryFee) {
        this.deliveryFee = deliveryFee;
    }

    public void setDeliveryCommission(BigDecimal deliveryCommission) {
        this.deliveryCommission = deliveryCommission;
    }

    public void setDeliveryEarning(BigDecimal deliveryEarning) {
        this.deliveryEarning = deliveryEarning;
    }

    public void setTotalPrice(BigDecimal totalPrice) {
        this.totalPrice = totalPrice;
    }

    public void setDeliveryAddress(String deliveryAddress) {
        this.deliveryAddress = deliveryAddress;
    }

    public void setDeliveryMunicipality(String deliveryMunicipality) {
        this.deliveryMunicipality = deliveryMunicipality;
    }

    public void setDeliveryContactName(String deliveryContactName) {
        this.deliveryContactName = deliveryContactName;
    }

    public void setDeliveryContactPhone(String deliveryContactPhone) {
        this.deliveryContactPhone = deliveryContactPhone;
    }

    public void setDeliveryCodeHash(String deliveryCodeHash) {
        this.deliveryCodeHash = deliveryCodeHash;
    }
}
