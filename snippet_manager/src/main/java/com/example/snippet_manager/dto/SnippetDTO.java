package com.example.snippet_manager.dto;

import com.example.snippet_manager.model.SharedSnippet.PermissionAccess;
import com.example.snippet_manager.model.Snippet.CollaborationStatus;
import lombok.*;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class SnippetDTO {
    private Long id;
    private String language;
    private String code;
    private Long userId;
    private List<CollaboratorDTO> collaborators;

    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    public static class CollaboratorDTO {
        private Long userId;
        private PermissionAccess permission;
    }
}

