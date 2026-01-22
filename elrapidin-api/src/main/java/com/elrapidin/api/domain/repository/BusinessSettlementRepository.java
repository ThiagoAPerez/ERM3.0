package com.elrapidin.api.domain.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.elrapidin.api.domain.entity.businesses.BusinessSettlementEntity;

import java.util.List;

public interface BusinessSettlementRepository
        extends JpaRepository<BusinessSettlementEntity, Long> {

    List<BusinessSettlementEntity> findByBusinessUserId(Long businessUserId);
}
