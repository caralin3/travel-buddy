package com.example.travelbuddybackend.controller;

import java.util.HashSet;
import java.util.Set;

import com.example.travelbuddybackend.api.request.LoginRequest;
import com.example.travelbuddybackend.api.request.RegisterRequest;
import com.example.travelbuddybackend.api.response.ErrorResponse;
import com.example.travelbuddybackend.api.response.RegistrationResponse;
import com.example.travelbuddybackend.constants.ApiRoutes;
import com.example.travelbuddybackend.dao.RoleDao;
import com.example.travelbuddybackend.dao.UserDao;
import com.example.travelbuddybackend.model.Role;
import com.example.travelbuddybackend.model.User;
import com.example.travelbuddybackend.model.enums.RoleEnum;
import com.example.travelbuddybackend.api.response.JwtResponse;
import com.example.travelbuddybackend.security.jwt.JwtUtils;
import com.example.travelbuddybackend.service.impl.UserDetailsImpl;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.ExampleObject;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = ApiRoutes.CROSS_ORIGIN_URL)
@RestController
@RequestMapping(
        value = ApiRoutes.AUTH,
        consumes = MediaType.APPLICATION_JSON_VALUE,
        produces = MediaType.APPLICATION_JSON_VALUE
)
@Tag(
        name = "Auth",
        description = "User registration and login operations"
)
public class AuthController {
    @Autowired
    AuthenticationManager authenticationManager;

    @Autowired
    UserDao userDao;

    @Autowired
    RoleDao roleDao;

    @Autowired
    PasswordEncoder encoder;

    @Autowired
    JwtUtils jwtUtils;

    @PostMapping(ApiRoutes.LOGIN)
    @Operation(
            summary = "Performs user login",
            requestBody = @io.swagger.v3.oas.annotations.parameters.RequestBody(
                    required = true,
                    content = @Content(
                            schema = @Schema(implementation = LoginRequest.class)
                    )
            ),
            responses = {
                    @ApiResponse(
                            responseCode = "200",
                            description = "User successfully logged in.",
                            content = @Content(
                                    schema = @Schema(implementation = JwtResponse.class)
                            )
                    ),
                    @ApiResponse(
                            responseCode = "401",
                            description = "Unauthorized error.",
                            content = @Content(
                                    schema = @Schema(implementation = ErrorResponse.class),
                                    examples = @ExampleObject(
                                            value =
                                                    "{\"timestamp\": \"25-02-2022 10:04:43\","
                                                            + "\"code\": 401,"
                                                            + "\"status\": \"UNAUTHORIZED\","
                                                            + "\"message\": \"Email or password is incorrect.\","
                                                            + "\"stackTrace\": null,"
                                                            + "\"data\": null"
                                                            + "}")
                            )
                    )
            }
    )
    public ResponseEntity<?> loginUser(@RequestBody LoginRequest loginRequest) {
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(loginRequest.getEmail(), loginRequest.getPassword()));
        SecurityContextHolder.getContext().setAuthentication(authentication);
        String jwt = jwtUtils.generateJwtToken(authentication);

        UserDetailsImpl userDetails = (UserDetailsImpl) authentication.getPrincipal();
        User loggedInUser = userDao.findByEmail(userDetails.getEmail());
        return ResponseEntity.ok(JwtResponse.builder()
                        .setAccessToken(jwt)
                        .setTokenType("Bearer")
                        .setId(loggedInUser.getId())
                        .setEmail(loggedInUser.getEmail())
                        .setFirstName(loggedInUser.getFirstName())
                        .setLastName(loggedInUser.getLastName())
                        .setRoles(loggedInUser.getRoles())
                        .build());
    }

    @PostMapping(ApiRoutes.REGISTER)
    @Operation(
            summary = "Performs user registration",
            requestBody = @io.swagger.v3.oas.annotations.parameters.RequestBody(
                    required = true,
                    content = @Content(
                        schema = @Schema(implementation = RegisterRequest.class)
                    )
            ),
            responses = {
                    @ApiResponse(
                            responseCode = "200",
                            description = "User successfully registered and logged in.",
                            content = @Content(
                                    schema = @Schema(implementation = RegistrationResponse.class)
                            )
                    ),
                    @ApiResponse(
                            responseCode = "409",
                            description = "User already exists with that email.",
                            content = @Content(
                                    schema = @Schema(implementation = ErrorResponse.class),
                                    examples = @ExampleObject(
                                            value =
                                                    "{"
                                                            + "\"timestamp\": \"25-02-2022 10:04:43\","
                                                            + "\"status\": 409,"
                                                            + "\"code\": \"CONFLICT\","
                                                            + "\"message\": \"User already exists with that email.\","
                                                            + "\"stacktrace\": null,"
                                                            + "\"data\": \"jDoe@email.com.\""
                                                            + "}")
                            )
                    )
            }
    )
    public ResponseEntity<?> registerUser(@RequestBody RegisterRequest registerRequest) {
        if (userDao.existsByEmail(registerRequest.getEmail())) {
            return new ResponseEntity<>(
                    new ErrorResponse<>(
                            HttpStatus.CONFLICT,
                            "User already exists with that email.",
                            null,
                            registerRequest.getEmail()
                    ),
                    HttpStatus.CONFLICT
            );
        }
        // Create new user's account
        User user = new User(
                registerRequest.getFirstName(),
                registerRequest.getLastName(),
                registerRequest.getEmail(),
                encoder.encode(registerRequest.getPassword()));
//        Set<String> strRoles = registerRequest.getRoles().stream().map(role -> role.getName().name())
//                .collect(Collectors.toSet());
        Set<Role> roles = new HashSet<>();
//        if (strRoles.size() == 0) {
            Role userRole = roleDao.findByName(RoleEnum.ROLE_USER)
                    .orElseThrow(() -> new NullPointerException("Role is not found."));
            roles.add(userRole);
//        } else {
//            strRoles.forEach(role -> {
//                switch (role) {
//                    case "admin":
//                        Role adminRole = roleDao.findByName(RoleEnum.ROLE_ADMIN)
//                                .orElseThrow(() -> new NullPointerException("Role is not found."));
//                        roles.add(adminRole);
//                        break;
//                    default:
//                        Role userRole = roleDao.findByName(RoleEnum.ROLE_USER)
//                                .orElseThrow(() -> new NullPointerException("Role is not found."));
//                        roles.add(userRole);
//                }
//            });
//        }
        user.setRoles(roles);
        userDao.save(user);

        RegistrationResponse res = RegistrationResponse.builder()
                .setId(user.getId())
                .setFirstName(user.getFirstName())
                .setLastName(user.getLastName())
                .setEmail(user.getEmail())
                .setRoles(user.getRoles())
                .build();
        return ResponseEntity.ok(res);
    }
}
