package com.example.back.repository;

import com.example.back.entity.Comment;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface CommentRepository extends JpaRepository<Comment, Long> {
    Comment findCommentByCno(Long cno);
    List<Comment> findCommentByUserId(String userId);
}
