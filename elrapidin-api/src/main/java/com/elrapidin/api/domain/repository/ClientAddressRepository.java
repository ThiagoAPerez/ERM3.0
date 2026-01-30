package com.elrapidin.api.domain.repository;

import com.elrapidin.api.domain.entity.client.ClientAddressEntity;
import com.elrapidin.api.domain.enums.client.AddressStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface ClientAddressRepository extends JpaRepository<ClientAddressEntity, Long> {

    List<ClientAddressEntity> findByClientProfile_IdAndStatus(
            Long clientProfileId,
            AddressStatus status);

    Optional<ClientAddressEntity> findByIdAndClientProfile_Id(
            Long id,
            Long clientProfileId);

    @Modifying
    @Query("""
                update ClientAddressEntity a
                set a.primaryAddress = false
                where a.clientProfile.id = :profileId
            """)
    void clearPrimary(@Param("profileId") Long profileId);
}
