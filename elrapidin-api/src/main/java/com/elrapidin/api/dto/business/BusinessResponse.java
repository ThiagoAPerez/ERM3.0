package com.elrapidin.api.dto.business;

import com.elrapidin.api.domain.enums.businesses.BusinessStatus;
import com.elrapidin.api.domain.enums.businesses.BusinessesCategory;

public class BusinessResponse {

        private Long id;
        private Long ownerUserId;
        private String name;
        private String phone;
        private String email;
        private String municipality;
        private BusinessStatus status;
        private BusinessesCategory category;

        public BusinessResponse(
                        Long id,
                        Long ownerUserId,
                        String name,
                        String phone,
                        String email,
                        String municipality,
                        BusinessStatus status,
                        BusinessesCategory category) {
                this.id = id;
                this.ownerUserId = ownerUserId;
                this.name = name;
                this.phone = phone;
                this.email = email;
                this.municipality = municipality;
                this.status = status;
                this.category = category;

        }

        public void setId(Long id) {
                this.id = id;
        }

        public void setOwnerUserId(Long ownerUserId) {
                this.ownerUserId = ownerUserId;
        }

        public void setName(String name) {
                this.name = name;
        }

        public void setPhone(String phone) {
                this.phone = phone;
        }

        public void setEmail(String email) {
                this.email = email;
        }

        public void setMunicipality(String municipality) {
                this.municipality = municipality;
        }

        public void setStatus(BusinessStatus status) {
                this.status = status;
        }

        public void setCategory(BusinessesCategory category) {
                this.category = category;
        }

        public BusinessResponse() {
        }

        public Long getId() {
                return id;
        }

        public Long getOwnerUserId() {
                return ownerUserId;
        }

        public String getName() {
                return name;
        }

        public String getPhone() {
                return phone;
        }

        public String getEmail() {
                return email;
        }

        public String getMunicipality() {
                return municipality;
        }

        public BusinessStatus getStatus() {
                return status;
        }

        public BusinessesCategory getCategory() {
                return category;
        }
}
