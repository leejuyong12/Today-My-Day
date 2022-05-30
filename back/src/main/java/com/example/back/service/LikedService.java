package com.example.back.service;

import com.example.back.dto.LikedDto;
import java.util.List;

public interface LikedService {
    boolean createLiked(LikedDto likedDto);
    int readLiked(Long dno);
    List<Long> readTopLiked();
    boolean readLikedStatus(String userId, long dno);
}
