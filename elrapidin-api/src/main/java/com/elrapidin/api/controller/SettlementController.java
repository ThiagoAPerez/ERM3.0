package com.elrapidin.api.controller;

import com.elrapidin.api.service.order.SettlementService;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.math.BigDecimal;
import java.time.LocalDate;

@RestController
@RequestMapping("/settlements")
public class SettlementController {

    private final SettlementService settlementService;

    public SettlementController(SettlementService settlementService) {
        this.settlementService = settlementService;
    }

    // =========================================================
    // 🚴 DOMICILIARIO
    // =========================================================
    @GetMapping("/delivery/me")
    @PreAuthorize("hasRole('DELIVERY')")
    public BigDecimal getMyDeliverySettlement(
            Authentication authentication,
            @RequestParam LocalDate from,
            @RequestParam LocalDate to) {

        Long deliveryUserId = (Long) authentication.getPrincipal();

        return settlementService.calculateDeliverySettlement(
                deliveryUserId,
                from,
                to
        );
    }

    // =========================================================
    // 🏪 NEGOCIO
    // =========================================================
    @GetMapping("/business/{businessId}")
    @PreAuthorize("hasRole('BUSINESS')")
    public BigDecimal getBusinessSettlement(
            @PathVariable Long businessId,
            @RequestParam LocalDate from,
            @RequestParam LocalDate to) {

        return settlementService.calculateBusinessSettlement(
                businessId,
                from,
                to
        );
    }

    // =========================================================
    // 🏦 ADMIN / PLATAFORMA
    // =========================================================
    @GetMapping("/platform")
    @PreAuthorize("hasRole('ADMIN')")
    public BigDecimal getPlatformIncome(
            @RequestParam LocalDate from,
            @RequestParam LocalDate to) {

        return settlementService.calculatePlatformIncome(from, to);
    }
}
