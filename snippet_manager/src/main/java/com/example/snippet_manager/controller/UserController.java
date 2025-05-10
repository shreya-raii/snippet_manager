package com.example.snippet_manager.controller;

import com.example.snippet_manager.dto.LoginDTO;
import com.example.snippet_manager.dto.UserDTO;
import com.example.snippet_manager.model.User;
import com.example.snippet_manager.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

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
        return result.equals("Registration successful") ?
                ResponseEntity.ok(result) : ResponseEntity.badRequest().body(result);
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginDTO login) {
        Optional<User> user = userService.login(login);
        if (user.isPresent()) {
            return ResponseEntity.ok(user.get()); // return user JSON
        } else {
            return ResponseEntity.status(401).body("Invalid credentials");
        }
    }
}
