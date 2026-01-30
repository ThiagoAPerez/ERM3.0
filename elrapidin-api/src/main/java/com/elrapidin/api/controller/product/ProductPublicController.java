package com.elrapidin.api.controller.product;

import com.elrapidin.api.dto.product.ProductWithIngredientsPublicResponse;
import com.elrapidin.api.service.producto.ProductPublicService;

import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/public/products")
public class ProductPublicController {

    private final ProductPublicService productPublicService;

    public ProductPublicController(ProductPublicService productPublicService) {
        this.productPublicService = productPublicService;
    }

    @GetMapping("/{productId}")
    public ProductWithIngredientsPublicResponse getProduct(
            @PathVariable Long productId) {

        return productPublicService.getProductWithIngredients(productId);
    }
}
