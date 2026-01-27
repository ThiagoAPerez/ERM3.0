package com.elrapidin.api.service.admin;

import com.elrapidin.api.domain.enums.businesses.BusinessesCategory;
import com.elrapidin.api.dto.admin.CreateBusinessRequest;
import com.elrapidin.api.dto.admin.UpdateBusinessRequest;
import com.elrapidin.api.dto.business.BusinessResponse;

import java.util.List;

public interface AdminBusinessService {

    BusinessResponse createBusiness(CreateBusinessRequest request);

    List<BusinessResponse> getAllBusinesses();

    BusinessResponse getBusinessById(Long id);

    List<BusinessResponse> searchByName(String name);

    List<BusinessResponse> getByCategory(BusinessesCategory category);

    BusinessResponse updateBusiness(Long id, UpdateBusinessRequest request);

    void activateBusiness(Long id);

    void deactivateBusiness(Long id);

    void suspendBusiness(Long id);

    List<BusinessResponse> getActiveBusinesses();
}
