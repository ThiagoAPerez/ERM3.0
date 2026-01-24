package com.elrapidin.api.service.businesses;

import com.elrapidin.api.dto.business.BusinessDashboardSummary;

import com.elrapidin.api.domain.entity.businesses.BusinessEntity;
import com.elrapidin.api.domain.repository.BusinessRepository;
import com.elrapidin.api.dto.business.BusinessMeResponse;
import com.elrapidin.api.exception.ApiException;
import org.springframework.stereotype.Service;

@Service
public class BusinessMeService implements BusinessQueries {

    private final BusinessRepository businessRepository;

    public BusinessMeService(BusinessRepository businessRepository) {
        this.businessRepository = businessRepository;
    }

    @Override
    public BusinessMeResponse getMyBusinessProfile(Long ownerUserId) {

        BusinessEntity business = businessRepository
                .findByOwnerUserId(ownerUserId)
                .orElseThrow(() -> new ApiException("Business not found for user", 404));

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

    // ===============================
    // MÉTODOS NO IMPLEMENTADOS AÚN
    // ===============================

    @Override
    public BusinessDashboardSummary getDashboardSummary(
            Long businessId,
            com.elrapidin.api.dto.common.DateRange range) {
        throw new UnsupportedOperationException("Not implemented yet");
    }

    @Override
    public java.util.List<com.elrapidin.api.dto.business.BusinessOrderListItem> getOrders(
            Long businessId,
            com.elrapidin.api.dto.business.BusinessOrderFilter filter,
            com.elrapidin.api.dto.common.DateRange range) {
        throw new UnsupportedOperationException("Not implemented yet");
    }

    @Override
    public com.elrapidin.api.dto.business.BusinessOrderDetail getOrderDetail(
            Long businessId,
            Long orderId) {
        throw new UnsupportedOperationException("Not implemented yet");
    }

    @Override
    public java.util.List<com.elrapidin.api.dto.business.BusinessOrderListItem> getOrderHistory(
            Long businessId,
            com.elrapidin.api.dto.common.DateRange range) {
        throw new UnsupportedOperationException("Not implemented yet");
    }
}
