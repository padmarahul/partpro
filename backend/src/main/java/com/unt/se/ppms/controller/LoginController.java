package com.unt.se.ppms.controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.unt.se.ppms.dto.UserData;
import com.unt.se.ppms.entities.OneTimePasscode;
import com.unt.se.ppms.entities.User;
import com.unt.se.ppms.exceptions.InvalidLoginCredentialsException;
import com.unt.se.ppms.exceptions.OtpInvalidException;
import com.unt.se.ppms.exceptions.UserEmailIdAlreadyExistsException;
import com.unt.se.ppms.exceptions.UserNameAlreadyExistsException;
import com.unt.se.ppms.exceptions.UserNotFoundException;
import com.unt.se.ppms.service.LoginService;

import jakarta.validation.Valid;

@CrossOrigin(origins = "http://localhost:3000") 
@RestController
@RequestMapping("/ppms/user")
public class LoginController {
	
	@Autowired
	LoginService loginService;
	
	@PostMapping("/signup")
	public ResponseEntity<String> signup(@Valid @RequestBody User user) throws UserNameAlreadyExistsException, UserEmailIdAlreadyExistsException{
		try {
			String ppt= loginService.signup(user);
			return ResponseEntity.ok(ppt);
		}catch(UserNameAlreadyExistsException e) {
			throw new UserNameAlreadyExistsException(e.getMessage());
		}catch(UserEmailIdAlreadyExistsException e) {
			throw new UserEmailIdAlreadyExistsException(e.getMessage());
		}catch(Exception e) {
			return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
		}
	}
	
	@PostMapping("/login/{username}/{password}")
	public ResponseEntity<UserData> loginFirstStep(@PathVariable String username, @PathVariable String password) throws InvalidLoginCredentialsException, UserNotFoundException{
		try {
			UserData response = loginService.loginUserFirstStep(username, password);
			return ResponseEntity.ok(response);
		}catch(InvalidLoginCredentialsException e) {
			throw new InvalidLoginCredentialsException(e.getMessage());
		}catch(UserNotFoundException e) {
			throw new UserNotFoundException(e.getMessage());
		}catch(Exception e) {
			return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(null);
		}
	}
	
	@PostMapping("/login/{id}/verifyotp/{otp}")
	public ResponseEntity<String> loginSecondStep(@PathVariable int id,@PathVariable long otp) throws OtpInvalidException, UserNotFoundException{
		try {
			String response = loginService.loginUserSecondStep(id, otp);
			return ResponseEntity.ok(response);
		}catch(OtpInvalidException e) {
			throw new OtpInvalidException(e.getMessage());
		}catch(UserNotFoundException e) {
			throw new UserNotFoundException(e.getMessage());
		}catch(Exception e) {
			return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
		}
	}
	
	@PutMapping("/changepassword/{username}/{newPassword}")
	public ResponseEntity<String> changePassword(@PathVariable String username,@PathVariable String newPassword) throws UserNotFoundException{
		try {
			String response = loginService.changePassword(username, newPassword);
			return ResponseEntity.ok(response);
		}catch(UserNotFoundException e) {
			throw new UserNotFoundException(e.getMessage());
		}catch(Exception e) {
			return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
		}
	}
	
	@PostMapping("/resendotp/{id}")
	public ResponseEntity<OneTimePasscode> generateAndSaveOtp(@PathVariable int id) throws UserNotFoundException{
		try {
			OneTimePasscode otp = loginService.generateAndSaveOtp(id);
			return ResponseEntity.ok(otp);
		}catch(UserNotFoundException e) {
			throw new UserNotFoundException(e.getMessage());
		}catch(Exception e) {
			return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
		}
	}
	
	@GetMapping("/getuser/{id}")
	public ResponseEntity<User> getUserById(@PathVariable int id) throws UserNotFoundException{
		try {
			User user = loginService.getUserById(id);
			return ResponseEntity.ok(user);
		}catch(UserNotFoundException e) {
			throw new UserNotFoundException(e.getMessage());
		}catch(Exception e) {
			return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
		}
	}
	

}
