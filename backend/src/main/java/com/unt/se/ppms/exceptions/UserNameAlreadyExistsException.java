package com.unt.se.ppms.exceptions;

public class UserNameAlreadyExistsException extends Exception {

	private static final long serialVersionUID = 1L;
	public UserNameAlreadyExistsException(String errorMessage) {
	
		super(errorMessage);
	}
	@Override
	public String toString() {
		return "UserNameAlreadyExistsException" + super.getMessage();
	}
	
}
