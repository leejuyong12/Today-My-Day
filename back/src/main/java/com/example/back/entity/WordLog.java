package com.example.back.entity;

import com.sun.istack.NotNull;
import lombok.Builder;
import lombok.Getter;
import lombok.RequiredArgsConstructor;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import java.time.LocalDateTime;

@Entity
@Getter
@RequiredArgsConstructor
public class WordLog {

    @Id
    @NotNull
    @GeneratedValue
    private Long lid;

    @NotNull
    private String userId;

    @NotNull
    private String word;

    @NotNull
    private LocalDateTime selectedat;

    @Builder
    public WordLog(Long lid, String userId, String word, LocalDateTime selectedat) {
        this.lid = lid;
        this.userId = userId;
        this.word = word;
        this.selectedat = selectedat;
    }
}
