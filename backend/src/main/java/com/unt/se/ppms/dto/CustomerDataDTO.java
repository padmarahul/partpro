package com.unt.se.ppms.dto;

public class CustomerDataDTO {

	public int customerId;
	public long mobileno;
	public long zipcode;
	public String emailId;
	public String fullName;
	public int loyaltyPoints;
	public CustomerDataDTO() {
		
	}
	
	public CustomerDataDTO(int customerId, long mobileno, long zipcode, String emailId, String fullName,
			int loyaltyPoints) {
		super();
		this.customerId = customerId;
		this.mobileno = mobileno;
		this.zipcode = zipcode;
		this.emailId = emailId;
		this.fullName = fullName;
		this.loyaltyPoints = loyaltyPoints;
	}

	public int getCustomerId() {
		return customerId;
	}
	public void setCustomerId(int customerId) {
		this.customerId = customerId;
	}
	public long getMobileno() {
		return mobileno;
	}
	public void setMobileno(long mobileno) {
		this.mobileno = mobileno;
	}
	public long getZipcode() {
		return zipcode;
	}
	public void setZipcode(long zipcode) {
		this.zipcode = zipcode;
	}
	public String getEmailId() {
		return emailId;
	}
	public void setEmailId(String emailId) {
		this.emailId = emailId;
	}
	public String getFullName() {
		return fullName;
	}
	public void setFullName(String fullName) {
		this.fullName = fullName;
	}
	public int getLoyaltyPoints() {
		return loyaltyPoints;
	}
	public void setLoyaltyPoints(int loyaltyPoints) {
		this.loyaltyPoints = loyaltyPoints;
	}
	
}
