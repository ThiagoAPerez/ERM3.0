package com.elrapidin.api.controller.client;

import com.elrapidin.api.dto.client.ChangePasswordRequest;
import com.elrapidin.api.dto.client.ClientMeResponse;
import com.elrapidin.api.dto.client.UpdateClientProfileRequest;
import com.elrapidin.api.security.AuthenticatedUser;
import com.elrapidin.api.service.client.ClientService;

import jakarta.validation.Valid;

import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/client")
public class ClientController {

    private final ClientService clientService;

    public ClientController(ClientService clientService) {
        this.clientService = clientService;
    }

    // =====================================================
    // Obtener información del cliente autenticado
    // =====================================================

    @GetMapping("/me")
    public ClientMeResponse me(Authentication authentication) {

        AuthenticatedUser authUser = (AuthenticatedUser) authentication.getPrincipal();

        return clientService.getClientMe(authUser.getUserId());
    }

    // =====================================================
    // Editar perfil del cliente
    // =====================================================

    @PutMapping("/profile")
    public void updateProfile(
            Authentication authentication,
            @Valid @RequestBody UpdateClientProfileRequest request) {
        Long userId = (Long) authentication.getPrincipal();
        clientService.updateProfile(userId, request);
    }

    // =====================================================
    // Cambiar contraseña
    // =====================================================

    @PutMapping("/change-password")
    public void changePassword(
            Authentication authentication,
            @Valid @RequestBody ChangePasswordRequest request) {
        Long userId = (Long) authentication.getPrincipal();
        clientService.changePassword(userId, request);
    }

    // =====================================================
    // Logout (JWT stateless)
    // =====================================================

    @PostMapping("/logout")
    public void logout() {
        // JWT es stateless:
        // el frontend solo debe eliminar el token.
        // Endpoint dejado por consistencia / futuro blacklist.
    }
}
