package com.elrapidin.api.service.user;

import com.elrapidin.api.domain.entity.UserEntity;
import com.elrapidin.api.domain.repository.UserRepository;
import com.elrapidin.api.dto.user.MeResponse;
import com.elrapidin.api.exception.NotFoundException;
import org.springframework.stereotype.Service;

@Service
public class UserService {

    private final UserRepository userRepository;

    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public MeResponse getMe(Long userId) {
        UserEntity user = userRepository.findById(userId)
                .orElseThrow(() -> new NotFoundException("User not found"));

        return new MeResponse(
                user.getId(),
                user.getName(),
                user.getPhone(),
                user.getEmail(),
                user.getRole(),
                user.getStatus()
        );
    }
}
