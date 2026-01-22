package com.elrapidin.api.controller.admin;

import com.elrapidin.api.domain.enums.delivery.DeliveryStatus;
import com.elrapidin.api.domain.enums.delivery.DeliveryZone;
import com.elrapidin.api.dto.admin.AdminDeliveryListResponse;
import com.elrapidin.api.dto.admin.CreateDeliveryRequest;
import com.elrapidin.api.dto.admin.UpdateDeliveryRequest;
import com.elrapidin.api.dto.admin.UpdateDeliveryStatusRequest;
import com.elrapidin.api.service.admin.AdminDeliveryService;

import jakarta.validation.Valid;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/admin/delivery")
public class AdminDeliveryController {

    private final AdminDeliveryService adminDeliveryService;

    public AdminDeliveryController(AdminDeliveryService adminDeliveryService) {
        this.adminDeliveryService = adminDeliveryService;
    }

    // ===========================================
    // ============ Admin Delivery Endpoints ============

    @PostMapping
    public ResponseEntity<?> createDelivery(
            @RequestBody @Valid CreateDeliveryRequest request) {

        Long userId = adminDeliveryService.createDelivery(request);

        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(Map.of(
                        "userId", userId,
                        "message", "Delivery user created successfully"));
    }

    // ===========================================
    // ============ Admin Delivery List Endpoints ============

    @GetMapping
    public ResponseEntity<AdminDeliveryListResponse> getDeliveries(
            @RequestParam(required = false) String search,
            @RequestParam(required = false) DeliveryZone zone,
            @RequestParam(required = false) DeliveryStatus status) {

        return ResponseEntity.ok(
                adminDeliveryService.getDeliveries(search, zone, status));
    }

    // ===========================================
    // ============ Admin Delivery Update Endpoints ============

    @PatchMapping("/{userId}/status")
    public ResponseEntity<?> updateDeliveryStatus(
            @PathVariable Long userId,
            @RequestBody @Valid UpdateDeliveryStatusRequest request) {

        adminDeliveryService.updateDeliveryStatus(userId, request.status());
        return ResponseEntity.ok().build();
    }

    // ===========================================
    // ============ Admin Delivery Update Endpoints ============

    @PutMapping("/{userId}")
    public ResponseEntity<?> updateDelivery(
            @PathVariable Long userId,
            @RequestBody @Valid UpdateDeliveryRequest request) {

        adminDeliveryService.updateDelivery(userId, request);
        return ResponseEntity.ok().build();
    }

    // ===========================================
    // ============ Admin Delivery Suspend Endpoints ============

    @PatchMapping("/{userId}/suspend")
    public ResponseEntity<?> suspendDelivery(@PathVariable Long userId) {

        adminDeliveryService.suspendDelivery(userId);
        return ResponseEntity.ok().build();
    }

    // ===========================================
    // ============ Admin Delivery Active Endpoints ============

    @PatchMapping("/{userId}/activate")
    public ResponseEntity<?> activateDelivery(@PathVariable Long userId) {

        adminDeliveryService.activateDelivery(userId);
        return ResponseEntity.ok().build();
    }

    // ===========================================
    // ============ Admin Delivery Delete Endpoints ============

    @PatchMapping("/{userId}/delete")
    public ResponseEntity<?> deleteDelivery(@PathVariable Long userId) {

        adminDeliveryService.deleteDelivery(userId);
        return ResponseEntity.ok().build();
    }

}
