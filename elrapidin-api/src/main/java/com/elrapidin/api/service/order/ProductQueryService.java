package com.elrapidin.api.service.order;

import com.elrapidin.api.domain.entity.product.ProductEntity;
import com.elrapidin.api.domain.entity.product.ProductIngredientEntity;
import com.elrapidin.api.domain.enums.businesses.BusinessesCategory;
import com.elrapidin.api.domain.repository.ProductRepository;
import com.elrapidin.api.dto.product.ProductWithIngredientsPublicResponse;
import com.elrapidin.api.dto.product.IngredientPublicResponse;

import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ProductQueryService {

        private final ProductRepository productRepository;

        public ProductQueryService(ProductRepository productRepository) {
                this.productRepository = productRepository; // ✅ ASIGNACIÓN
        }

        public List<ProductWithIngredientsPublicResponse> getPublicProductsByProvider(
                        BusinessesCategory providerType,
                        Long providerId) {

                return productRepository
                                .findByProviderTypeAndProviderIdAndIsAvailableTrue(providerType, providerId)
                                .stream()
                                .map(this::toPublicWithIngredientsResponse)
                                .toList();
        }

        private ProductWithIngredientsPublicResponse toPublicWithIngredientsResponse(ProductEntity product) {

                List<IngredientPublicResponse> ingredients = product.getProductIngredients()
                                .stream()
                                .map(ProductIngredientEntity::getIngredient)
                                .map(ing -> new IngredientPublicResponse(
                                                ing.getId(),
                                                ing.getName(),
                                                ing.getExtraPrice()))
                                .toList();

                return new ProductWithIngredientsPublicResponse(
                                product.getId(),
                                product.getName(),
                                product.getDescription(),
                                product.getSalePrice(),
                                product.getCurrency(),
                                product.getImageUrl(),
                                product.getIsAvailable(),
                                product.getCreatedAt(),
                                product.getCategory(),
                                ingredients);
        }
}
