package com.example.back.dto;

import com.sun.istack.NotNull;
import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@Data
public class TestWordDto {

    @NotNull
    private String word;

    public TestWordDto(String word){
        this.word = word;
    }
}
