package com.elrapidin.api.controller.admin;

import com.elrapidin.api.dto.admin.CreateBusinessRequest;
import com.elrapidin.api.dto.admin.UpdateBusinessRequest;
import com.elrapidin.api.dto.business.BusinessResponse;
import com.elrapidin.api.domain.enums.businesses.BusinessesCategory;
import com.elrapidin.api.service.admin.AdminBusinessService;

import jakarta.validation.Valid;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/admin/businesses")
public class AdminBusinessController {

    private final AdminBusinessService service;

    public AdminBusinessController(AdminBusinessService service) {
        this.service = service;
    }

    // ===================== CREATE =====================
    @PostMapping
    public ResponseEntity<BusinessResponse> create(
            @Valid @RequestBody CreateBusinessRequest request) {
        return ResponseEntity.status(201).body(service.createBusiness(request));
    }

    // ===================== LIST ALL =====================
    @GetMapping
    public List<BusinessResponse> getAll() {
        return service.getAllBusinesses();
    }

    // ===================== GET BY ID =====================
    @GetMapping("/{id}")
    public BusinessResponse getById(@PathVariable Long id) {
        return service.getBusinessById(id);
    }

    // ===================== SEARCH BY NAME =====================
    @GetMapping("/search")
    public List<BusinessResponse> searchByName(@RequestParam String name) {
        return service.searchByName(name);
    }

    // ===================== FILTER BY CATEGORY =====================
    @GetMapping("/category/{category}")
    public List<BusinessResponse> getByCategory(
            @PathVariable BusinessesCategory category) {
        return service.getByCategory(category);
    }

    // ===================== UPDATE =====================
    @PutMapping("/{id}")
    public BusinessResponse update(
            @PathVariable Long id,
            @Valid @RequestBody UpdateBusinessRequest request) {
        return service.updateBusiness(id, request);
    }

    // ===================== ACTIVATE =====================
    @PatchMapping("/{id}/activate")
    public void activate(@PathVariable Long id) {
        service.activateBusiness(id);
    }

    // ===================== DEACTIVATE =====================
    @PatchMapping("/{id}/deactivate")
    public void deactivate(@PathVariable Long id) {
        service.deactivateBusiness(id);
    }

    // ===================== SUSPEND (DELETE LOGICALLY) =====================
    @PatchMapping("/{id}/suspend")
    public void suspend(@PathVariable Long id) {
        service.suspendBusiness(id);
    }

    // ===================== ACTIVE FOR DASHBOARD =====================
    @GetMapping("/active")
    public List<BusinessResponse> getActiveBusinesses() {
        return service.getActiveBusinesses();
    }
}
