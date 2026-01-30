package com.elrapidin.api.service.producto;

import com.elrapidin.api.domain.entity.product.IngredientEntity;
import com.elrapidin.api.domain.entity.product.ProductEntity;
import com.elrapidin.api.domain.entity.product.ProductIngredientEntity;
import com.elrapidin.api.domain.repository.ProductIngredientRepository;
import com.elrapidin.api.domain.repository.ProductRepository;
import com.elrapidin.api.dto.product.CreateIngredientRequest;

import java.util.List;

import org.springframework.stereotype.Service;

@Service
public class IngredientAdminService {

    private final IngredientRepository ingredientRepository;
    private final ProductRepository productRepository;
    private final ProductIngredientRepository productIngredientRepository;

    public IngredientAdminService(
            IngredientRepository ingredientRepository,
            ProductRepository productRepository,
            ProductIngredientRepository productIngredientRepository) {
        this.ingredientRepository = ingredientRepository;
        this.productRepository = productRepository;
        this.productIngredientRepository = productIngredientRepository;
    }

    public IngredientEntity createIngredient(CreateIngredientRequest request) {

        IngredientEntity ingredient = new IngredientEntity();
        ingredient.setName(request.getName());
        ingredient.setExtraPrice(request.getExtraPrice());

        return ingredientRepository.save(ingredient);
    }

    public void addIngredientToProduct(Long productId, Long ingredientId) {

        ProductEntity product = productRepository.findById(productId)
                .orElseThrow(() -> new RuntimeException("Producto no encontrado"));

        IngredientEntity ingredient = ingredientRepository.findById(ingredientId)
                .orElseThrow(() -> new RuntimeException("Ingrediente no encontrado"));

        ProductIngredientEntity relation = new ProductIngredientEntity();
        relation.setProduct(product);
        relation.setIngredient(ingredient);

        productIngredientRepository.save(relation);
    }

    public List<IngredientEntity> getAllIngredients() {
        return ingredientRepository.findAll();
    }

}
