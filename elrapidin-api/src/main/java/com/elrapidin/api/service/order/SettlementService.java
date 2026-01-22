package com.elrapidin.api.service.order;

import com.elrapidin.api.domain.entity.order.OrderEntity;
import com.elrapidin.api.domain.enums.order.OrderStatus;
import com.elrapidin.api.domain.repository.OrderRepository;
import com.elrapidin.api.exception.ApiException;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

@Service
public class SettlementService {

    private final OrderRepository orderRepository;

    public SettlementService(OrderRepository orderRepository) {
        this.orderRepository = orderRepository;
    }

    // =========================================================
    // 🧾 LIQUIDACIÓN DOMICILIARIO
    // =========================================================
    public BigDecimal calculateDeliverySettlement(
            Long deliveryUserId,
            LocalDate from,
            LocalDate to) {

        List<OrderEntity> orders = orderRepository
                .findByDeliveryUserIdAndStatusIn(
                        deliveryUserId,
                        List.of(OrderStatus.DELIVERED));

        return orders.stream()
                .filter(o -> isBetween(o.getCreatedAt(), from, to))
                .map(OrderEntity::getDeliveryEarning)
                .reduce(BigDecimal.ZERO, BigDecimal::add);
    }

    // =========================================================
    // 🏪 LIQUIDACIÓN NEGOCIO
    // =========================================================
    public BigDecimal calculateBusinessSettlement(
            Long businessId,
            LocalDate from,
            LocalDate to) {

        List<OrderEntity> orders = orderRepository
                .findByProviderIdAndStatusIn(
                        businessId,
                        List.of(OrderStatus.DELIVERED));

        return orders.stream()
                .filter(o -> isBetween(o.getCreatedAt(), from, to))
                .map(o -> o.getSubtotalSale().subtract(o.getSubtotalCost()))
                .reduce(BigDecimal.ZERO, BigDecimal::add);
    }

    // =========================================================
    // 🏦 INGRESO PLATAFORMA
    // =========================================================
    public BigDecimal calculatePlatformIncome(
            LocalDate from,
            LocalDate to) {

        List<OrderEntity> orders = orderRepository
                .findByStatus(OrderStatus.DELIVERED);

        return orders.stream()
                .filter(o -> isBetween(o.getCreatedAt(), from, to))
                .map(o -> o.getPlatformMargin()
                        .add(o.getDeliveryCommission()))
                .reduce(BigDecimal.ZERO, BigDecimal::add);
    }

    // =========================================================
    // 🕒 UTIL
    // =========================================================
    private boolean isBetween(
            LocalDateTime dateTime,
            LocalDate from,
            LocalDate to) {

        LocalDate date = dateTime.toLocalDate();
        return !date.isBefore(from) && !date.isAfter(to);
    }
}
