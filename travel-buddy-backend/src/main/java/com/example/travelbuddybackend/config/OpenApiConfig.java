package com.example.travelbuddybackend.config;

import com.example.travelbuddybackend.constants.ApiRoutes;
import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Info;
import io.swagger.v3.oas.models.info.License;
import io.swagger.v3.oas.models.security.SecurityScheme;
import io.swagger.v3.oas.models.servers.Server;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.util.Arrays;

@Configuration
public class OpenApiConfig {
    private static final String BEARER_FORMAT = "JWT";
    private static final String SCHEME = "Bearer";
    private static final String SECURITY_SCHEME_NAME = "Security Scheme";

    @Value("${app-version}")
    private String appVersion;

    @Value("${app-description}")
    private String appDescription;

    @Bean
    public OpenAPI openApi() {
        Server server = new Server();
        server.setUrl(ApiRoutes.CROSS_ORIGIN_URL);
        return new OpenAPI()
//                .servers(Arrays.asList(server))
                .schemaRequirement(SECURITY_SCHEME_NAME, getSecurityScheme())
                .info(info());
    }

    private Info info() {
        return new Info()
                .title("Travel Buddy API")
                .version(appVersion);
//                .description(appDescription)
//                    .termsOfService("http://swagger.io/terms/")
//                    .license(new License().
//                            name("Apache 2.0").
//                            url("http://springdoc.org")));
    }

    private SecurityScheme getSecurityScheme() {
        SecurityScheme securityScheme = new SecurityScheme();
        securityScheme.bearerFormat(BEARER_FORMAT);
        securityScheme.type(SecurityScheme.Type.HTTP);
        securityScheme.in(SecurityScheme.In.HEADER);
        securityScheme.scheme(SCHEME);
        return securityScheme;
    }
}
