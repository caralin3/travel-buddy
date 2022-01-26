package com.example.travelbuddybackend.controller;

import static org.assertj.core.api.Assertions.assertThat;
import com.example.travelbuddybackend.dao.UserDao;
import com.example.travelbuddybackend.model.User;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.http.ResponseEntity;
import org.springframework.mock.web.MockHttpServletRequest;
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;

import java.util.ArrayList;
import java.util.List;

import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
public class UserControllerTest {
    @InjectMocks
    private UserController userController;

    @Mock
    private UserDao userDao;

    @Test
    public void shouldGetAllUsers() {
        // given
        User user1 = new User(1, "John", "Doe", "jDoe@email.com");
        User user2 = new User(2, "Jane", "Doe", "janeDoe@email.com");
        List<User> users = new ArrayList<>();
        users.add(user1);
        users.add(user2);

        when(userDao.findAll()).thenReturn(users);

        // when
        List<User> result = userController.getAllUsers();

        // then
        assertThat(result.size()).isEqualTo(2);
        assertThat(result.get(0).getFirstName())
                .isEqualTo(user1.getFirstName());
        assertThat(result.get(1).getFirstName())
                .isEqualTo(user2.getFirstName());
    }

    @Test
    public void shouldGetUserById() {
        // given
        MockHttpServletRequest request = new MockHttpServletRequest();
        RequestContextHolder.setRequestAttributes(new ServletRequestAttributes(request));
        User user1 = new User(1, "John", "Doe", "jDoe@email.com");

        when(userDao.findById(user1.getId()))
                .thenReturn(java.util.Optional.of(user1));

        // when
        ResponseEntity<User> result = userController.getUserById(user1.getId());

        // then
        assertThat(result.equals(user1));
        assertThat(result.getStatusCodeValue()).isEqualTo(200);
    }

    @Test
    public void shouldCreateUser() {
        // given
        User user1 = new User(1, "John", "Doe", "jDoe@email.com");
        when(userDao.save(user1)).thenReturn(user1);

        // when
        User result = userController.createUser(user1);

        // then
        assertThat(result.getId()).isEqualTo(user1.getId());
        assertThat(result.getFirstName()).isEqualTo(user1.getFirstName());
    }

    @Test
    public void shouldUpdateUser() {
        // given
        MockHttpServletRequest request = new MockHttpServletRequest();
        RequestContextHolder.setRequestAttributes(new ServletRequestAttributes(request));
        User user1 = new User(1, "John", "Doe", "jDoe@email.com");
        User user1Update = new User(1, "John", "Doe", "johnDoe@email.com");

        when(userDao.findById(user1.getId()))
                .thenReturn(java.util.Optional.of(user1));
        when(userDao.save(user1)).thenReturn(user1Update);

        // when
        ResponseEntity<User> result = userController.updateUser(user1.getId(), user1Update);

        // then
        assertThat(result.equals(user1Update));
        assertThat(result.getStatusCodeValue()).isEqualTo(200);
    }

    @Test
    public void shouldDeleteUser() {
        // given
        MockHttpServletRequest request = new MockHttpServletRequest();
        RequestContextHolder.setRequestAttributes(new ServletRequestAttributes(request));
        User user1 = new User(1, "John", "Doe", "jDoe@email.com");

        when(userDao.findById(user1.getId()))
                .thenReturn(java.util.Optional.of(user1));

        // when
        ResponseEntity<User> result = userController.deleteUser(user1.getId());

        // then
        assertThat(result.equals(user1));
        assertThat(result.getStatusCodeValue()).isEqualTo(200);
    }
}
