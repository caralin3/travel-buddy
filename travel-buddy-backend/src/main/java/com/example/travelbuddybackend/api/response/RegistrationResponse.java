package com.example.travelbuddybackend.api.response;

import com.example.travelbuddybackend.model.Role;
import io.swagger.v3.oas.annotations.media.Schema;

import java.util.Set;

@Schema(description = "The response for successful user registration.")
public class RegistrationResponse {

    @Schema(description = "Unique id for user")
    protected long id;

    @Schema(description = "User first name")
    protected String firstName;

    @Schema(description = "User last name")
    protected String lastName;

    @Schema(description = "Unique email for user")
    protected String email;

    @Schema(description = "User roles")
    protected Set<Role> roles;

    public RegistrationResponse() {
    }

    public RegistrationResponse(ResponseBuilder builder) {
        this.id = builder.id;
        this.firstName = builder.firstName;
        this.lastName = builder.lastName;
        this.email = builder.email;
        this.roles = builder.roles;
    }

    public long getId() {
        return id;
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

    public Set<Role> getRoles() {
        return roles;
    }

    public static ResponseBuilder builder() {
        return new ResponseBuilder();
    }

    public static final class ResponseBuilder {
        private long id;
        private String firstName;
        private String lastName;
        private String email;
        private Set<Role> roles;

        private ResponseBuilder() {
        }

        public ResponseBuilder setId(long id) {
            this.id = id;
            return this;
        }

        public ResponseBuilder setFirstName(String firstName) {
            this.firstName = firstName;
            return this;
        }

        public ResponseBuilder setLastName(String lastName) {
            this.lastName = lastName;
            return this;
        }

        public ResponseBuilder setEmail(String email) {
            this.email = email;
            return this;
        }

        public ResponseBuilder setRoles(Set<Role> roles) {
            this.roles = roles;
            return this;
        }

        public RegistrationResponse build() {
            return new RegistrationResponse(this);
        }
    }
}
