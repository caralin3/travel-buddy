package com.example.travelbuddybackend.controller;

import com.example.travelbuddybackend.constants.ApiRoutes;
import com.example.travelbuddybackend.dao.UserDao;
import com.example.travelbuddybackend.exception.ResourceNotFoundException;
import com.example.travelbuddybackend.model.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = ApiRoutes.CROSS_ORIGIN_URL)
@RestController
@RequestMapping(ApiRoutes.API_VERSION)
public class UserController {
    @Autowired
    private UserDao userDao;

    // get all users
    @GetMapping(ApiRoutes.USERS)
    public List<User> getAllUsers() {
        return userDao.findAll();
    }

    // create user
    @PostMapping(ApiRoutes.USERS)
    public User createUser(@RequestBody User user) {
        return userDao.save(user);
    }

    // get user by id
    @GetMapping(ApiRoutes.USERS_BY_ID)
    public ResponseEntity<User> getUserById(@PathVariable Long id) {
        User user = userDao.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException(
                        "User does not exist with id: " + id
                ));
        return ResponseEntity.ok(user);
    }

    // update user
    @PutMapping(ApiRoutes.USERS_BY_ID)
    public ResponseEntity<User> updateUser(@PathVariable Long id, @RequestBody User userDetails) {
        User user = userDao.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException(
                        "User does not exist with id: " + id
                ));
        user.setFirstName(userDetails.getFirstName());
        user.setLastName(userDetails.getLastName());
        user.setEmail(userDetails.getEmail());

        User updatedUser = userDao.save(user);

        return ResponseEntity.ok(updatedUser);
    }

    @DeleteMapping(ApiRoutes.USERS_BY_ID)
    public ResponseEntity<User> deleteUser(@PathVariable Long id) {
        User user = userDao.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException(
                        "User does not exist with id: " + id
                ));
        userDao.delete(user);
        return ResponseEntity.ok(user);
    }
}
