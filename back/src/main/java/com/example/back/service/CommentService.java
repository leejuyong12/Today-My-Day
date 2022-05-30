package com.example.back.service;

import com.example.back.dto.CommentDto;
import com.example.back.entity.Comment;
import com.example.back.entity.Diary;

import java.util.List;

public interface CommentService {
    Comment createComment(Long dno, CommentDto commentDto);
    List<Comment> readAllComment();
    List<Comment> readMyComment(String userId);
    Comment modifyComment(Long cno, String userId, CommentDto commentDto);
    void deleteComment(Long cno, String userId);
}
