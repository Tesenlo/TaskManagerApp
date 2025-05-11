package com.taskManagerApp.main.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.taskManagerApp.main.entity.Task;

@Repository
public interface TaskRepo extends JpaRepository<Task, Long>{
	
	long countByStatus(String status);

}
