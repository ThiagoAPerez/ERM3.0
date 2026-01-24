package com.elrapidin.api.dto.business;

import java.math.BigDecimal;

public class BusinessDashboardSummary {

    private Long totalOrders;
    private BigDecimal totalRevenue;
    private BigDecimal averageTicket;
    private Double growthPercentage;

    // ===== GETTERS & SETTERS =====

    public Long getTotalOrders() {
        return totalOrders;
    }

    public void setTotalOrders(Long totalOrders) {
        this.totalOrders = totalOrders;
    }

    public BigDecimal getTotalRevenue() {
        return totalRevenue;
    }

    public void setTotalRevenue(BigDecimal totalRevenue) {
        this.totalRevenue = totalRevenue;
    }

    public BigDecimal getAverageTicket() {
        return averageTicket;
    }

    public void setAverageTicket(BigDecimal averageTicket) {
        this.averageTicket = averageTicket;
    }

    public Double getGrowthPercentage() {
        return growthPercentage;
    }

    public void setGrowthPercentage(Double growthPercentage) {
        this.growthPercentage = growthPercentage;
    }
}
