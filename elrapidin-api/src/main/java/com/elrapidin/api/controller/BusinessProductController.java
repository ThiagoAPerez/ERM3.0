package com.elrapidin.api.controller;

import com.elrapidin.api.dto.product.ProductPublicResponse;
import com.elrapidin.api.service.order.ProductQueryService;

import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/businesses")
public class BusinessProductController {

    private final ProductQueryService productQueryService;

    public BusinessProductController(ProductQueryService productQueryService) {
        this.productQueryService = productQueryService;
    }

}
