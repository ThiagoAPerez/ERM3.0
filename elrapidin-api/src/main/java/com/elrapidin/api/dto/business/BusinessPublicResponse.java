package com.elrapidin.api.dto.business;

public class BusinessPublicResponse {

    private Long id;
    private String name;
    private String description;
    private String municipality;
    private String category;
    private String logoUrl;
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

    public String getMunicipality() {
        return municipality;
    }

    public String getLogoUrl() {
        return logoUrl;
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

    public void setMunicipality(String municipality) {
        this.municipality = municipality;
    }

    public void setLogoUrl(String logoUrl) {
        this.logoUrl = logoUrl;
    }

    public void setPreparationTimeMinutes(Integer preparationTimeMinutes) {
        this.preparationTimeMinutes = preparationTimeMinutes;
    }

    public String getCategory() {
        return category;
    }

    public void setCategory(String category) {
        this.category = category;
    }
}
