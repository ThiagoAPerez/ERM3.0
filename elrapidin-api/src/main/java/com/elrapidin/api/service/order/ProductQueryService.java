package com.elrapidin.api.service.order;

import com.elrapidin.api.domain.entity.product.ProductEntity;
import com.elrapidin.api.domain.enums.businesses.BusinessesCategory;
import com.elrapidin.api.domain.repository.ProductRepository;
import com.elrapidin.api.dto.product.ProductPublicResponse;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ProductQueryService {

        private final ProductRepository productRepository;

        public ProductQueryService(ProductRepository productRepository) {
                this.productRepository = productRepository;
        }

}
