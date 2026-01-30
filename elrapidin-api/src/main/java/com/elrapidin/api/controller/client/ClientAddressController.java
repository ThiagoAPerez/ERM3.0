package com.elrapidin.api.controller.client;

import com.elrapidin.api.dto.client.adress.ClientAddressResponse;
import com.elrapidin.api.dto.client.adress.CreateClientAddressRequest;
import com.elrapidin.api.dto.client.adress.UpdateClientAddressRequest;
import com.elrapidin.api.security.AuthenticatedUser;
import com.elrapidin.api.service.client.ClientAddressService;
import com.elrapidin.api.service.client.ClientAddressServiceImpl;

import jakarta.validation.Valid;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/client/addresses")
public class ClientAddressController {

    private final ClientAddressService clientAddressService;

    public ClientAddressController(ClientAddressService clientAddressService) {
        this.clientAddressService = clientAddressService;
    }

    @GetMapping
    public List<ClientAddressResponse> getMyAddresses(Authentication authentication) {
        AuthenticatedUser auth = (AuthenticatedUser) authentication.getPrincipal();
        Long userId = auth.getUserId();
        return clientAddressService.getMyAddresses(userId);
    }

    @PostMapping
    public void createAddress(
            Authentication authentication,
            @Valid @RequestBody CreateClientAddressRequest request) {

        AuthenticatedUser auth = (AuthenticatedUser) authentication.getPrincipal();
        Long userId = auth.getUserId();

        clientAddressService.createAddress(userId, request);
    }

    @PutMapping("/{id}")
    public void updateAddress(
            Authentication authentication,
            @PathVariable Long id,
            @Valid @RequestBody UpdateClientAddressRequest request) {

        AuthenticatedUser auth = (AuthenticatedUser) authentication.getPrincipal();
        Long userId = auth.getUserId();

        clientAddressService.updateAddress(userId, id, request);
    }

    @DeleteMapping("/{id}")
    public void deleteAddress(
            Authentication authentication,
            @PathVariable Long id) {

        AuthenticatedUser auth = (AuthenticatedUser) authentication.getPrincipal();
        Long userId = auth.getUserId();

        clientAddressService.deleteAddress(userId, id);
    }

    @PatchMapping("/{id}/primary")
    public void setPrimary(
            Authentication authentication,
            @PathVariable Long id) {

        AuthenticatedUser auth = (AuthenticatedUser) authentication.getPrincipal();
        clientAddressService.setPrimaryAddress(auth.getUserId(), id);
    }
}
