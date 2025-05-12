package com.example.snippet_manager.model;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "shared_snippets")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class SharedSnippet {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "snippet_id")
    private Long snippetId;

    @Column(name = "shared_user_id")
    private Long sharedUserId;

    @Enumerated(EnumType.STRING)
    @Column(name = "permission", nullable = false)
    private SharedSnippet.PermissionAccess permission;

    public enum PermissionAccess {
        Read,
        Write
    }
}
