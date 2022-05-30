package com.example.back.service;

import com.example.back.dto.DiaryDto;
import com.example.back.entity.Diary;
import java.util.List;

public interface DiaryService {
    Diary createDiary(DiaryDto diaryDto, String userId);
    Diary findDiary(Long dno);
    Diary modifyDiary(Long dno, String userId, DiaryDto diaryDto);
    Boolean deleteDiary(Long dno, String userId);
    List<Diary> searchDiariesByContent(String keyword, String userId);
    Diary readDiary(long dno);
    List<String> readMyword(String userId);
    List<Diary> searchDiariesByWord(String word, String userId);
    List<Diary> searchAllDiariesByContent(String keyword);
    List<Diary> searchAllDiariesByWord(String word);
    List<String> readAllword();
    Diary updateView(Long dno);
    List<Diary>readAllDiary();
    List<Diary>readTopLiked();
    List<Diary>readMyDiaryTopLiked(String userId);
    List<Diary>readMyDiaryTopView(String userId);
}
