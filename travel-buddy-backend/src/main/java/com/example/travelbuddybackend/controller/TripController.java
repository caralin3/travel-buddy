package com.example.travelbuddybackend.controller;

import com.example.travelbuddybackend.constants.ApiRoutes;
import com.example.travelbuddybackend.dao.TripDao;
import com.example.travelbuddybackend.exception.ResourceNotFoundException;
import com.example.travelbuddybackend.model.Trip;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = ApiRoutes.CROSS_ORIGIN_URL)
@RestController
@RequestMapping(ApiRoutes.API_VERSION)
public class TripController {
    @Autowired
    private TripDao tripDao;

    // get all trips
    @GetMapping(ApiRoutes.TRIPS)
    public List<Trip> getAllTrips() {
        return tripDao.findAll();
    }

    // create trip
    @PostMapping(ApiRoutes.TRIPS)
    public Trip createTrip(@RequestBody Trip trip) {
        return tripDao.save(trip);
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
}
