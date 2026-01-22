package com.elrapidin.api.service;

import com.elrapidin.api.exception.GlobalExceptionHandler;
import com.elrapidin.api.domain.entity.UserEntity;
import com.elrapidin.api.domain.enums.user.UserRole;
import com.elrapidin.api.domain.repository.UserRepository;
import com.elrapidin.api.dto.auth.LoginRequest;
import com.elrapidin.api.dto.auth.RegisterRequest;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class AuthService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;

    public AuthService(UserRepository userRepository,
            PasswordEncoder passwordEncoder,
            JwtService jwtService) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.jwtService = jwtService;
    }

    public String register(RegisterRequest request) {

        if (userRepository.existsByPhone(request.getPhone())) {
            throw new RuntimeException("Phone already registered");
        }
        if (userRepository.existsByEmail(request.getEmail())) {
            throw new RuntimeException("Email already exists");
        }

        //================================================
        // ========= Crear y guardar el usuario =================
        //================================================

        UserEntity user = new UserEntity();
        user.setName(request.getName());
        user.setPhone(request.getPhone());
        user.setEmail(request.getEmail());

        user.setPasswordHash(passwordEncoder.encode(request.getPassword()));
        user.setRole(UserRole.CLIENT);

        userRepository.save(user);

        System.out.println(">>> USER GUARDADO CON ID: " + user.getId());

        return jwtService.generateToken(user.getId(), user.getRole().name());
    }

    //================================================
    // ========= Login del usuario =================
    //================================================

    public String login(LoginRequest request) {

        UserEntity user = userRepository.findByPhone(request.getPhone())
                .orElseThrow(() -> new RuntimeException("User not found"));

        if (!passwordEncoder.matches(request.getPassword(), user.getPasswordHash())) {
            throw new RuntimeException("Invalid password");
        }
         System.out.println(">>> BIENVENIDO USARIO: " + user.getName());

        return jwtService.generateToken(user.getId(), user.getRole().name());
    }
}
