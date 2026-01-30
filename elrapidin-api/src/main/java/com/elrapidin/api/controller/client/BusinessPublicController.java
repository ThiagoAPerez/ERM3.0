package com.elrapidin.api.controller.client;

import com.elrapidin.api.domain.enums.businesses.BusinessesCategory;
import com.elrapidin.api.dto.business.BusinessDetailPublicResponse;
import com.elrapidin.api.dto.business.BusinessPublicResponse;
import com.elrapidin.api.dto.product.ProductPublicResponse;
import com.elrapidin.api.service.businesses.BusinessQueryService;
import com.elrapidin.api.service.order.ProductQueryService;

import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/businesses")
public class BusinessPublicController {

    private final BusinessQueryService businessQueryService;
    private final ProductQueryService productQueryService;

    public BusinessPublicController(
            BusinessQueryService businessQueryService,
            ProductQueryService productQueryService) {
        this.businessQueryService = businessQueryService;
        this.productQueryService = productQueryService;
    }

    // ===============================
    // LISTADO PÚBLICO
    // ===============================
    @GetMapping
    public List<BusinessPublicResponse> getBusinesses() {
        return businessQueryService.getActiveBusinesses();
    }

    // ===============================
    // DETALLE PÚBLICO
    // ===============================
    @GetMapping("/{id}")
    public BusinessDetailPublicResponse getBusinessDetail(
            @PathVariable Long id) {
        return businessQueryService.getBusinessDetail(id);

    }

    // ===============================
    // PRODUCTOS PÚBLICOS DEL NEGOCIO
    // ===============================
    @GetMapping("/{id}/products")
    public List<ProductPublicResponse> getBusinessProducts(
            @PathVariable Long id,
            @RequestParam BusinessesCategory providerType) {
        return productQueryService.getPublicProductsByProvider(providerType, id);
    }
}
