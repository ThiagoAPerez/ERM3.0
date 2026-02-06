package com.elrapidin.api.domain.entity.client;

import com.elrapidin.api.domain.enums.client.AddressStatus;
import com.elrapidin.api.domain.enums.client.AddressType;

import jakarta.persistence.*;

@Entity
@Table(name = "client_addresses")
public class ClientAddressEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // Relación N direcciones → 1 cliente
    @ManyToOne(optional = false, fetch = FetchType.LAZY)
    @JoinColumn(name = "client_profile_id", nullable = false)
    private ClientProfileEntity clientProfile;

    @Column(nullable = false)
    private String name; // Casa, Trabajo, etc.

    // Establece si es la dirección principal del cliente
    @Column(name = "is_primary", nullable = false)
    private boolean primaryAddress = false;

    @Column(nullable = false)
    private String address;

    @Column(nullable = false)
    private String neighborhood;

    @Column(name = "reference_point")
    private String referencePoint;

    @Enumerated(EnumType.STRING)
    @Column(name = "address_type", nullable = false, length = 20)
    private AddressType addressType;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false, length = 20)
    private AddressStatus status = AddressStatus.ACTIVE;

    // ===== getters & setters =====
    public Long getId() {
        return id;
    }

    public ClientProfileEntity getClientProfile() {
        return clientProfile;
    }

    public void setClientProfile(ClientProfileEntity clientProfile) {
        this.clientProfile = clientProfile;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public String getNeighborhood() {
        return neighborhood;
    }

    public void setNeighborhood(String neighborhood) {
        this.neighborhood = neighborhood;
    }

    public String getReferencePoint() {
        return referencePoint;
    }

    public void setReferencePoint(String referencePoint) {
        this.referencePoint = referencePoint;
    }

    public AddressType getAddressType() {
        return addressType;
    }

    public void setAddressType(AddressType addressType) {
        this.addressType = addressType;
    }

    public AddressStatus getStatus() {
        return status;
    }

    public void setStatus(AddressStatus status) {
        this.status = status;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public boolean isPrimaryAddress() {
        return primaryAddress;
    }

    public void setPrimaryAddress(boolean primaryAddress) {
        this.primaryAddress = primaryAddress;
    }

}
