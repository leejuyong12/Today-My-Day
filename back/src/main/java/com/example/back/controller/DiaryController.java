package com.example.back.controller;

import com.example.back.dto.DiaryDto;
import com.example.back.entity.Diary;
import com.example.back.repository.DiaryRepository;
import com.example.back.repository.UserRepository;
import com.example.back.service.DiaryService;
import com.example.back.service.LikedService;
import com.example.back.service.UserService;
import com.example.back.service.WordService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/diary")
@RequiredArgsConstructor
@Api(tags = {"다이어리 컨트롤러"})
public class DiaryController {

    private final DiaryService diaryService;
    private final DiaryRepository diaryRepository;
    private final WordService wordService;

    @GetMapping("/")
    @ApiOperation(value = "다이어리 전체 검색", notes = "모든 다이어리 출력", response = String.class)
    public ResponseEntity<Map<String, Object>> readAllDiary(){ // 모든 다이어리를 불러옴
        Map<String, Object> hashMap = new HashMap<>();
        HttpStatus status;

        List<Diary> diaries = diaryService.readAllDiary();

        hashMap.put("Message", "SUCCESS");
        status = HttpStatus.OK;
        hashMap.put("Status", status);
        hashMap.put("dairies", diaries);

        return new ResponseEntity<>(hashMap, status);
    }

    @PostMapping
    @ApiOperation(value = "다이어리 등록", notes = "현재 로그인 된 아이디로 다이어리 등록", response = String.class)
    public ResponseEntity<Map<String, Object>> createDiary(@RequestParam String userId, @RequestBody DiaryDto diaryDto){
        Map<String, Object> hashMap = new HashMap<>();

        Diary diary = diaryService.createDiary(diaryDto, userId);
        wordService.increaseFrequency(userId, diaryDto);

        hashMap.put("Message", "SUCCESS");
        hashMap.put("diary", diary);

        return new ResponseEntity<>(hashMap, HttpStatus.OK);
    }

    @PutMapping("/{dno}")
    @ApiOperation(value = "다이어리 수정", notes = "다이어리 수정", response = String.class)
    public ResponseEntity<Map<String, Object>> modifyDiary(@RequestParam String userId, @PathVariable long dno, @RequestBody DiaryDto diaryDto) {
        Map<String, Object> hashMap = new HashMap<>();
        HttpStatus status;

        Diary diary = diaryService.modifyDiary(dno, userId, diaryDto);

        if(diary != null) {
            status = HttpStatus.OK;
            hashMap.put("Status", status);
            hashMap.put("Message", "SUCCESS");
            hashMap.put("diary", diary);
        } else {
            status = HttpStatus.NOT_FOUND;
            hashMap.put("Status", status);
            hashMap.put("Message", "FAIL");
            hashMap.put("ERROR", "데이터를 찾을 수 없습니다.");
        }

       return new ResponseEntity<>(hashMap, status);

    }


    @DeleteMapping("/{dno}")
    @ApiOperation(value = "다이어리 삭제", notes = "다이어리 삭제", response = String.class)
    public ResponseEntity<Map<String, Object>> deleteDiary(@RequestParam String userId, @PathVariable Long dno){
        Map<String, Object> hashMap = new HashMap<>();
        HttpStatus status;

        if(diaryService.deleteDiary(dno, userId)) {
            status = HttpStatus.OK;
            hashMap.put("Status", status);
            hashMap.put("Message", "SUCCESS"); // 메세지를 코드로 바꾸자
            hashMap.put("deleted", dno+"번 다이어리가 성공적으로 삭제되었습니다.");
            // 여기 더넣자
        } else {
            status = HttpStatus.NOT_FOUND;
            hashMap.put("Status", status);
            hashMap.put("Message", "FAIL");
            hashMap.put("ERROR", "데이터를 찾을 수 없습니다.");
        }

        return new ResponseEntity<>(hashMap, status);
    }

    @GetMapping("/read/{dno}")
    @ApiOperation(value = "다이어리 상세글", notes = "다이어리 상세 글 보기", response = String.class)
    public ResponseEntity<Diary> readDiary(@PathVariable long dno) {
        Diary diary = diaryService.readDiary(dno);
        HttpStatus status;

        if (diary != null) {
            status = HttpStatus.OK;
        }
        else {
            status = HttpStatus.NOT_FOUND;
        }

        return new ResponseEntity<>(diary, status);
    }

    @GetMapping("/myword")
    @ApiOperation(value = "내가 선택한 단어들", notes = "내가 선택한 단어들 보기", response = String.class)
    public ResponseEntity<List<String>> readMyword(@RequestParam String userId) {
        HttpStatus status;

        List<String> mywords = diaryService.readMyword(userId);

        if (mywords == null) {
            status = HttpStatus.NOT_FOUND;
        }
        else {
            status = HttpStatus.OK;
        }

        return new ResponseEntity<>(mywords, status);

    }

    @GetMapping("/searchcontent")
    @ApiOperation(value = "내 다이어리 내용별 검색", notes = "내가 등록한 다이어리 내용별 검색하기", response = String.class)
    public ResponseEntity<List<Diary>> searchDiaryByContent(@RequestParam String keyword, @RequestParam String userId) {
        HttpStatus status;

        List<Diary> diares = diaryService.searchDiariesByContent(keyword, userId);

        if (diares != null) {
            status = HttpStatus.OK;
        }
        else {
            status = HttpStatus.NO_CONTENT;
        }

        return new ResponseEntity<>(diares, status);
    }

