package com.elrapidin.api.service.order;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.elrapidin.api.domain.entity.delivery.DeliveryProfileEntity;
import com.elrapidin.api.domain.entity.order.OrderEntity;
import com.elrapidin.api.domain.enums.order.OrderStatus;
import com.elrapidin.api.domain.repository.DeliveryProfileRepository;
import com.elrapidin.api.domain.repository.OrderRepository;
import com.elrapidin.api.service.EventPublisherService;
import com.elrapidin.api.util.DeliveryCodeGenerator;

@Service
public class OrderAssignmentServiceImpl implements OrderAssignmentService {

    private final OrderRepository orderRepository;
    private final DeliveryProfileRepository deliveryRepository;
    private final OrderStateTransitionService stateTransitionService;
    private final EventPublisherService eventPublisher;

    public OrderAssignmentServiceImpl(
            OrderRepository orderRepository,
            DeliveryProfileRepository deliveryRepository,
            OrderStateTransitionService stateTransitionService,
            EventPublisherService eventPublisher) {
        this.orderRepository = orderRepository;
        this.deliveryRepository = deliveryRepository;
        this.stateTransitionService = stateTransitionService;
        this.eventPublisher = eventPublisher;
    }

    @Override
    @Transactional
    public OrderEntity assignDelivery(
            Long orderId,
            Long deliveryProfileId,
            ActorContext actor) {

        if (actor.type() != ActorType.ADMIN) {
            throw new IllegalStateException("Only admin can assign delivery");
        }

        OrderEntity order = orderRepository.findById(orderId)
                .orElseThrow(() -> new IllegalArgumentException("Order not found"));

        if (order.getStatus() != OrderStatus.READY_FOR_PICKUP) {
            throw new IllegalStateException("Order is not ready for pickup");
        }

        DeliveryProfileEntity delivery = deliveryRepository.findById(deliveryProfileId)
                .orElseThrow(() -> new IllegalArgumentException("Delivery not found"));

        order.assignDelivery(delivery);

        // 🔐 generar código de entrega (6 dígitos)
        String deliveryCode = DeliveryCodeGenerator.generate6Digits();
        order.generateDeliveryCode(deliveryCode);

        orderRepository.save(order);

        // 🔔 evento para notificar al cliente
        eventPublisher.publish(
                "ORDER",
                order.getId(),
                "order.delivery_code_generated",
                "order.delivery_code_generated." + order.getId(),
                """
                        {
                          "orderId": %d,
                          "deliveryCode": "%s"
                        }
                        """.formatted(order.getId(), deliveryCode));

        // transición oficial de estado
        return stateTransitionService.transition(
                orderId,
                OrderStatus.ASSIGNED_TO_DELIVERY,
                actor);
    }
}
