package com.elrapidin.api.service.order;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.elrapidin.api.domain.entity.UserEntity;
import com.elrapidin.api.domain.entity.businesses.BusinessEntity;
import com.elrapidin.api.domain.entity.order.OrderEntity;
import com.elrapidin.api.domain.entity.order.OrderItemEntity;
import com.elrapidin.api.domain.repository.BusinessRepository;
import com.elrapidin.api.domain.repository.OrderRepository;
import com.elrapidin.api.domain.repository.UserRepository;
import com.elrapidin.api.service.EventPublisherService;

import java.util.UUID;

@Service
public class OrderCreationServiceImpl implements OrderCreationService {

    private final OrderRepository orderRepository;
    private final UserRepository userRepository;
    private final BusinessRepository businessRepository;
    private final EventPublisherService eventPublisher;

    public OrderCreationServiceImpl(
            OrderRepository orderRepository,
            UserRepository userRepository,
            BusinessRepository businessRepository,
            EventPublisherService eventPublisher) {
        this.orderRepository = orderRepository;
        this.userRepository = userRepository;
        this.businessRepository = businessRepository;
        this.eventPublisher = eventPublisher;
    }

    @Override
    @Transactional
    public OrderEntity create(CreateOrderCommand command) {

        UserEntity customer = userRepository.findById(command.customerId())
                .orElseThrow(() -> new IllegalArgumentException("Customer not found"));

        BusinessEntity business = businessRepository.findById(command.businessId())
                .orElseThrow(() -> new IllegalArgumentException("Business not found"));

        OrderEntity order = new OrderEntity(
                customer,
                business,
                command.clientAddressId(),
                command.addressSnapshot());

        command.items().forEach(item -> order.addItem(
                new OrderItemEntity(
                        item.productName(),
                        item.quantity(),
                        item.salePrice(),
                        item.costPrice())));

        OrderEntity savedOrder = orderRepository.save(order);

        eventPublisher.publish(
                "ORDER",
                savedOrder.getId(),
                "order.created",
                buildIdempotencyKey(savedOrder),
                buildPayload(savedOrder));

        return savedOrder;
    }

    private String buildIdempotencyKey(OrderEntity order) {
        return "order.created." + order.getId();
    }

    private String buildPayload(OrderEntity order) {
        return """
                {
                  "orderId": %d,
                  "status": "%s"
                }
                """.formatted(order.getId(), order.getStatus().name());
    }
}
