package com.elrapidin.api.domain.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.elrapidin.api.domain.entity.delivery.DeliverySettlementEntity;

import java.util.List;

public interface DeliverySettlementRepository
        extends JpaRepository<DeliverySettlementEntity, Long> {

    List<DeliverySettlementEntity> findByDeliveryUserId(Long deliveryUserId);
}
