package com.taskManagerApp.main.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.taskManagerApp.main.entity.Task;
import com.taskManagerApp.main.entity.dto.TaskStatusStatsDTO;
import com.taskManagerApp.main.repository.TaskRepo;

@Service
public class TaskService {

    @Autowired
    private TaskRepo taskRepo;

    public List<Task> getAllTasks() {
        return taskRepo.findAll();
    }

    public Task getTaskById(Long id) {
        Optional<Task> task = taskRepo.findById(id);
        return task.orElse(null);
    }

    public Task addTask(Task task) {
        return taskRepo.save(task);
    }

    public Task updateTask(Long id, Task taskDetails) {
        Optional<Task> task = taskRepo.findById(id);
        if (task.isPresent()) {
            Task existingTask = task.get();
            existingTask.setTitle(taskDetails.getTitle());
            existingTask.setCategory(taskDetails.getCategory());
            existingTask.setStatus(taskDetails.getStatus());
            return taskRepo.save(existingTask);
        }
        return null;
    }

    public boolean deleteTask(Long id) {
        Optional<Task> task = taskRepo.findById(id);
        if (task.isPresent()) {
            taskRepo.delete(task.get());
            return true;
        }
        return false;
    }
    
    public TaskStatusStatsDTO getTaskStatusStats() {
        long total = taskRepo.count();
        long pending = taskRepo.countByStatus("Pending");
        long inProgress = taskRepo.countByStatus("In Progress");
        long completed = taskRepo.countByStatus("Completed");

        return new TaskStatusStatsDTO(total, pending, inProgress, completed);
    }
}
