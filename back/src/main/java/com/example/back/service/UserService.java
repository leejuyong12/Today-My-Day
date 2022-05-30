package com.example.back.service;

import com.example.back.dto.UserDto;
import com.example.back.entity.User;
import org.springframework.security.core.userdetails.UserDetailsService;

import java.util.List;

public interface UserService extends UserDetailsService {
    boolean signup(UserDto user);
    Boolean validationCheck(String userId);
    void deleteUser(String userId);
    User modifyUser(String userId, UserDto userDto);
    List<String> readJandi(String userId, int year, int month);
    User readUser(String userId);
}
