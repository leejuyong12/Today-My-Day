package com.example.back.entity;

import com.sun.istack.NotNull;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Table;

@Getter
@Setter
@NoArgsConstructor
@Entity
@Table(name = "Liked")
public class Liked {
    @Id
    @NotNull
    @GeneratedValue
    Long lno;

    String userId;

    Long dno;

    @Builder
    public Liked(Long lno, String userId, Long dno) {
        this.lno = lno;
        this.userId = userId;
        this.dno = dno;
    }

}
