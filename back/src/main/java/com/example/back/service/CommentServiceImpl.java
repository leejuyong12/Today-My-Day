package com.example.back.service;

import com.example.back.dto.CommentDto;
import com.example.back.dto.DiaryDto;
import com.example.back.entity.Comment;
import com.example.back.entity.Diary;
import com.example.back.entity.User;
import com.example.back.exception.CustomException;
import com.example.back.exception.ErrorCode;
import com.example.back.repository.CommentRepository;
import com.example.back.repository.DiaryRepository;
import com.example.back.repository.UserRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
@AllArgsConstructor
public class CommentServiceImpl implements CommentService{

    private final CommentRepository commentRepository;
    private final DiaryRepository diaryRepository;
    private final UserRepository userRepository;

    @Override
    public Comment createComment(Long dno, CommentDto commentDto) {

        Diary diary = diaryRepository.findDiaryByDno(dno);
        User user = userRepository.findByUserId(commentDto.getUserId());

        if(commentDto == null || diary == null)
            throw new CustomException(ErrorCode.DATA_NOT_FOUND);

        Comment save = Comment.builder()
                .userId(commentDto.getUserId())
                .profileImage(user.getImage())
                .nickname(user.getNickname())
                .content(commentDto.getContent())
                .diary(diary)
                .createdat(LocalDateTime.now())
                .build();

        commentRepository.save(save);
        return save;
    }

    @Override
    public List<Comment> readAllComment() {

        List<Comment> comments = commentRepository.findAll();
        return comments;
    }

    @Override
    public List<Comment> readMyComment(String userId) {
        List<Comment> comments = commentRepository.findCommentByUserId(userId);
        return comments;

    }

    @Override
    public Comment modifyComment(Long cno, String userId, CommentDto commentDto) {
        Comment comment = commentRepository.findCommentByCno(cno);
        if(comment == null)
            throw new CustomException(ErrorCode.DATA_NOT_FOUND);

        if(!comment.getUserId().equals(userId))
            throw new CustomException(ErrorCode.FORBIDDEN_AUTH);

        comment.setContent(commentDto.getContent());
        commentRepository.save(comment);

        return comment;
    }

    @Override
    public void deleteComment(Long cno, String userId) {
        Comment comment = commentRepository.findCommentByCno(cno);
        if(comment == null)
            throw new CustomException(ErrorCode.DATA_NOT_FOUND);

        if(!comment.getUserId().equals(userId))
            throw new CustomException(ErrorCode.FORBIDDEN_AUTH);

        commentRepository.delete(comment);
    }
}
