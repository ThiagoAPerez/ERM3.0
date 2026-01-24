package com.elrapidin.api.service.delivery;

import com.elrapidin.api.domain.enums.delivery.DeliveryStatus;
import com.elrapidin.api.dto.delivery.DeliveryMeResponse;

public interface DeliveryOperations {

    DeliveryMeResponse getMyProfile(Long userId);

    void changeAvailability(Long userId, DeliveryStatus status);
}
