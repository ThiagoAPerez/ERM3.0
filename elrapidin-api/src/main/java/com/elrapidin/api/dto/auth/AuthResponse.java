package com.elrapidin.api.dto.auth;

import com.elrapidin.api.domain.enums.user.UserRole;

public class AuthResponse {

    private final String accessToken;
    private final String tokenType = "Bearer";
    private final UserRole role;

    public AuthResponse(String accessToken, UserRole role) {
        this.accessToken = accessToken;
        this.role = role;
    }

    public String getAccessToken() {
        return accessToken;
    }

    public String getTokenType() {
        return tokenType;
    }

    public UserRole getRole() {
        return role;
    }
}
