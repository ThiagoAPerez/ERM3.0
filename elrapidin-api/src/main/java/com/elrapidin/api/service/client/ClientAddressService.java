package com.elrapidin.api.service.client;

import com.elrapidin.api.dto.client.adress.ClientAddressResponse;
import com.elrapidin.api.dto.client.adress.CreateClientAddressRequest;
import com.elrapidin.api.dto.client.adress.UpdateClientAddressRequest;

import java.util.List;

public interface ClientAddressService {

    List<ClientAddressResponse> getMyAddresses(Long userId);

    void createAddress(Long userId, CreateClientAddressRequest request);

    void updateAddress(Long userId, Long addressId, UpdateClientAddressRequest request);

    void deleteAddress(Long userId, Long addressId);

    void setPrimaryAddress(Long userId, Long addressId);
}
