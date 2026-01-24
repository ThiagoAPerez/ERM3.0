package com.elrapidin.api.controller.businesses;

import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import com.elrapidin.api.domain.entity.order.OrderEntity;
import com.elrapidin.api.domain.enums.order.OrderStatus;
import com.elrapidin.api.security.AuthenticatedUser;
import com.elrapidin.api.service.order.*;

@RestController
@RequestMapping("/api/business/orders")
public class BusinessOrderController {

        private final OrderStateTransitionService stateTransitionService;
        private final OrderCancellationService cancellationService;

        public BusinessOrderController(
                        OrderStateTransitionService stateTransitionService,
                        OrderCancellationService cancellationService) {
                this.stateTransitionService = stateTransitionService;
                this.cancellationService = cancellationService;
        }

        @PostMapping("/{orderId}/accept")
        public OrderEntity accept(
                        @PathVariable Long orderId,
                        @AuthenticationPrincipal AuthenticatedUser user) {

                return stateTransitionService.transition(
                                orderId,
                                OrderStatus.ACCEPTED_BY_BUSINESS,
                                new ActorContext(ActorType.BUSINESS, user.getUserId()));
        }

        @PostMapping("/{orderId}/prepare")
        public OrderEntity prepare(
                        @PathVariable Long orderId,
                        @AuthenticationPrincipal AuthenticatedUser user) {

                return stateTransitionService.transition(
                                orderId,
                                OrderStatus.PREPARING,
                                new ActorContext(ActorType.BUSINESS, user.getUserId()));
        }

        @PostMapping("/{orderId}/ready")
        public OrderEntity ready(
                        @PathVariable Long orderId,
                        @AuthenticationPrincipal AuthenticatedUser user) {

                return stateTransitionService.transition(
                                orderId,
                                OrderStatus.READY_FOR_PICKUP,
                                new ActorContext(ActorType.BUSINESS, user.getUserId()));
        }

        @PostMapping("/{orderId}/cancel")
        public OrderEntity cancel(
                        @PathVariable Long orderId,
                        @AuthenticationPrincipal AuthenticatedUser user) {

                return cancellationService.cancel(
                                orderId,
                                new ActorContext(ActorType.BUSINESS, user.getUserId()));
        }
}
