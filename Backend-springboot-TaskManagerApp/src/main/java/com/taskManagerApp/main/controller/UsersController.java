package com.taskManagerApp.main.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.taskManagerApp.main.entity.Users;
import com.taskManagerApp.main.requests.LoginRequest;
import com.taskManagerApp.main.response.JwtResponse;
import com.taskManagerApp.main.security.JwtUtils;
import com.taskManagerApp.main.service.UserService;

@RestController
public class UsersController {
	
	@Autowired
	UserService userService;
	
	// Endpoint to add a user
	@PostMapping("/addUser")
	@CrossOrigin(origins = "http://localhost:3000")
	public ResponseEntity<?> addUser(@RequestBody Users user) {
		try {
			Users createdUser = userService.addUser(user);
			return new ResponseEntity<>(createdUser, HttpStatus.CREATED);
		}catch (IllegalArgumentException  e) {
			return new ResponseEntity<>("Error while creating user: "+e.getMessage(), HttpStatus.BAD_REQUEST);
		}
	}
	
	//Endpoint to handle user Login
	@PostMapping("/loginUser")
	@CrossOrigin(origins = "http://localhost:3000")
	public ResponseEntity<?> loginUser(@RequestBody LoginRequest loginRequest) {
		System.out.println("API is HIT");
		try {
			boolean isLoggedIn = userService.loginUser(loginRequest);
			if(isLoggedIn) {
				String token = JwtUtils.generateToken(loginRequest.getUserId());
				return new ResponseEntity<>(new JwtResponse(token), HttpStatus.OK);
			}else {
				return new ResponseEntity<>("Invalid credentials", HttpStatus.UNAUTHORIZED);
			}
		}catch(Exception e) {
			return new ResponseEntity<>("Error during login: "+e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR );
		}
	}
	

}
