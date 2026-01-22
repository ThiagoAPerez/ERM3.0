package com.elrapidin.api.service.delivery;

import com.elrapidin.api.domain.entity.order.OrderEntity;
import com.elrapidin.api.domain.enums.order.OrderStatus;
import com.elrapidin.api.domain.repository.OrderRepository;
import com.elrapidin.api.exception.ApiException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class DeliveryOrderService {

    private final OrderRepository orderRepository;
    private final PasswordEncoder passwordEncoder;

    public DeliveryOrderService(
            OrderRepository orderRepository,
            PasswordEncoder passwordEncoder) {
        this.orderRepository = orderRepository;
        this.passwordEncoder = passwordEncoder;
    }

    // ===============================
    // PEDIDOS DISPONIBLES
    // ===============================
    public List<OrderEntity> getAvailableOrders() {
        return orderRepository.findByStatus(OrderStatus.CREATED);
    }

    // ===============================
    // PEDIDOS ASIGNADOS AL DOMI
    // ===============================
    public List<OrderEntity> getAssignedOrders(Long deliveryUserId) {
        return orderRepository.findByDeliveryUserIdAndStatusIn(
                deliveryUserId,
                List.of(OrderStatus.ASSIGNED, OrderStatus.IN_TRANSIT));
    }

    // ===============================
    // ACEPTAR PEDIDO
    // ===============================
    @Transactional
    public void acceptOrder(Long orderId, Long deliveryUserId) {

        OrderEntity order = orderRepository.findById(orderId)
                .orElseThrow(() -> new ApiException("Order not found", 404));

        if (order.getStatus() != OrderStatus.CREATED) {
            throw new ApiException("Order cannot be accepted", 400);
        }

        order.setDeliveryUserId(deliveryUserId);
        order.setStatus(OrderStatus.ASSIGNED);

        orderRepository.save(order);
    }

    // ===============================
    // MARCAR EN TRÁNSITO
    // ===============================
    @Transactional
    public void markInTransit(Long orderId, Long deliveryUserId) {

        OrderEntity order = orderRepository.findById(orderId)
                .orElseThrow(() -> new ApiException("Order not found", 404));

        if (!deliveryUserId.equals(order.getDeliveryUserId())) {
            throw new ApiException("Not your order", 403);
        }

        if (order.getStatus() != OrderStatus.ASSIGNED) {
            throw new ApiException("Order cannot be picked up", 400);
        }

        order.setStatus(OrderStatus.IN_TRANSIT);
        orderRepository.save(order);
    }

    // ===============================
    // CONFIRMAR ENTREGA (CÓDIGO)
    // ===============================
    @Transactional
    public void confirmDelivery(
            Long orderId,
            Long deliveryUserId,
            String deliveryCode) {

        OrderEntity order = orderRepository.findById(orderId)
                .orElseThrow(() -> new ApiException("Order not found", 404));

        if (!deliveryUserId.equals(order.getDeliveryUserId())) {
            throw new ApiException("Not your order", 403);
        }

        if (order.getStatus() != OrderStatus.IN_TRANSIT) {
            throw new ApiException("Order not in transit", 400);
        }

        if (!passwordEncoder.matches(deliveryCode, order.getDeliveryCodeHash())) {
            throw new ApiException("Invalid delivery code", 400);
        }

        order.setStatus(OrderStatus.DELIVERED);
        orderRepository.save(order);
    }
}
