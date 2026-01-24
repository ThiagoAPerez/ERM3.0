package com.elrapidin.api.controller.client;

import com.elrapidin.api.dto.client.adress.ClientAddressResponse;
import com.elrapidin.api.dto.client.adress.CreateClientAddressRequest;
import com.elrapidin.api.dto.client.adress.UpdateClientAddressRequest;
import com.elrapidin.api.service.client.ClientAddressService;

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
        Long userId = (Long) authentication.getPrincipal();
        return clientAddressService.getMyAddresses(userId);
    }

    @PostMapping
    public void createAddress(
            Authentication authentication,
            @Valid @RequestBody CreateClientAddressRequest request) {
        Long userId = (Long) authentication.getPrincipal();
        clientAddressService.createAddress(userId, request);
    }

    @PutMapping("/{id}")
    public void updateAddress(
            Authentication authentication,
            @PathVariable Long id,
            @Valid @RequestBody UpdateClientAddressRequest request) {
        Long userId = (Long) authentication.getPrincipal();
        clientAddressService.updateAddress(userId, id, request);
    }

    @DeleteMapping("/{id}")
    public void deleteAddress(
            Authentication authentication,
            @PathVariable Long id) {
        Long userId = (Long) authentication.getPrincipal();
        clientAddressService.deleteAddress(userId, id);
    }
}
