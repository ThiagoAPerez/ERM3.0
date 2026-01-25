package com.elrapidin.api.domain.repository;

import com.elrapidin.api.domain.entity.businesses.BusinessEntity;
import com.elrapidin.api.domain.enums.businesses.BusinessStatus;
import com.elrapidin.api.domain.enums.businesses.BusinessesCategory;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface BusinessRepository extends JpaRepository<BusinessEntity, Long> {

    List<BusinessEntity> findByStatus(BusinessStatus status);

    Optional<BusinessEntity> findByIdAndStatus(Long id, BusinessStatus status);

    Optional<BusinessEntity> findByOwnerUserId(Long ownerUserId);

    List<BusinessEntity> findByNameContainingIgnoreCase(String name);

    List<BusinessEntity> findByCategory(BusinessesCategory category);

    List<BusinessEntity> findByStatusNot(BusinessStatus status);
}
