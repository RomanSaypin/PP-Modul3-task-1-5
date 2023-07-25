package ru.roman_sayapin.PP_315.rest.service;

import ru.roman_sayapin.PP_315.rest.entity.User;

import java.util.List;
import java.util.Optional;

public interface UserService {
    List<User> listUser();

    Optional<User> getUser(long id);

    Optional<User> getUser(String name);

    void saveUser(User user);

    void deleteUser(long id);



}
