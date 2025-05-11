package com.taskManagerApp.main.service;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.taskManagerApp.main.entity.Users;
import com.taskManagerApp.main.repository.UsersRepo;
import com.taskManagerApp.main.requests.LoginRequest;

@Service
public class UserService {
	
	@Autowired
	UsersRepo usersRepo;
	
	public Users addUser(Users user) {
		
		Optional<Users> existingUser = usersRepo.findByEmail(user.getEmail());
		
		if(existingUser.isPresent()) {
			throw new IllegalArgumentException("User with this email already exists");
		}
		return usersRepo.save(user);	
	}
	
	public Boolean loginUser(LoginRequest loginRequest) {
		
		Optional<Users> user = usersRepo.findById(loginRequest.getUserId());
		
		if(user.isEmpty()) {
			return false;
		}
		
		Users userObj = user.get();
		
		if(!userObj.getPassword().equals(loginRequest.getPassword())) {
			return false;
		}
		
		return true;
	}
}
