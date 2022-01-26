package com.example.travelbuddybackend.dao;

import com.example.travelbuddybackend.model.Hotel;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface HotelDao extends JpaRepository<Hotel, Long> {
}
