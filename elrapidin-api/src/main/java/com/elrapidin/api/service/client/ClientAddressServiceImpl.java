package com.elrapidin.api.service.client;

import com.elrapidin.api.domain.entity.client.ClientAddressEntity;
import com.elrapidin.api.domain.entity.client.ClientProfileEntity;
import com.elrapidin.api.domain.enums.client.AddressStatus;
import com.elrapidin.api.domain.repository.ClientAddressRepository;
import com.elrapidin.api.domain.repository.ClientProfileRepository;
import com.elrapidin.api.dto.client.adress.ClientAddressResponse;
import com.elrapidin.api.dto.client.adress.CreateClientAddressRequest;
import com.elrapidin.api.dto.client.adress.UpdateClientAddressRequest;
import com.elrapidin.api.exception.NotFoundException;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Transactional
public class ClientAddressServiceImpl implements ClientAddressService {

        private final ClientProfileRepository clientProfileRepository;
        private final ClientAddressRepository clientAddressRepository;

        public ClientAddressServiceImpl(
                        ClientProfileRepository clientProfileRepository,
                        ClientAddressRepository clientAddressRepository) {
                this.clientProfileRepository = clientProfileRepository;
                this.clientAddressRepository = clientAddressRepository;
        }

        // Obtiene las direcciones activas del cliente

        @Override
        @Transactional(readOnly = true)
        public List<ClientAddressResponse> getMyAddresses(Long userId) {

                ClientProfileEntity profile = clientProfileRepository.findByUser_Id(userId)
                                .orElseThrow(() -> new NotFoundException("Client profile not found"));

                return clientAddressRepository
                                .findByClientProfile_IdAndStatus(profile.getId(), AddressStatus.ACTIVE)
                                .stream()
                                .map(a -> new ClientAddressResponse(
                                                a.getId(),
                                                a.getName(),
                                                a.getAddress(),
                                                a.getNeighborhood(),
                                                a.getReferencePoint(),
                                                a.getAddressType(),
                                                a.isPrimaryAddress()))
                                .toList();
        }

        // Creación de una nueva dirección
        @Override
        public void createAddress(Long userId, CreateClientAddressRequest request) {

                ClientProfileEntity profile = clientProfileRepository.findByUser_Id(userId)
                                .orElseThrow(() -> new NotFoundException("Client profile not found"));

                ClientAddressEntity address = new ClientAddressEntity();
                address.setClientProfile(profile);
                address.setName(request.name());
                address.setAddress(request.address());
                address.setNeighborhood(request.neighborhood());
                address.setReferencePoint(request.referencePoint());
                address.setAddressType(request.addressType());
                address.setStatus(AddressStatus.ACTIVE);

                clientAddressRepository.save(address);
        }

        // Actualización de la dirección

        @Override
        public void updateAddress(Long userId, Long addressId, UpdateClientAddressRequest request) {

                ClientProfileEntity profile = clientProfileRepository.findByUser_Id(userId)
                                .orElseThrow(() -> new NotFoundException("Client profile not found"));

                ClientAddressEntity address = clientAddressRepository
                                .findByIdAndClientProfile_Id(addressId, profile.getId())
                                .orElseThrow(() -> new NotFoundException("Address not found"));

                address.setName(request.name());
                address.setAddress(request.address());
                address.setNeighborhood(request.neighborhood());
                address.setReferencePoint(request.referencePoint());
                address.setAddressType(request.addressType());
        }
        // Eliminación lógica de la dirección

        @Override
        public void deleteAddress(Long userId, Long addressId) {

                ClientProfileEntity profile = clientProfileRepository.findByUser_Id(userId)
                                .orElseThrow(() -> new NotFoundException("Client profile not found"));

                ClientAddressEntity address = clientAddressRepository
                                .findByIdAndClientProfile_Id(addressId, profile.getId())
                                .orElseThrow(() -> new NotFoundException("Address not found"));

                address.setStatus(AddressStatus.DELETED);
        }

        // Establecer dirección primaria
        @Override
        @Transactional
        public void setPrimaryAddress(Long userId, Long addressId) {

                ClientProfileEntity profile = clientProfileRepository.findByUser_Id(userId)
                                .orElseThrow(() -> new NotFoundException("Client profile not found"));

                // 1. Quitar primary a todas
                clientAddressRepository.clearPrimary(profile.getId());

                // 2. Activar la nueva
                ClientAddressEntity address = clientAddressRepository
                                .findByIdAndClientProfile_Id(addressId, profile.getId())
                                .orElseThrow(() -> new NotFoundException("Address not found"));

                address.setPrimaryAddress(true);
        }

}
