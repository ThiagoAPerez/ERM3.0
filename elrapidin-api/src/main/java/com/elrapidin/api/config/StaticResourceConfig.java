package com.elrapidin.api.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class StaticResourceConfig implements WebMvcConfigurer {

    private final UploadConfig uploadConfig;

    public StaticResourceConfig(UploadConfig uploadConfig) {
        this.uploadConfig = uploadConfig;
    }

    @Override
    public void addResourceHandlers(ResourceHandlerRegistry registry) {
        registry
                .addResourceHandler("/uploads/**")
                .addResourceLocations("file:" + uploadConfig.getBasePath() + "/");
    }
}
