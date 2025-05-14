package com.example.snippet_manager.controller;

import com.example.snippet_manager.dto.SnippetEditRequest;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Controller;
import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@Controller
public class WebSocketController {

    private final SimpMessagingTemplate messagingTemplate;

    @MessageMapping("/editSnippet")
    public void editSnippet(SnippetEditRequest request) {
        // Here we broadcast the snippet's new code to collaborators
        System.out.println("Editing Snippet : " + request);
        messagingTemplate.convertAndSend("/topic/snippets/" + request.getSnippetId(), request);
    }
}
