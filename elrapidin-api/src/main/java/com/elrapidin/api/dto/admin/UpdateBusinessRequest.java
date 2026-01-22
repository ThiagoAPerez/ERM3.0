package com.elrapidin.api.dto.admin;

import com.elrapidin.api.domain.enums.businesses.BusinessesCategory;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

public record UpdateBusinessRequest(

        @NotBlank
        String name,

        @NotBlank
        String phone,

        @Email
        @NotBlank
        String email,

        String address,

        String municipality,

        String description,

        String logoUrl,

        String coverUrl,

        @NotNull
        BusinessesCategory category

) {
}
