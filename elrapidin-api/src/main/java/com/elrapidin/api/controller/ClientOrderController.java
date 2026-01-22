package com.elrapidin.api.controller;

import com.elrapidin.api.dto.order.OrderListItemResponse;
import com.elrapidin.api.service.order.OrderListService;

import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/orders")
@PreAuthorize("hasRole('CLIENT')")
public class ClientOrderController {

    private final OrderListService orderListService;

    public ClientOrderController(OrderListService orderListService) {
        this.orderListService = orderListService;
    }

    @GetMapping(params = "mine=true")
    public List<OrderListItemResponse> myOrders() {
        return orderListService.getMyOrders();
    }
}
