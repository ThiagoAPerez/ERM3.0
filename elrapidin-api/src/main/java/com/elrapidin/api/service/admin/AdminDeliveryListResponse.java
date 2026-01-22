package com.elrapidin.api.service.admin;

import com.elrapidin.api.dto.admin.AdminDeliveryResponse;
import com.elrapidin.api.domain.enums.delivery.DeliveryStatus;

import java.util.List;
import java.util.Map;

/**
 * Response estándar para listado de domiciliarios en Admin
 * Incluye resumen + data
 */
public class AdminDeliveryListResponse {

    private final Summary summary;
    private final List<AdminDeliveryResponse> data;

    public AdminDeliveryListResponse(
            Summary summary,
            List<AdminDeliveryResponse> data) {
        this.summary = summary;
        this.data = data;
    }

    public Summary getSummary() {
        return summary;
    }

    public List<AdminDeliveryResponse> getData() {
        return data;
    }

    // ----------------------------------------------------
    // ---------------------- SUMMARY ---------------------
    // ----------------------------------------------------

    public static class Summary {

        private final long total;
        private final long AVAILABLE;
        private final long BUSY;
        private final long OFFLINE;
        private final long SUSPENDED;

        public Summary(
                long total,
                long AVAILABLE,
                long BUSY,
                long OFFLINE,
                long SUSPENDED) {
            this.total = total;
            this.AVAILABLE = AVAILABLE;
            this.BUSY = BUSY;
            this.OFFLINE = OFFLINE;
            this.SUSPENDED = SUSPENDED;
        }

        public long getTotal() {
            return total;
        }

        public long getAVAILABLE() {
            return AVAILABLE;
        }

        public long getBUSY() {
            return BUSY;
        }

        public long getOFFLINE() {
            return OFFLINE;
        }

        public long getSUSPENDED() {
            return SUSPENDED;
        }

        // ------------------------------------------------
        // Factory helper (usado por el Service)
        // ------------------------------------------------
        public static Summary from(
                long total,
                Map<DeliveryStatus, Long> statusCount) {
            return new Summary(
                    total,
                    statusCount.getOrDefault(DeliveryStatus.AVAILABLE, 0L),
                    statusCount.getOrDefault(DeliveryStatus.BUSY, 0L),
                    statusCount.getOrDefault(DeliveryStatus.OFFLINE, 0L),
                    statusCount.getOrDefault(DeliveryStatus.SUSPENDED, 0L));
        }
    }

    
}
