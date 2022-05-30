package com.example.back.repository;

import com.example.back.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import javax.transaction.Transactional;


@Repository
@Transactional
public interface UserRepository extends JpaRepository<User, String> {

    User findByUserId(String userId);
    User findByNickname(String nickname);
}
