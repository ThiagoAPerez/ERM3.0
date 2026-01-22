package com.elrapidin.api.service.admin;

import com.elrapidin.api.domain.entity.product.ProductEntity;
import com.elrapidin.api.domain.enums.product.ProductCategory;
import com.elrapidin.api.domain.enums.product.ProductStatus;
import com.elrapidin.api.domain.repository.ProductRepository;
import com.elrapidin.api.dto.admin.AdminCreateProductRequest;
import com.elrapidin.api.dto.admin.AdminProductListDTO;
import com.elrapidin.api.dto.admin.AdminProductResponse;

import java.util.List;

import org.springframework.stereotype.Service;

@Service
public class AdminProductService {

    private final ProductRepository productRepository;

    public AdminProductService(ProductRepository productRepository) {
        this.productRepository = productRepository;
    }

    // ============================================================
    // =============== CREAR PRODUCTO =============================
    // ============================================================

    public AdminProductResponse createProduct(AdminCreateProductRequest request) {

        ProductEntity product = new ProductEntity();

        // ✅ PROVIDER REAL
        product.setProviderType(request.getProviderType());
        product.setProviderId(request.getProviderId());

        product.setCategory(request.getCategory());
        product.setName(request.getName());
        product.setDescription(request.getDescription());
        product.setCostPrice(request.getCostPrice());
        product.setSalePrice(request.getSalePrice());
        product.setImageUrl(request.getImageUrl());
        product.setStatus(ProductStatus.ACTIVE);

        ProductEntity saved = productRepository.save(product);

        return mapToAdminResponse(saved);
    }

    // ============================================================
    // =============== EDITAR PRODUCTO ============================
    // ============================================================

    public AdminProductResponse updateProduct(
            Long productId,
            AdminCreateProductRequest request) {

        ProductEntity product = productRepository.findById(productId)
                .orElseThrow(() -> new RuntimeException("Producto no encontrado"));

        // ❗ El provider NO se cambia aquí
        product.setCategory(request.getCategory());
        product.setName(request.getName());
        product.setDescription(request.getDescription());
        product.setCostPrice(request.getCostPrice());
        product.setSalePrice(request.getSalePrice());
        product.setImageUrl(request.getImageUrl());

        ProductEntity updated = productRepository.save(product);
        return mapToAdminResponse(updated);
    }

    // ============================================================
    // =============== ACTIVAR / DESACTIVAR =======================
    // ============================================================

    public void activateProduct(Long productId) {
        updateStatus(productId, ProductStatus.ACTIVE);
    }

    public void deactivateProduct(Long productId) {
        updateStatus(productId, ProductStatus.INACTIVE);
    }

    // ============================================================
    // =============== ELIMINAR (SOFT DELETE) =====================
    // ============================================================

    public void deleteProduct(Long productId) {
        updateStatus(productId, ProductStatus.DELETED);
    }

    private void updateStatus(Long productId, ProductStatus status) {
        ProductEntity product = productRepository.findById(productId)
                .orElseThrow(() -> new RuntimeException("Producto no encontrado"));
        product.setStatus(status);
        productRepository.save(product);
    }

    // ============================================================
    // =============== LISTADO ADMIN ==============================
    // ============================================================

    public List<AdminProductListDTO> listAllAdminProducts() {

        return productRepository.findByStatusNot(ProductStatus.DELETED)
                .stream()
                .map(product -> {
                    AdminProductListDTO dto = new AdminProductListDTO();

                    dto.setId(product.getId());
                    dto.setName(product.getName());
                    dto.setDescription(product.getDescription());

                    // ✅ DIRECTO DESDE EL ENTITY
                    dto.setProviderType(product.getProviderType());
                    dto.setProviderId(product.getProviderId());

                    // ⏳ se resolverá en el siguiente paso
                    dto.setProviderName("PENDIENTE");

                    dto.setCategory(product.getCategory());
                    dto.setCostPrice(product.getCostPrice());
                    dto.setSalePrice(product.getSalePrice());
                    dto.setStatus(product.getStatus());

                    return dto;
                })
                .toList();
    }

    // ============================================================
    // =============== BUSQUEDAS =================================
    // ============================================================

    public List<AdminProductResponse> searchByName(String name) {
        return productRepository.findByNameContainingIgnoreCase(name)
                .stream()
                .map(this::mapToAdminResponse)
                .toList();
    }

    public List<AdminProductResponse> filterByCategory(ProductCategory category) {
        return productRepository.findByCategory(category)
                .stream()
                .map(this::mapToAdminResponse)
                .toList();
    }

    // ============================================================
    // =============== MAPPER PRIVADO =============================
    // ============================================================

    private AdminProductResponse mapToAdminResponse(ProductEntity p) {
        return new AdminProductResponse(
                p.getId(),
                p.getName(),
                p.getDescription(),
                p.getProviderType(),
                p.getProviderId(),
                p.getCategory(),
                p.getStatus(),
                p.getCostPrice(),
                p.getSalePrice(),
                p.getCurrency(),
                p.getImageUrl(),
                p.getIsAvailable(),
                p.getCreatedAt());
    }
}
