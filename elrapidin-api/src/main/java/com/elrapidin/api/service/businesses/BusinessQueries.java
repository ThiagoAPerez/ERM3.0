package com.elrapidin.api.service.businesses;

import com.elrapidin.api.dto.business.*;
import com.elrapidin.api.dto.common.DateRange;

import java.util.List;

public interface BusinessQueries {

        // Perfil del negocio autenticado
        BusinessMeResponse getMyBusinessProfile(Long ownerUserId);

        // Dashboard
        BusinessDashboardSummary getDashboardSummary(
                        Long ownerUserId,
                        DateRange range);

        // Órdenes activas / filtradas
        List<BusinessOrderListItem> getOrders(
                        Long ownerUserId,
                        BusinessOrderFilter filter,
                        DateRange range);

        // Detalle de orden
        BusinessOrderDetail getOrderDetail(
                        Long ownerUserId,
                        Long orderId);

        // Historial
        List<BusinessOrderListItem> getOrderHistory(
                        Long ownerUserId,
                        DateRange range);
}
