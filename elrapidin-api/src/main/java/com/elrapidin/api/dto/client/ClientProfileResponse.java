package com.elrapidin.api.dto.client;

public record ClientProfileResponse(
        String name,
        String phone,
        String profilePhotoUrl
) {}
