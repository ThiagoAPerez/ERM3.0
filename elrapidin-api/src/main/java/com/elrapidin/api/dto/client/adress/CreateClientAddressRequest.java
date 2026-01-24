package com.elrapidin.api.dto.client.adress;

import com.elrapidin.api.domain.enums.client.AddressType;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

public record CreateClientAddressRequest(

                @NotBlank String name,

                @NotBlank String address,

                @NotBlank String neighborhood,

                String referencePoint,

                @NotNull AddressType addressType) {
}
