package com.example.back.controller;

import com.example.back.dto.LikedDto;
import com.example.back.service.LikedService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/liked")
@RequiredArgsConstructor
@Api(tags = {"좋아요 컨트롤러"})
public class LikedController {

    private final LikedService likedService;

    @PostMapping
    @ApiOperation(value = "좋아요 기능", notes = "userId와 dno값을 받아서 해당 사용자가 해당 다이어리의 좋아요를 안 눌렀으면 좋아요 데이터 입력 && true 반환, 이미 눌러있다면 좋아요 데이터 삭제 && false 반환, 데이터 ", response = String.class)
    public ResponseEntity<Map<String, Object>> updateLiked(@RequestBody LikedDto likedDto){
        Map<String, Object> hashMap = new HashMap<>();
        HttpStatus status;

        boolean liked = likedService.createLiked(likedDto);

        if (!liked) {
            status = HttpStatus.OK;

            hashMap.put("Message", "CANCEL LIKED");
        }
        else {
            status = HttpStatus.OK;
            hashMap.put("Message", "SUCCESS LIKED");
        }


        hashMap.put("liked", liked);

        return new ResponseEntity<>(hashMap, status);
    }

    @GetMapping
    @ApiOperation(value = "좋아요 개수 보기", notes = "좋아요 개수 가져오기", response = String.class)
    public ResponseEntity<Integer> readLiked(@RequestParam Long dno){
        Map<String, Object> hashMap = new HashMap<>();
        HttpStatus status;

        int count = likedService.readLiked(dno);

        hashMap.put("Message", "SUCCESS");
        hashMap.put("liked", count);

        return new ResponseEntity<>(count, HttpStatus.OK);
    }

    @GetMapping("/status")
    @ApiOperation(value = "좋아요 눌렀는지 상태 보기", notes = "좋아요 눌렀으면 true, 안 눌렀으면 false 반환", response = String.class)
    public ResponseEntity<Map<String, Object>> readLikedStatus(@RequestParam String userId, @RequestParam long dno){
        Map<String, Object> hashMap = new HashMap<>();
        HttpStatus status;

        boolean result = likedService.readLikedStatus(userId, dno);

        hashMap.put("Message", "SUCCESS");
        hashMap.put("result", result);

        return new ResponseEntity<>(hashMap, HttpStatus.OK);
    }

}
