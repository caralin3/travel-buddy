package com.example.travelbuddybackend.dao;

import com.example.travelbuddybackend.model.Role;
import com.example.travelbuddybackend.model.type.RoleEnum;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface RoleDao extends JpaRepository<Role, Long> {
    Optional<Role> findByName(RoleEnum name);
}
