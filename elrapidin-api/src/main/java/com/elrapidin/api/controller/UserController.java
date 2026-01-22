package com.elrapidin.api.controller;

import com.elrapidin.api.dto.user.MeResponse;
import com.elrapidin.api.service.user.UserService;

import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class UserController {

    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping("/me")
    public MeResponse me(Authentication authentication) {
        Long userId = (Long) authentication.getPrincipal();
        return userService.getMe(userId);
    }
}
