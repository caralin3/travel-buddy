package com.example.travelbuddybackend.controller;

import static org.assertj.core.api.Assertions.assertThat;

import com.example.travelbuddybackend.constants.Messages;
import com.example.travelbuddybackend.dao.ActivityDao;
import com.example.travelbuddybackend.model.*;
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
public class ActivityControllerTest {
    @InjectMocks
    private ActivityController activityController;

    @Mock
    private ActivityDao activityDao;

    private Trip trip1;
    private List<Activity> activities;
    private Activity activity1;
    private Cruise cruise1;
    private Port port;

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
        port = new Port.Builder()
                .setId(1)
                .setArrival(LocalDateTime.of(2022, 3, 31, 8, 15))
                .setCity("Bar Harbor")
                .setCountry("US")
                .setDeparture(LocalDateTime.of(2022, 3, 31, 16, 00))
                .setDay(3)
                .setState(State.MAINE.name())
                .setCruise(cruise1)
                .build();
        activity1 = new Activity.Builder()
                .setId(1)
                .setCost(130.00)
                .setCurrency(Currency.getInstance("USD"))
                .setTitle("Activity 1")
                .setStartDate(LocalDateTime.of(2022, 3, 31, 8, 15))
                .setEndDate(LocalDateTime.of(2022, 3, 31, 16, 00))
                .setCompany("Company")
                .setAddressLine1("123 Main St.")
                .setCity("Newark")
                .setState(State.NEW_JERSEY.name())
                .setCountry("US")
                .setPostalCode("03451")
                .setCruise(cruise1)
                .setTrip(trip1)
                .build();
        Activity activity2 = new Activity.Builder()
                .setId(2)
                .setCost(254.34)
                .setCurrency(Currency.getInstance("USD"))
                .setTitle("Activity 2")
                .setStartDate(LocalDateTime.of(2022, 3, 31, 8, 15))
                .setEndDate(LocalDateTime.of(2022, 3, 31, 16, 00))
                .setCompany("Company")
                .setAddressLine1("123 Main St.")
                .setCity("Newark")
                .setState(State.NEW_JERSEY.name())
                .setCountry("US")
                .setPostalCode("03451")
                .setPort(port)
                .setTrip(trip1)
                .build();
        activities = new ArrayList<>();
        activities.add(activity1);
        activities.add(activity2);
    }

    @Test
    public void shouldGetAllActivities() {
        // given
        when(activityDao.findAll()).thenReturn(activities);

        // when
        List<Activity> result = activityController.getAllActivities();

        // then
        assertThat(result.size()).isEqualTo(2);
        assertThat(result.get(0).getCity())
                .isEqualTo(activities.get(0).getCity());
        assertThat(result.get(1).getCity())
                .isEqualTo(activities.get(1).getCity());
    }

    @Test
    public void shouldGetActivityById() {
        // given
        MockHttpServletRequest request = new MockHttpServletRequest();
        RequestContextHolder.setRequestAttributes(new ServletRequestAttributes(request));
        when(activityDao.findById(activity1.getId()))
                .thenReturn(java.util.Optional.of(activity1));

        // when
        ResponseEntity<Activity> result = activityController.getActivityById(activity1.getId());

        // then
        assertThat(result.equals(activity1));
        assertThat(result.getStatusCodeValue()).isEqualTo(200);
    }

    @Test
    public void shouldCreateActivity() {
        // given
        when(activityDao.save(activity1)).thenReturn(activity1);

        // when
        Activity result = activityController.createActivity(activity1);

        // then
        assertThat(result.getId()).isEqualTo(activity1.getId());
        assertThat(result.getCity()).isEqualTo(activity1.getCity());
    }

    @Test
    public void shouldThrowValidationErrorOnCreateActivity() {
        // given
        Throwable thrown = assertThrows(IllegalStateException.class, () -> {
            new Activity.Builder()
                    .setId(1)
                    .setCost(254.34)
                    .setStartDate(LocalDateTime.of(2022, 3, 31, 8, 15))
                    .setEndDate(LocalDateTime.of(2022, 2, 2, 16, 00))
                    .setCompany("Company")
                    .setAddressLine1("123 Main St.")
                    .setCity("Newark")
                    .setState(State.NEW_JERSEY.name())
                    .setCountry("US")
                    .setPostalCode("03451")
                    .setPort(port)
                    .build();
        });

        // when
        String actualMessage = thrown.getMessage();

        // then
        assertTrue(actualMessage.contains(Messages.VALIDATION.NULL_TITLE));
        assertTrue(actualMessage.contains(Messages.VALIDATION.NULL_CURRENCY));
        assertTrue(actualMessage.contains(Messages.VALIDATION.INVALID_END_DATE));
        assertTrue(actualMessage.contains(Messages.VALIDATION.NULL_TRIP));
    }

    @Test
    public void shouldUpdateActivity() {
        // given
        MockHttpServletRequest request = new MockHttpServletRequest();
        RequestContextHolder.setRequestAttributes(new ServletRequestAttributes(request));

        Activity activity1Update = new Activity.Builder()
                .setCost(145.00)
                .setCurrency(Currency.getInstance("USD"))
                .setTitle("Activity 1")
                .setStartDate(LocalDateTime.of(2022, 3, 31, 8, 15))
                .setEndDate(LocalDateTime.of(2022, 3, 31, 16, 00))
                .setCompany("Company Name")
                .setAddressLine1("123 Main St.")
                .setCity("Newark")
                .setState(State.NEW_JERSEY.name())
                .setCountry("US")
                .setPostalCode("03451")
                .setCruise(cruise1)
                .setTrip(trip1)
                .build();

        when(activityDao.existsById(activity1.getId()))
                .thenReturn(activity1.getId() == 1);
        when(activityDao.save(any(Activity.class))).thenReturn(activity1Update);

        // when
        ResponseEntity<Activity> result = activityController.updateActivity(activity1.getId(), activity1Update);

        // then
        assertThat(result.equals(activity1Update));
        assertThat(result.getStatusCodeValue()).isEqualTo(200);
    }

    @Test
    public void shouldDeleteActivity() {
        // given
        MockHttpServletRequest request = new MockHttpServletRequest();
        RequestContextHolder.setRequestAttributes(new ServletRequestAttributes(request));

        when(activityDao.findById(activity1.getId()))
                .thenReturn(java.util.Optional.of(activity1));

        // when
        ResponseEntity<Activity> result = activityController.deleteActivity(activity1.getId());

        // then
        assertThat(result.equals(activity1));
        assertThat(result.getStatusCodeValue()).isEqualTo(200);
    }
}

