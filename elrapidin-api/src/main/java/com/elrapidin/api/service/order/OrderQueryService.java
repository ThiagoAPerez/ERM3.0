package com.elrapidin.api.service.order;

import com.elrapidin.api.domain.entity.order.OrderEntity;
import com.elrapidin.api.domain.enums.user.UserRole;
import com.elrapidin.api.domain.repository.OrderRepository;
import com.elrapidin.api.dto.order.OrderDetailResponse;
import com.elrapidin.api.exception.ApiException;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

@Service
public class OrderQueryService {

        private final OrderRepository orderRepository;

        public OrderQueryService(OrderRepository orderRepository) {
                this.orderRepository = orderRepository;
        }

        public OrderDetailResponse getOrder(Long orderId) {

                OrderEntity order = orderRepository.findById(orderId)
                                .orElseThrow(() -> new RuntimeException("Order not found"));

                Long userId = (Long) SecurityContextHolder
                                .getContext()
                                .getAuthentication()
                                .getPrincipal();

                UserRole role = SecurityContextHolder
                                .getContext()
                                .getAuthentication()
                                .getAuthorities()
                                .stream()
                                .map(a -> UserRole.valueOf(a.getAuthority().replace("ROLE_", "")))
                                .findFirst()
                                .orElseThrow();

                // 🔐 Solo el cliente ve el código
                String deliveryCode = role == UserRole.CLIENT &&
                                order.getClientUserId().equals(userId)
                                                ? "****" // se envía por separado (push / UI)
                                                : null;

                return new OrderDetailResponse(
                                order.getId(),
                                order.getOrderCode(),
                                order.getStatus(),
                                order.getOrderType(),
                                order.getServiceType(),
                                deliveryCode,
                                order.getCreatedAt());
        }
}
