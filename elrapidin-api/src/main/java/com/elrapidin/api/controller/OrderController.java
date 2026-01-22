package com.elrapidin.api.controller;

import com.elrapidin.api.domain.entity.order.OrderEntity;
import com.elrapidin.api.domain.repository.OrderRepository;
import com.elrapidin.api.dto.order.CreateOrderRequest;
import com.elrapidin.api.service.order.OrderService;

import jakarta.validation.Valid;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/orders")
public class OrderController {

    private final OrderService orderService;

    public OrderController(OrderService orderService) {
        this.orderService = orderService;
    }

    public OrderRepository OrderRepository;

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    @PreAuthorize("hasRole('CLIENT')")
    public OrderEntity createOrder(
            Authentication authentication,
            @RequestBody @Valid CreateOrderRequest request) {

        Long clientUserId = (Long) authentication.getPrincipal();
        return orderService.createOrder(clientUserId, request);
    }

    // -------------------------------
    @GetMapping
    @PreAuthorize("hasRole('CLIENT')")
    public List<OrderEntity> getMyOrders(Authentication authentication) {

        Long clientUserId = (Long) authentication.getPrincipal();
        return OrderRepository.findByClientUserIdOrderByCreatedAtDesc(clientUserId);
    }

}
