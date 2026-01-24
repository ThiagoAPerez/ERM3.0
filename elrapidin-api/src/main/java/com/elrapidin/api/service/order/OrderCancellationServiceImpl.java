package com.elrapidin.api.service.order;

import org.springframework.stereotype.Service;
import com.elrapidin.api.domain.entity.order.OrderEntity;
import com.elrapidin.api.domain.enums.order.OrderStatus;
import com.elrapidin.api.domain.repository.OrderRepository;

import jakarta.transaction.Transactional;

@Service
public class OrderCancellationServiceImpl implements OrderCancellationService {

    private final OrderRepository orderRepository;
    private final OrderStateTransitionService stateTransitionService;

    public OrderCancellationServiceImpl(
            OrderRepository orderRepository,
            OrderStateTransitionService stateTransitionService) {
        this.orderRepository = orderRepository;
        this.stateTransitionService = stateTransitionService;
    }

    @Override
    @Transactional
    public OrderEntity cancel(Long orderId, ActorContext actor) {

        OrderEntity order = orderRepository.findById(orderId)
                .orElseThrow(() -> new IllegalArgumentException("Order not found"));

        validateCancellation(order, actor);

        return stateTransitionService.transition(
                orderId,
                OrderStatus.CANCELLED,
                actor);
    }

    // ----------------- RULES -----------------

    private void validateCancellation(OrderEntity order, ActorContext actor) {

        if (order.getStatus().isTerminal()) {
            throw new IllegalStateException("Order already finished");
        }

        switch (actor.type()) {
            case CLIENT -> validateClient(order.getStatus());
            case BUSINESS -> validateBusiness(order.getStatus());
            case ADMIN -> {
            } // override total
            default -> throw new IllegalStateException("Actor cannot cancel orders");
        }
    }

    private void validateClient(OrderStatus status) {
        if (status == OrderStatus.CREATED ||
                status == OrderStatus.PENDING_BUSINESS) {
            return;
        }
        throw new IllegalStateException("Client cannot cancel at this stage");
    }

    private void validateBusiness(OrderStatus status) {
        if (status == OrderStatus.PENDING_BUSINESS ||
                status == OrderStatus.ACCEPTED_BY_BUSINESS) {
            return;
        }
        throw new IllegalStateException("Business cannot cancel at this stage");
    }
}
