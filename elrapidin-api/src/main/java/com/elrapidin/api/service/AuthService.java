package com.elrapidin.api.service;

import com.elrapidin.api.domain.entity.UserEntity;
import com.elrapidin.api.domain.entity.client.ClientProfileEntity;
import com.elrapidin.api.domain.enums.user.UserRole;
import com.elrapidin.api.domain.repository.UserRepository;
import com.elrapidin.api.domain.repository.ClientProfileRepository;
import com.elrapidin.api.dto.auth.LoginRequest;
import com.elrapidin.api.dto.auth.RegisterRequest;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class AuthService {

    private final UserRepository userRepository;
    private final ClientProfileRepository clientProfileRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;

    public AuthService(
            UserRepository userRepository,
            ClientProfileRepository clientProfileRepository,
            PasswordEncoder passwordEncoder,
            JwtService jwtService) {
        this.userRepository = userRepository;
        this.clientProfileRepository = clientProfileRepository;
        this.passwordEncoder = passwordEncoder;
        this.jwtService = jwtService;
    }

    // =====================================================
    // Registro de usuario CLIENT + ClientProfile
    // =====================================================

    @Transactional
    public String register(RegisterRequest request) {

        if (userRepository.existsByPhone(request.getPhone())) {
            throw new RuntimeException("Phone already registered");
        }

        if (userRepository.existsByEmail(request.getEmail())) {
            throw new RuntimeException("Email already exists");
        }

        // 1️⃣ Crear User
        UserEntity user = new UserEntity();
        user.setName(request.getName());
        user.setPhone(request.getPhone());
        user.setEmail(request.getEmail());
        user.setPasswordHash(passwordEncoder.encode(request.getPassword()));
        user.setRole(UserRole.CLIENT);

        userRepository.save(user);

        // 2️⃣ Crear ClientProfile (copia inicial)
        ClientProfileEntity profile = new ClientProfileEntity();
        profile.setUser(user);
        profile.setName(request.getName());
        profile.setPhone(request.getPhone());
        profile.setProfilePhotoUrl(null); // opcional por ahora

        clientProfileRepository.save(profile);

        // 3️⃣ Generar JWT
        return jwtService.generateToken(user.getId(), user.getRole().name());
    }

    // =====================================================
    // Login (sin cambios)
    // =====================================================

    public String login(LoginRequest request) {

        UserEntity user = userRepository.findByPhone(request.getPhone())
                .orElseThrow(() -> new RuntimeException("User not found"));

        if (!passwordEncoder.matches(request.getPassword(), user.getPasswordHash())) {
            throw new RuntimeException("Invalid password");
        }

        return jwtService.generateToken(user.getId(), user.getRole().name());
    }
}
