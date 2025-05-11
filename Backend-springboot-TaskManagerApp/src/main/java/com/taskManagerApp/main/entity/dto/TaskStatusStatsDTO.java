// TaskStatusStatsDTO.java
package com.taskManagerApp.main.entity.dto;

public class TaskStatusStatsDTO {
    private long total;
    private long pending;
    private long inProgress;
    private long completed;

    // Constructors
    public TaskStatusStatsDTO() {}

    public TaskStatusStatsDTO(long total, long pending, long inProgress, long completed) {
        this.total = total;
        this.pending = pending;
        this.inProgress = inProgress;
        this.completed = completed;
    }

    // Getters and Setters
    public long getTotal() {
        return total;
    }

    public void setTotal(long total) {
        this.total = total;
    }

    public long getPending() {
        return pending;
    }

    public void setPending(long pending) {
        this.pending = pending;
    }

    public long getInProgress() {
        return inProgress;
    }

    public void setInProgress(long inProgress) {
        this.inProgress = inProgress;
    }

    public long getCompleted() {
        return completed;
    }

    public void setCompleted(long completed) {
        this.completed = completed;
    }
}
