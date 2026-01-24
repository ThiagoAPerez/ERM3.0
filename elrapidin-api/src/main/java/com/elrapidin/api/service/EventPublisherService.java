package com.elrapidin.api.service;

import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.elrapidin.api.domain.entity.EventLogEntity;
import com.elrapidin.api.domain.repository.EventLogRepository;

@Service
public class EventPublisherService {

    private final EventLogRepository repository;

    public EventPublisherService(EventLogRepository repository) {
        this.repository = repository;
    }

    @Transactional
    public void publish(
            String aggregateType,
            Long aggregateId,
            String eventType,
            String idempotencyKey,
            String payload) {
        try {
            EventLogEntity event = new EventLogEntity(
                    aggregateType,
                    aggregateId,
                    eventType,
                    idempotencyKey,
                    payload);
            repository.save(event);
        } catch (DataIntegrityViolationException e) {
            // idempotency garantizada por diseño: no es error lógico
        }
    }
}
