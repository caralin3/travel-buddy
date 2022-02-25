package com.example.travelbuddybackend.api.request;

import io.swagger.v3.oas.annotations.media.Schema;

@Schema(description = "The request body for user login.")
public class LoginRequest {

    @Schema(description = "Unique email for user")
    protected String email;

    @Schema(description = "User password")
    protected String password;

    public LoginRequest() {
    }

    public LoginRequest(LoginRequestBuilder builder) {
        this.email = builder.email;
        this.password = builder.password;
    }

    public String getEmail() {
        return email;
    }

    public String getPassword() {
        return password;
    }
    
    public static LoginRequestBuilder builder() {
        return new LoginRequestBuilder();
    }

    public static final class LoginRequestBuilder {
        private String email;
        private String password;

        private LoginRequestBuilder() {
        }

        public LoginRequestBuilder setEmail(String email) {
            this.email = email;
            return this;
        }

        public LoginRequestBuilder setPassword(String password) {
            this.password = password;
            return this;
        }

        public LoginRequest build() {
            return new LoginRequest(this);
        }
    }
}
