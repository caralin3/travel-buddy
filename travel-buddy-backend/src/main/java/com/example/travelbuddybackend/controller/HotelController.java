package com.example.travelbuddybackend.controller;

import com.example.travelbuddybackend.constants.ApiRoutes;
import com.example.travelbuddybackend.dao.HotelDao;
import com.example.travelbuddybackend.exception.ResourceNotFoundException;
import com.example.travelbuddybackend.model.Hotel;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = ApiRoutes.CROSS_ORIGIN_URL)
@RestController
@RequestMapping(ApiRoutes.API_VERSION)
@Tag(
        name = "Hotel",
        description = "Hotel operations"
)
public class HotelController {
    @Autowired
    private HotelDao hotelDao;

    // get all hotels
    @GetMapping(ApiRoutes.HOTELS)
    public List<Hotel> getAllHotels() {
        return hotelDao.findAll();
    }

    // create hotel
    @PostMapping(ApiRoutes.HOTELS)
    public Hotel createHotel(@RequestBody Hotel hotel) {
        return hotelDao.save(hotel);
    }

    // get hotel by id
    @GetMapping(ApiRoutes.HOTELS_BY_ID)
    public ResponseEntity<Hotel> getHotelById(@PathVariable Long id) {
        Hotel hotel = hotelDao.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException(
                        "Hotel does not exist with id: " + id
                ));
        return ResponseEntity.ok(hotel);
    }

    // update hotel
    @PutMapping(ApiRoutes.HOTELS_BY_ID)
    public ResponseEntity<Hotel> updateHotel(@PathVariable Long id, @RequestBody Hotel hotelDetails) {
        if (hotelDao.existsById(id)) {
            Hotel hotel = new Hotel.Builder()
                    .setAddressLine1(hotelDetails.getAddressLine1())
                    .setAddressLine2(hotelDetails.getAddressLine2())
                    .setCost(hotelDetails.getCost())
                    .setCity(hotelDetails.getCity())
                    .setCurrency(hotelDetails.getCurrency())
                    .setName(hotelDetails.getName())
                    .setCheckInDate(hotelDetails.getCheckInDate())
                    .setCheckOutDate(hotelDetails.getCheckOutDate())
                    .setCountry(hotelDetails.getCountry())
                    .setPostalCode(hotelDetails.getPostalCode())
                    .setRoomCount(hotelDetails.getRoomCount())
                    .setState(hotelDetails.getState())
                    .setRoomType(hotelDetails.getRoomType())
                    .setDescription(hotelDetails.getDescription())
                    .setTrip(hotelDetails.getTrip())
                    .build();

            Hotel updatedHotel = hotelDao.save(hotel);
            return ResponseEntity.ok(updatedHotel);
        } else {
            throw new ResourceNotFoundException(
                    "Hotel does not exist with id: " + id
            );
        }
    }

    @DeleteMapping(ApiRoutes.HOTELS_BY_ID)
    public ResponseEntity<Hotel> deleteHotel(@PathVariable Long id) {
        Hotel hotel = hotelDao.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException(
                        "Hotel does not exist with id: " + id
                ));
        hotelDao.delete(hotel);
        return ResponseEntity.ok(hotel);
    }
}
