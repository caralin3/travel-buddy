package com.example.travelbuddybackend.api.model;

import com.example.travelbuddybackend.model.Role;

import java.util.Set;

public class UserDetails {

    protected long id;
    protected String firstName;
    protected String lastName;
    protected String email;
    protected Set<Role> roles;

    public UserDetails() {
    }

    public UserDetails(Builder builder) {
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

    public static Builder builder() {
        return new Builder();
    }

    public static final class Builder {
        private long id;
        private String firstName;
        private String lastName;
        private String email;
        private Set<Role> roles;

        private Builder() {
        }

        public Builder setId(long id) {
            this.id = id;
            return this;
        }

        public Builder setFirstName(String firstName) {
            this.firstName = firstName;
            return this;
        }

        public Builder setLastName(String lastName) {
            this.lastName = lastName;
            return this;
        }

        public Builder setEmail(String email) {
            this.email = email;
            return this;
        }

        public Builder setRoles(Set<Role> roles) {
            this.roles = roles;
            return this;
        }

        public UserDetails build() {
            return new UserDetails(this);
        }
    }
}
