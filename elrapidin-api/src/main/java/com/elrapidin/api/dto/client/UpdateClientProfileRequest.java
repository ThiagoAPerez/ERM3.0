package com.elrapidin.api.dto.client;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public record UpdateClientProfileRequest(

        @NotBlank String name,

        @NotBlank @Size(max = 20) String phone,

        String profilePhotoUrl) {
}
