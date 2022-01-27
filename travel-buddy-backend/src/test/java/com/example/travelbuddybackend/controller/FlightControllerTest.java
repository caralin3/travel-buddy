package com.example.travelbuddybackend.controller;

import static org.assertj.core.api.Assertions.assertThat;

import com.example.travelbuddybackend.constants.Messages;
import com.example.travelbuddybackend.dao.FlightDao;
import com.example.travelbuddybackend.model.Flight;
import com.example.travelbuddybackend.model.Trip;
import com.example.travelbuddybackend.model.User;
import com.example.travelbuddybackend.model.type.FlightClass;
import com.example.travelbuddybackend.model.type.FlightType;
import com.example.travelbuddybackend.model.type.RoomType;
import com.example.travelbuddybackend.model.type.State;
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
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Currency;
import java.util.List;

import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.junit.jupiter.api.Assertions.assertTrue;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
public class FlightControllerTest {
    @InjectMocks
    private FlightController flightController;

    @Mock
    private FlightDao flightDao;

    private Trip trip1;
    private List<Flight> flights;
    private Flight flight1;

    @BeforeEach
    public void init() {
        User user1 = new User(1, "John", "Doe", "jDoe@example.com");
        User user2 = new User(2, "Jane", "Doe", "janeDoe@example.com");
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
        flight1 = new Flight.Builder()
                .setId(1)
                .setFlightNumber("1234")
                .setAirline("Delta")
                .setAirportCode("EWR")
                .setCost(230.67)
                .setCurrency(Currency.getInstance("USD"))
                .setScheduledDate(LocalDateTime.of(2022, 4, 6, 3, 30))
                .setType(FlightType.DEPARTURE)
                .setTrip(trip1)
                .setFlightClass(FlightClass.FIRST)
                .build();
        Flight flight2 = new Flight.Builder()
                .setId(2)
                .setFlightNumber("7346")
                .setAirline("JetBlue")
                .setAirportCode("JFK")
                .setCost(130.43)
                .setCurrency(Currency.getInstance("USD"))
                .setGate("100")
                .setScheduledDate(LocalDateTime.of(2022, 6, 23, 5, 00))
                .setType(FlightType.ARRIVAL)
                .setFlightClass(FlightClass.ECONOMY)
                .setTrip(trip2)
                .build();
        flights = new ArrayList<>();
        flights.add(flight1);
        flights.add(flight2);
    }

    @Test
    public void shouldGetAllFlights() {
        // given
        when(flightDao.findAll()).thenReturn(flights);

        // when
        List<Flight> result = flightController.getAllFlights();

        // then
        assertThat(result.size()).isEqualTo(2);
        assertThat(result.get(0).getFlightNumber())
                .isEqualTo(flights.get(0).getFlightNumber());
        assertThat(result.get(1).getFlightNumber())
                .isEqualTo(flights.get(1).getFlightNumber());
    }

    @Test
    public void shouldGetFlightById() {
        // given
        MockHttpServletRequest request = new MockHttpServletRequest();
        RequestContextHolder.setRequestAttributes(new ServletRequestAttributes(request));
        when(flightDao.findById(flight1.getId()))
                .thenReturn(java.util.Optional.of(flight1));

        // when
        ResponseEntity<Flight> result = flightController.getFlightById(flight1.getId());

        // then
        assertThat(result.equals(flight1));
        assertThat(result.getStatusCodeValue()).isEqualTo(200);
    }

    @Test
    public void shouldCreateFlight() {
        // given
        when(flightDao.save(flight1)).thenReturn(flight1);

        // when
        Flight result = flightController.createFlight(flight1);

        // then
        assertThat(result.getId()).isEqualTo(flight1.getId());
        assertThat(result.getFlightNumber()).isEqualTo(flight1.getFlightNumber());
    }

    @Test
    public void shouldThrowValidationErrorOnCreateFlight() {
        // given
        Throwable thrown = assertThrows(IllegalStateException.class, () -> {
            new Flight.Builder()
                    .setId(1)
                    .setAirline("Delta")
                    .setAirportCode("EWR")
                    .setCost(230.67)
                    .setTrip(trip1)
                    .build();
        });

        // when
        String actualMessage = thrown.getMessage();

        // then
        assertTrue(actualMessage.contains(Messages.VALIDATION.NULL_FLIGHT_NUMBER));
        assertTrue(actualMessage.contains(Messages.VALIDATION.NULL_CURRENCY));
        assertTrue(actualMessage.contains(Messages.VALIDATION.NULL_FLIGHT_CLASS));
        assertTrue(actualMessage.contains(Messages.VALIDATION.NULL_SCHEDULED_DATE));
    }

    @Test
    public void shouldUpdateFlight() {
        // given
        MockHttpServletRequest request = new MockHttpServletRequest();
        RequestContextHolder.setRequestAttributes(new ServletRequestAttributes(request));

        Flight flight1Update = new Flight.Builder()
                .setFlightNumber("1234")
                .setAirline("Delta")
                .setAirportCode("EWR")
                .setCost(230.67)
                .setCurrency(Currency.getInstance("USD"))
                .setGate("C23")
                .setScheduledDate(LocalDateTime.of(2022, 4, 6, 3, 30))
                .setSeats("12A, 12B")
                .setTerminal("1")
                .setType(FlightType.DEPARTURE)
                .setTrip(trip1)
                .setFlightClass(FlightClass.ECONOMY)
                .build();

        when(flightDao.existsById(flight1.getId()))
                .thenReturn(flight1.getId() == 1);
        when(flightDao.save(any(Flight.class))).thenReturn(flight1Update);

        // when
        ResponseEntity<Flight> result = flightController.updateFlight(flight1.getId(), flight1Update);

        // then
        assertThat(result.equals(flight1Update));
        assertThat(result.getStatusCodeValue()).isEqualTo(200);
    }

    @Test
    public void shouldDeleteFlight() {
        // given
        MockHttpServletRequest request = new MockHttpServletRequest();
        RequestContextHolder.setRequestAttributes(new ServletRequestAttributes(request));

        when(flightDao.findById(flight1.getId()))
                .thenReturn(java.util.Optional.of(flight1));

        // when
        ResponseEntity<Flight> result = flightController.deleteFlight(flight1.getId());

        // then
        assertThat(result.equals(flight1));
        assertThat(result.getStatusCodeValue()).isEqualTo(200);
    }
}

