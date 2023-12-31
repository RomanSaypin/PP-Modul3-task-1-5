package ru.roman_sayapin.PP_315.rest.init;

import org.springframework.stereotype.Component;
import ru.roman_sayapin.PP_315.rest.entity.Role;
import ru.roman_sayapin.PP_315.rest.entity.User;
import ru.roman_sayapin.PP_315.rest.service.RoleService;
import ru.roman_sayapin.PP_315.rest.service.UserService;

import javax.annotation.PostConstruct;

@Component
public class UserInit {

    private final UserService userService;
    private final RoleService roleService;


    public UserInit(UserService service, RoleService roleService) {
        this.userService = service;
        this.roleService = roleService;
    }

    @PostConstruct
    private void init() {
        User tony = new User("Tony", "Stark", "tony@gmai.com", "100");
        User ben = new User("Ben", "Anderson", "ben@gmail.com", "101");
        Role admin = new Role("ADMIN");
        Role user = new Role("USER");
        tony.addRole(admin);
        ben.addRole(user);

        if (userService.getUser(tony.getFirstName()).isEmpty() && userService.getUser(ben.getFirstName()).isEmpty()) {
            roleService.saveRole(admin);
            roleService.saveRole(user);
            userService.saveUser(tony);
            userService.saveUser(ben);
        }
    }
}
