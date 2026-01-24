package com.elrapidin.api.service.order;

import com.elrapidin.api.domain.entity.order.OrderEntity;
import com.elrapidin.api.domain.enums.order.OrderStatus;

public interface OrderStateTransitionService {

    OrderEntity transition(
        Long orderId,
        OrderStatus newStatus,
        ActorContext actor
    );

}
