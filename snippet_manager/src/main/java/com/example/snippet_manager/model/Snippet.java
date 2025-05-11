package com.example.snippet_manager.model;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "snippets")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Snippet {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String language;

    @Column(name = "code_snippet", columnDefinition = "TEXT")
    private String code;

    @Column(name = "user_id")
    private Long userId;
}
