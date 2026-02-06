package com.elrapidin.api.controller.admin.image;

import com.elrapidin.api.dto.ImageUploadResponse;
import com.elrapidin.api.service.image.ImageStorageService;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequestMapping("/admin/products")
public class AdminProductImageController {

    private final ImageStorageService imageStorageService;

    public AdminProductImageController(ImageStorageService imageStorageService) {
        this.imageStorageService = imageStorageService;
    }

    @PreAuthorize("hasRole('ADMIN')")
    @PostMapping(value = "/{productId}/image", consumes = "multipart/form-data")
    public ImageUploadResponse upload(
            @PathVariable Long productId,
            @RequestParam("file") MultipartFile file) {
        String url = imageStorageService.storeProductImage(productId, file);
        return new ImageUploadResponse(url);
    }

}
