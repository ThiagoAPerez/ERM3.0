package com.elrapidin.api.dto.user;

import com.elrapidin.api.domain.enums.user.UserRole;
import com.elrapidin.api.domain.enums.user.UserStatus;

public record MeResponse(
        Long id,
        String name,
        String phone,
        String email,
        UserRole role,
        UserStatus status) {
}
