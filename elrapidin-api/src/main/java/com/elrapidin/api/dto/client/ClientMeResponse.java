package com.elrapidin.api.dto.client;

import com.elrapidin.api.dto.user.MeResponse;

public record ClientMeResponse(
        MeResponse user,
        ClientProfileResponse clientProfile) {
}
