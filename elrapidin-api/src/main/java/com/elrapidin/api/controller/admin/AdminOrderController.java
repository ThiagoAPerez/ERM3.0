package com.elrapidin.api.controller.admin;

import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import com.elrapidin.api.domain.entity.order.OrderEntity;
import com.elrapidin.api.security.AuthenticatedUser;
import com.elrapidin.api.service.order.*;

@RestController
@RequestMapping("/api/admin/orders")
public class AdminOrderController {

    private final OrderAssignmentService assignmentService;

    public AdminOrderController(OrderAssignmentService assignmentService) {
        this.assignmentService = assignmentService;
    }

    @PostMapping("/{orderId}/assign/{deliveryId}")
    public OrderEntity assignDelivery(
            @PathVariable Long orderId,
            @PathVariable Long deliveryId,
            @AuthenticationPrincipal AuthenticatedUser user) {

        return assignmentService.assignDelivery(
                orderId,
                deliveryId,
                new ActorContext(ActorType.ADMIN, user.getUserId()));
    }
}
