package com.example.back.dto;

import com.sun.istack.NotNull;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class WordDto {

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
    public WordDto(String word, long teens, long twenties, long thirties, long fourties, long fifties, long oversixties, long male, long female) {
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
