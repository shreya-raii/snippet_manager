package com.example.snippet_manager.controller;

import com.example.snippet_manager.dto.LoginDTO;
import com.example.snippet_manager.dto.UserDTO;
import com.example.snippet_manager.model.User;
import com.example.snippet_manager.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "http://localhost:3000", allowCredentials = "true")
@RequiredArgsConstructor
public class UserController {

    private final UserService userService;

    @PostMapping("/register")
    public ResponseEntity<String> register(@RequestBody UserDTO request) {
        String result = userService.registerUser(request);
        System.out.println(result);

        switch(result) {
            case "Registration successful":
                return ResponseEntity.ok(result);
            case "Email already registered":
                return ResponseEntity.status(401).body(result);
            default:
                return ResponseEntity.status(403).body("Unexpected error");
        }
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginDTO login) {
        return userService.login(login);
    }

    @GetMapping("/users")
    public List<User> getAllUsers() {
        return userService.getAllUsers();
    }
}
