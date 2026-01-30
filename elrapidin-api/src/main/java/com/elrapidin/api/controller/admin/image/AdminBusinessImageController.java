package com.elrapidin.api.controller.admin.image;

import com.elrapidin.api.dto.ImageUploadResponse;
import com.elrapidin.api.service.image.ImageStorageService;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequestMapping("/admin/businesses")
public class AdminBusinessImageController {

    private final ImageStorageService imageStorageService;

    public AdminBusinessImageController(ImageStorageService imageStorageService) {
        this.imageStorageService = imageStorageService;
    }

    @PreAuthorize("hasRole('ADMIN')")
    @PostMapping("/{businessId}/logo")
    public ImageUploadResponse uploadLogo(
            @PathVariable Long businessId,
            @RequestParam("file") MultipartFile file) {
        String url = imageStorageService.storeBusinessLogo(businessId, file);
        return new ImageUploadResponse(url);
    }

    @PreAuthorize("hasRole('ADMIN')")
    @PostMapping("/{businessId}/cover")
    public ImageUploadResponse uploadCover(
            @PathVariable Long businessId,
            @RequestParam("file") MultipartFile file) {
        String url = imageStorageService.storeBusinessCover(businessId, file);
        return new ImageUploadResponse(url);
    }
}
