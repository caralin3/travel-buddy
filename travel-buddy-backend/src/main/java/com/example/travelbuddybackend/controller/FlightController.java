package com.example.travelbuddybackend.controller;

import com.example.travelbuddybackend.api.ApiRoutes;
import com.example.travelbuddybackend.dao.FlightDao;
import com.example.travelbuddybackend.exception.ResourceNotFoundException;
import com.example.travelbuddybackend.model.Flight;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = ApiRoutes.CROSS_ORIGIN_URL)
@RestController
@RequestMapping(ApiRoutes.API_VERSION)
public class FlightController {
    @Autowired
    private FlightDao flightDao;

    // get all flights
    @GetMapping(ApiRoutes.FLIGHTS)
    public List<Flight> getAllFlights() {
        return flightDao.findAll();
    }

    // create flight
    @PostMapping(ApiRoutes.FLIGHTS)
    public Flight createFlight(@RequestBody Flight flight) {
        return flightDao.save(flight);
    }

    // get flight by id
    @GetMapping(ApiRoutes.FLIGHTS_BY_ID)
    public ResponseEntity<Flight> getFlightById(@PathVariable Long id) {
        Flight flight = flightDao.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException(
                        "Flight does not exist with id: " + id
                ));
        return ResponseEntity.ok(flight);
    }

    // update flight
    @PutMapping(ApiRoutes.FLIGHTS_BY_ID)
    public ResponseEntity<Flight> updateFlight(@PathVariable Long id, @RequestBody Flight flightDetails) {
        if (flightDao.existsById(id)) {
            Flight flight = new Flight.Builder()
                    .setFlightNumber(flightDetails.getFlightNumber())
                    .setAirline(flightDetails.getAirline())
                    .setAirportCode(flightDetails.getAirportCode())
                    .setCost(flightDetails.getCost())
                    .setGate(flightDetails.getGate())
                    .setTerminal(flightDetails.getTerminal())
                    .setCurrency(flightDetails.getCurrency())
                    .setSeats(flightDetails.getSeats())
                    .setScheduledDate(flightDetails.getScheduledDate())
                    .setType(flightDetails.getType())
                    .setFlightClass(flightDetails.getFlightClass())
                    .setTrip(flightDetails.getTrip())
                    .build();

            Flight updatedFlight = flightDao.save(flight);
            return ResponseEntity.ok(updatedFlight);
        } else {
            throw new ResourceNotFoundException(
                    "Flight does not exist with id: " + id
            );
        }
    }

    @DeleteMapping(ApiRoutes.FLIGHTS_BY_ID)
    public ResponseEntity<Flight> deleteFlight(@PathVariable Long id) {
        Flight flight = flightDao.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException(
                        "Flight does not exist with id: " + id
                ));
        flightDao.delete(flight);
        return ResponseEntity.ok(flight);
    }
}
