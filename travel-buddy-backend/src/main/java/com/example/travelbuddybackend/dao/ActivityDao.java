package com.example.travelbuddybackend.dao;

import com.example.travelbuddybackend.model.Activity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ActivityDao extends JpaRepository<Activity, Long> {
}
