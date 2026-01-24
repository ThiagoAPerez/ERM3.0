package com.elrapidin.api.domain.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.elrapidin.api.domain.entity.EventLogEntity;

import java.util.Optional;

public interface EventLogRepository extends JpaRepository<EventLogEntity, Long> {

    Optional<EventLogEntity> findByIdempotencyKey(String idempotencyKey);

}
