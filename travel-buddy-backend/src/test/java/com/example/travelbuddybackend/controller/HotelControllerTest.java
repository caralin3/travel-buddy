package com.example.travelbuddybackend.controller;

import static org.assertj.core.api.Assertions.assertThat;

import com.example.travelbuddybackend.constants.Messages;
import com.example.travelbuddybackend.dao.HotelDao;
import com.example.travelbuddybackend.model.Hotel;
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
public class HotelControllerTest {
    @InjectMocks
    private HotelController hotelController;

    @Mock
    private HotelDao hotelDao;

    private Trip trip1;
    private List<Hotel> hotels;
    private Hotel hotel1;

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
        hotel1 = new Hotel.Builder()
                .setId(1)
                .setName("Marriott")
                .setCost(230.67)
                .setCurrency(Currency.getInstance("USD"))
                .setCheckInDate(LocalDate.of(2022, 4, 6))
                .setCheckOutDate(LocalDate.of(2022, 4, 16))
                .setRoomType(RoomType.DOUBLE)
                .setRoomCount(2)
                .setAddressLine1("123 Main St.")
                .setCity("Newark")
                .setState(State.NEW_JERSEY.name())
                .setCountry("US")
                .setPostalCode("03451")
                .setTrip(trip1)
                .build();
        Hotel hotel2 = new Hotel.Builder()
                .setId(2)
                .setName("Hilton")
                .setCost(130.43)
                .setCurrency(Currency.getInstance("USD"))
                .setCheckInDate(LocalDate.of(2022, 5, 20))
                .setCheckOutDate(LocalDate.of(2022, 5, 23))
                .setRoomType(RoomType.SINGLE)
                .setRoomCount(1)
                .setTrip(trip2)
                .build();
        hotels = new ArrayList<>();
        hotels.add(hotel1);
        hotels.add(hotel2);
    }

    @Test
    public void shouldGetAllHotels() {
        // given
        when(hotelDao.findAll()).thenReturn(hotels);

        // when
        List<Hotel> result = hotelController.getAllHotels();

        // then
        assertThat(result.size()).isEqualTo(2);
        assertThat(result.get(0).getName())
                .isEqualTo(hotels.get(0).getName());
        assertThat(result.get(1).getName())
                .isEqualTo(hotels.get(1).getName());
    }

    @Test
    public void shouldGetHotelById() {
        // given
        MockHttpServletRequest request = new MockHttpServletRequest();
        RequestContextHolder.setRequestAttributes(new ServletRequestAttributes(request));
        when(hotelDao.findById(hotel1.getId()))
                .thenReturn(java.util.Optional.of(hotel1));

        // when
        ResponseEntity<Hotel> result = hotelController.getHotelById(hotel1.getId());

        // then
        assertThat(result.equals(hotel1));
        assertThat(result.getStatusCodeValue()).isEqualTo(200);
    }

    @Test
    public void shouldCreateHotel() {
        // given
        when(hotelDao.save(hotel1)).thenReturn(hotel1);

        // when
        Hotel result = hotelController.createHotel(hotel1);

        // then
        assertThat(result.getId()).isEqualTo(hotel1.getId());
        assertThat(result.getName()).isEqualTo(hotel1.getName());
    }

    @Test
    public void shouldThrowValidationErrorOnCreateHotel() {
        // given
        Throwable thrown = assertThrows(IllegalStateException.class, () -> {
            new Hotel.Builder()
                    .setId(1)
                    .setCheckInDate(LocalDate.of(2022, 4, 6))
                    .setCheckOutDate(LocalDate.of(2022, 3, 16))
                    .setRoomType(RoomType.DOUBLE)
                    .setRoomCount(2)
                    .setAddressLine1("123 Main St.")
                    .setCity("Manhattan")
                    .setState(State.NEW_YORK.name())
                    .setCountry("US")
                    .setPostalCode("03451")
                    .build();
        });

        // when
        String actualMessage = thrown.getMessage();

        // then
        assertTrue(actualMessage.contains(Messages.VALIDATION.NULL_NAME));
        assertTrue(actualMessage.contains(Messages.VALIDATION.NULL_CURRENCY));
        assertTrue(actualMessage.contains(Messages.VALIDATION.NULL_TRIP));
        assertTrue(actualMessage.contains(Messages.VALIDATION.INVALID_CHECK_OUT_DATE));
    }

    @Test
    public void shouldUpdateHotel() {
        // given
        MockHttpServletRequest request = new MockHttpServletRequest();
        RequestContextHolder.setRequestAttributes(new ServletRequestAttributes(request));

        Hotel hotel1Update = new Hotel.Builder()
                .setName("Hilton")
                .setCost(230.67)
                .setCurrency(Currency.getInstance("USD"))
                .setCheckInDate(LocalDate.of(2022, 4, 6))
                .setCheckOutDate(LocalDate.of(2022, 4, 16))
                .setRoomType(RoomType.DOUBLE)
                .setRoomCount(2)
                .setAddressLine1("123 Main St.")
                .setCity("Manhattan")
                .setState(State.NEW_YORK.name())
                .setCountry("US")
                .setPostalCode("03451")
                .setTrip(trip1)
                .build();

        when(hotelDao.existsById(hotel1.getId()))
                .thenReturn(hotel1.getId() == 1);
        when(hotelDao.save(any(Hotel.class))).thenReturn(hotel1Update);

        // when
        ResponseEntity<Hotel> result = hotelController.updateHotel(hotel1.getId(), hotel1Update);

        // then
        assertThat(result.equals(hotel1Update));
        assertThat(result.getStatusCodeValue()).isEqualTo(200);
    }

    @Test
    public void shouldDeleteHotel() {
        // given
        MockHttpServletRequest request = new MockHttpServletRequest();
        RequestContextHolder.setRequestAttributes(new ServletRequestAttributes(request));

        when(hotelDao.findById(hotel1.getId()))
                .thenReturn(java.util.Optional.of(hotel1));

        // when
        ResponseEntity<Hotel> result = hotelController.deleteHotel(hotel1.getId());

        // then
        assertThat(result.equals(hotel1));
        assertThat(result.getStatusCodeValue()).isEqualTo(200);
    }
}

