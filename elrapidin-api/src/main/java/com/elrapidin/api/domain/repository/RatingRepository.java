package com.elrapidin.api.domain.repository;

import com.elrapidin.api.domain.entity.businesses.BusinessEntity;
import com.elrapidin.api.domain.entity.businesses.RatingEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface RatingRepository extends JpaRepository<RatingEntity, Long> {

    List<RatingEntity> findByBusiness(BusinessEntity business);
}
