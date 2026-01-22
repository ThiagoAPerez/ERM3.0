package com.elrapidin.api.domain.repository;

import com.elrapidin.api.domain.entity.order.OrderEntity;
import com.elrapidin.api.domain.enums.order.OrderStatus;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface OrderRepository extends JpaRepository<OrderEntity, Long> {

    // ===== CLIENTE =====
    List<OrderEntity> findByClientUserId(Long clientUserId);

    List<OrderEntity> findByClientUserIdOrderByCreatedAtDesc(Long clientUserId);

    // ===== NEGOCIO =====
    List<OrderEntity> findByProviderId(Long providerId);

    List<OrderEntity> findByProviderIdOrderByCreatedAtDesc(Long providerId);

    List<OrderEntity> findByProviderIdAndStatusIn(
            Long providerId,
            List<OrderStatus> statuses);

    // ===== DOMICILIARIO =====
    List<OrderEntity> findByDeliveryUserId(Long deliveryUserId);

    List<OrderEntity> findByDeliveryUserIdAndStatusIn(
            Long deliveryUserId,
            List<OrderStatus> statuses);

    // ===== GENERALES =====
    List<OrderEntity> findByStatus(OrderStatus status);

    Optional<OrderEntity> findByIdAndStatus(Long id, OrderStatus status);
}
