package com.example.back.service;

import com.example.back.dto.TestWordDto;

import java.util.List;

public interface TestWordService {

    boolean createWord(TestWordDto testWordDto);
    List<String> pickWords();

}
