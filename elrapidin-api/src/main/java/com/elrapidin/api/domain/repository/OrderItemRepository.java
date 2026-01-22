package com.elrapidin.api.domain.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.elrapidin.api.domain.entity.order.OrderItemEntity;

public interface OrderItemRepository extends JpaRepository<OrderItemEntity, Long> {
}
