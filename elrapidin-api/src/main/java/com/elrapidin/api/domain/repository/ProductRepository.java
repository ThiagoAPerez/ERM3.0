package com.elrapidin.api.domain.repository;

import com.elrapidin.api.domain.entity.product.ProductEntity;
import com.elrapidin.api.domain.enums.businesses.BusinessesCategory;
import com.elrapidin.api.domain.enums.product.ProductCategory;
import com.elrapidin.api.domain.enums.product.ProductStatus;

import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ProductRepository extends JpaRepository<ProductEntity, Long> {

    @EntityGraph(attributePaths = "productIngredients.ingredient")
    List<ProductEntity> findByProviderTypeAndProviderIdAndIsAvailableTrue(
            BusinessesCategory providerType,
            Long providerId);

    List<ProductEntity> findByNameContainingIgnoreCase(String name);

    List<ProductEntity> findByCategory(ProductCategory category);

    List<ProductEntity> findByStatus(ProductStatus status);

    List<ProductEntity> findByStatusNot(ProductStatus status);
}
