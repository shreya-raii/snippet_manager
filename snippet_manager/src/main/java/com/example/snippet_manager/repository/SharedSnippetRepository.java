package com.example.snippet_manager.repository;

import com.example.snippet_manager.model.SharedSnippet;
import com.example.snippet_manager.model.Snippet;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface SharedSnippetRepository extends JpaRepository<SharedSnippet, Long> {

    @Query("SELECT s, ss.permission FROM Snippet s JOIN SharedSnippet ss ON s.id = ss.snippetId WHERE ss.sharedUserId = :userId")
    List<Object[]> findSharedSnippetsWithPermissionByUserId(@Param("userId") Long userId);

    List<Object[]> findAllBySnippetId(Long snippetId);
}
