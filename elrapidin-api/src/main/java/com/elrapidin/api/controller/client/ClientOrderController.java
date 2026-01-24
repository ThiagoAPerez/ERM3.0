package com.elrapidin.api.controller.client;

import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import com.elrapidin.api.domain.entity.order.OrderEntity;
import com.elrapidin.api.domain.enums.order.OrderStatus;
import com.elrapidin.api.security.AuthenticatedUser;
import com.elrapidin.api.service.order.*;

@RestController
@RequestMapping("/api/client/orders")
public class ClientOrderController {

    private final OrderCreationService orderCreationService;
    private final OrderStateTransitionService stateTransitionService;
    private final OrderCancellationService cancellationService;

    public ClientOrderController(
            OrderCreationService orderCreationService,
            OrderStateTransitionService stateTransitionService,
            OrderCancellationService cancellationService) {
        this.orderCreationService = orderCreationService;
        this.stateTransitionService = stateTransitionService;
        this.cancellationService = cancellationService;
    }

    @PostMapping
    public OrderEntity create(
            @RequestBody CreateOrderCommand command,
            @AuthenticationPrincipal AuthenticatedUser user) {

        return orderCreationService.create(command);
    }

    @PostMapping("/{orderId}/send")
    public OrderEntity sendToBusiness(
            @PathVariable Long orderId,
            @AuthenticationPrincipal AuthenticatedUser user) {

        return stateTransitionService.transition(
                orderId,
                OrderStatus.PENDING_BUSINESS,
                new ActorContext(ActorType.CLIENT, user.getUserId()));
    }

    @PostMapping("/{orderId}/cancel")
    public OrderEntity cancel(
            @PathVariable Long orderId,
            @AuthenticationPrincipal AuthenticatedUser user) {

        return cancellationService.cancel(
                orderId,
                new ActorContext(ActorType.CLIENT, user.getUserId()));
    }
}
