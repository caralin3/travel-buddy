package com.example.travelbuddybackend.api.request;

import io.swagger.v3.oas.annotations.media.Schema;

@Schema(description = "The request body for user registration.")
public class RegisterRequest {

    @Schema(description = "Unique email for user")
    protected String email;

    @Schema(description = "First Name of user")
    protected String firstName;

    @Schema(description = "Last Name of user")
    protected String lastName;

    @Schema(description = "User password")
    protected String password;

    public RegisterRequest() {
    }

    public RegisterRequest(RegisterRequestBuilder builder) {
        this.email = builder.email;
        this.firstName = builder.firstName;
        this.lastName = builder.lastName;
        this.password = builder.password;
    }

    public String getFirstName() {
        return firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public String getEmail() {
        return email;
    }

    public String getPassword() {
        return password;
    }
    
    public static RegisterRequestBuilder builder() {
        return new RegisterRequestBuilder();
    }

    public static final class RegisterRequestBuilder {
        private String email;
        private String firstName;
        private String lastName;
        private String password;

        private RegisterRequestBuilder() {
        }

        public RegisterRequestBuilder setFirstName(String firstName) {
            this.firstName = firstName;
            return this;
        }

        public RegisterRequestBuilder setLastName(String lastName) {
            this.lastName = lastName;
            return this;
        }

        public RegisterRequestBuilder setEmail(String email) {
            this.email = email;
            return this;
        }

        public RegisterRequestBuilder setPassword(String password) {
            this.password = password;
            return this;
        }

        public RegisterRequest build() {
            return new RegisterRequest(this);
        }
    }
}
