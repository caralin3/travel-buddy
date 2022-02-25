package com.example.travelbuddybackend.service;

import com.example.travelbuddybackend.dto.UserRegistrationDto;
import com.example.travelbuddybackend.model.User;
import org.springframework.security.core.userdetails.UserDetailsService;

public interface UserService extends UserDetailsService {
    User save(UserRegistrationDto registrationDto);
}

