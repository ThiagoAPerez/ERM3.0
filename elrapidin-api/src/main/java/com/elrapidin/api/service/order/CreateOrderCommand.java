package com.elrapidin.api.service.order;

import java.util.List;

public record CreateOrderCommand(
        Long customerId,
        Long businessId,
        Long clientAddressId,
        String addressSnapshot,
        List<CreateOrderItem> items) {
}
