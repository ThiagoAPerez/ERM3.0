package com.elrapidin.api.service.order;

public record ActorContext(
    ActorType type,
    Long actorId
) {}
