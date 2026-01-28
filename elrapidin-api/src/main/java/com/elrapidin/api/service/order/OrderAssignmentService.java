package com.elrapidin.api.service.order;

import com.elrapidin.api.domain.entity.order.OrderEntity;

public interface OrderAssignmentService {

    OrderEntity assignDelivery(
            Long orderId,
            Long deliveryProfileId,
            ActorContext actor);

}
 