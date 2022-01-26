package com.example.travelbuddybackend.dao;

import com.example.travelbuddybackend.model.Cruise;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CruiseDao extends JpaRepository<Cruise, Long> {
}
