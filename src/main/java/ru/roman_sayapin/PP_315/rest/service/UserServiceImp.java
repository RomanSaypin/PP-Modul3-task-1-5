package ru.roman_sayapin.PP_315.rest.service;

import org.springframework.context.annotation.Lazy;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import ru.roman_sayapin.PP_315.rest.entity.User;
import ru.roman_sayapin.PP_315.rest.repositories.UserRepository;

import javax.transaction.Transactional;
import java.util.List;
import java.util.Optional;

@Service
public class UserServiceImp implements UserService, UserDetailsService {

    private final UserRepository repository;
    private final PasswordEncoder passwordEncoder;

    public UserServiceImp(UserRepository repository, @Lazy PasswordEncoder passwordEncoder) {
        this.repository = repository;

        this.passwordEncoder = passwordEncoder;
    }

    @Override
    public List<User> listUser() {
        return repository.findAll();
    }

    @Override
    public Optional<User> getUser(long id) {
        return repository.findById(id);
    }

    @Override
    public Optional<User> getUser(String name) {
        return repository.findByUsername(name);
    }

    @Override
    @Transactional
    public void saveUser(User user) {
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        repository.save(user);
    }


    @Override
    @Transactional
    public void deleteUser(long id) {
        repository.deleteById(id);
    }


    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        User user = getUser(username).orElseThrow(() ->
                new UsernameNotFoundException(String.format("User %s not found", username)));
        return user;
    }
}
