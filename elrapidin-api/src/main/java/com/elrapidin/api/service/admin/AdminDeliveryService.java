package com.elrapidin.api.service.admin;

import com.elrapidin.api.domain.entity.UserEntity;
import com.elrapidin.api.domain.entity.delivery.DeliveryProfileEntity;
import com.elrapidin.api.domain.enums.delivery.DeliveryStatus;
import com.elrapidin.api.domain.enums.delivery.DeliveryZone;
import com.elrapidin.api.domain.enums.user.UserRole;
import com.elrapidin.api.domain.enums.user.UserStatus;
import com.elrapidin.api.domain.repository.DeliveryProfileRepository;
import com.elrapidin.api.domain.repository.UserRepository;
import com.elrapidin.api.dto.admin.AdminDeliveryListResponse;
import com.elrapidin.api.dto.admin.AdminDeliveryResponse;
import com.elrapidin.api.dto.admin.CreateDeliveryRequest;
import com.elrapidin.api.dto.admin.UpdateDeliveryRequest;
import com.elrapidin.api.security.PasswordEncoderService;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
public class AdminDeliveryService {

    private final UserRepository userRepository;
    private final DeliveryProfileRepository deliveryProfileRepository;
    private final PasswordEncoderService passwordEncoder;

    public AdminDeliveryService(
            UserRepository userRepository,
            DeliveryProfileRepository deliveryProfileRepository,
            PasswordEncoderService passwordEncoder) {
        this.userRepository = userRepository;
        this.deliveryProfileRepository = deliveryProfileRepository;
        this.passwordEncoder = passwordEncoder;
    }

    // ===========================================
    // ============ Admin Delivery Methods ============
    // ===========================================

    @Transactional
    public Long createDelivery(CreateDeliveryRequest request) {

        if (userRepository.existsByPhone(request.phone())) {
            throw new IllegalStateException("User with this phone already exists");
        }

        if (request.email() != null && userRepository.existsByEmail(request.email())) {
            throw new IllegalStateException("User with this email already exists");
        }

        // =============== Create User ===============

        UserEntity user = new UserEntity();
        user.setName(request.name());
        user.setPhone(request.phone());
        user.setEmail(request.email());
        user.setRole(UserRole.DELIVERY);
        user.setStatus(UserStatus.ACTIVE);
        user.setPasswordHash(passwordEncoder.encode(request.temporaryPassword()));

        userRepository.save(user);

        // ============ Create Delivery Profile ============

        DeliveryProfileEntity profile = new DeliveryProfileEntity();
        profile.setUser(user);
        profile.setVehicleType(request.vehicleType());
        profile.setVehiclePlate(request.vehiclePlate());
        profile.setServiceType(request.serviceType());
        profile.setStatus(DeliveryStatus.AVAILABLE);

        if (request.zone() != null) {
            profile.setZone(request.zone());
        }

        deliveryProfileRepository.save(profile);

        return user.getId();
    }

    // ===========================================
    // ============ Admin Delivery Query Methods ============

    @Transactional
    public void updateDeliveryStatus(Long userId, DeliveryStatus status) {

        DeliveryProfileEntity profile = deliveryProfileRepository
                .findByUser_Id(userId)
                .orElseThrow(() -> new IllegalStateException("Delivery profile not found"));

        profile.setStatus(status);
        profile.setUpdatedAt(LocalDateTime.now());
    }

    // ===========================================
    // ============ Admin Delivery Update Methods ============

    @Transactional
    public void updateDelivery(Long userId, UpdateDeliveryRequest request) {

        DeliveryProfileEntity profile = deliveryProfileRepository
                .findByUser_Id(userId)
                .orElseThrow(() -> new IllegalStateException("Delivery profile not found"));

        profile.setVehicleType(request.vehicleType());
        profile.setVehiclePlate(request.vehiclePlate());
        profile.setServiceType(request.serviceType());

        if (request.zone() != null) {
            profile.setZone(request.zone());
        }

        profile.setUpdatedAt(LocalDateTime.now());
    }

    // ===========================================
    // ============ Admin Delivery List Methods ============

    public AdminDeliveryListResponse getDeliveries(
            String search,
            DeliveryZone zone,
            DeliveryStatus status) {

        List<DeliveryProfileEntity> filtered = deliveryProfileRepository.findAll()
                .stream()
                .filter(p -> p.getStatus() != DeliveryStatus.DELETED)
                .filter(p -> search == null ||
                        p.getUser().getName().toLowerCase().contains(search.toLowerCase()) ||
                        p.getUser().getPhone().contains(search) ||
                        (p.getUser().getEmail() != null &&
                                p.getUser().getEmail().toLowerCase().contains(search.toLowerCase())))
                .filter(p -> zone == null || p.getZone() == zone)
                .filter(p -> status == null || p.getStatus() == status)
                .toList();

        Map<String, Long> summary = filtered.stream()
                .collect(Collectors.groupingBy(
                        p -> p.getStatus().name(),
                        Collectors.counting()));

        List<AdminDeliveryResponse> data = filtered.stream()
                .map(p -> new AdminDeliveryResponse(
                        p.getUser().getId(),
                        p.getUser().getName(),
                        p.getUser().getPhone(),
                        p.getUser().getEmail(),
                        p.getVehiclePlate(),
                        p.getVehicleType(),
                        p.getServiceType(),
                        p.getStatus(),
                        p.getZone() != null ? p.getZone().name() : null))
                .toList();

        return new AdminDeliveryListResponse(summary, data);
    }

    // ===========================================
    // ============ Admin Delivery Suspend Methods ============

    @Transactional
    public void suspendDelivery(Long userId) {

        DeliveryProfileEntity profile = deliveryProfileRepository
                .findByUser_Id(userId)
                .orElseThrow(() -> new IllegalStateException("Delivery profile not found"));

        profile.setStatus(DeliveryStatus.SUSPENDED);
        profile.setUpdatedAt(LocalDateTime.now());
    }

    // ===========================================
    // ============ Admin Delivery Active Methods ============

    @Transactional
    public void activateDelivery(Long userId) {

        DeliveryProfileEntity profile = deliveryProfileRepository
                .findByUser_Id(userId)
                .orElseThrow(() -> new IllegalStateException("Delivery profile not found"));

        profile.setStatus(DeliveryStatus.AVAILABLE);
        profile.setUpdatedAt(LocalDateTime.now());
    }

    // ===========================================
    // ============ Admin Delivery Delete Methods ============

    @Transactional
    public void deleteDelivery(Long userId) {

        DeliveryProfileEntity profile = deliveryProfileRepository
                .findByUser_Id(userId)
                .orElseThrow(() -> new IllegalStateException("Delivery profile not found"));

        profile.setStatus(DeliveryStatus.DELETED);
        profile.setUpdatedAt(LocalDateTime.now());
    }

}
