package com.example.snippet_manager.repository;

import com.example.snippet_manager.model.Snippet;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface SnippetRepository extends JpaRepository<Snippet, Long> {
    List<Snippet> findByUserId(Long userId);
}
