package com.elrapidin.api.service.image;

import org.springframework.web.multipart.MultipartFile;

public interface ImageStorageService {

    // Productos
    String storeProductImage(Long productId, MultipartFile file);

    // Negocios
    String storeBusinessLogo(Long businessId, MultipartFile file);

    String storeBusinessCover(Long businessId, MultipartFile file);
}
