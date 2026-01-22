package com.elrapidin.api.controller;

import com.elrapidin.api.dto.delivery.DeliveryOrderResponse;
import com.elrapidin.api.dto.delivery.DeliveryProfileResponse;
import com.elrapidin.api.service.delivery.DeliveryQueryService;

import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/delivery")
@PreAuthorize("hasRole('DELIVERY')")
public class DeliveryController {

    private final DeliveryQueryService deliveryQueryService;

    public DeliveryController(DeliveryQueryService deliveryQueryService) {
        this.deliveryQueryService = deliveryQueryService;
    }

    // 🟢 PERFIL
    @GetMapping("/me")
    public DeliveryProfileResponse me() {

        Long userId = (Long) SecurityContextHolder
                .getContext()
                .getAuthentication()
                .getPrincipal();

        return deliveryQueryService.getMyProfile(userId);
    }

    // 🟢 ÓRDENES DISPONIBLES (LECTURA)
    @GetMapping("/orders/available")
    public List<DeliveryOrderResponse> availableOrders() {
        return deliveryQueryService.getAvailableOrders();
    }
}
