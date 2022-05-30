package com.example.back.dto;

import com.example.back.entity.User;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;


@NoArgsConstructor
@Data
public class UserDto {

    String userId;
    String password;
    String nickname;
    String image;
    String gender;
    String age;

    @Builder
    public UserDto(String userId, String password, String nickname, String image, String gender, String age) {
        this.userId = userId;
        this.password = password;
        this.nickname = nickname;
        this.image = image;
        this.gender = gender;
        this.age = age;
    }

    public User createUser() {
        return User.builder()
                .userId(userId)
                .password(password)
                .nickname(nickname)
                .image(image)
                .gender(gender)
                .age(age)
                .build();

    }
}
