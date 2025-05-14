package com.example.snippet_manager.dto;

import lombok.*;

@Data
public class SnippetEditRequest {
    private String snippetId;
    private String code;
}
