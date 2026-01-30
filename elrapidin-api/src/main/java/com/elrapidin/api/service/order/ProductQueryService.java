package com.elrapidin.api.service.order;

import com.elrapidin.api.domain.entity.product.ProductEntity;
import com.elrapidin.api.domain.enums.businesses.BusinessesCategory;
import com.elrapidin.api.domain.enums.product.ProductStatus;
import com.elrapidin.api.domain.repository.ProductRepository;
import com.elrapidin.api.dto.product.ProductPublicResponse;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class ProductQueryService {

        private final ProductRepository productRepository;

        public ProductQueryService(ProductRepository productRepository) {
                this.productRepository = productRepository;
        }

        // Get public products by provider

        public List<ProductPublicResponse> getPublicProductsByProvider(
                        BusinessesCategory providerType,
                        Long providerId) {
                return productRepository
                                .findByProviderTypeAndProviderIdAndIsAvailableTrue(providerType, providerId)
                                .stream()
                                .map(this::toPublicResponse)
                                .toList();

        }

        // Convert ProductEntity to ProductPublicResponse

        private ProductPublicResponse toPublicResponse(ProductEntity product) {
                return new ProductPublicResponse(
                                product.getId(),
                                product.getName(),
                                product.getDescription(),
                                product.getSalePrice(),
                                product.getCurrency(),
                                product.getImageUrl(),
                                product.getIsAvailable(),
                                product.getCreatedAt(),
                                product.getCategory());
        }
}
