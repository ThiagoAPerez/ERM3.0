package com.elrapidin.api.dto.admin;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

import com.elrapidin.api.domain.enums.businesses.BusinessesCategory;

public record CreateBusinessRequest(

                @NotBlank String name,
                @NotBlank String address,
                @NotBlank String municipality,
                @NotBlank String phone,
                @NotBlank String email,
                @NotBlank String temporaryPassword,

                @NotNull BusinessesCategory category, // 🔥 OBLIGATORIO

                String description,
                String logoUrl,
                String coverUrl) {
}
