package com.example.back.dto;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class JandiDto {
    String userId;

    int year;

    int month;

    public JandiDto(String userId, int year, int month) {
        this.userId = userId;
        this.year = year;
        this.month = month;
    }
}
