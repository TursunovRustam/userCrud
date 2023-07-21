package com.example.backend.Services.UserService;

import com.example.backend.Entity.User;

import java.util.List;
import java.util.UUID;

public interface UserService {
    User saveUser(User user);
    List<User> getUsers();
    User editUsers(User user, UUID id);
    void deleteUsers(UUID id);
}
