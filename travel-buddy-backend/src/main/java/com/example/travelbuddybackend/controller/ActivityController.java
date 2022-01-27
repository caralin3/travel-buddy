package com.example.travelbuddybackend.controller;

import com.example.travelbuddybackend.constants.ApiRoutes;
import com.example.travelbuddybackend.dao.ActivityDao;
import com.example.travelbuddybackend.exception.ResourceNotFoundException;
import com.example.travelbuddybackend.model.Activity;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = ApiRoutes.CROSS_ORIGIN_URL)
@RestController
@RequestMapping(ApiRoutes.API_VERSION)
public class ActivityController {
    @Autowired
    private ActivityDao activityDao;

    // get all activities
    @GetMapping(ApiRoutes.ACTIVITIES)
    public List<Activity> getAllActivities() {
        return activityDao.findAll();
    }

    // create activity
    @PostMapping(ApiRoutes.ACTIVITIES)
    public Activity createActivity(@RequestBody Activity activity) {
        return activityDao.save(activity);
    }

    // get activity by id
    @GetMapping(ApiRoutes.ACTIVITIES_BY_ID)
    public ResponseEntity<Activity> getActivityById(@PathVariable Long id) {
        Activity activity = activityDao.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException(
                        "Activity does not exist with id: " + id
                ));
        return ResponseEntity.ok(activity);
    }

    // update activity
    @PutMapping(ApiRoutes.ACTIVITIES_BY_ID)
    public ResponseEntity<Activity> updateActivity(@PathVariable Long id, @RequestBody Activity activityDetails) {
        if (activityDao.existsById(id)) {
            Activity activity = new Activity.Builder()
                    .setAddressLine1(activityDetails.getAddressLine1())
                    .setAddressLine2(activityDetails.getAddressLine2())
                    .setCost(activityDetails.getCost())
                    .setCity(activityDetails.getCity())
                    .setCurrency(activityDetails.getCurrency())
                    .setTitle(activityDetails.getTitle())
                    .setStartDate(activityDetails.getStartDate())
                    .setEndDate(activityDetails.getEndDate())
                    .setCountry(activityDetails.getCountry())
                    .setPostalCode(activityDetails.getPostalCode())
                    .setCompany(activityDetails.getCompany())
                    .setState(activityDetails.getState())
                    .setDescription(activityDetails.getDescription())
                    .setPort(activityDetails.getPort())
                    .setCruise(activityDetails.getCruise())
                    .setTrip(activityDetails.getTrip())
                    .build();

            Activity updatedActivity = activityDao.save(activity);
            return ResponseEntity.ok(updatedActivity);
        } else {
            throw new ResourceNotFoundException(
                    "Activity does not exist with id: " + id
            );
        }
    }

    @DeleteMapping(ApiRoutes.ACTIVITIES_BY_ID)
    public ResponseEntity<Activity> deleteActivity(@PathVariable Long id) {
        Activity activity = activityDao.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException(
                        "Activity does not exist with id: " + id
                ));
        activityDao.delete(activity);
        return ResponseEntity.ok(activity);
    }
}
