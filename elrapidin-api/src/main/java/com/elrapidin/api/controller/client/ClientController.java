package com.elrapidin.api.controller.client;

import com.elrapidin.api.dto.client.ChangePasswordRequest;
import com.elrapidin.api.dto.client.ClientMeResponse;
import com.elrapidin.api.dto.client.UpdateClientProfileRequest;
import com.elrapidin.api.security.AuthenticatedUser;
import com.elrapidin.api.service.client.ClientAddressServiceImpl;
import com.elrapidin.api.service.client.ClientService;

import jakarta.validation.Valid;

import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/client")
public class ClientController {

    private final ClientAddressServiceImpl clientAddressServiceImpl;

    private Long getUserId(Authentication authentication) {
        return ((AuthenticatedUser) authentication.getPrincipal()).getUserId();
    }

    private final ClientService clientService;

    public ClientController(ClientService clientService, ClientAddressServiceImpl clientAddressServiceImpl) {
        this.clientService = clientService;
        this.clientAddressServiceImpl = clientAddressServiceImpl;
    }

    // =====================================================
    // Obtener información del cliente autenticado
    // =====================================================

    @GetMapping("/me")
    public ClientMeResponse me(Authentication authentication) {
        return clientService.getClientMe(getUserId(authentication));
    }

    // =====================================================
    // Editar perfil del cliente
    // =====================================================

    @PutMapping("/profile")
    public void updateProfile(
            Authentication authentication,
            @Valid @RequestBody UpdateClientProfileRequest request) {

        AuthenticatedUser user = (AuthenticatedUser) authentication.getPrincipal();

        clientService.updateProfile(user.getUserId(), request);
    }

    // =====================================================
    // Cambiar contraseña
    // =====================================================

    @PutMapping("/change-password")
    public void changePassword(
            Authentication authentication,
            @Valid @RequestBody ChangePasswordRequest request) {
        clientService.changePassword(getUserId(authentication), request);
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

    // =====================================================
    // ====== Gestión de direcciones del cliente ==========
    // =====================================================

}
