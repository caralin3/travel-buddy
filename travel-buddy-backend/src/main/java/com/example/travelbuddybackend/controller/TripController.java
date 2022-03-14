package com.example.travelbuddybackend.controller;

import com.example.travelbuddybackend.api.model.UserDetails;
import com.example.travelbuddybackend.api.request.CreateTripRequest;
import com.example.travelbuddybackend.api.response.ErrorResponse;
import com.example.travelbuddybackend.api.response.TripResponse;
import com.example.travelbuddybackend.constants.ApiRoutes;
import com.example.travelbuddybackend.dao.TripDao;
import com.example.travelbuddybackend.dao.UserDao;
import com.example.travelbuddybackend.exception.ResourceNotFoundException;
import com.example.travelbuddybackend.model.Trip;
import com.example.travelbuddybackend.model.User;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.ExampleObject;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = ApiRoutes.CROSS_ORIGIN_URL)
@RestController
@RequestMapping(
        value = ApiRoutes.API_VERSION,
        consumes = MediaType.APPLICATION_JSON_VALUE,
        produces = MediaType.APPLICATION_JSON_VALUE
)
@Tag(
        name = "Trip",
        description = "Trip operations"
)
public class TripController {
    @Autowired
    private TripDao tripDao;

    @Autowired
    UserDao userDao;

    // get all trips
    @GetMapping(ApiRoutes.TRIPS)
    public List<Trip> getAllTrips() {
        return tripDao.findAll();
    }

    // create trip
    @PostMapping(ApiRoutes.TRIPS)
    @Operation(
            summary = "Create a trip",
            requestBody = @io.swagger.v3.oas.annotations.parameters.RequestBody(
                    required = true,
                    content = @Content(
                            schema = @Schema(implementation = CreateTripRequest.class)
                    )
            ),
            responses = {
                    @ApiResponse(
                            responseCode = "200",
                            description = "Trip successfully created.",
                            content = @Content(
                                    schema = @Schema(implementation = TripResponse.class)
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
    public ResponseEntity<TripResponse> createTrip(@RequestBody CreateTripRequest createTripRequest) {
        User user = userDao.findById(createTripRequest.getUserId())
                .orElseThrow(() -> new ResourceNotFoundException(
                        "User does not exist with id: " + createTripRequest.getUserId()
                ));
        Trip trip = new Trip.Builder()
                .setTitle(createTripRequest.getTitle())
                .setDescription(createTripRequest.getDescription())
                .setStartDate(createTripRequest.getStartDate())
                .setEndDate(createTripRequest.getEndDate())
                .setUniqueLink(createTripRequest.getUniqueLink())
                .setUser(user)
                .build();
        tripDao.save(trip);

        TripResponse res = createTripResponse(trip, user);
        return ResponseEntity.ok(res);
    }

    // get trip by id
    @GetMapping(ApiRoutes.TRIPS_BY_ID)
    public ResponseEntity<Trip> getTripById(@PathVariable Long id) {
        Trip trip = tripDao.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException(
                        "Trip does not exist with id: " + id
                ));
        return ResponseEntity.ok(trip);
    }

    // update trip
    @PutMapping(ApiRoutes.TRIPS_BY_ID)
    public ResponseEntity<Trip> updateTrip(@PathVariable Long id, @RequestBody Trip tripDetails) {
        if (tripDao.existsById(id)) {
            Trip trip = new Trip.Builder()
                    .setTitle(tripDetails.getTitle())
                    .setDescription(tripDetails.getDescription())
                    .setStartDate(tripDetails.getStartDate())
                    .setEndDate(tripDetails.getEndDate())
                    .setUniqueLink(tripDetails.getUniqueLink())
                    .setUser(tripDetails.getUser())
                    .build();

        Trip updatedTrip = tripDao.save(trip);

        return ResponseEntity.ok(updatedTrip);
        } else {
            throw new ResourceNotFoundException(
                    "Trip does not exist with id: " + id
            );
        }
    }

    @DeleteMapping(ApiRoutes.TRIPS_BY_ID)
    public ResponseEntity<Trip> deleteTrip(@PathVariable Long id) {
        Trip trip = tripDao.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException(
                        "Trip does not exist with id: " + id
                ));
        tripDao.delete(trip);
        return ResponseEntity.ok(trip);
    }

    private UserDetails createUserDetails(User user) {
        return UserDetails.builder()
                .setId(user.getId())
                .setEmail(user.getEmail())
                .setFirstName(user.getFirstName())
                .setLastName(user.getLastName())
                .setRoles(user.getRoles())
                .build();
    }

    private TripResponse createTripResponse(Trip trip, User user) {
        UserDetails userDetails = createUserDetails(user);
        return TripResponse.builder()
                .setId(trip.getId())
                .setTitle(trip.getTitle())
                .setDescription(trip.getDescription())
                .setStartDate(trip.getStartDate())
                .setEndDate(trip.getEndDate())
                .setUniqueLink(trip.getUniqueLink())
                .setUser(userDetails)
                .build();
    }

    protected CreateTripRequest createTripRequest(Trip trip, long userId) {
        return CreateTripRequest.builder()
                .setTitle(trip.getTitle())
                .setDescription(trip.getDescription())
                .setStartDate(trip.getStartDate())
                .setEndDate(trip.getEndDate())
                .setUniqueLink(trip.getUniqueLink())
                .setUserId(userId)
                .build();
    }
}
