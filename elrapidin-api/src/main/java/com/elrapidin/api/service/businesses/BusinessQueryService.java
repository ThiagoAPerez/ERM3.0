package com.elrapidin.api.service.businesses;

import com.elrapidin.api.domain.entity.businesses.BusinessEntity;
import com.elrapidin.api.domain.enums.businesses.BusinessStatus;
import com.elrapidin.api.domain.repository.BusinessRepository;
import com.elrapidin.api.dto.business.BusinessDetailPublicResponse;
import com.elrapidin.api.dto.business.BusinessPublicResponse;

import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class BusinessQueryService {

    private final BusinessRepository businessRepository;

    public BusinessQueryService(BusinessRepository businessRepository) {
        this.businessRepository = businessRepository;
    }

    // ===== LISTADO =====
    public List<BusinessPublicResponse> getActiveBusinesses() {

        return businessRepository.findByStatus(BusinessStatus.ACTIVE)
                .stream()
                .map(this::mapToPublicResponse)
                .collect(Collectors.toList());
    }

    // ===== DETALLE =====
    public BusinessDetailPublicResponse getBusinessDetail(Long id) {

        BusinessEntity entity = businessRepository
                .findByIdAndStatus(id, BusinessStatus.ACTIVE)
                .orElseThrow(() -> new RuntimeException("Business not found"));

        return mapToDetailResponse(entity);
    }

    // ===== MAPPERS =====

    private BusinessPublicResponse mapToPublicResponse(BusinessEntity entity) {

        BusinessPublicResponse response = new BusinessPublicResponse();
        response.setId(entity.getId());
        response.setName(entity.getName());
        response.setDescription(entity.getDescription());
        response.setMunicipality(entity.getMunicipality());
        response.setCategory(entity.getCategory().name());
        response.setLogoUrl(entity.getLogoUrl());
        response.setPreparationTimeMinutes(entity.getPreparationTimeMinutes());

        return response;
    }

    private BusinessDetailPublicResponse mapToDetailResponse(BusinessEntity entity) {

        BusinessDetailPublicResponse response = new BusinessDetailPublicResponse();
        response.setId(entity.getId());
        response.setName(entity.getName());
        response.setDescription(entity.getDescription());
        response.setPhone(entity.getPhone());
        response.setAddress(entity.getAddress());
        response.setMunicipality(entity.getMunicipality());
        response.setLogoUrl(entity.getLogoUrl());
        response.setCoverUrl(entity.getCoverUrl());
        response.setCategory(entity.getCategory().name());
        response.setPreparationTimeMinutes(entity.getPreparationTimeMinutes());

        return response;
    }
}
