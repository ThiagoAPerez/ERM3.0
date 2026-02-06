package com.elrapidin.api.controller.product;

import com.elrapidin.api.domain.entity.product.IngredientEntity;
import com.elrapidin.api.dto.product.AddIngredientToProductRequest;
import com.elrapidin.api.dto.product.CreateIngredientRequest;
import com.elrapidin.api.service.producto.IngredientAdminService;

import jakarta.validation.Valid;

import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/admin/ingredients")
public class IngredientAdminController {

    private final IngredientAdminService ingredientAdminService;

    public IngredientAdminController(IngredientAdminService ingredientAdminService) {
        this.ingredientAdminService = ingredientAdminService;
    }

    // ✅ LISTAR INGREDIENTES (NECESARIO PARA EL SELECTOR)
    @GetMapping
    public List<IngredientEntity> getAllIngredients() {
        return ingredientAdminService.getAllIngredients();
    }

    // ✅ CREAR INGREDIENTE
    @PostMapping
    public IngredientEntity createIngredient(
            @Valid @RequestBody CreateIngredientRequest request) {

        return ingredientAdminService.createIngredient(request);
    }

    // ✅ ASOCIAR INGREDIENTE A PRODUCTO
    @PostMapping("/products/{productId}")
    public void addIngredientToProduct(
            @PathVariable Long productId,
            @Valid @RequestBody AddIngredientToProductRequest request) {

        ingredientAdminService.addIngredientToProduct(
                productId,
                request.getIngredientId());
    }
}
