package com.elrapidin.api.domain.repository;

import com.elrapidin.api.domain.entity.product.ProductIngredientEntity;
import com.elrapidin.api.domain.entity.product.ProductEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ProductIngredientRepository
        extends JpaRepository<ProductIngredientEntity, Long> {

    List<ProductIngredientEntity> findByProduct(ProductEntity product);
}
