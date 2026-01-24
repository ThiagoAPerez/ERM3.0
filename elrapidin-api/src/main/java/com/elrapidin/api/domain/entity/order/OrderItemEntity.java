package com.elrapidin.api.domain.entity.order;

import jakarta.persistence.*;

@Entity
@Table(name = "order_items")
public class OrderItemEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(optional = false)
    private OrderEntity order;

    @Column(nullable = false)
    private String productName;

    @Column(nullable = false)
    private int quantity;

    @Column(name = "sale_price", nullable = false)
    private long salePrice;

    @Column(name = "cost_price", nullable = false)
    private long costPrice;

    protected OrderItemEntity() {
    }

    public OrderItemEntity(
            String productName,
            int quantity,
            long salePrice,
            long costPrice) {
        this.productName = productName;
        this.quantity = quantity;
        this.salePrice = salePrice;
        this.costPrice = costPrice;
    }

    void attachTo(OrderEntity order) {
        this.order = order;
    }
}
