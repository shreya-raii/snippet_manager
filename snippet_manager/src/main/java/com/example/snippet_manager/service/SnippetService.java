package com.example.snippet_manager.service;

import com.example.snippet_manager.dto.SnippetDTO;
import com.example.snippet_manager.model.SharedSnippet;
import com.example.snippet_manager.model.Snippet;
import com.example.snippet_manager.model.User;
import com.example.snippet_manager.repository.SharedSnippetRepository;
import com.example.snippet_manager.repository.SnippetRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.example.snippet_manager.model.Snippet.CollaborationStatus;

import java.util.List;

@Service
public class SnippetService {

    @Autowired
    private SnippetRepository snippetRepository;
    @Autowired
    private SharedSnippetRepository sharedSnippetRepository;

    public List<Snippet> getSnippetsByUserId(Long userId) {
        return snippetRepository.findByUserIdAndCollaboration(userId, CollaborationStatus.No);
    }

    public List<Snippet> getCollaboratedSnippetsByUserId(Long userId) {
        return snippetRepository.findByUserIdAndCollaboration(userId, CollaborationStatus.Yes);
    }

    public List<Object[]> getSharedSnippetsByUserId(Long userId) {
        List<Object[]> results = sharedSnippetRepository.findSharedSnippetsWithPermissionByUserId(userId);
        return results;
    }

    public void saveSnippet(SnippetDTO dto) {
        boolean hasCollaborators = dto.getCollaborators() != null && !dto.getCollaborators().isEmpty();

        Snippet snippet = Snippet.builder()
                .language(dto.getLanguage())
                .code(dto.getCode())
                .userId(dto.getUserId())
                .collaboration(hasCollaborators ? Snippet.CollaborationStatus.Yes : Snippet.CollaborationStatus.No)
                .build();
        snippetRepository.save(snippet);

        if (hasCollaborators) {
            for (SnippetDTO.CollaboratorDTO collaborator : dto.getCollaborators()) {
                SharedSnippet sharedSnippet = SharedSnippet.builder()
                        .snippetId(snippet.getId())
                        .sharedUserId(collaborator.getUserId())
                        .permission(collaborator.getPermission())
                        .build();

                sharedSnippetRepository.save(sharedSnippet);
            }
        }
    }

    public void updateSnippet(SnippetDTO dto) {
        Snippet existingSnippet = snippetRepository.findById(dto.getId())
                .orElseThrow(() -> new RuntimeException("Snippet not found with id: " + dto.getId()));

        existingSnippet.setCode(dto.getCode());

        snippetRepository.save(existingSnippet);
    }

    public void deleteSnippet(Long id) {
        Snippet existingSnippet = snippetRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Snippet not found with id: " + id));
        snippetRepository.delete(existingSnippet);
    }

    public List<User> getSnippetCollaborators(Long id) {
        List<User> sharedUsers = sharedSnippetRepository.findAllSharedUsersBySnippetId(id);
        User owner = sharedSnippetRepository.findOwnerBySnippetId(id);
        sharedUsers.add(owner);
        return sharedUsers;
    }
}
