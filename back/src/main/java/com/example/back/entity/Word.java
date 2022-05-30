package com.example.back.entity;

import com.sun.istack.NotNull;
import lombok.Builder;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;

import javax.persistence.Entity;
import javax.persistence.Id;

@Entity
@RequiredArgsConstructor
@Getter
@Setter
public class Word {

    @Id
    @NotNull
    private String word;

    @NotNull
    private long teens;

    @NotNull
    private long twenties;

    @NotNull
    private long thirties;

    @NotNull
    private long fourties;

    @NotNull
    private long fifties;

    @NotNull
    private long oversixties;

    @NotNull
    private long male;

    @NotNull
    private long female;

    @Builder
    public Word(String word, long teens, long twenties, long thirties, long fourties, long fifties, long oversixties, long male, long female) {
        this.word = word;
        this.teens = teens;
        this.twenties = twenties;
        this.thirties = thirties;
        this.fourties = fourties;
        this.fifties = fifties;
        this.oversixties = oversixties;
        this.male = male;
        this.female = female;
    }
}
