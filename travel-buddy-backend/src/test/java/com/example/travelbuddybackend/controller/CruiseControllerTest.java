package com.example.travelbuddybackend.controller;

import static org.assertj.core.api.Assertions.assertThat;

import com.example.travelbuddybackend.constants.Messages;
import com.example.travelbuddybackend.dao.CruiseDao;
import com.example.travelbuddybackend.model.Cruise;
import com.example.travelbuddybackend.model.Trip;
import com.example.travelbuddybackend.model.User;
import com.example.travelbuddybackend.model.enums.RoomType;
import com.example.travelbuddybackend.model.enums.State;
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
import java.util.Currency;
import java.util.List;

import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.junit.jupiter.api.Assertions.assertTrue;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
public class CruiseControllerTest {
    @InjectMocks
    private CruiseController cruiseController;

    @Mock
    private CruiseDao cruiseDao;

    private Trip trip1;
    private List<Cruise> cruises;
    private Cruise cruise1;

    @BeforeEach
    public void init() {
        User user1 = new User("John", "Doe", "jDoe@example.com", "password");
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
        cruises = new ArrayList<>();
        cruises.add(cruise1);
        cruises.add(cruise2);
    }

    @Test
    public void shouldGetAllCruises() {
        // given
        when(cruiseDao.findAll()).thenReturn(cruises);

        // when
        List<Cruise> result = cruiseController.getAllCruises();

        // then
        assertThat(result.size()).isEqualTo(2);
        assertThat(result.get(0).getShipName())
                .isEqualTo(cruises.get(0).getShipName());
        assertThat(result.get(1).getShipName())
                .isEqualTo(cruises.get(1).getShipName());
    }

    @Test
    public void shouldGetCruiseById() {
        // given
        MockHttpServletRequest request = new MockHttpServletRequest();
        RequestContextHolder.setRequestAttributes(new ServletRequestAttributes(request));
        when(cruiseDao.findById(cruise1.getId()))
                .thenReturn(java.util.Optional.of(cruise1));

        // when
        ResponseEntity<Cruise> result = cruiseController.getCruiseById(cruise1.getId());

        // then
        assertThat(result.equals(cruise1));
        assertThat(result.getStatusCodeValue()).isEqualTo(200);
    }

    @Test
    public void shouldCreateCruise() {
        // given
        when(cruiseDao.save(cruise1)).thenReturn(cruise1);

        // when
        Cruise result = cruiseController.createCruise(cruise1);

        // then
        assertThat(result.getId()).isEqualTo(cruise1.getId());
        assertThat(result.getShipName()).isEqualTo(cruise1.getShipName());
    }

    @Test
    public void shouldThrowValidationErrorOnCreateCruise() {
        // given
        Throwable thrown = assertThrows(IllegalStateException.class, () -> {
            new Cruise.Builder()
                    .setId(1)
                    .setCost(4324.40)
                    .setStartDate(LocalDate.of(2022, 6, 20))
                    .setEndDate(LocalDate.of(2022, 5, 23))
                    .setDepartureCity("Beacon")
                    .setDepartureState(State.NEW_YORK.name())
                    .setDepartureCountry("US")
                    .setDestinationCity("Key West")
                    .setDestinationState(State.FLORIDA.name())
                    .setDestinationCountry("US")
                    .setRoundTrip(false)
                    .build();
        });

        // when
        String actualMessage = thrown.getMessage();

        // then
        assertTrue(actualMessage.contains(Messages.VALIDATION.NULL_CRUISE_LINE));
        assertTrue(actualMessage.contains(Messages.VALIDATION.NULL_CABIN_TYPE));
        assertTrue(actualMessage.contains(Messages.VALIDATION.NULL_CABIN_NUMBER));
        assertTrue(actualMessage.contains(Messages.VALIDATION.NULL_CURRENCY));
        assertTrue(actualMessage.contains(Messages.VALIDATION.NULL_SHIP_NAME));
        assertTrue(actualMessage.contains(Messages.VALIDATION.INVALID_START_DATE));
        assertTrue(actualMessage.contains(Messages.VALIDATION.NULL_TRIP));
    }

    @Test
    public void shouldUpdateCruise() {
        // given
        MockHttpServletRequest request = new MockHttpServletRequest();
        RequestContextHolder.setRequestAttributes(new ServletRequestAttributes(request));

        Cruise cruise1Update = new Cruise.Builder()
                .setCruiseLine("Carnival")
                .setCabinType(RoomType.DOUBLE)
                .setCabinNumber("2234")
                .setCost(1324.40)
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

        when(cruiseDao.existsById(cruise1.getId()))
                .thenReturn(cruise1.getId() == 1);
        when(cruiseDao.save(any(Cruise.class))).thenReturn(cruise1Update);

        // when
        ResponseEntity<Cruise> result = cruiseController.updateCruise(cruise1.getId(), cruise1Update);

        // then
        assertThat(result.equals(cruise1Update));
        assertThat(result.getStatusCodeValue()).isEqualTo(200);
    }

    @Test
    public void shouldDeleteCruise() {
        // given
        MockHttpServletRequest request = new MockHttpServletRequest();
        RequestContextHolder.setRequestAttributes(new ServletRequestAttributes(request));

        when(cruiseDao.findById(cruise1.getId()))
                .thenReturn(java.util.Optional.of(cruise1));

        // when
        ResponseEntity<Cruise> result = cruiseController.deleteCruise(cruise1.getId());

        // then
        assertThat(result.equals(cruise1));
        assertThat(result.getStatusCodeValue()).isEqualTo(200);
    }
}

