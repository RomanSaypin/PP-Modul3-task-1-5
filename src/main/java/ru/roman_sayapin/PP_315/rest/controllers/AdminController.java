package ru.roman_sayapin.PP_315.rest.controllers;

import org.springframework.web.bind.annotation.*;
import ru.roman_sayapin.PP_315.rest.entity.Role;
import ru.roman_sayapin.PP_315.rest.entity.User;
import ru.roman_sayapin.PP_315.rest.service.RoleService;
import ru.roman_sayapin.PP_315.rest.service.UserService;

import java.util.List;

@RestController
@RequestMapping("/api/admin")
public class AdminController {

    private final UserService userService;
    private final RoleService roleService;

    public AdminController(UserService userService, RoleService roleService) {
        this.userService = userService;
        this.roleService = roleService;
    }

    @GetMapping("/users")
    public List<User> allUser() {
        return userService.listUser();
    }

    @GetMapping("/{id}")
    public User getUser(@PathVariable long id) {
      return userService.getUser(id).get();
    }

    @PostMapping("/users")
    public void addUser(@RequestBody User user) {
        userService.saveUser(user);
    }

    @PutMapping("/users")
    public void updateUser(@RequestBody User user) {
        userService.saveUser(user);
    }

    @DeleteMapping("/{id}")
    public void deleteUser(@PathVariable long id) {
        userService.deleteUser(id);
    }
}