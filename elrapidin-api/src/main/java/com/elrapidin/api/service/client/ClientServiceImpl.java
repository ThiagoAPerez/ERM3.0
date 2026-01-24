package com.elrapidin.api.service.client;

import com.elrapidin.api.domain.entity.UserEntity;
import com.elrapidin.api.domain.entity.client.ClientProfileEntity;
import com.elrapidin.api.domain.enums.user.UserRole;
import com.elrapidin.api.domain.repository.UserRepository;
import com.elrapidin.api.domain.repository.ClientProfileRepository;
import com.elrapidin.api.dto.client.ChangePasswordRequest;
import com.elrapidin.api.dto.client.ClientMeResponse;
import com.elrapidin.api.dto.client.ClientProfileResponse;
import com.elrapidin.api.dto.client.UpdateClientProfileRequest;
import com.elrapidin.api.dto.user.MeResponse;
import com.elrapidin.api.exception.NotFoundException;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional
public class ClientServiceImpl implements ClientService {

    private final UserRepository userRepository;
    private final ClientProfileRepository clientProfileRepository;
    private final PasswordEncoder passwordEncoder;

    public ClientServiceImpl(
            UserRepository userRepository,
            ClientProfileRepository clientProfileRepository,
            PasswordEncoder passwordEncoder
    ) {
        this.userRepository = userRepository;
        this.clientProfileRepository = clientProfileRepository;
        this.passwordEncoder = passwordEncoder;
    }

    // =====================================================
    // Obtener información del cliente autenticado
    // =====================================================

    @Override
    @Transactional(readOnly = true)
    public ClientMeResponse getClientMe(Long userId) {

        UserEntity user = userRepository.findById(userId)
                .orElseThrow(() -> new NotFoundException("User not found"));

        if (user.getRole() != UserRole.CLIENT) {
            throw new IllegalStateException("User is not a client");
        }

        ClientProfileEntity profile = clientProfileRepository.findByUserId(userId)
                .orElseThrow(() -> new NotFoundException("Client profile not found"));

        return new ClientMeResponse(
                new MeResponse(
                        user.getId(),
                        user.getName(),
                        user.getPhone(),
                        user.getEmail(),
                        user.getRole(),
                        user.getStatus()
                ),
                new ClientProfileResponse(
                        profile.getName(),
                        profile.getPhone(),
                        profile.getProfilePhotoUrl()
                )
        );
    }

    // =====================================================
    // Editar perfil del cliente (SOLO ClientProfile)
    // =====================================================

    @Override
    public void updateProfile(Long userId, UpdateClientProfileRequest request) {

        ClientProfileEntity profile = clientProfileRepository.findByUserId(userId)
                .orElseThrow(() -> new NotFoundException("Client profile not found"));

        profile.setName(request.name());
        profile.setPhone(request.phone());
        profile.setProfilePhotoUrl(request.profilePhotoUrl());

        clientProfileRepository.save(profile);
    }

    // =====================================================
    // Cambio de contraseña
    // =====================================================

    @Override
    public void changePassword(Long userId, ChangePasswordRequest request) {

        if (!request.newPassword().equals(request.confirmNewPassword())) {
            throw new IllegalArgumentException("New passwords do not match");
        }

        UserEntity user = userRepository.findById(userId)
                .orElseThrow(() -> new NotFoundException("User not found"));

        if (!passwordEncoder.matches(request.currentPassword(), user.getPasswordHash())) {
            throw new IllegalArgumentException("Current password is incorrect");
        }

        user.setPasswordHash(passwordEncoder.encode(request.newPassword()));
        userRepository.save(user);
    }
}