    @GetMapping("/searchword")
    @ApiOperation(value = "내 다이어리 단어별 검색", notes = "내가 등록한 다이어리 단어별 검색하기", response = String.class)
    public ResponseEntity<List<Diary>> searchDiaryByWord(@RequestParam String word, @RequestParam String userId) {
        HttpStatus status;

        List<Diary> diares = diaryService.searchDiariesByWord(word, userId);

        if (diares != null) {
            status = HttpStatus.OK;
        }
        else {
            status = HttpStatus.NO_CONTENT;
        }

        return new ResponseEntity<>(diares, status);
    }

    @GetMapping("/allword")
    @ApiOperation(value = "전체 사용자가 선택한 단어들", notes = "전체 사용자가 선택한 단어들 보기", response = String.class)
    public ResponseEntity<List<String>> readAllword() {
        HttpStatus status;

        List<String> allwords = diaryService.readAllword();

        if (allwords == null) {
            status = HttpStatus.NOT_FOUND;
        }
        else {
            status = HttpStatus.OK;
        }

        return new ResponseEntity<>(allwords, status);

    }

    @GetMapping("/searchallcontent")
    @ApiOperation(value = "전체 다이어리 내용별 검색", notes = "전체 내용별 검색하기", response = String.class)
    public ResponseEntity<List<Diary>> searchAllDiaryByContent(@RequestParam String keyword) {
        HttpStatus status;

        List<Diary> diares = diaryService.searchAllDiariesByContent(keyword);

        if (diares != null) {
            status = HttpStatus.OK;
        }
        else {
            status = HttpStatus.NO_CONTENT;
        }

        return new ResponseEntity<>(diares, status);
    }

    @GetMapping("/searchallword")
    @ApiOperation(value = "전체 다이어리 단어별 검색", notes = "전체 단어별 검색하기", response = String.class)
    public ResponseEntity<List<Diary>> searchAllDiaryByWord(@RequestParam String word) {
        HttpStatus status;

        List<Diary> diares = diaryService.searchAllDiariesByWord(word);

        if (diares != null) {
            status = HttpStatus.OK;
        }
        else {
            status = HttpStatus.NO_CONTENT;
        }

        return new ResponseEntity<>(diares, status);
    }

    @GetMapping("/view")
    @ApiOperation(value = "다이어리 조회수 추가", notes = "다이어리 조회수 증가하기", response = String.class)
    public ResponseEntity<Map<String, Object>> updateView(@RequestParam Long dno) {
        Map<String, Object> hashMap = new HashMap<>();
        HttpStatus status;

        Diary diary = diaryService.updateView(dno);

        if (diary == null) {
            hashMap.put("Message", "NO DIARY");
        }
        else {
            hashMap.put("Message", "SUCCESS");
        }

        hashMap.put("diary", diary);

        return new ResponseEntity<>(hashMap, HttpStatus.OK);
    }

    @GetMapping("/topliked")
    @ApiOperation(value = "전체 다이어리 좋아요 top 15 반환", notes = "전체 다이어리 좋아요 수 top 15", response = String.class)
    public ResponseEntity<Map<String, Object>> readTopLiked() {
        Map<String, Object> hashMap = new HashMap<>();
        HttpStatus status;

        List<Diary> diaries = diaryService.readTopLiked();

        if (diaries == null) {
            hashMap.put("Message", "NO DIARY");
        }
        else {
            hashMap.put("Message", "SUCCESS");
        }

        hashMap.put("diaries", diaries);

        return new ResponseEntity<>(hashMap, HttpStatus.OK);
    }

    @GetMapping("/mytopliked")
    @ApiOperation(value = "내 다이어리 좋아요 top 5 반환", notes = "내 다이어리 좋아요 수 top 5", response = String.class)
    public ResponseEntity<Map<String, Object>> readMyDiaryTopLiked(@RequestParam String userId) {
        Map<String, Object> hashMap = new HashMap<>();
        HttpStatus status;

        List<Diary> diaries = diaryService.readMyDiaryTopLiked(userId);

        if (diaries == null) {
            hashMap.put("Message", "NO DIARY");
        }
        else {
            hashMap.put("Message", "SUCCESS");
        }

        hashMap.put("diaries", diaries);

        return new ResponseEntity<>(hashMap, HttpStatus.OK);
    }

    @GetMapping("/mytopview")
    @ApiOperation(value = "내 다이어리 조회수 top 5 반환", notes = "내 다이어리 조회수 top 5", response = String.class)
    public ResponseEntity<Map<String, Object>> readMyDiaryTopView(@RequestParam String userId) {
        Map<String, Object> hashMap = new HashMap<>();
        HttpStatus status;

        List<Diary> diaries = diaryService.readMyDiaryTopView(userId);

        if (diaries == null) {
            hashMap.put("Message", "NO DIARY");
        }
        else {
            hashMap.put("Message", "SUCCESS");
        }

        hashMap.put("diaries", diaries);

        return new ResponseEntity<>(hashMap, HttpStatus.OK);
    }

    @GetMapping("/paging")
    @ApiOperation(value = "전체 다이어리 페이지네이션", notes = "page번호 넘기면 해당 페이지 데이터 반환", response = String.class)
    public ResponseEntity retrievePosts(final Pageable pageable) {
        Page<Diary> diaries = diaryRepository.findAll(pageable);

        return new ResponseEntity<>(diaries,HttpStatus.OK);
    }

    @GetMapping("/mypaging")
    @ApiOperation(value = "내 다이어리 페이지네이션", notes = "userId와 page번호 넘기면 해당 페이지 데이터 반환", response = String.class)
    public ResponseEntity retrieveMyPosts(@RequestParam String userId, @PageableDefault(size = 3) final Pageable pageable) {
        Page<Diary> diaries = diaryRepository.findByUserUserId(userId, pageable);

        return new ResponseEntity<>(diaries,HttpStatus.OK);
    }


}
