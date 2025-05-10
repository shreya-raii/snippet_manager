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
            return "User with this email already exists";
        }

        User user = User.builder()
                .firstName(dto.getFirstname())
                .lastName(dto.getLastname())
                .dob(dto.getDob())
                .email(dto.getEmail())
                .password(dto.getPassword())
                .build();

        userRepository.save(user);
        return "Registration successful";
    }

    public Optional<User> login(LoginDTO dto) {
        System.out.println(userRepository.findByEmail(dto.getEmail()));

        return userRepository.findByEmail(dto.getEmail())
                .filter(user -> user.getPassword().equals(dto.getPassword()));
    }
}
