package com.elrapidin.api.controller;

import com.elrapidin.api.dto.business.BusinessDetailPublicResponse;
import com.elrapidin.api.dto.business.BusinessPublicResponse;
import com.elrapidin.api.service.businesses.BusinessQueryService;

import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/businesses")
public class BusinessController {

    private final BusinessQueryService businessQueryService;

    public BusinessController(BusinessQueryService businessQueryService) {
        this.businessQueryService = businessQueryService;
    }

    // ===== LISTADO =====
    @GetMapping
    public List<BusinessPublicResponse> getBusinesses() {
        return businessQueryService.getActiveBusinesses();
    }

    // ===== DETALLE =====
    @GetMapping("/{id}")
    public BusinessDetailPublicResponse getBusiness(@PathVariable Long id) {
        return businessQueryService.getBusinessDetail(id);
    }
}
