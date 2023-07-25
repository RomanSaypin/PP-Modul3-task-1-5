package ru.roman_sayapin.PP_315.rest.service;

import ru.roman_sayapin.PP_315.rest.entity.Role;

import java.util.List;

public interface RoleService {

    List<Role> listRoles();

    void saveRole(Role role);

    void deleteRole(long id);
}
