package com.elrapidin.api.service.order;

import com.elrapidin.api.domain.entity.order.OrderEntity;

public interface OrderDeliveryService {

    OrderEntity pickUp(Long orderId, ActorContext actor);

    OrderEntity startDelivery(Long orderId, ActorContext actor);

    OrderEntity deliver(
            Long orderId,
            String deliveryCode,
            ActorContext actor);

}
