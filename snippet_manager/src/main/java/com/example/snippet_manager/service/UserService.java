package com.example.snippet_manager.service;

import com.example.snippet_manager.dto.LoginDTO;
import com.example.snippet_manager.dto.UserDTO;
import com.example.snippet_manager.model.User;
import com.example.snippet_manager.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class UserService {

    private final UserRepository userRepository;

    public String registerUser(UserDTO dto) {
        if (userRepository.findByEmail(dto.getEmail()).isPresent()) {
            return "Email already registered";
        }

        User user = User.builder()
                .firstName(dto.getFirstname())
                .lastName(dto.getLastname())
                .dob(dto.getDob())
                .email(dto.getEmail())
                .password(dto.getPassword()) // TODO: Hash password before storing
                .build();

        userRepository.save(user);
        return "Registration successful";
    }

    public String login(LoginDTO dto) {
        Optional<User> userOptional = userRepository.findByEmail(dto.getEmail());

        if (userOptional.isEmpty()) {
            return "Email doesn't exist, please register";
        }

        User user = userOptional.get();
        if (!user.getPassword().equals(dto.getPassword())) { // TODO: Use hashed password comparison
            return "Password incorrect";
        }

        return "Login successful";
    }

    public Optional<User> getUserByEmail(String email) {
        return userRepository.findByEmail(email);
    }
}
