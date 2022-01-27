package com.example.travelbuddybackend.dao;

import com.example.travelbuddybackend.model.Port;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PortDao extends JpaRepository<Port, Long> {
}
