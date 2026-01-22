package com.elrapidin.api.service.order;

import com.elrapidin.api.domain.entity.businesses.BusinessEntity;
import com.elrapidin.api.domain.entity.order.OrderEntity;
import com.elrapidin.api.domain.repository.BusinessRepository;
import com.elrapidin.api.domain.repository.OrderRepository;
import com.elrapidin.api.dto.order.OrderListItemResponse;
import com.elrapidin.api.exception.ApiException;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class OrderListService {

    private final OrderRepository orderRepository;
    private final BusinessRepository businessRepository;

    public OrderListService(
            OrderRepository orderRepository,
            BusinessRepository businessRepository) {
        this.orderRepository = orderRepository;
        this.businessRepository = businessRepository;
    }

    // 🧑 CLIENTE — MIS ÓRDENES
    public List<OrderListItemResponse> getMyOrders() {

        Long userId = (Long) SecurityContextHolder
                .getContext()
                .getAuthentication()
                .getPrincipal();

        return orderRepository.findByClientUserId(userId)
                .stream()
                .map(this::map)
                .collect(Collectors.toList());
    }

    // 🏪 NEGOCIO — ÓRDENES DEL NEGOCIO
    public List<OrderListItemResponse> getBusinessOrders() {

        Long userId = (Long) SecurityContextHolder
                .getContext()
                .getAuthentication()
                .getPrincipal();

        BusinessEntity business = businessRepository
                .findByOwnerUserId(userId)
                .orElseThrow(() -> new ApiException("Business not found", 404));

        return orderRepository.findByProviderId(business.getId())
                .stream()
                .map(this::map)
                .collect(Collectors.toList());
    }

    private OrderListItemResponse map(OrderEntity order) {
        return new OrderListItemResponse(
                order.getId(),
                order.getOrderCode(),
                order.getOrderType(),
                order.getServiceType(),
                order.getStatus(),
                order.getCreatedAt());
    }
}
