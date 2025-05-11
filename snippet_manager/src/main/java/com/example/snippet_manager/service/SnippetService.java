package com.example.snippet_manager.service;

import com.example.snippet_manager.dto.SnippetDTO;
import com.example.snippet_manager.model.Snippet;
import com.example.snippet_manager.repository.SnippetRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class SnippetService {

    @Autowired
    private SnippetRepository snippetRepository;

    public List<Snippet> getSnippetsByUserId(Long userId) {
        return snippetRepository.findByUserId(userId);
    }

    public void saveSnippet(SnippetDTO dto) {
        Snippet snippet = Snippet.builder()
                .language(dto.getLanguage())
                .code(dto.getCode())
                .userId(dto.getUserId())
                .build();
        snippetRepository.save(snippet);
    }

    public void updateSnippet(SnippetDTO dto) {
        Snippet existingSnippet = snippetRepository.findById(dto.getId())
                .orElseThrow(() -> new RuntimeException("Snippet not found with id: " + dto.getId()));

        existingSnippet.setLanguage(dto.getLanguage());
        existingSnippet.setCode(dto.getCode());
        existingSnippet.setUserId(dto.getUserId());

        snippetRepository.save(existingSnippet);
    }

    public void deleteSnippet(Long id) {
        Snippet existingSnippet = snippetRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Snippet not found with id: " + id));
        snippetRepository.delete(existingSnippet);
    }
}
