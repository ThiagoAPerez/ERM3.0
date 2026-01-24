package com.elrapidin.api.service.order;

import com.elrapidin.api.domain.entity.order.OrderEntity;

public interface OrderCreationService {

    OrderEntity create(CreateOrderCommand command);

}
