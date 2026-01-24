package com.elrapidin.api.service.client;

import com.elrapidin.api.dto.client.ChangePasswordRequest;
import com.elrapidin.api.dto.client.ClientMeResponse;
import com.elrapidin.api.dto.client.UpdateClientProfileRequest;

public interface ClientService {

    ClientMeResponse getClientMe(Long userId);

    void updateProfile(Long userId, UpdateClientProfileRequest request);

    void changePassword(Long userId, ChangePasswordRequest request);
}
