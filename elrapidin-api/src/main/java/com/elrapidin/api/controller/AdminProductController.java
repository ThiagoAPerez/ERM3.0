package com.elrapidin.api.controller;

import com.elrapidin.api.dto.admin.AdminCreateProductRequest;
import com.elrapidin.api.dto.admin.AdminProductListDTO;
import com.elrapidin.api.dto.admin.AdminProductResponse;
import com.elrapidin.api.domain.enums.product.ProductCategory;
import com.elrapidin.api.service.admin.AdminProductService;

import jakarta.validation.Valid;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/admin/products")
@PreAuthorize("hasRole('ADMIN')")
public class AdminProductController {

    private final AdminProductService adminProductService;

    public AdminProductController(AdminProductService adminProductService) {
        this.adminProductService = adminProductService;
    }

    // ============================================================
    // ===================== CREAR PRODUCTO =======================
    // ============================================================

    @PostMapping
    public ResponseEntity<AdminProductResponse> createProduct(
            @RequestBody @Valid AdminCreateProductRequest request) {

        AdminProductResponse response = adminProductService.createProduct(request);

        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(response);
    }

    // ============================================================
    // ===================== EDITAR PRODUCTO ======================
    // ============================================================

    @PutMapping("/{productId}")
    public ResponseEntity<AdminProductResponse> updateProduct(
            @PathVariable Long productId,
            @RequestBody @Valid AdminCreateProductRequest request) {

        AdminProductResponse response = adminProductService.updateProduct(productId, request);

        return ResponseEntity.ok(response);
    }

    // ============================================================
    // ===================== ACTIVAR PRODUCTO =====================
    // ============================================================

    @PatchMapping("/{productId}/activate")
    public ResponseEntity<Void> activateProduct(@PathVariable Long productId) {
        adminProductService.activateProduct(productId);
        return ResponseEntity.noContent().build();
    }

    // ============================================================
    // ===================== DESACTIVAR PRODUCTO ==================
    // ============================================================

    @PatchMapping("/{productId}/deactivate")
    public ResponseEntity<Void> deactivateProduct(@PathVariable Long productId) {
        adminProductService.deactivateProduct(productId);
        return ResponseEntity.noContent().build();
    }

    // ============================================================
    // ===================== ELIMINAR (SOFT DELETE) ===============
    // ============================================================

    @DeleteMapping("/{productId}")
    public ResponseEntity<Void> deleteProduct(@PathVariable Long productId) {
        adminProductService.deleteProduct(productId);
        return ResponseEntity.noContent().build();
    }

    // ============================================================
    // ===================== LISTAR PRODUCTOS =====================
    // ============================================================

    @GetMapping
    public List<AdminProductListDTO> listAllProducts() {
        return adminProductService.listAllAdminProducts();
    }

    // ============================================================
    // ===================== BUSCAR POR NOMBRE ====================
    // ============================================================

    @GetMapping("/search")
    public List<AdminProductResponse> searchProductsByName(
            @RequestParam String name) {
        return adminProductService.searchByName(name);
    }

    // ============================================================
    // ===================== FILTRAR POR CATEGORIA ================
    // ============================================================

    @GetMapping("/category/{category}")
    public List<AdminProductResponse> filterByCategory(
            @PathVariable ProductCategory category) {
        return adminProductService.filterByCategory(category);
    }
}
