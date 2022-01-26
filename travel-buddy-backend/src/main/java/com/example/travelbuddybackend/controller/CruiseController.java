package com.example.travelbuddybackend.controller;

import com.example.travelbuddybackend.api.ApiRoutes;
import com.example.travelbuddybackend.dao.CruiseDao;
import com.example.travelbuddybackend.exception.ResourceNotFoundException;
import com.example.travelbuddybackend.model.Cruise;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = ApiRoutes.CROSS_ORIGIN_URL)
@RestController
@RequestMapping(ApiRoutes.API_VERSION)
public class CruiseController {
    @Autowired
    private CruiseDao cruiseDao;

    // get all cruises
    @GetMapping(ApiRoutes.CRUISES)
    public List<Cruise> getAllCruises() {
        return cruiseDao.findAll();
    }

    // create cruise
    @PostMapping(ApiRoutes.CRUISES)
    public Cruise createCruise(@RequestBody Cruise cruise) {
        return cruiseDao.save(cruise);
    }

    // get cruise by id
    @GetMapping(ApiRoutes.CRUISES_BY_ID)
    public ResponseEntity<Cruise> getCruiseById(@PathVariable Long id) {
        Cruise cruise = cruiseDao.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException(
                        "Cruise does not exist with id: " + id
                ));
        return ResponseEntity.ok(cruise);
    }

    // update cruise
    @PutMapping(ApiRoutes.CRUISES_BY_ID)
    public ResponseEntity<Cruise> updateCruise(@PathVariable Long id, @RequestBody Cruise cruiseDetails) {
        if (cruiseDao.existsById(id)) {
            Cruise cruise = new Cruise.Builder()
                    .setCruiseLine(cruiseDetails.getCruiseLine())
                    .setCabinType(cruiseDetails.getCabinType())
                    .setCabinNumber(cruiseDetails.getCabinNumber())
                    .setCost(cruiseDetails.getCost())
                    .setCurrency(cruiseDetails.getCurrency())
                    .setStartDate(cruiseDetails.getStartDate())
                    .setEndDate(cruiseDetails.getEndDate())
                    .setDepartureCity(cruiseDetails.getDepartureCity())
                    .setDepartureState(cruiseDetails.getDepartureState())
                    .setDepartureCountry(cruiseDetails.getDepartureCountry())
                    .setDestinationCity(cruiseDetails.getDestinationCity())
                    .setDestinationState(cruiseDetails.getDestinationState())
                    .setDestinationCountry(cruiseDetails.getDestinationCountry())
                    .setRoundTrip(cruiseDetails.isRoundTrip())
                    .setShipName(cruiseDetails.getShipName())
                    .setTrip(cruiseDetails.getTrip())
                    .build();

            Cruise updatedCruise = cruiseDao.save(cruise);
            return ResponseEntity.ok(updatedCruise);
        } else {
            throw new ResourceNotFoundException(
                    "Cruise does not exist with id: " + id
            );
        }
    }

    @DeleteMapping(ApiRoutes.CRUISES_BY_ID)
    public ResponseEntity<Cruise> deleteCruise(@PathVariable Long id) {
        Cruise cruise = cruiseDao.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException(
                        "Cruise does not exist with id: " + id
                ));
        cruiseDao.delete(cruise);
        return ResponseEntity.ok(cruise);
    }
}
