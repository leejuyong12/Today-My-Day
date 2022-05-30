package com.example.back.repository;

import com.example.back.entity.Diary;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface DiaryRepository extends JpaRepository<Diary, Long> {

    Diary findDiaryByDno(Long dno);
    Diary deleteDiaryByDno(Long dno);
    List<Diary> findByContentContainsOrderByDnoDesc(String keyword);
    List<Diary>findDiaryByWordOrderByDnoDesc(String word);

    @Query(value = "select * from diary d where d.user_id = :userId order by dno desc", nativeQuery = true)
    List<Diary>findByUserId(@Param("userId") String userId);

    List<Diary>findAll();

    @Query(value = "select * from diary d where d.user_id = :userId order by liked desc limit 5", nativeQuery = true)
    List<Diary>findMyDiaryByTopLiked(@Param("userId") String userId);

    @Query(value = "select * from diary d where d.user_id = :userId order by view desc limit 5", nativeQuery = true)
    List<Diary>findMyDiaryByTopView(@Param("userId") String userId);

    @Query(value = "select * from diary order by liked desc, dno limit 15", nativeQuery = true)
    List<Diary> findTopLiked();

//    @Query(value = "select * from diary where content liked '%:keyword%'")
//    List<Diary>searchDiares(@Param("keyword") String keyword);

    Page <Diary>findByUserUserId(String userId, Pageable pageable);
}
