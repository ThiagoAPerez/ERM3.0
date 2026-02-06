package com.elrapidin.api.domain.entity.product;

import jakarta.persistence.*;
import java.math.BigDecimal;

@Entity
@Table(name = "ingredients")
public class IngredientEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String name;

    @Column(name = "extra_price")
    private BigDecimal extraPrice;

    public Long getId() {
        return id;
    }

    public String getName() {
        return name;
    }

    public BigDecimal getExtraPrice() {
        return extraPrice;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public void setName(String name) {
        this.name = name;
    }

    public void setExtraPrice(BigDecimal extraPrice) {
        this.extraPrice = extraPrice;
    }
    
}
