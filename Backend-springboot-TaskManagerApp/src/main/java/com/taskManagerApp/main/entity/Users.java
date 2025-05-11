package com.taskManagerApp.main.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@NoArgsConstructor
public class Users {
	
	@Id
	private String email;
	private String name;
	private String password;
	
}
