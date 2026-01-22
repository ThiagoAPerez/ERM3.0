package com.elrapidin.api.domain.enums.product;

public enum ProductStatus {

    ACTIVE, // visible, vendible
    INACTIVE, // existe pero no se vende
    DELETED // soft delete (no se muestra nunca)
}
