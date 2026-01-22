package com.elrapidin.api.domain.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.elrapidin.api.domain.entity.delivery.DeliveryEarningEntity;

public interface DeliveryEarningRepository extends JpaRepository<DeliveryEarningEntity, Long> {
}
