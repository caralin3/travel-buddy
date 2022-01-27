package com.example.travelbuddybackend.controller;

import static org.assertj.core.api.Assertions.assertThat;

import com.example.travelbuddybackend.constants.Messages;
import com.example.travelbuddybackend.dao.PortDao;
import com.example.travelbuddybackend.model.Cruise;
import com.example.travelbuddybackend.model.Port;
import com.example.travelbuddybackend.model.Trip;
import com.example.travelbuddybackend.model.User;
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
public class PortControllerTest {
    @InjectMocks
    private PortController portController;

    @Mock
    private PortDao portDao;

    private Trip trip1;
    private List<Port> ports;
    private Port port1;
    private Cruise cruise1;

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
        cruise1 = new Cruise.Builder()
                .setId(1)
                .setCruiseLine("Princess")
                .setCabinType(RoomType.DOUBLE)
                .setCabinNumber("10234")
                .setCost(4324.40)
                .setCurrency(Currency.getInstance("USD"))
                .setStartDate(LocalDate.of(2022, 5, 20))
                .setEndDate(LocalDate.of(2022, 5, 23))
                .setDepartureCity("Beacon")
                .setDepartureState(State.NEW_YORK.name())
                .setDepartureCountry("US")
                .setDestinationCity("Key West")
                .setDestinationState(State.FLORIDA.name())
                .setDestinationCountry("US")
                .setRoundTrip(false)
                .setShipName("Royal")
                .setTrip(trip1)
                .build();
        Cruise cruise2 = new Cruise.Builder()
                .setId(2)
                .setCruiseLine("Royal Caribbean")
                .setCabinType(RoomType.DOUBLE)
                .setCabinNumber("9234")
                .setCost(5247.40)
                .setCurrency(Currency.getInstance("USD"))
                .setStartDate(LocalDate.of(2022, 4, 20))
                .setEndDate(LocalDate.of(2022, 5, 3))
                .setDepartureCity("Fort Lauderdale")
                .setDepartureState(State.FLORIDA.name())
                .setDepartureCountry("US")
                .setRoundTrip(true)
                .setShipName("Allure")
                .setTrip(trip2)
                .build();
        port1 = new Port.Builder()
                .setId(1)
                .setArrival(LocalDateTime.of(2022, 3, 31, 8, 15))
                .setCity("Bar Harbor")
                .setCountry("US")
                .setDeparture(LocalDateTime.of(2022, 3, 31, 16, 00))
                .setDay(3)
                .setState(State.MAINE.name())
                .setCruise(cruise1)
                .build();
        Port port2 = new Port.Builder()
                .setId(2)
                .setArrival(LocalDateTime.of(2022, 4, 29, 7, 15))
                .setCity("Bar Harbor")
                .setCountry("US")
                .setDeparture(LocalDateTime.of(2022, 4, 29, 17, 30))
                .setDay(3)
                .setDescription("")
                .setState(State.MAINE.name())
                .setCruise(cruise2)
                .build();
        ports = new ArrayList<>();
        ports.add(port1);
        ports.add(port2);
    }

    @Test
    public void shouldGetAllPorts() {
        // given
        when(portDao.findAll()).thenReturn(ports);

        // when
        List<Port> result = portController.getAllPorts();

        // then
        assertThat(result.size()).isEqualTo(2);
        assertThat(result.get(0).getCity())
                .isEqualTo(ports.get(0).getCity());
        assertThat(result.get(1).getCity())
                .isEqualTo(ports.get(1).getCity());
    }

    @Test
    public void shouldGetPortById() {
        // given
        MockHttpServletRequest request = new MockHttpServletRequest();
        RequestContextHolder.setRequestAttributes(new ServletRequestAttributes(request));
        when(portDao.findById(port1.getId()))
                .thenReturn(java.util.Optional.of(port1));

        // when
        ResponseEntity<Port> result = portController.getPortById(port1.getId());

        // then
        assertThat(result.equals(port1));
        assertThat(result.getStatusCodeValue()).isEqualTo(200);
    }

    @Test
    public void shouldCreatePort() {
        // given
        when(portDao.save(port1)).thenReturn(port1);

        // when
        Port result = portController.createPort(port1);

        // then
        assertThat(result.getId()).isEqualTo(port1.getId());
        assertThat(result.getCity()).isEqualTo(port1.getCity());
    }

    @Test
    public void shouldThrowValidationErrorOnCreatePort() {
        // given
        Throwable thrown = assertThrows(IllegalStateException.class, () -> {
            new Port.Builder()
                    .setId(1)
                    .setArrival(LocalDateTime.of(2022, 3, 31, 8, 15))
                    .setDeparture(LocalDateTime.of(2022, 3, 31, 7, 00))
                    .setState(State.MAINE.name())
                    .setDescription("description")
                    .build();
        });

        // when
        String actualMessage = thrown.getMessage();

        // then
        assertTrue(actualMessage.contains(Messages.VALIDATION.NULL_DAY));
        assertTrue(actualMessage.contains(Messages.VALIDATION.NULL_CITY));
        assertTrue(actualMessage.contains(Messages.VALIDATION.NULL_CRUISE));
        assertTrue(actualMessage.contains(Messages.VALIDATION.INVALID_ARRIVAL));
    }

    @Test
    public void shouldUpdatePort() {
        // given
        MockHttpServletRequest request = new MockHttpServletRequest();
        RequestContextHolder.setRequestAttributes(new ServletRequestAttributes(request));

        Port port1Update = new Port.Builder()
                .setArrival(LocalDateTime.of(2022, 3, 31, 8, 15))
                .setCity("Bar Harbor")
                .setCountry("US")
                .setDeparture(LocalDateTime.of(2022, 3, 31, 16, 00))
                .setDay(5)
                .setState(State.MAINE.name())
                .setCruise(cruise1)
                .build();

        when(portDao.existsById(port1.getId()))
                .thenReturn(port1.getId() == 1);
        when(portDao.save(any(Port.class))).thenReturn(port1Update);

        // when
        ResponseEntity<Port> result = portController.updatePort(port1.getId(), port1Update);

        // then
        assertThat(result.equals(port1Update));
        assertThat(result.getStatusCodeValue()).isEqualTo(200);
    }

    @Test
    public void shouldDeletePort() {
        // given
        MockHttpServletRequest request = new MockHttpServletRequest();
        RequestContextHolder.setRequestAttributes(new ServletRequestAttributes(request));

        when(portDao.findById(port1.getId()))
                .thenReturn(java.util.Optional.of(port1));

        // when
        ResponseEntity<Port> result = portController.deletePort(port1.getId());

        // then
        assertThat(result.equals(port1));
        assertThat(result.getStatusCodeValue()).isEqualTo(200);
    }
}

