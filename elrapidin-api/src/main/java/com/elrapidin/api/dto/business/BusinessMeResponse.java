package com.elrapidin.api.dto.business;

import com.elrapidin.api.domain.enums.businesses.BusinessStatus;

public class BusinessMeResponse {

    private Long id;
    private String name;
    private String description;
    private String phone;
    private String email;
    private String address;
    private String municipality;
    private String logoUrl;
    private String coverUrl;
    private Integer preparationTimeMinutes;
    private BusinessStatus status;

    public BusinessMeResponse() {
    }

    public BusinessMeResponse(
            Long id,
            String name,
            String description,
            String phone,
            String email,
            String address,
            String municipality,
            String logoUrl,
            String coverUrl,
            Integer preparationTimeMinutes,
            BusinessStatus status) {

        this.id = id;
        this.name = name;
        this.description = description;
        this.phone = phone;
        this.email = email;
        this.address = address;
        this.municipality = municipality;
        this.logoUrl = logoUrl;
        this.coverUrl = coverUrl;
        this.preparationTimeMinutes = preparationTimeMinutes;
        this.status = status;
    }

    // ===== GETTERS & SETTERS =====

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public String getMunicipality() {
        return municipality;
    }

    public void setMunicipality(String municipality) {
        this.municipality = municipality;
    }

    public String getLogoUrl() {
        return logoUrl;
    }

    public void setLogoUrl(String logoUrl) {
        this.logoUrl = logoUrl;
    }

    public String getCoverUrl() {
        return coverUrl;
    }

    public void setCoverUrl(String coverUrl) {
        this.coverUrl = coverUrl;
    }

    public Integer getPreparationTimeMinutes() {
        return preparationTimeMinutes;
    }

    public void setPreparationTimeMinutes(Integer preparationTimeMinutes) {
        this.preparationTimeMinutes = preparationTimeMinutes;
    }

    public BusinessStatus getStatus() {
        return status;
    }

    public void setStatus(BusinessStatus status) {
        this.status = status;
    }
}
