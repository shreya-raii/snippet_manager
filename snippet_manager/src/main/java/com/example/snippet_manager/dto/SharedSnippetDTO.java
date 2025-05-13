package com.example.snippet_manager.dto;

import lombok.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class SharedSnippetDTO {
    private Long id;
    private Long snippetId;
    private Long sharedUserId;
    private String permission;
}
