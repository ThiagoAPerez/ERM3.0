package com.elrapidin.api.service.order;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.elrapidin.api.domain.entity.order.OrderEntity;
import com.elrapidin.api.domain.enums.order.OrderStatus;
import com.elrapidin.api.domain.repository.OrderRepository;
import com.elrapidin.api.service.EventPublisherService;

@Service
public class OrderStateTransitionServiceImpl implements OrderStateTransitionService {

    private final OrderRepository orderRepository;
    private final EventPublisherService eventPublisher;

    public OrderStateTransitionServiceImpl(
            OrderRepository orderRepository,
            EventPublisherService eventPublisher) {
        this.orderRepository = orderRepository;
        this.eventPublisher = eventPublisher;
    }

    @Override
    @Transactional
    public OrderEntity transition(
            Long orderId,
            OrderStatus newStatus,
            ActorContext actor) {
        OrderEntity order = orderRepository.findById(orderId)
                .orElseThrow(() -> new IllegalArgumentException("Order not found"));

        validateTransition(order, newStatus, actor);

        order.changeStatus(newStatus);

        OrderEntity saved = orderRepository.save(order);

        eventPublisher.publish(
                "ORDER",
                saved.getId(),
                eventNameFor(newStatus),
                idempotencyKey(saved, newStatus),
                payload(saved, actor));

        return saved;
    }

    // ----------------- VALIDATION -----------------

    private void validateTransition(
            OrderEntity order,
            OrderStatus target,
            ActorContext actor) {
        OrderStatus current = order.getStatus();

        if (current.isTerminal()) {
            throw new IllegalStateException("Order is in terminal state");
        }

        switch (actor.type()) {
            case CLIENT -> validateClient(current, target);
            case BUSINESS -> validateBusiness(current, target);
            case DELIVERY -> validateDelivery(current, target);
            case ADMIN -> {
            } // admin override permitido
        }
    }

    private void validateClient(OrderStatus current, OrderStatus target) {
        if (current == OrderStatus.CREATED && target == OrderStatus.PENDING_BUSINESS) {
            return;
        }
        if (target == OrderStatus.CANCELLED) {
            return;
        }
        throw new IllegalStateException("Client cannot perform this transition");
    }

    private void validateBusiness(OrderStatus current, OrderStatus target) {
        if (current == OrderStatus.PENDING_BUSINESS &&
                (target == OrderStatus.ACCEPTED_BY_BUSINESS || target == OrderStatus.CANCELLED)) {
            return;
        }
        if (current == OrderStatus.ACCEPTED_BY_BUSINESS && target == OrderStatus.PREPARING) {
            return;
        }
        if (current == OrderStatus.PREPARING && target == OrderStatus.READY_FOR_PICKUP) {
            return;
        }
        throw new IllegalStateException("Business cannot perform this transition");
    }

    private void validateDelivery(OrderStatus current, OrderStatus target) {
        if (current == OrderStatus.ASSIGNED_TO_DELIVERY &&
                (target == OrderStatus.PICKED_UP)) {
            return;
        }
        if (current == OrderStatus.PICKED_UP && target == OrderStatus.ON_THE_WAY) {
            return;
        }
        if (current == OrderStatus.ON_THE_WAY && target == OrderStatus.DELIVERED) {
            return;
        }
        throw new IllegalStateException("Delivery cannot perform this transition");
    }

    // ----------------- EVENTS -----------------

    private String eventNameFor(OrderStatus status) {
        return switch (status) {
            case PENDING_BUSINESS -> "order.pending_business";
            case ACCEPTED_BY_BUSINESS -> "order.accepted";
            case PREPARING -> "order.preparing";
            case READY_FOR_PICKUP -> "order.ready_for_pickup";
            case ASSIGNED_TO_DELIVERY -> "order.assigned";
            case PICKED_UP -> "order.picked_up";
            case ON_THE_WAY -> "order.on_the_way";
            case DELIVERED -> "order.delivered";
            case CANCELLED -> "order.cancelled";
            default -> throw new IllegalStateException("No event for status " + status);
        };
    }

    private String idempotencyKey(OrderEntity order, OrderStatus status) {
        return "order." + status.name().toLowerCase() + "." + order.getId();
    }

    private String payload(OrderEntity order, ActorContext actor) {
        return """
                {
                  "orderId": %d,
                  "status": "%s",
                  "actorType": "%s",
                  "actorId": %d
                }
                """.formatted(
                order.getId(),
                order.getStatus().name(),
                actor.type().name(),
                actor.actorId());
    }
}
