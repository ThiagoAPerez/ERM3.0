package com.elrapidin.api.domain.entity.product;

import jakarta.persistence.*;

@Entity
@Table(name = "product_ingredients")
public class ProductIngredientEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(optional = false, fetch = FetchType.LAZY)
    @JoinColumn(name = "product_id", nullable = false)
    private ProductEntity product;

    @ManyToOne(optional = false, fetch = FetchType.LAZY)
    @JoinColumn(name = "ingredient_id", nullable = false)
    private IngredientEntity ingredient;

    public Long getId() {
        return id;
    }

    public ProductEntity getProduct() {
        return product;
    }

    public IngredientEntity getIngredient() {
        return ingredient;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public void setProduct(ProductEntity product) {
        this.product = product;
    }

    public void setIngredient(IngredientEntity ingredient) {
        this.ingredient = ingredient;
    }
}
