package com.elrapidin.api.domain.entity.delivery;

import com.elrapidin.api.domain.entity.UserEntity;
import com.elrapidin.api.domain.enums.delivery.DeliveryStatus;
import com.elrapidin.api.domain.enums.delivery.DeliveryZone;
import com.elrapidin.api.domain.enums.delivery.ServiceType;
import com.elrapidin.api.domain.enums.delivery.VehicleType;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "delivery_profiles")
public class DeliveryProfileEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @OneToOne
    @JoinColumn(name = "user_id", nullable = false, unique = true)
    private UserEntity user;

    @Enumerated(EnumType.STRING)
    @Column(name = "vehicle_type", nullable = false, length = 20)
    private VehicleType vehicleType;

    @Column(name = "vehicle_plate")
    private String vehiclePlate;

    @Enumerated(EnumType.STRING)
    @Column(name = "service_type", nullable = false, length = 20)
    private ServiceType serviceType;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false, length = 20)
    private DeliveryStatus status = DeliveryStatus.OFFLINE;

    @Enumerated(EnumType.STRING)
    @Column(name = "zone")
    private DeliveryZone zone = DeliveryZone.NOASIGNADO;

    @Column(name = "created_at", nullable = false)
    private LocalDateTime createdAt = LocalDateTime.now();

    @Column(name = "updated_at")
    private LocalDateTime updatedAt;

    // ===== GETTERS / SETTERS =====

    public Long getId() {
        return id;
    }

    public UserEntity getUser() {
        return user;
    }

    public void setUser(UserEntity user) {
        this.user = user;
    }

    public VehicleType getVehicleType() {
        return vehicleType;
    }

    public void setVehicleType(VehicleType vehicleType) {
        this.vehicleType = vehicleType;
    }

    public String getVehiclePlate() {
        return vehiclePlate;
    }

    public void setVehiclePlate(String vehiclePlate) {
        this.vehiclePlate = vehiclePlate;
    }

    public ServiceType getServiceType() {
        return serviceType;
    }

    public void setServiceType(ServiceType serviceType) {
        this.serviceType = serviceType;
    }

    public DeliveryStatus getStatus() {
        return status;
    }

    public void setStatus(DeliveryStatus status) {
        this.status = status;
    }

    // 🔒 NO cambiamos nombre usado por DTOs
    public DeliveryZone getCurrentZoneId() {
        return zone;
    }

    public void setCurrentZoneId(DeliveryZone zone) {
        this.zone = zone;
    }

    // Alias seguro (por si alguien usa getZone)
    public DeliveryZone getZone() {
        return zone;
    }

    public void setZone(DeliveryZone zone) {
        this.zone = zone;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public LocalDateTime getUpdatedAt() {
        return updatedAt;
    }

    public void setUpdatedAt(LocalDateTime updatedAt) {
        this.updatedAt = updatedAt;
    }
}
