package com.example.travelbuddybackend.api.response;

import com.example.travelbuddybackend.model.Role;
import io.swagger.v3.oas.annotations.media.Schema;

import java.util.Set;

@Schema(description = "The response for successful user login.")
public class JwtResponse {

    @Schema(description = "Access token")
    private String token;

    @Schema(description = "Authentication token type")
    private String type = "Bearer";

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

    public JwtResponse() {
    }

    public JwtResponse(JwtResponseBuilder builder) {
        this.token = builder.token;
        this.type = builder.type;
        this.id = builder.id;
        this.firstName = builder.firstName;
        this.lastName = builder.lastName;
        this.email = builder.email;
        this.roles = builder.roles;
    }

    public String getAccessToken() {
        return token;
    }

    public String getTokenType() {
        return type;
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

    public static JwtResponseBuilder builder() {
        return new JwtResponseBuilder();
    }

    public static final class JwtResponseBuilder {
        private String token;
        private String type;
        private long id;
        private String firstName;
        private String lastName;
        private String email;
        private Set<Role> roles;

        private JwtResponseBuilder() {
        }

        public JwtResponseBuilder setAccessToken(String accessToken) {
            this.token = accessToken;
            return this;
        }

        public JwtResponseBuilder setTokenType(String tokenType) {
            this.type = tokenType;
            return this;
        }

        public JwtResponseBuilder setId(long id) {
            this.id = id;
            return this;
        }

        public JwtResponseBuilder setFirstName(String firstName) {
            this.firstName = firstName;
            return this;
        }

        public JwtResponseBuilder setLastName(String lastName) {
            this.lastName = lastName;
            return this;
        }

        public JwtResponseBuilder setEmail(String email) {
            this.email = email;
            return this;
        }

        public JwtResponseBuilder setRoles(Set<Role> roles) {
            this.roles = roles;
            return this;
        }

        public JwtResponse build() {
            return new JwtResponse(this);
        }
    }
}
