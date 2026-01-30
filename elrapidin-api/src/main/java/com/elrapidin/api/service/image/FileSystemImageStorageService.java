package com.elrapidin.api.service.image;

import com.elrapidin.api.config.UploadConfig;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.UUID;

@Service
public class FileSystemImageStorageService implements ImageStorageService {

    private final UploadConfig uploadConfig;

    public FileSystemImageStorageService(UploadConfig uploadConfig) {
        this.uploadConfig = uploadConfig;
    }

    /* ===================== PRODUCTS ===================== */

    @Override
    public String storeProductImage(Long productId, MultipartFile file) {
        return store(file, UploadConfig.PRODUCTS_PATH, productId);
    }

    /* ===================== BUSINESSES ===================== */

    @Override
    public String storeBusinessLogo(Long businessId, MultipartFile file) {
        return store(file, UploadConfig.BUSINESSES_PATH + "/logo", businessId);
    }

    @Override
    public String storeBusinessCover(Long businessId, MultipartFile file) {
        return store(file, UploadConfig.BUSINESSES_PATH + "/cover", businessId);
    }

    /* ===================== CORE STORAGE ===================== */

    private String store(MultipartFile file, String type, Long id) {
        validateImage(file);

        String extension = StringUtils.getFilenameExtension(file.getOriginalFilename());
        String filename = UUID.randomUUID() + "." + extension;

        Path dir = Paths.get(
                uploadConfig.getBasePath(),
                type,
                id.toString());

        try {
            Files.createDirectories(dir);
            Path target = dir.resolve(filename);
            file.transferTo(target.toFile());
        } catch (IOException e) {
            throw new RuntimeException("Error guardando imagen", e);
        }

        // URL pública (no path físico)
        return "/uploads/" + type + "/" + id + "/" + filename;
    }

    /* ===================== VALIDATION ===================== */

    private void validateImage(MultipartFile file) {
        if (file == null || file.isEmpty()) {
            throw new IllegalArgumentException("Archivo vacío");
        }

        if (file.getContentType() == null ||
                !file.getContentType().startsWith("image/")) {
            throw new IllegalArgumentException("El archivo no es una imagen");
        }

        long maxSize = 5 * 1024 * 1024; // 5MB
        if (file.getSize() > maxSize) {
            throw new IllegalArgumentException("La imagen supera el tamaño permitido");
        }
    }
}
