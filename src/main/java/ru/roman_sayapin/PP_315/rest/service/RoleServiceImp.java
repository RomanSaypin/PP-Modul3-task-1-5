package ru.roman_sayapin.PP_315.rest.service;

import org.springframework.stereotype.Service;
import ru.roman_sayapin.PP_315.rest.entity.Role;
import ru.roman_sayapin.PP_315.rest.repositories.RoleRepository;

import java.util.List;
@Service
public class RoleServiceImp implements RoleService {

    private final RoleRepository repository;

    public RoleServiceImp(RoleRepository repository) {
        this.repository = repository;
    }

    @Override
    public List<Role> listRoles() {
        return repository.findAll();
    }

    @Override
    public void saveRole(Role role) {
        repository.save(role);
    }

    @Override
    public void deleteRole(long id) {
        repository.deleteById(id);
    }
}
