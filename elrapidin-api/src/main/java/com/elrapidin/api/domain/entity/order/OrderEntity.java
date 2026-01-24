package com.elrapidin.api.domain.entity.order;

import jakarta.persistence.*;

import java.time.Instant;
import java.util.ArrayList;
import java.util.List;

import com.elrapidin.api.domain.entity.UserEntity;
import com.elrapidin.api.domain.entity.businesses.BusinessEntity;
import com.elrapidin.api.domain.entity.delivery.DeliveryProfileEntity;
import com.elrapidin.api.domain.enums.order.OrderStatus;

@Entity
@Table(name = "orders")
public class OrderEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(optional = false)
    private UserEntity customer;

    @ManyToOne(optional = false)
    private BusinessEntity business;

    @ManyToOne
    private DeliveryProfileEntity delivery;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false, length = 50)
    private OrderStatus status;

    @Column(name = "client_address_id", nullable = false)
    private Long clientAddressId;

    @Column(name = "address_snapshot", nullable = false, columnDefinition = "TEXT")
    private String addressSnapshot;

    @Column(name = "created_at", nullable = false, updatable = false)
    private Instant createdAt = Instant.now();

    @OneToMany(mappedBy = "order", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<OrderItemEntity> items = new ArrayList<>();

    @Column(name = "delivery_confirmation_code", length = 6)
    private String deliveryConfirmationCode;

    @Column(name = "delivery_code_generated_at")
    private Instant deliveryCodeGeneratedAt;

    protected OrderEntity() {
    }

    public OrderEntity(
            UserEntity customer,
            BusinessEntity business,
            Long clientAddressId,
            String addressSnapshot) {
        this.customer = customer;
        this.business = business;
        this.clientAddressId = clientAddressId;
        this.addressSnapshot = addressSnapshot;
        this.status = OrderStatus.CREATED;
    }

    public void addItem(OrderItemEntity item) {
        item.attachTo(this);
        this.items.add(item);
    }

    public void changeStatus(OrderStatus newStatus) {
        if (this.status.isTerminal()) {
            throw new IllegalStateException("Order is already in terminal state");
        }
        this.status = newStatus;
    }

    public void assignDelivery(DeliveryProfileEntity delivery) {
        if (this.delivery != null) {
            throw new IllegalStateException("Delivery already assigned");
        }
        this.delivery = delivery;
    }

    public void generateDeliveryCode(String code) {
        if (this.deliveryConfirmationCode != null) {
            throw new IllegalStateException("Delivery code already generated");
        }
        this.deliveryConfirmationCode = code;
        this.deliveryCodeGeneratedAt = Instant.now();
    }

    public boolean matchesDeliveryCode(String code) {
        return this.deliveryConfirmationCode != null &&
                this.deliveryConfirmationCode.equals(code);
    }

    public void clearDeliveryCode() {
        this.deliveryConfirmationCode = null;
        this.deliveryCodeGeneratedAt = null;
    }

    public Long getId() {
        return id;
    }

    public OrderStatus getStatus() {
        return status;
    }

    public String getDeliveryConfirmationCode() {
        return deliveryConfirmationCode;
    }

    public void setDeliveryConfirmationCode(String deliveryConfirmationCode) {
        this.deliveryConfirmationCode = deliveryConfirmationCode;
    }

    public Instant getDeliveryCodeGeneratedAt() {
        return deliveryCodeGeneratedAt;
    }

    public void setDeliveryCodeGeneratedAt(Instant deliveryCodeGeneratedAt) {
        this.deliveryCodeGeneratedAt = deliveryCodeGeneratedAt;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public UserEntity getCustomer() {
        return customer;
    }

    public void setCustomer(UserEntity customer) {
        this.customer = customer;
    }

    public BusinessEntity getBusiness() {
        return business;
    }

    public void setBusiness(BusinessEntity business) {
        this.business = business;
    }

    public DeliveryProfileEntity getDelivery() {
        return delivery;
    }

    public void setDelivery(DeliveryProfileEntity delivery) {
        this.delivery = delivery;
    }

    public void setStatus(OrderStatus status) {
        this.status = status;
    }

    public Long getClientAddressId() {
        return clientAddressId;
    }

    public void setClientAddressId(Long clientAddressId) {
        this.clientAddressId = clientAddressId;
    }

    public String getAddressSnapshot() {
        return addressSnapshot;
    }

    public void setAddressSnapshot(String addressSnapshot) {
        this.addressSnapshot = addressSnapshot;
    }

    public Instant getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(Instant createdAt) {
        this.createdAt = createdAt;
    }

    public List<OrderItemEntity> getItems() {
        return items;
    }

    public void setItems(List<OrderItemEntity> items) {
        this.items = items;
    }

}
