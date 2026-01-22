package com.elrapidin.api.domain.repository;

import com.elrapidin.api.domain.entity.delivery.DeliveryProfileEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface DeliveryProfileRepository
                extends JpaRepository<DeliveryProfileEntity, Long> {

        Optional<DeliveryProfileEntity> findByUser_Id(Long userId);
}
