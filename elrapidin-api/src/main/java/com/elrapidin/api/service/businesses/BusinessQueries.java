package com.elrapidin.api.service.businesses;

import com.elrapidin.api.dto.business.*;
import com.elrapidin.api.dto.common.DateRange;

import java.util.List;

public interface BusinessQueries {

        BusinessMeResponse getMyBusinessProfile(Long ownerUserId);

        BusinessDashboardSummary getDashboardSummary(
                        Long businessId,
                        DateRange range);

        List<BusinessOrderListItem> getOrders(
                        Long businessId,
                        BusinessOrderFilter filter,
                        DateRange range);

        BusinessOrderDetail getOrderDetail(
                        Long businessId,
                        Long orderId);

        List<BusinessOrderListItem> getOrderHistory(
                        Long businessId,
                        DateRange range);
}
