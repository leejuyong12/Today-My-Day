package com.example.back.service;

import com.example.back.dto.TestWordDto;
import com.example.back.entity.TestWord;
import com.example.back.repository.TestWordRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
@AllArgsConstructor
public class TestWordServiceImpl implements TestWordService {

    private final TestWordRepository testWordRepository;

    @Override
    public boolean createWord(TestWordDto testWordDto) {

        TestWord save = TestWord.builder()
                .word(testWordDto.getWord())
                .build();

        testWordRepository.save(save);

        return true;
    }

    @Override
    public List<String> pickWords() {
        List<TestWord> words = testWordRepository.findAll();

        if(words == null) return null;

        List<String> wordList = new ArrayList<>();
        boolean[] visited = new boolean[words.size()];
        for (int i = 0; i < 5; i++) {
            int idx = (int)(Math.random()*words.size()-1);
            if(visited[idx]) {
                i--;
                continue;
            }

            visited[idx] = true;
            wordList.add(words.get(idx).getWord());

        }

        return wordList;
    }
}
