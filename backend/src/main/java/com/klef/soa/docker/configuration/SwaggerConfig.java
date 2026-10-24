package com.klef.soa.docker.configuration;

import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Contact;
import io.swagger.v3.oas.models.info.Info;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class SwaggerConfig {

    @Bean
    public OpenAPI customOpenAPI() {
        return new OpenAPI()
                .info(new Info()
                        .title("Charity Fundraiser Management API")
                        .version("1.0.0")
                        .description("Full-Stack CRUD REST API for Charity Fundraiser Management - Student ID: 2400032790")
                        .contact(new Contact().name("Student 2400032790")));
    }
}
