package com.example.back.controller;

import com.example.back.entity.PendingWord;
import com.example.back.entity.Word;
import com.example.back.exception.CustomException;
import com.example.back.exception.ErrorCode;
import com.example.back.repository.PendingWordRepository;
import com.example.back.repository.WordRepository;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/pendingword")
@RequiredArgsConstructor
@Api(tags = {"단어 필터 컨트롤러"})
public class PendingWordController {
    private final PendingWordRepository pendingWordRepository;
    private final WordRepository wordRepository;

    @GetMapping
    @ApiOperation(value = "pending데이터 모두 보기", notes = "pending데이터 모두 보기", response = String.class)
    public List<PendingWord> readAllPendingWord() {
        List<PendingWord> pendingWords = pendingWordRepository.findAll();

        return pendingWords;
    }

    @PostMapping
    @ApiOperation(value = "pending데이터 word테이블에 넣기", notes = "pending데이터 필터링", response = String.class)
    public boolean inputWord(@RequestParam String word) {
        if(word.trim().isEmpty() || word == null || duplicateWord(word))
            throw new CustomException(ErrorCode.DATA_NOT_FOUND);

        Word str = Word.builder()
                .word(word)
                .teens(0)
                .twenties(0)
                .thirties(0)
                .fourties(0)
                .fifties(0)
                .oversixties(0)
                .male(0)
                .female(0)
                .build();

        wordRepository.save(str);

        return true;
    }

    @DeleteMapping
    @ApiOperation(value = "pending데이터 삭제하기", notes = "pending데이터 필터링", response = String.class)
    public void deleteWord(@RequestParam String word) {
        PendingWord dword = pendingWordRepository.findByWord(word);

        pendingWordRepository.delete(dword);
    }

    public Boolean duplicateWord(String word) {
        return wordRepository.existsByWord(word);
    }

}
