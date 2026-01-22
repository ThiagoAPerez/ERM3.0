package com.elrapidin.api.controller;

import com.elrapidin.api.domain.entity.order.OrderEntity;
import com.elrapidin.api.dto.delivery.ConfirmDeliveryRequest;
import com.elrapidin.api.service.delivery.DeliveryOrderService;

import jakarta.validation.Valid;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/delivery/orders")
@PreAuthorize("hasRole('DELIVERY')")
public class DeliveryOrderController {

    private final DeliveryOrderService deliveryOrderService;

    public DeliveryOrderController(DeliveryOrderService deliveryOrderService) {
        this.deliveryOrderService = deliveryOrderService;
    }

    // 🟡 PEDIDOS ASIGNADOS AL REPARTIDOR
    @GetMapping("/assigned")
    public List<OrderEntity> getAssignedOrders(Authentication authentication) {

        Long deliveryUserId = (Long) authentication.getPrincipal();
        return deliveryOrderService.getAssignedOrders(deliveryUserId);
    }

    // 🔴 ACEPTAR PEDIDO
    @PostMapping("/{id}/accept")
    public void acceptOrder(
            @PathVariable Long id,
            Authentication authentication) {

        Long deliveryUserId = (Long) authentication.getPrincipal();
        deliveryOrderService.acceptOrder(id, deliveryUserId);
    }

    // 🔴 MARCAR EN TRÁNSITO
    @PostMapping("/{id}/pickup")
    public void pickupOrder(
            @PathVariable Long id,
            Authentication authentication) {

        Long deliveryUserId = (Long) authentication.getPrincipal();
        deliveryOrderService.markInTransit(id, deliveryUserId);
    }

    // 🔴 CONFIRMAR ENTREGA
    @PostMapping("/{id}/deliver")
    public void deliverOrder(
            @PathVariable Long id,
            @RequestBody @Valid ConfirmDeliveryRequest request,
            Authentication authentication) {

        Long deliveryUserId = (Long) authentication.getPrincipal();
        deliveryOrderService.confirmDelivery(
                id,
                deliveryUserId,
                request.deliveryCode());
    }
}
