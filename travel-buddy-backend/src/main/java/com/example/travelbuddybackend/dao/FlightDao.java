package com.example.travelbuddybackend.dao;

import com.example.travelbuddybackend.model.Flight;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface FlightDao extends JpaRepository<Flight, Long> {
}
