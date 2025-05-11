package com.example.snippet_manager.dto;

import lombok.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class SnippetDTO {
    private Long id;
    private String language;
    private String code;
    private Long userId;
}
