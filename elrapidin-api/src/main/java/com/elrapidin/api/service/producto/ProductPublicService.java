package com.elrapidin.api.service.producto;

import com.elrapidin.api.domain.entity.product.ProductEntity;
import com.elrapidin.api.domain.repository.ProductIngredientRepository;
import com.elrapidin.api.domain.repository.ProductRepository;
import com.elrapidin.api.dto.product.IngredientPublicResponse;
import com.elrapidin.api.dto.product.ProductWithIngredientsPublicResponse;

import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ProductPublicService {

    private final ProductRepository productRepository;
    private final ProductIngredientRepository productIngredientRepository;

    public ProductPublicService(
            ProductRepository productRepository,
            ProductIngredientRepository productIngredientRepository) {
        this.productRepository = productRepository;
        this.productIngredientRepository = productIngredientRepository;
    }

    public ProductWithIngredientsPublicResponse getProductWithIngredients(Long productId) {

        ProductEntity product = productRepository.findById(productId)
                .orElseThrow(() -> new RuntimeException("Producto no encontrado"));

        List<IngredientPublicResponse> ingredients = productIngredientRepository.findByProduct(product)
                .stream()
                .map(pi -> new IngredientPublicResponse(
                        pi.getIngredient().getId(),
                        pi.getIngredient().getName(),
                        pi.getIngredient().getExtraPrice()))
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
