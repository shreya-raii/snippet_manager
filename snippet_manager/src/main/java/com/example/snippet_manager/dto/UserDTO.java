package com.example.snippet_manager.dto;

import java.time.LocalDate;
import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class UserDTO {
    private String firstname;
    private String lastname;
    private String email;
    private String password;
    private LocalDate dob;

    // Getters and Setters
}

