package com.elrapidin.api.service.businesses;

import com.elrapidin.api.domain.entity.order.OrderEntity;
import com.elrapidin.api.domain.enums.order.OrderStatus;
import com.elrapidin.api.domain.repository.OrderRepository;
import com.elrapidin.api.exception.ApiException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class BusinessOrderService {

    private final OrderRepository orderRepository;

    public BusinessOrderService(OrderRepository orderRepository) {
        this.orderRepository = orderRepository;
    }

    // ===============================
    // CONFIRMAR ORDEN POR NEGOCIO
    // ===============================
    @Transactional
    public void confirmBusinessOrder(Long orderId, Long businessUserId) {

        OrderEntity order = orderRepository.findById(orderId)
                .orElseThrow(() -> new ApiException("Order not found", 404));

        // Validar estado
        if (order.getStatus() != OrderStatus.CREATED) {
            throw new ApiException("Order cannot be confirmed", 400);
        }

        // (Opcional futuro: validar que el negocio sea el owner)
        // order.getProviderId() vs businessUserId

        order.setStatus(OrderStatus.CONFIRMED);
        orderRepository.save(order);
    }
}
