package com.elrapidin.api.domain.entity.businesses;

import jakarta.persistence.*;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;

@Entity
@Table(name = "business_settlements")
public class BusinessSettlementEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "business_user_id", nullable = false)
    private Long businessUserId;

    @Column(name = "period_start", nullable = false)
    private LocalDate periodStart;

    @Column(name = "period_end", nullable = false)
    private LocalDate periodEnd;

    @Column(name = "subtotal_cost", nullable = false)
    private BigDecimal subtotalCost;

    @Column(name = "platform_margin", nullable = false)
    private BigDecimal platformMargin;

    @Column(name = "net_payable", nullable = false)
    private BigDecimal netPayable;

    @Column(nullable = false)
    private String status; // PENDING | PAID

    @Column(name = "created_at", nullable = false)
    private LocalDateTime createdAt = LocalDateTime.now();

    // ===== GETTERS =====

    public Long getId() {
        return id;
    }

    public Long getBusinessUserId() {
        return businessUserId;
    }

    public void setBusinessUserId(Long businessUserId) {
        this.businessUserId = businessUserId;
    }

    public LocalDate getPeriodStart() {
        return periodStart;
    }

    public void setPeriodStart(LocalDate periodStart) {
        this.periodStart = periodStart;
    }

    public LocalDate getPeriodEnd() {
        return periodEnd;
    }

    public void setPeriodEnd(LocalDate periodEnd) {
        this.periodEnd = periodEnd;
    }

    public BigDecimal getSubtotalCost() {
        return subtotalCost;
    }

    public void setSubtotalCost(BigDecimal subtotalCost) {
        this.subtotalCost = subtotalCost;
    }

    public BigDecimal getPlatformMargin() {
        return platformMargin;
    }

    public void setPlatformMargin(BigDecimal platformMargin) {
        this.platformMargin = platformMargin;
    }

    public BigDecimal getNetPayable() {
        return netPayable;
    }

    public void setNetPayable(BigDecimal netPayable) {
        this.netPayable = netPayable;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }
}
