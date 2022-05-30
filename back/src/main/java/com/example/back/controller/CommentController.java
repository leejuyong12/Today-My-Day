package com.example.back.controller;

import com.example.back.dto.CommentDto;
import com.example.back.entity.Comment;
import com.example.back.service.CommentService;
import io.swagger.annotations.Api;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/comment")
@RequiredArgsConstructor
@Api(tags = {"댓글 컨트롤러"})
public class CommentController {

    private final CommentService commentService;

    @PostMapping("")
    public ResponseEntity<Object> createComment(@RequestParam Long dno, @RequestBody CommentDto commentDto) {

        commentService.createComment(dno, commentDto);
        return ResponseEntity.ok().body(HttpStatus.CREATED);
    }

    @GetMapping("/readAll")
    public ResponseEntity<List<Comment>> readAllComment(){
        List<Comment> comments = commentService.readAllComment();
        return ResponseEntity.ok().body(comments);
    }

    @GetMapping("/mycomment")
    public ResponseEntity<List<Comment>> readMyComment(@RequestParam String userId){
        List<Comment> comments = commentService.readMyComment(userId);
        return ResponseEntity.ok().body(comments);
    }

    @PutMapping("/{cno}")
    public ResponseEntity<Comment> modifyComment(@PathVariable long cno, @RequestParam String userId, @RequestBody CommentDto commentDto){
        Comment comment = commentService.modifyComment(cno, userId, commentDto);
        return ResponseEntity.ok().body(comment);
    }

    @DeleteMapping("/{cno}")
    public ResponseEntity<Object> deleteComment(@PathVariable long cno, @RequestParam String userId){
        commentService.deleteComment(cno, userId);
        return ResponseEntity.ok().body(HttpStatus.OK);
    }

}
