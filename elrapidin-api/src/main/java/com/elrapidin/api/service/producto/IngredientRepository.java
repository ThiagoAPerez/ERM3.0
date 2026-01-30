package com.elrapidin.api.service.producto;

import com.elrapidin.api.domain.entity.product.IngredientEntity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface IngredientRepository
        extends JpaRepository<IngredientEntity, Long> {
}
