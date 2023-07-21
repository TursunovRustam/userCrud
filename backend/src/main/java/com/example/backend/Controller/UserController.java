package com.example.backend.Controller;

import com.example.backend.Entity.User;
import com.example.backend.Services.UserService.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpEntity;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.UUID;

@RestController
@RequestMapping("/api/user")
public class UserController {
    @Autowired
    private UserService userService;
    @PostMapping
    private HttpEntity<?> saveUser(@RequestBody User user){
        return ResponseEntity.ok(userService.saveUser(userService.saveUser(user)));
    }
    @GetMapping
    private HttpEntity<?> getUsers(){
        return ResponseEntity.ok(userService.getUsers());
    }
    @PutMapping("/{id}")
    private HttpEntity<?> editUser(@RequestBody User user, @PathVariable("id") UUID id){
        user.setId(id);
        return ResponseEntity.ok(userService.editUsers(user));
    }
    @DeleteMapping("/{id}")
    private HttpEntity<?> deleteUser(@PathVariable("id") UUID id){
        userService.deleteUsers(id);
        return ResponseEntity.ok(null);
    }
}
