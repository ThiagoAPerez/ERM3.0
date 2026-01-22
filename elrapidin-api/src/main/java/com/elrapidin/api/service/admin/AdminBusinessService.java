package com.elrapidin.api.service.admin;

import com.elrapidin.api.domain.entity.UserEntity;
import com.elrapidin.api.domain.entity.businesses.BusinessEntity;
import com.elrapidin.api.domain.enums.businesses.BusinessStatus;
import com.elrapidin.api.domain.enums.businesses.BusinessesCategory;
import com.elrapidin.api.domain.enums.user.UserRole;
import com.elrapidin.api.domain.repository.BusinessRepository;
import com.elrapidin.api.domain.repository.UserRepository;
import com.elrapidin.api.dto.admin.CreateBusinessRequest;
import com.elrapidin.api.dto.admin.UpdateBusinessRequest;
import com.elrapidin.api.dto.business.BusinessResponse;
import com.elrapidin.api.exception.ApiException;

import java.util.List;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class AdminBusinessService {

    private final UserRepository userRepository;
    private final BusinessRepository businessRepository;
    private final PasswordEncoder passwordEncoder;

    public AdminBusinessService(
            UserRepository userRepository,
            BusinessRepository businessRepository,
            PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.businessRepository = businessRepository;
        this.passwordEncoder = passwordEncoder;
    }

    // ===================== CREATE =====================
    @Transactional
    public BusinessResponse createBusiness(CreateBusinessRequest request) {

        if (userRepository.existsByEmail(request.email())) {
            throw new ApiException("Email already exists") {
                @Override
                public int getStatus() {
                    return 409;
                }
            };
        }

        if (userRepository.existsByPhone(request.phone())) {
            throw new ApiException("Phone already exists") {
                @Override
                public int getStatus() {
                    return 409;
                }
            };
        }

        UserEntity user = new UserEntity();
        user.setName(request.name());
        user.setEmail(request.email());
        user.setPhone(request.phone());
        user.setRole(UserRole.BUSINESS);
        user.setPasswordHash(
                passwordEncoder.encode(request.temporaryPassword()));

        userRepository.save(user);

        BusinessEntity business = new BusinessEntity();
        business.setOwnerUserId(user.getId());
        business.setName(request.name());
        business.setPhone(request.phone());
        business.setEmail(request.email());
        business.setAddress(request.address());
        business.setMunicipality(request.municipality());
        business.setDescription(request.description());
        business.setLogoUrl(request.logoUrl());
        business.setCoverUrl(request.coverUrl());
        business.setCategory(request.category());

        businessRepository.save(business);

        return toResponse(business);
    }

    // ===================== LIST =====================
    // ===================== LIST =====================
    public List<BusinessResponse> getAllBusinesses() {
        return businessRepository
                .findByStatusNot(BusinessStatus.SUSPENDED)
                .stream()
                .map(this::toResponse)
                .toList();
    }

    // ===================== GET BY ID =====================
    public BusinessResponse getBusinessById(Long id) {
        BusinessEntity business = businessRepository.findById(id)
                .orElseThrow(() -> new ApiException("Business not found") {
                    @Override
                    public int getStatus() {
                        return 404;
                    }
                });
        return toResponse(business);
    }

    // ===================== SEARCH BY NAME =====================
    public List<BusinessResponse> searchByName(String name) {
        return businessRepository
                .findByNameContainingIgnoreCase(name)
                .stream()
                .map(this::toResponse)
                .toList();
    }

    // ===================== FILTER BY CATEGORY =====================
    public List<BusinessResponse> getByCategory(BusinessesCategory category) {
        return businessRepository
                .findByCategory(category)
                .stream()
                .map(this::toResponse)
                .toList();
    }

    // ===================== UPDATE =====================
    @Transactional
    public BusinessResponse updateBusiness(Long id, UpdateBusinessRequest request) {

        BusinessEntity business = businessRepository.findById(id)
                .orElseThrow(() -> new ApiException("Business not found") {
                    @Override
                    public int getStatus() {
                        return 404;
                    }
                });

        business.setName(request.name());
        business.setPhone(request.phone());
        business.setEmail(request.email());
        business.setAddress(request.address());
        business.setMunicipality(request.municipality());
        business.setDescription(request.description());
        business.setLogoUrl(request.logoUrl());
        business.setCoverUrl(request.coverUrl());
        business.setCategory(request.category());

        return toResponse(business);
    }

    // ===================== STATUS MANAGEMENT =====================
    @Transactional
    public void activateBusiness(Long id) {
        changeStatus(id, BusinessStatus.ACTIVE);
    }

    @Transactional
    public void deactivateBusiness(Long id) {
        changeStatus(id, BusinessStatus.INACTIVE);
    }

    @Transactional
    public void suspendBusiness(Long id) {
        changeStatus(id, BusinessStatus.SUSPENDED);
    }

    private void changeStatus(Long id, BusinessStatus status) {
        BusinessEntity business = businessRepository.findById(id)
                .orElseThrow(() -> new ApiException("Business not found") {
                    @Override
                    public int getStatus() {
                        return 404;
                    }
                });

        business.setStatus(status);
    }

    // ===================== ACTIVE FOR DASHBOARD =====================
    public List<BusinessResponse> getActiveBusinesses() {
        return businessRepository.findByStatus(BusinessStatus.ACTIVE)
                .stream()
                .map(this::toResponse)
                .toList();
    }

    // ===================== MAPPER =====================
    private BusinessResponse toResponse(BusinessEntity business) {
        return new BusinessResponse(
                business.getId(),
                business.getOwnerUserId(),
                business.getName(),
                business.getPhone(),
                business.getEmail(),
                business.getMunicipality(),
                business.getStatus(),
                business.getCategory());
    }
}
