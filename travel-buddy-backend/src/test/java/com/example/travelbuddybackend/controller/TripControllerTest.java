package com.example.travelbuddybackend.controller;

import static org.assertj.core.api.Assertions.assertThat;

import com.example.travelbuddybackend.constants.Messages;
import com.example.travelbuddybackend.dao.TripDao;
import com.example.travelbuddybackend.model.Trip;
import com.example.travelbuddybackend.model.User;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.http.ResponseEntity;
import org.springframework.mock.web.MockHttpServletRequest;
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.junit.jupiter.api.Assertions.assertTrue;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
public class TripControllerTest {
    @InjectMocks
    private TripController tripController;

    @Mock
    private TripDao tripDao;

    private User user1;
    private Trip trip1;
    private List<Trip> trips;

    @BeforeEach
    public void init() {
        user1 = new User("John", "Doe", "jDoe@example.com", "password");
        User user2 = new User("Jane", "Doe", "janeDoe@example.com", "password");
        trip1 = new Trip.Builder()
                .setId(1)
                .setTitle("Trip 1")
                .setDescription("description")
                .setStartDate(LocalDate.of(2022, 1, 14))
                .setEndDate(LocalDate.of(2022, 2, 7))
                .setUser(user1)
                .build();
        Trip trip2 = new Trip.Builder()
                .setId(2)
                .setTitle("Trip 2")
                .setDescription("description")
                .setUniqueLink("https://google.com")
                .setStartDate(LocalDate.of(2022, 1, 31))
                .setEndDate(LocalDate.of(2022, 2, 18))
                .setUser(user2)
                .build();
        trips = new ArrayList<>();
        trips.add(trip1);
        trips.add(trip2);
    }

    @Test
    public void shouldGetAllTrips() {
        // given
        when(tripDao.findAll()).thenReturn(trips);

        // when
        List<Trip> result = tripController.getAllTrips();

        // then
        assertThat(result.size()).isEqualTo(2);
        assertThat(result.get(0).getTitle())
                .isEqualTo(trips.get(0).getTitle());
        assertThat(result.get(1).getTitle())
                .isEqualTo(trips.get(1).getTitle());
    }

    @Test
    public void shouldGetTripById() {
        // given
        MockHttpServletRequest request = new MockHttpServletRequest();
        RequestContextHolder.setRequestAttributes(new ServletRequestAttributes(request));

        when(tripDao.findById(trip1.getId()))
                .thenReturn(java.util.Optional.of(trip1));

        // when
        ResponseEntity<Trip> result = tripController.getTripById(trip1.getId());

        // then
        assertThat(result.equals(trip1));
        assertThat(result.getStatusCodeValue()).isEqualTo(200);
    }

    @Test
    public void shouldCreateTrip() {
        // given
        when(tripDao.save(trip1)).thenReturn(trip1);

        // when
        Trip result = tripController.createTrip(trip1);

        // then
        assertThat(result.getId()).isEqualTo(trip1.getId());
        assertThat(result.getTitle()).isEqualTo(trip1.getTitle());
    }

    @Test
    public void shouldThrowValidationErrorOnCreateTrip() {
        // given
        Throwable thrown = assertThrows(IllegalStateException.class, () -> {
            new Trip.Builder()
                    .setId(1)
                    .setDescription("description")
                    .setStartDate(LocalDate.of(2022, 3, 14))
                    .setEndDate(LocalDate.of(2022, 2, 7))
                    .setUser(user1)
                    .build();
        });

        // when
        String actualMessage = thrown.getMessage();

        // then
        assertTrue(actualMessage.contains(Messages.VALIDATION.NULL_TITLE));
        assertTrue(actualMessage.contains(Messages.VALIDATION.INVALID_START_DATE));
    }

    @Test
    public void shouldUpdateTrip() {
        // given
        MockHttpServletRequest request = new MockHttpServletRequest();
        RequestContextHolder.setRequestAttributes(new ServletRequestAttributes(request));
        Trip trip1Update = new Trip.Builder()
                .setTitle("Trip 1")
                .setDescription("description 1")
                .setStartDate(LocalDate.of(2022, 1, 14))
                .setEndDate(LocalDate.of(2022, 2, 7))
                .setUser(user1)
                .build();

        when(tripDao.existsById(trip1.getId()))
                .thenReturn(trip1.getId() == 1);
        when(tripDao.save(any(Trip.class))).thenReturn(trip1Update);

        // when
        ResponseEntity<Trip> result = tripController.updateTrip(trip1.getId(), trip1Update);

        // then
        assertThat(result.equals(trip1Update));
        assertThat(result.getStatusCodeValue()).isEqualTo(200);
    }

    @Test
    public void shouldDeleteTrip() {
        // given
        MockHttpServletRequest request = new MockHttpServletRequest();
        RequestContextHolder.setRequestAttributes(new ServletRequestAttributes(request));

        when(tripDao.findById(trip1.getId()))
                .thenReturn(java.util.Optional.of(trip1));

        // when
        ResponseEntity<Trip> result = tripController.deleteTrip(trip1.getId());

        // then
        assertThat(result.equals(trip1));
        assertThat(result.getStatusCodeValue()).isEqualTo(200);
    }
}

