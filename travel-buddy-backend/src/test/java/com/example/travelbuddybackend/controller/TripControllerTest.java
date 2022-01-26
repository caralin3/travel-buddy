package com.example.travelbuddybackend.controller;

import static org.assertj.core.api.Assertions.assertThat;
import com.example.travelbuddybackend.dao.TripDao;
import com.example.travelbuddybackend.model.Trip;
import org.hibernate.type.CurrencyType;
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
import java.util.Currency;
import java.util.List;

import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
public class TripControllerTest {
    @InjectMocks
    private TripController tripController;

    @Mock
    private TripDao tripDao;

    @Test
    public void testGetTrips() {
        // given
        Trip trip1 = new Trip(
                1,
                "Trip 1",
                LocalDate.of(2022, 1, 14),
                LocalDate.of(2022, 2, 7),
                Currency.getInstance("USD"),
                0.00,
                "",
                ""

        );
        Trip trip2 = new Trip(
                2,
                "Trip 2",
                LocalDate.of(2022, 1, 31),
                LocalDate.of(2022, 2, 18),
                Currency.getInstance("USD"),
                0.00,
                "",
                ""

        );
        List<Trip> trips = new ArrayList<>();
        trips.add(trip1);
        trips.add(trip2);

        when(tripDao.findAll()).thenReturn(trips);

        // when
        List<Trip> result = tripController.getAllTrips();

        // then
        assertThat(result.size()).isEqualTo(2);
        assertThat(result.get(0).getTitle())
                .isEqualTo(trip1.getTitle());
        assertThat(result.get(1).getTitle())
                .isEqualTo(trip2.getTitle());
    }

    @Test
    public void testGetTripById() {
        // given
        MockHttpServletRequest request = new MockHttpServletRequest();
        RequestContextHolder.setRequestAttributes(new ServletRequestAttributes(request));
        Trip trip1 = new Trip(
                1,
                "Trip 1",
                LocalDate.of(2022, 1, 14),
                LocalDate.of(2022, 2, 7),
                Currency.getInstance("USD"),
                0.00,
                "",
                ""

        );

        when(tripDao.findById(trip1.getId()))
                .thenReturn(java.util.Optional.of(trip1));

        // when
        ResponseEntity<Trip> result = tripController.getTripById(trip1.getId());

        // then
        assertThat(result.equals(trip1));
        assertThat(result.getStatusCodeValue()).isEqualTo(200);
    }

    @Test
    public void testCreateTrip() {
        // given
        Trip trip1 = new Trip(
                1,
                "Trip 1",
                LocalDate.of(2022, 1, 14),
                LocalDate.of(2022, 2, 7),
                Currency.getInstance("USD"),
                0.00,
                "",
                ""

        );
        when(tripDao.save(trip1)).thenReturn(trip1);

        // when
        Trip result = tripController.createTrip(trip1);

        // then
        assertThat(result.getId()).isEqualTo(trip1.getId());
        assertThat(result.getTitle()).isEqualTo(trip1.getTitle());
    }

    @Test
    public void testUpdateTrip() {
        // given
        MockHttpServletRequest request = new MockHttpServletRequest();
        RequestContextHolder.setRequestAttributes(new ServletRequestAttributes(request));
        Trip trip1 = new Trip(
                1,
                "Trip 1",
                LocalDate.of(2022, 1, 14),
                LocalDate.of(2022, 2, 7),
                Currency.getInstance("USD"),
                0.00,
                "",
                ""

        );
        Trip trip1Update = new Trip(
                1,
                "Trip 1 Updated",
                LocalDate.of(2022, 1, 31),
                LocalDate.of(2022, 2, 18),
                Currency.getInstance("USD"),
                0.00,
                "",
                ""

        );

        when(tripDao.findById(trip1.getId()))
                .thenReturn(java.util.Optional.of(trip1));
        when(tripDao.save(trip1)).thenReturn(trip1Update);

        // when
        ResponseEntity<Trip> result = tripController.updateTrip(trip1.getId(), trip1Update);

        // then
        assertThat(result.equals(trip1Update));
        assertThat(result.getStatusCodeValue()).isEqualTo(200);
    }

    @Test
    public void testDeleteTrip() {
        // given
        MockHttpServletRequest request = new MockHttpServletRequest();
        RequestContextHolder.setRequestAttributes(new ServletRequestAttributes(request));
        Trip trip1 = new Trip(
                1,
                "Trip 1",
                LocalDate.of(2022, 1, 14),
                LocalDate.of(2022, 2, 7),
                Currency.getInstance("USD"),
                0.00,
                "",
                ""

        );

        when(tripDao.findById(trip1.getId()))
                .thenReturn(java.util.Optional.of(trip1));

        // when
        ResponseEntity<Trip> result = tripController.deleteTrip(trip1.getId());

        // then
        assertThat(result.equals(trip1));
        assertThat(result.getStatusCodeValue()).isEqualTo(200);
    }
}

