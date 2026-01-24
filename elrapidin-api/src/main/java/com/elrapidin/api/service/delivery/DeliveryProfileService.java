package com.elrapidin.api.service.delivery;

import com.elrapidin.api.domain.entity.delivery.DeliveryProfileEntity;
import com.elrapidin.api.domain.enums.delivery.DeliveryStatus;
import com.elrapidin.api.domain.repository.DeliveryProfileRepository;
import com.elrapidin.api.dto.delivery.DeliveryMeResponse;
import com.elrapidin.api.exception.ApiException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class DeliveryProfileService implements DeliveryOperations {

    private final DeliveryProfileRepository deliveryProfileRepository;

    public DeliveryProfileService(DeliveryProfileRepository deliveryProfileRepository) {
        this.deliveryProfileRepository = deliveryProfileRepository;
    }

    // ===============================
    // PERFIL COMPLETO DEL DOMICILIARIO
    // ===============================
    @Override
    public DeliveryMeResponse getMyProfile(Long userId) {

        DeliveryProfileEntity profile = deliveryProfileRepository
                .findByUser_Id(userId)
                .orElseThrow(() -> new ApiException("Delivery profile not found", 404));

        DeliveryMeResponse response = new DeliveryMeResponse();

        response.setUserId(profile.getUser().getId());
        response.setName(profile.getUser().getName());
        response.setPhone(profile.getUser().getPhone());
        response.setEmail(profile.getUser().getEmail());

        response.setVehicleType(profile.getVehicleType());
        response.setVehiclePlate(profile.getVehiclePlate());
        response.setServiceType(profile.getServiceType());
        response.setStatus(profile.getStatus());
        response.setZone(profile.getZone().name());

        return response;
    }

    // ===============================
    // CAMBIAR DISPONIBILIDAD
    // ===============================
    @Override
    @Transactional
    public void changeAvailability(Long userId, DeliveryStatus status) {

        if (status != DeliveryStatus.AVAILABLE &&
                status != DeliveryStatus.OFFLINE) {
            throw new ApiException("Invalid availability status", 400);
        }

        DeliveryProfileEntity profile = deliveryProfileRepository
                .findByUser_Id(userId)
                .orElseThrow(() -> new ApiException("Delivery profile not found", 404));

        profile.setStatus(status);
        deliveryProfileRepository.save(profile);
    }
}
