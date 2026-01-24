package com.elrapidin.api.domain.entity;

import jakarta.persistence.*;
import java.time.Instant;

@Entity
@Table(name = "event_log", uniqueConstraints = {
        @UniqueConstraint(name = "uq_event_log_idempotency", columnNames = "idempotency_key")
})
public class EventLogEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "aggregate_type", nullable = false, length = 50)
    private String aggregateType;

    @Column(name = "aggregate_id", nullable = false)
    private Long aggregateId;

    @Column(name = "event_type", nullable = false, length = 100)
    private String eventType;

    @Column(name = "idempotency_key", nullable = false, length = 150)
    private String idempotencyKey;

    @Column(columnDefinition = "json", nullable = false)
    private String payload;

    @Column(name = "created_at", nullable = false, updatable = false)
    private Instant createdAt = Instant.now();

    protected EventLogEntity() {
    }

    public EventLogEntity(
            String aggregateType,
            Long aggregateId,
            String eventType,
            String idempotencyKey,
            String payload) {
        this.aggregateType = aggregateType;
        this.aggregateId = aggregateId;
        this.eventType = eventType;
        this.idempotencyKey = idempotencyKey;
        this.payload = payload;
    }

    public Long getId() {
        return id;
    }
}
