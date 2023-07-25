package ru.roman_sayapin.PP_315.rest.controllers;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import ru.roman_sayapin.PP_315.rest.entity.User;
import ru.roman_sayapin.PP_315.rest.service.UserService;

@RestController
@RequestMapping("/api/user")
public class UserController {

    private final UserService service;

    public UserController(UserService service) {
        this.service = service;
    }

    @GetMapping("/")
    public User getUser() {
        return service.getUser(2).get();
    }
}
