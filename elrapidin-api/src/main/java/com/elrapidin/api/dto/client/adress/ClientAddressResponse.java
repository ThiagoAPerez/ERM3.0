package com.elrapidin.api.dto.client.adress;

import com.elrapidin.api.domain.enums.client.AddressType;

public record ClientAddressResponse(
        Long id,
        String name,
        String address,
        String neighborhood,
        String referencePoint,
        AddressType addressType,
        boolean isPrimary) {
}
