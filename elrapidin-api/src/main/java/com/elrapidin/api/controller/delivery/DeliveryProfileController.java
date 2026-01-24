package com.elrapidin.api.controller.delivery;

import com.elrapidin.api.domain.enums.delivery.DeliveryStatus;
import com.elrapidin.api.dto.delivery.DeliveryMeResponse;
import com.elrapidin.api.security.AuthenticatedUser;
import com.elrapidin.api.service.delivery.DeliveryOperations;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/delivery/profile")
public class DeliveryProfileController {

    private final DeliveryOperations deliveryOperations;

    public DeliveryProfileController(DeliveryOperations deliveryOperations) {
        this.deliveryOperations = deliveryOperations;
    }

    // ===============================
    // PERFIL DEL DOMICILIARIO
    // ===============================
    @GetMapping("/me")
    public ResponseEntity<DeliveryMeResponse> getMyProfile(
            @AuthenticationPrincipal AuthenticatedUser user) {

        return ResponseEntity.ok(
                deliveryOperations.getMyProfile(user.getUserId()));
    }

    // ===============================
    // CAMBIAR DISPONIBILIDAD
    // ===============================
    @PatchMapping("/availability")
    public ResponseEntity<Void> changeAvailability(
            @AuthenticationPrincipal AuthenticatedUser user,
            @RequestParam DeliveryStatus status) {

        deliveryOperations.changeAvailability(user.getUserId(), status);

        return ResponseEntity.noContent().build();
    }
}
