package com.example.snippet_manager.controller;

import com.example.snippet_manager.dto.SharedSnippetDTO;
import com.example.snippet_manager.dto.SnippetDTO;
import com.example.snippet_manager.model.SharedSnippet;
import com.example.snippet_manager.model.Snippet;
import com.example.snippet_manager.service.SnippetService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/snippets")
public class SnippetController {

    @Autowired
    private SnippetService snippetService;

    @GetMapping("/user/{userId}")
    public ResponseEntity<List<Snippet>> getSnippetsByUserId(@PathVariable Long userId) {
        List<Snippet> snippets = snippetService.getSnippetsByUserId(userId);
        return ResponseEntity.ok(snippets);
    }

    @GetMapping("/collaborated/{userId}")
    public ResponseEntity<List<Snippet>> getCollaboratedSnippetsByUserId(@PathVariable Long userId) {
        List<Snippet> snippets = snippetService.getCollaboratedSnippetsByUserId(userId);
        return ResponseEntity.ok(snippets);
    }

    @GetMapping("/shared/{userId}")
    public ResponseEntity<List<Object[]>> getSharedSnippetsByUserId(@PathVariable Long userId) {
        List<Object[]> snippets = snippetService.getSharedSnippetsByUserId(userId);
        return ResponseEntity.ok(snippets);
    }

    @PostMapping("/create")
    public ResponseEntity<String> createSnippet(@RequestBody SnippetDTO dto) {
        snippetService.saveSnippet(dto);
        return ResponseEntity.ok("Snippet saved");
    }

    @PostMapping("/update")
    public ResponseEntity<String> updateSnippet(@RequestBody SnippetDTO dto) {
        snippetService.updateSnippet(dto);
        return ResponseEntity.ok("Snippet saved");
    }

    @PostMapping("/delete")
    public ResponseEntity<String> deleteSnippet(@RequestBody SnippetDTO dto) {
        snippetService.deleteSnippet(dto.getId());
        return ResponseEntity.ok("Snippet deleted");
    }

    @GetMapping("/getCollaborators")
    public ResponseEntity<List<Object[]>> getSnippetCollaborators(@PathVariable Long snippetId) {
        System.out.println(snippetId);
        List<Object[]> collaborators = snippetService.getSnippetCollaborators(snippetId);
        System.out.println(collaborators);
        return ResponseEntity.ok(collaborators);
    }
}
