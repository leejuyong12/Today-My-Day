package com.example.back.repository;

import com.example.back.entity.TestWord;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface TestWordRepository extends JpaRepository<TestWord, String> {

}
