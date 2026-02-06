package com.elrapidin.api.dto.business;

public class BusinessDetailPublicResponse {

    private Long id;
    private String name;
    private String description;
    private String phone;
    private String address;
    private String municipality;
    private String category;
    private String logoUrl;
    private String coverUrl;
    private Integer preparationTimeMinutes;

    // ===== GETTERS =====

    public Long getId() {
        return id;
    }

    public String getName() {
        return name;
    }

    public String getDescription() {
        return description;
    }

    public String getPhone() {
        return phone;
    }

    public String getAddress() {
        return address;
    }

    public String getLogoUrl() {
        return logoUrl;
    }

    public String getCoverUrl() {
        return coverUrl;
    }

    public Integer getPreparationTimeMinutes() {
        return preparationTimeMinutes;
    }

    // ===== SETTERS =====

    public void setId(Long id) {
        this.id = id;
    }

    public void setName(String name) {
        this.name = name;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public void setLogoUrl(String logoUrl) {
        this.logoUrl = logoUrl;
    }

    public void setCoverUrl(String coverUrl) {
        this.coverUrl = coverUrl;
    }

    public void setPreparationTimeMinutes(Integer preparationTimeMinutes) {
        this.preparationTimeMinutes = preparationTimeMinutes;
    }

    public String getMunicipality() {
        return municipality;
    }

    public void setMunicipality(String municipality) {
        this.municipality = municipality;
    }

    public String getCategory() {
        return category;
    }

    public void setCategory(String category) {
        this.category = category;
    }

}
