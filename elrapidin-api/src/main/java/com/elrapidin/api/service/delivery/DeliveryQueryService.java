package com.elrapidin.api.service.delivery;

import com.elrapidin.api.domain.entity.delivery.DeliveryProfileEntity;
import com.elrapidin.api.domain.entity.order.OrderEntity;
import com.elrapidin.api.domain.enums.order.OrderStatus;
import com.elrapidin.api.domain.repository.DeliveryProfileRepository;
import com.elrapidin.api.domain.repository.OrderRepository;
import com.elrapidin.api.dto.delivery.DeliveryOrderResponse;
import com.elrapidin.api.dto.delivery.DeliveryProfileResponse;
import com.elrapidin.api.exception.ApiException;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class DeliveryQueryService {

    private final OrderRepository orderRepository;
    private final DeliveryProfileRepository deliveryProfileRepository;

    public DeliveryQueryService(
            OrderRepository orderRepository,
            DeliveryProfileRepository deliveryProfileRepository) {
        this.orderRepository = orderRepository;
        this.deliveryProfileRepository = deliveryProfileRepository;
    }

    public DeliveryProfileResponse getMyProfile(Long userId) {

        DeliveryProfileEntity profile = deliveryProfileRepository
                .findByUser_Id(userId)
                .orElseThrow(() -> new ApiException("Delivery profile not found", 404));

        return new DeliveryProfileResponse(
                profile.getUser().getId(),
                profile.getVehicleType(),
                profile.getVehiclePlate(),
                profile.getServiceType(),
                profile.getStatus(),
                profile.getCurrentZoneId());
    }

    public List<DeliveryOrderResponse> getAvailableOrders() {
        return orderRepository.findByStatus(OrderStatus.CONFIRMED)
                .stream()
                .map(this::mapToOrderResponse)
                .toList();
    }

    private DeliveryOrderResponse mapToOrderResponse(OrderEntity order) {
        return new DeliveryOrderResponse(
                order.getId(),
                order.getOrderCode(),
                order.getOrderType(),
                order.getServiceType(),
                order.getCreatedAt());
    }
}
