package com.elrapidin.api.config;

import jakarta.annotation.PostConstruct;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;

@Configuration
public class UploadConfig {

    @Value("${app.upload.path}")
    private String basePath;

    public static final String PRODUCTS_PATH = "products";
    public static final String BUSINESSES_PATH = "businesses";

    public String getBasePath() {
        return basePath;
    }
}
