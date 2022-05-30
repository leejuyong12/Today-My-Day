package com.example.back.service;

import com.example.back.dto.LikedDto;
import com.example.back.entity.Diary;
import com.example.back.entity.Liked;
import com.example.back.repository.DiaryRepository;
import com.example.back.repository.LikedRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class LikedServiceImpl implements LikedService {

    private final LikedRepository likedRepository;
    private final DiaryRepository diaryRepository;

    @Override
    public boolean createLiked(LikedDto likedDto) {
       Liked find_liked = likedRepository.findLikedUser(likedDto.getUserId(), likedDto.getDno());
       Diary diary = diaryRepository.findDiaryByDno(likedDto.getDno());

        if (find_liked != null) { //좋아요 이미 눌렀으면 liked 테이블에서 데이터 삭제, false 반환
            likedRepository.delete(find_liked);
            diary.setLiked(diary.getLiked() - 1);
            diaryRepository.save(diary);
            return false;
        }

        Liked liked = Liked.builder()
                .userId(likedDto.getUserId())
                .dno(likedDto.getDno())
                .build();

        likedRepository.save(liked);


        diary.setLiked(diary.getLiked() + 1);
        diaryRepository.save(diary);

        return true;

    }

    @Override
    public int readLiked(Long dno) {
        List<Liked> likeds = likedRepository.findLikedByDno(dno);
        int count = 0;

        for (Liked liked : likeds) {
            count++;
        }
        return count;
    }

    @Override
    public List<Long> readTopLiked() {
        return null;
    }

    @Override
    public boolean readLikedStatus(String userId, long dno) {
        List<Liked> likeds = likedRepository.findLikedByDno(dno);

        for (Liked liked : likeds) {
            if (liked.getUserId().equals(userId)) { //좋아요 이미 눌렀으면 true 반환
                return true;
            }
        }
        return false;
    }
}
