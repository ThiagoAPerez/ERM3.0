package com.elrapidin.api.domain.entity.client;

import com.elrapidin.api.domain.entity.UserEntity;
import jakarta.persistence.*;

@Entity
@Table(name = "client_profiles", uniqueConstraints = {
        @UniqueConstraint(columnNames = "user_id")
})
public class ClientProfileEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // Relación 1–1 con User
    @OneToOne(optional = false, fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    private UserEntity user;

    // Datos editables del cliente (NO se sincronizan con User)
    @Column(nullable = false)
    private String name;

    @Column(nullable = false, length = 20)
    private String phone;

    @Column(name = "profile_photo_url")
    private String profilePhotoUrl;

    // ===== Getters / Setters =====

    public Long getId() {
        return id;
    }

    public UserEntity getUser() {
        return user;
    }

    public void setUser(UserEntity user) {
        this.user = user;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    public String getProfilePhotoUrl() {
        return profilePhotoUrl;
    }

    public void setProfilePhotoUrl(String profilePhotoUrl) {
        this.profilePhotoUrl = profilePhotoUrl;
    }
}
