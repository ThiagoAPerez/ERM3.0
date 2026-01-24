package com.elrapidin.api.domain.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.elrapidin.api.domain.entity.order.OrderEntity;

public interface OrderRepository extends JpaRepository<OrderEntity, Long> {
}
