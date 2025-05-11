package com.taskManagerApp.main.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.taskManagerApp.main.entity.Users;

@Repository
public interface UsersRepo extends JpaRepository<Users, String>{
	Optional<Users> findByEmail(String email);

}
