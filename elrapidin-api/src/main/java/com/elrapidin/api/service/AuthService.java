package com.elrapidin.api.service;

import com.elrapidin.api.domain.entity.UserEntity;
import com.elrapidin.api.domain.entity.client.ClientProfileEntity;
import com.elrapidin.api.domain.enums.user.UserRole;
import com.elrapidin.api.domain.enums.user.UserStatus;
import com.elrapidin.api.domain.repository.UserRepository;
import com.elrapidin.api.domain.repository.ClientProfileRepository;
import com.elrapidin.api.dto.auth.LoginRequest;
import com.elrapidin.api.dto.auth.RegisterRequest;
import com.elrapidin.api.exception.ApiException;
import com.elrapidin.api.exception.UnauthorizedException;

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
            throw new ApiException("Phone already registered", 409);
        }

        if (userRepository.existsByEmail(request.getEmail())) {
            throw new ApiException("Email already exists", 409);
        }

        UserEntity user = new UserEntity();
        user.setName(request.getName());
        user.setPhone(request.getPhone());
        user.setEmail(request.getEmail());
        user.setPasswordHash(passwordEncoder.encode(request.getPassword()));
        user.setRole(UserRole.CLIENT);
        user.setStatus(UserStatus.ACTIVE);
        userRepository.save(user);

        ClientProfileEntity profile = new ClientProfileEntity();
        profile.setUser(user);
        profile.setName(request.getName());
        profile.setPhone(request.getPhone());
        profile.setProfilePhotoUrl(null);

        clientProfileRepository.save(profile);

        return jwtService.generateToken(user.getId(), user.getRole().name());
    }

    // =====================================================
    // Login
    // =====================================================
    public String login(LoginRequest request) {

        String identifier = request.getIdentifier(); // puede ser phone o email

        UserEntity user = userRepository
                .findByPhone(identifier)
                .or(() -> userRepository.findByEmail(identifier))
                .orElseThrow(() -> new UnauthorizedException("Invalid credentials"));

        if (!passwordEncoder.matches(
                request.getPassword(),
                user.getPasswordHash())) {

            throw new UnauthorizedException("Invalid credentials");
        }

        return jwtService.generateToken(user.getId(), user.getRole().name());
    }

}
