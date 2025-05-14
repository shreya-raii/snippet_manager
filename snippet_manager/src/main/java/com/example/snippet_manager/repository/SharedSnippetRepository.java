package com.example.snippet_manager.repository;

import com.example.snippet_manager.model.SharedSnippet;
import com.example.snippet_manager.model.Snippet;
import com.example.snippet_manager.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface SharedSnippetRepository extends JpaRepository<SharedSnippet, Long> {

    @Query("SELECT s, ss.permission FROM Snippet s JOIN SharedSnippet ss ON s.id = ss.snippetId WHERE ss.sharedUserId = :userId")
    List<Object[]> findSharedSnippetsWithPermissionByUserId(@Param("userId") Long userId);

    @Query("SELECT u FROM SharedSnippet ss JOIN User u ON ss.sharedUserId = u.id WHERE ss.snippetId = :snippetId")
    List<User> findAllSharedUsersBySnippetId(Long snippetId);

    @Query("SELECT u FROM Snippet s JOIN User u ON s.userId = u.id WHERE s.id = :snippetId")
    User findOwnerBySnippetId(@Param("snippetId") Long snippetId);
}
