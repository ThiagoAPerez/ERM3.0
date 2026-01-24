package com.elrapidin.api.controller.delivery;

import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import com.elrapidin.api.domain.entity.order.OrderEntity;
import com.elrapidin.api.security.AuthenticatedUser;
import com.elrapidin.api.service.order.*;

@RestController
@RequestMapping("/api/delivery/orders")
public class DeliveryOrderController {

    private final OrderDeliveryService deliveryService;

    public DeliveryOrderController(OrderDeliveryService deliveryService) {
        this.deliveryService = deliveryService;
    }

    @PostMapping("/{orderId}/pickup")
    public OrderEntity pickUp(
            @PathVariable Long orderId,
            @AuthenticationPrincipal AuthenticatedUser user) {

        return deliveryService.pickUp(
                orderId,
                new ActorContext(ActorType.DELIVERY, user.getUserId()));
    }

    @PostMapping("/{orderId}/start")
    public OrderEntity start(
            @PathVariable Long orderId,
            @AuthenticationPrincipal AuthenticatedUser user) {

        return deliveryService.startDelivery(
                orderId,
                new ActorContext(ActorType.DELIVERY, user.getUserId()));
    }

    @PostMapping("/{orderId}/deliver")
    public OrderEntity deliver(
            @PathVariable Long orderId,
            @RequestParam String deliveryCode,
            @AuthenticationPrincipal AuthenticatedUser user) {

        return deliveryService.deliver(
                orderId,
                deliveryCode,
                new ActorContext(ActorType.DELIVERY, user.getUserId()));
    }
}
