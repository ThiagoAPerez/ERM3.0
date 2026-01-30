package com.elrapidin.api.controller.auth;

import com.elrapidin.api.dto.auth.AuthResponse;
import com.elrapidin.api.dto.auth.LoginRequest;
import com.elrapidin.api.dto.auth.RegisterRequest;
import com.elrapidin.api.service.AuthService;
import com.elrapidin.api.domain.enums.user.UserRole;
import jakarta.validation.Valid;

import java.util.Map;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/auth")
public class AuthController {

    private final AuthService authService;

    public AuthController(AuthService authService) {
        this.authService = authService;
    }

    @PostMapping("/register")
    public AuthResponse register(@Valid @RequestBody RegisterRequest request) {
        System.out.println(">>> REGISTER CONTROLLER ENTRÓ <<<");
        return authService.register(request);
    }

    // public AuthResponse register(@Valid @RequestBody RegisterRequest request) {
    /// return new AuthResponse(authService.register(request));
    //

    @PostMapping("/login")
    public ResponseEntity<AuthResponse> login(
            @Valid @RequestBody LoginRequest request) {

        return ResponseEntity.ok(authService.login(request));
    }

}
