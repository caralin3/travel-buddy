package com.example.travelbuddybackend.dao;

import com.example.travelbuddybackend.model.Trip;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface TripDao extends JpaRepository<Trip, Long> {
}
