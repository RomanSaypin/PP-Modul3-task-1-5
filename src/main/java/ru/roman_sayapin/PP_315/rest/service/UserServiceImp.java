package ru.roman_sayapin.PP_315.rest.service;

import org.springframework.stereotype.Service;
import ru.roman_sayapin.PP_315.rest.entity.User;
import ru.roman_sayapin.PP_315.rest.repositories.UserRepository;

import javax.transaction.Transactional;
import java.util.List;
import java.util.Optional;

@Service
public class UserServiceImp implements UserService {

    private final UserRepository repository;

    public UserServiceImp(UserRepository repository) {
        this.repository = repository;
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
        repository.save(user);
    }

    @Override
    @Transactional
    public void deleteUser(long id) {
        repository.deleteById(id);
    }


}
