package com.example.backend.Services.UserService;

import com.example.backend.Entity.User;
import com.example.backend.Repository.UserRepo;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;
@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService{
    private final UserRepo userRepo;

    @Override
    public User saveUser(User user) {
        return userRepo.save(user);
    }

    @Override
    public List<User> getUsers() {
        return userRepo.findAll();
    }

    @Override
    public User editUsers(User user) {
        return userRepo.save(user);
    }

    @Override
    public void deleteUsers(UUID id) {
        userRepo.deleteById(id);
    }
}
