package com.example.back.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.sun.istack.NotNull;
import lombok.*;
import org.springframework.data.annotation.CreatedDate;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;
import java.time.LocalDateTime;

@Entity
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Builder
@Setter
public class Comment {
    @Id
    @GeneratedValue
    private Long cno;

    @NotNull
    private String userId;

    private String nickname;

    private String profileImage;

    @NotBlank
    private String content;

    @CreatedDate
    private LocalDateTime createdat;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "dno")
    @JsonIgnore
    private Diary diary;

}
