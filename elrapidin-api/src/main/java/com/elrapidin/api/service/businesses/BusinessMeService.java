package com.elrapidin.api.service.businesses;

import com.elrapidin.api.domain.entity.businesses.BusinessEntity;
import com.elrapidin.api.domain.repository.BusinessRepository;
import com.elrapidin.api.dto.business.BusinessMeResponse;
import org.springframework.stereotype.Service;

@Service
public class BusinessMeService {

    private final BusinessRepository businessRepository;

    public BusinessMeService(BusinessRepository businessRepository) {
        this.businessRepository = businessRepository;
    }

    public BusinessMeResponse getMyBusiness(Long userId) {

        BusinessEntity business = businessRepository
                .findByOwnerUserId(userId)
                .orElseThrow(() -> new RuntimeException("Business not found for user"));

        BusinessMeResponse response = new BusinessMeResponse();
        response.setId(business.getId());
        response.setName(business.getName());
        response.setDescription(business.getDescription());
        response.setPhone(business.getPhone());
        response.setEmail(business.getEmail());
        response.setAddress(business.getAddress());
        response.setMunicipality(business.getMunicipality());
        response.setLogoUrl(business.getLogoUrl());
        response.setCoverUrl(business.getCoverUrl());
        response.setPreparationTimeMinutes(
                business.getPreparationTimeMinutes());

        return response;
    }
}
