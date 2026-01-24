package com.elrapidin.api.service.order;

public record CreateOrderItem(
                String productName,
                int quantity,
                long salePrice,
                long costPrice) {
}
