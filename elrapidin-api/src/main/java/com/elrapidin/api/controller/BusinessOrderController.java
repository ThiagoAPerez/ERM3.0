package com.elrapidin.api.controller;

import com.elrapidin.api.domain.entity.order.OrderEntity;
import com.elrapidin.api.domain.enums.order.OrderStatus;
import com.elrapidin.api.domain.repository.OrderRepository;
import com.elrapidin.api.service.businesses.BusinessOrderService;

import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/business/orders")
@PreAuthorize("hasRole('BUSINESS')")
public class BusinessOrderController {

    private final BusinessOrderService businessOrderService;
    private final OrderRepository orderRepository;

    public BusinessOrderController(
            BusinessOrderService businessOrderService,
            OrderRepository orderRepository) {
        this.businessOrderService = businessOrderService;
        this.orderRepository = orderRepository;
    } 

    // ===============================
    // LISTAR ÓRDENES DEL NEGOCIO
    // ===============================
    @GetMapping
    public List<OrderEntity> getBusinessOrders(Authentication authentication) {

        Long businessUserId = (Long) authentication.getPrincipal();

        return orderRepository.findByProviderIdAndStatusIn(
                businessUserId,
                List.of(
                        OrderStatus.CREATED,
                        OrderStatus.CONFIRMED,
                        OrderStatus.ASSIGNED,
                        OrderStatus.IN_TRANSIT));
    }

    // ===============================
    // CONFIRMAR ORDEN (NEGOCIO)
    // ===============================
    @PostMapping("/{orderId}/confirm")
    public void confirmOrder(
            @PathVariable Long orderId,
            Authentication authentication) {

        Long businessUserId = (Long) authentication.getPrincipal();
        businessOrderService.confirmBusinessOrder(orderId, businessUserId);
    }
}
