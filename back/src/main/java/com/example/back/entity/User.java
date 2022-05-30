package com.example.back.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.sun.istack.NotNull;
import lombok.*;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@Entity
@Table(name = "User")
public class User {
    @Id
    @NotNull
    String userId;

    @NotNull
    @JsonIgnore
    String password;

    @NotNull
    String nickname;

    String image;

    @NotNull
    String gender;

    @NotNull
    String age;

    @OneToMany(fetch = FetchType.LAZY, mappedBy = "user", cascade = CascadeType.ALL)
    List<Diary> dairies = new ArrayList<>();

    @Builder
    public User(String userId, String password, String nickname, String image, String gender, String age) {
        this.userId = userId;
        this.password = password;
        this.nickname = nickname;
        this.image = image;
        this.gender = gender;
        this.age = age;
    }


}
