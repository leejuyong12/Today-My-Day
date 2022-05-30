package com.example.back.service;

import com.example.back.dto.DiaryDto;
import com.example.back.entity.Word;

import java.util.List;

public interface WordService {

    void createWord(String word);
    void createWordLog(String word, String userId);
    void increaseFrequencyByAge(Word selectedWord, String age);
    void increaseFrequencyByGender(Word selectedWord, String gender);

    Word increaseFrequency(String userId, DiaryDto diaryDto);
    List<String> pickRandomWords(String userId);
    List<String> pickWordByCondition(int condition, String gender, String age);
    String selectOne(int condition, String gender, String age);
    Boolean duplicateWord(String word);
    List<String> wordRanking(String userId);

}
