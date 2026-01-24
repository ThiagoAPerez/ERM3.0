package com.elrapidin.api.service.order;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.elrapidin.api.domain.entity.order.OrderEntity;
import com.elrapidin.api.domain.enums.order.OrderStatus;
import com.elrapidin.api.domain.repository.OrderRepository;

@Service
public class OrderDeliveryServiceImpl implements OrderDeliveryService {

    private final OrderRepository orderRepository;
    private final OrderStateTransitionService stateTransitionService;

    public OrderDeliveryServiceImpl(
            OrderRepository orderRepository,
            OrderStateTransitionService stateTransitionService) {
        this.orderRepository = orderRepository;
        this.stateTransitionService = stateTransitionService;
    }

    @Override
    @Transactional
    public OrderEntity pickUp(Long orderId, ActorContext actor) {
        validateDeliveryActor(actor);

        OrderEntity order = getAssignedOrder(orderId, actor);

        if (order.getStatus() != OrderStatus.ASSIGNED_TO_DELIVERY) {
            throw new IllegalStateException("Order is not assigned for pickup");
        }

        return stateTransitionService.transition(
                orderId,
                OrderStatus.PICKED_UP,
                actor);
    }

    @Override
    @Transactional
    public OrderEntity startDelivery(Long orderId, ActorContext actor) {
        validateDeliveryActor(actor);

        OrderEntity order = getAssignedOrder(orderId, actor);

        if (order.getStatus() != OrderStatus.PICKED_UP) {
            throw new IllegalStateException("Order not picked up yet");
        }

        return stateTransitionService.transition(
                orderId,
                OrderStatus.ON_THE_WAY,
                actor);
    }

    @Override
    @Transactional
    public OrderEntity deliver(Long orderId, String deliveryCode, ActorContext actor) {
        validateDeliveryActor(actor);

        OrderEntity order = getAssignedOrder(orderId, actor);

        if (order.getStatus() != OrderStatus.ON_THE_WAY) {
            throw new IllegalStateException("Order is not on the way");
        }

        if (!order.matchesDeliveryCode(deliveryCode)) {
            throw new IllegalStateException("Invalid delivery code");
        }

        OrderEntity delivered = stateTransitionService.transition(
                orderId,
                OrderStatus.DELIVERED,
                actor);

        // 🧹 limpiar código después de entrega exitosa
        delivered.clearDeliveryCode();
        orderRepository.save(delivered);

        return delivered;
    }

    // ----------------- VALIDATIONS -----------------

    private void validateDeliveryActor(ActorContext actor) {
        if (actor.type() != ActorType.DELIVERY) {
            throw new IllegalStateException("Only delivery can perform this action");
        }
    }

    private OrderEntity getAssignedOrder(Long orderId, ActorContext actor) {
        OrderEntity order = orderRepository.findById(orderId)
                .orElseThrow(() -> new IllegalArgumentException("Order not found"));

        if (order.getDelivery() == null ||
                !order.getDelivery().getId().equals(actor.actorId())) {
            throw new IllegalStateException("Order is not assigned to this delivery");
        }

        return order;
    }
}
