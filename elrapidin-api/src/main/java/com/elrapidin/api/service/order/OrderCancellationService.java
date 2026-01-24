package com.elrapidin.api.service.order;

import com.elrapidin.api.domain.entity.order.OrderEntity;

public interface OrderCancellationService {

    OrderEntity cancel(Long orderId, ActorContext actor);

}
