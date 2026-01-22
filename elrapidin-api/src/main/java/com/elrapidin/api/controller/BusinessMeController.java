package com.elrapidin.api.controller;

import com.elrapidin.api.dto.business.BusinessMeResponse;
import com.elrapidin.api.service.businesses.BusinessMeService;

import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/business")
public class BusinessMeController {

    private final BusinessMeService businessMeService;

    public BusinessMeController(BusinessMeService businessMeService) {
        this.businessMeService = businessMeService;
    }

    @GetMapping("/me")
    public BusinessMeResponse me(Authentication authentication) {

        Long userId = (Long) authentication.getPrincipal();
        return businessMeService.getMyBusiness(userId);
    }
}
