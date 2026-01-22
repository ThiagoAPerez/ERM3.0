package com.elrapidin.api.domain.repository;

import com.elrapidin.api.domain.entity.UserEntity;
import com.elrapidin.api.domain.enums.user.UserRole;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface UserRepository extends JpaRepository<UserEntity, Long> {

    Optional<UserEntity> findByPhone(String phone);

    Optional<UserEntity> findByEmail(String email);

    boolean existsByPhone(String phone);

    boolean existsByEmail(String email);

    List<UserEntity> findByRole(UserRole role);

    @Query("""
                select u
                from UserEntity u
                join fetch u.deliveryProfile dp
                where u.role = :role
            """)
    List<UserEntity> findByRoleWithDeliveryProfile(@Param("role") UserRole role);
}
