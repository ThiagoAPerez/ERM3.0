package com.elrapidin.api.controller.businesses;

import com.elrapidin.api.dto.business.BusinessMeResponse;
import com.elrapidin.api.security.AuthenticatedUser;
import com.elrapidin.api.service.businesses.BusinessQueries;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/business/me")
public class BusinessMeController {

    private final BusinessQueries businessQueries;

    public BusinessMeController(BusinessQueries businessQueries) {
        this.businessQueries = businessQueries;
    }

    // ===============================
    // PERFIL DEL NEGOCIO (LECTURA)
    // ===============================
    @GetMapping
    public ResponseEntity<BusinessMeResponse> getMyBusiness(
            @AuthenticationPrincipal AuthenticatedUser user) {

        return ResponseEntity.ok(
                businessQueries.getMyBusinessProfile(user.getUserId())
        );
    }
}
