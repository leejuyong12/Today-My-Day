package com.example.back.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.sun.istack.NotNull;
import lombok.*;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.util.List;

@Entity
@Table(name = "diary")
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@EntityListeners(AuditingEntityListener.class)
@Builder
public class Diary {
    @Id
    @NotNull
    @GeneratedValue
    private Long dno;

    @NotNull
    private String word;

    private String image;

    private String content;

    @CreatedDate
    private LocalDateTime createdat;

    private int view;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "userId")
    @JsonIgnore
    private User user;

    private String profileImage;

    private String nickname;

    private int liked;

    @OneToMany(mappedBy = "diary", fetch = FetchType.EAGER, cascade = CascadeType.REMOVE)
    private List<Comment> comments;

}
