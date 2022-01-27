package com.example.travelbuddybackend.controller;

import com.example.travelbuddybackend.constants.ApiRoutes;
import com.example.travelbuddybackend.dao.PortDao;
import com.example.travelbuddybackend.exception.ResourceNotFoundException;
import com.example.travelbuddybackend.model.Port;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = ApiRoutes.CROSS_ORIGIN_URL)
@RestController
@RequestMapping(ApiRoutes.API_VERSION)
public class PortController {
    @Autowired
    private PortDao portDao;

    // get all ports
    @GetMapping(ApiRoutes.PORTS)
    public List<Port> getAllPorts() {
        return portDao.findAll();
    }

    // create port
    @PostMapping(ApiRoutes.PORTS)
    public Port createPort(@RequestBody Port port) {
        return portDao.save(port);
    }

    // get port by id
    @GetMapping(ApiRoutes.PORTS_BY_ID)
    public ResponseEntity<Port> getPortById(@PathVariable Long id) {
        Port port = portDao.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException(
                        "Port does not exist with id: " + id
                ));
        return ResponseEntity.ok(port);
    }

    // update port
    @PutMapping(ApiRoutes.PORTS_BY_ID)
    public ResponseEntity<Port> updatePort(@PathVariable Long id, @RequestBody Port portDetails) {
        if (portDao.existsById(id)) {
            Port port = new Port.Builder()
                    .setArrival(portDetails.getArrival())
                    .setCity(portDetails.getCity())
                    .setCountry(portDetails.getCountry())
                    .setCruise(portDetails.getCruise())
                    .setDeparture(portDetails.getDeparture())
                    .setDay(portDetails.getDay())
                    .setDescription(portDetails.getDescription())
                    .setState(portDetails.getState())
                    .build();

            Port updatedPort = portDao.save(port);
            return ResponseEntity.ok(updatedPort);
        } else {
            throw new ResourceNotFoundException(
                    "Port does not exist with id: " + id
            );
        }
    }

    @DeleteMapping(ApiRoutes.PORTS_BY_ID)
    public ResponseEntity<Port> deletePort(@PathVariable Long id) {
        Port port = portDao.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException(
                        "Port does not exist with id: " + id
                ));
        portDao.delete(port);
        return ResponseEntity.ok(port);
    }
}
