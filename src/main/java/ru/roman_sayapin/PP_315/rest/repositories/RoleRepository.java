package ru.roman_sayapin.PP_315.rest.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import ru.roman_sayapin.PP_315.rest.entity.Role;

public interface RoleRepository extends JpaRepository<Role, Long> {
}
