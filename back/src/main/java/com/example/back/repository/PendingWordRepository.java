package com.example.back.repository;

import com.example.back.entity.PendingWord;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PendingWordRepository extends JpaRepository<PendingWord, String> {
    PendingWord findByWord(String word);
}
