package com.elrapidin.api.domain.repository;

import com.elrapidin.api.domain.entity.client.ClientProfileEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface ClientProfileRepository extends JpaRepository<ClientProfileEntity, Long> {

    Optional<ClientProfileEntity> findByUserId(Long userId);

    boolean existsByUserId(Long userId);
}
