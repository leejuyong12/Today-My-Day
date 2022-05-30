package com.example.back.repository;

import com.example.back.entity.Word;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface WordRepository extends JpaRepository<Word, String> {

    Word findWordByWord(String word);

    Boolean existsByWord(String word);

    @Query(value = "select word, sum(teens+male) as cnt from word group by word order by cnt DESC", nativeQuery = true)
    List<String> findWordByTeensAndMale();

    @Query(value = "select word, sum(teens+female) as cnt from word group by word order by cnt DESC", nativeQuery = true)
    List<String> findWordByTeensAndFemale();

    @Query(value = "select word, sum(twenties+male) as cnt from word group by word order by cnt DESC", nativeQuery = true)
    List<String> findWordByTwentiesAndMale();

    @Query(value = "select word, sum(twenties+female) as cnt from word group by word order by cnt DESC", nativeQuery = true)
    List<String> findWordByTwentiesAndFemale();

    @Query(value = "select word, sum(thirties+male) as cnt from word group by word order by cnt DESC", nativeQuery = true)
    List<String> findWordByThirtiesAndMale();

    @Query(value = "select word, sum(thirties+female) as cnt from word group by word order by cnt DESC", nativeQuery = true)
    List<String> findWordByThirtiesAndFemale();

    @Query(value = "select word, sum(fourties+male) as cnt from word group by word order by cnt DESC", nativeQuery = true)
    List<String> findWordByFourtiesAndMale();

    @Query(value = "select word, sum(fourties+female) as cnt from word group by word order by cnt DESC", nativeQuery = true)
    List<String> findWordByFourtiesAndFemale();

    @Query(value = "select word, sum(fifties+male) as cnt from word group by word order by cnt DESC", nativeQuery = true)
    List<String> findWordByFiftiesAndMale();

    @Query(value = "select word, sum(fifties+female) as cnt from word group by word order by cnt DESC", nativeQuery = true)
    List<String> findWordByFiftiesAndFemale();

    @Query(value = "select word, sum(oversixties+male) as cnt from word group by word order by cnt DESC", nativeQuery = true)
    List<String> findWordByOversixtiesAndMale();

    @Query(value = "select word, sum(oversixties+female) as cnt from word group by word order by cnt DESC", nativeQuery = true)
    List<String> findWordByOversixtiesAndFemale();

    @Query(value = "select word, teens from word group by word order by teens DESC", nativeQuery = true)
    List<String> findWordByTeens();

    @Query(value = "select word, twenties from word group by word order by twenties DESC", nativeQuery = true)
    List<String> findWordByTwenties();

    @Query(value = "select word, thirties from word group by word order by thirties DESC", nativeQuery = true)
    List<String> findWordByThirties();

    @Query(value = "select word, fourties from word group by word order by fourties DESC", nativeQuery = true)
    List<String> findWordByFourties();

    @Query(value = "select word, fifties from word group by word order by fifties DESC", nativeQuery = true)
    List<String> findWordByFifties();

    @Query(value = "select word, oversixties from word group by word order by oversixties DESC", nativeQuery = true)
    List<String> findWordByOversixties();

    @Query(value = "select word, male from word group by word order by male DESC", nativeQuery = true)
    List<String> findWordByMale();

    @Query(value = "select word, female from word group by word order by female DESC", nativeQuery = true)
    List<String> findWordByFemale();

    @Query(value = "select word, sum(teens+twenties+thirties+fourties+fifties+oversixties+male+female) as res from word group by word order by res ASC", nativeQuery = true)
    List<String> findWordByAll();

    @Query(value = "select word from word order by rand() limit 5", nativeQuery = true)
    List<String> findWordByRandom();

//    @Query(value = "select word, ")
//    List<String> findWordsByAge();
}
