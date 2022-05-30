package com.example.back.controller;

import com.example.back.dto.JandiDto;
import com.example.back.dto.UserDto;
import com.example.back.entity.User;
import com.example.back.exception.CustomException;
import com.example.back.exception.ErrorCode;
import com.example.back.repository.UserRepository;
import com.example.back.service.UserService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import javassist.NotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.web.util.matcher.AntPathRequestMatcher;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/user")
@RequiredArgsConstructor
@Api(tags = {"유저 컨트롤러"})
public class UserController {

    private final UserService userService;
    private final UserRepository userRepository;

    @PostMapping("/signup")
    @ApiOperation(value = "회원가입", notes = "사용자 회원가입", response = String.class)
    public ResponseEntity<Map<String, Object>> signUp(@RequestBody UserDto userDto) {
        Map<String, Object> result = new HashMap<>();
        HttpStatus status;

        if (userDto == null || userService.validationCheck(userDto.getUserId())) {
            throw new CustomException(ErrorCode.METHOD_NOT_ALLOWED);
        }

        else {
            if (userService.signup(userDto)) {
                userService.signup(userDto);
                status = HttpStatus.OK;
                result.put("message", "SUCCESS");
            }
            else {
                result.put("message", "FAIL");
                status = HttpStatus.OK;
            }

            return new ResponseEntity<Map<String, Object>>(result, status);
        }

    }

    @GetMapping("/read")
    @ApiOperation(value = "사용자 조회", notes = "아이디로 사용자 조회", response = String.class)
    public ResponseEntity<Map<String, Object>> readUser(@RequestParam String userId){
        HttpStatus status;

        Map<String, Object> map = new HashMap<>();
        User user = userService.readUser(userId);

        if (user == null) {
            status = HttpStatus.NOT_FOUND;
            map.put("Message", "USER NOT FOUND");
        }
        else {
            status = HttpStatus.OK;
            map.put("Message", "SUCCESS");
        }
        map.put("user", user);

        return new ResponseEntity<>(map, status);
    }

    @PutMapping("/modify")
    @ApiOperation(value = "사용자 정보 수정", notes = "아이디로 사용자 정보 수정", response = String.class)
    public ResponseEntity<Map<String, Object>> modifyUser(@RequestParam String userId, @RequestBody UserDto userDto){
        Map<String, Object> map = new HashMap<>();
        User user = userService.modifyUser(userId, userDto);

        map.put("user", user);

        return new ResponseEntity<>(map, HttpStatus.OK);
    }

    @DeleteMapping("/delete")
    @ApiOperation(value = "사용자 탈퇴", notes = "아이디로 사용자 디비에서 삭제", response = String.class)
    public ResponseEntity<Map<String, Object>> deleteUser(@RequestParam String userId){
        Map<String, Object> map = new HashMap<>();
        userService.deleteUser(userId);

        map.put("message", "삭제되었습니다");

        return new ResponseEntity<>(map, HttpStatus.OK);
    }

    @GetMapping("/jandi")
    @ApiOperation(value = "사용자 잔디 정보 조회", notes = "사용자의 아이디(String)와 월(int)의 정보를 받으면 해당 월의 다이어리를 쓴 일자들 String 배열(YYYY-MM-DD)로 반환", response = String.class)
    public ResponseEntity<Map<String, Object>> readJandi(@RequestParam String userId, @RequestParam int year, @RequestParam int month){
        Map<String, Object> map = new HashMap<>();
        HttpStatus status;

        List<String> jandis = userService.readJandi(userId, year, month);

        if (jandis == null) {
            status = HttpStatus.NOT_FOUND;
            map.put("Message", "INCORRECT USER OR MONTH");
        }
        else {
            status = HttpStatus.OK;
            map.put("Message", "SUCCESS");
        }

        map.put("jandis", jandis);

        return new ResponseEntity<>(map, status);
    }

    @GetMapping("/verifyid")
    @ApiOperation(value = "아이디 중복 확인", notes = "userId로 아이디 중복 확인", response = String.class)
    public Boolean verifyUserId(@RequestParam String userId){
        boolean result = false;

        User user = userRepository.findByUserId(userId);
        if (user != null) {
            return false;
        }
        else {
            return true;
        }
    }

    @GetMapping("/verifynk")
    @ApiOperation(value = "닉네임 중복 확인", notes = "nickname으로 아이디 중복 확인", response = String.class)
    public Boolean verifyNickname(@RequestParam String nickname){
        boolean result = false;

        User user = userRepository.findByNickname(nickname);
        if (user != null) {
            return false;
        }
        else {
            return true;
        }
    }
}
