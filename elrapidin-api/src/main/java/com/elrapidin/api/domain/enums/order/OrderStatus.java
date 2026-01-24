package com.elrapidin.api.domain.enums.order;

public enum OrderStatus {

    CREATED,
    PENDING_BUSINESS,
    ACCEPTED_BY_BUSINESS,
    PREPARING,
    READY_FOR_PICKUP,
    ASSIGNED_TO_DELIVERY,
    PICKED_UP,
    ON_THE_WAY,
    DELIVERED,
    CANCELLED;

    public boolean isTerminal() {
        return this == DELIVERED || this == CANCELLED;
    }
}
