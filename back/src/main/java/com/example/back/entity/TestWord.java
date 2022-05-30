package com.example.back.entity;

import com.sun.istack.NotNull;
import lombok.Builder;
import lombok.Getter;
import lombok.RequiredArgsConstructor;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Getter
@Table(name = "testword")
@RequiredArgsConstructor
public class TestWord {

    @Id
    @NotNull
    private String word;

    @Builder
    public TestWord (String word) {
        this.word = word;
    }

}
