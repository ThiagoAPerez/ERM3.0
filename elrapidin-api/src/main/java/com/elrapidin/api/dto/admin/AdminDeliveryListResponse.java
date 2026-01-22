package com.elrapidin.api.dto.admin;

import java.util.List;
import java.util.Map;

public class AdminDeliveryListResponse {

    private Map<String, Long> summary;
    private List<AdminDeliveryResponse> data;

    public AdminDeliveryListResponse(
            Map<String, Long> summary,
            List<AdminDeliveryResponse> data) {
        this.summary = summary;
        this.data = data;
    }

    public Map<String, Long> getSummary() {
        return summary;
    }

    public List<AdminDeliveryResponse> getData() {
        return data;
    }
}
