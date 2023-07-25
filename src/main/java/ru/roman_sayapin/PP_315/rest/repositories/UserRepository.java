package ru.roman_sayapin.PP_315.rest.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import ru.roman_sayapin.PP_315.rest.entity.User;

import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Long> {

    @Query("Select u from User u left join fetch u.roles where u.firstName=:username")
    Optional<User> findByUsername(String username);
}
