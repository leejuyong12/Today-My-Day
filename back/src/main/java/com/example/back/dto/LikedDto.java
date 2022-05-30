package com.example.back.dto;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class LikedDto {

    String userId;

    Long dno;

    public LikedDto(String userId, long dno){
        this.userId = userId;
        this.dno = dno;
    }
}
