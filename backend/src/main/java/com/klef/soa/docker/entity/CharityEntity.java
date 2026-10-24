package com.klef.soa.docker.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.PositiveOrZero;

@Entity
@Table(name = "exam_2400032790")
public class CharityEntity {
	
	
@Id
@GeneratedValue(strategy=GenerationType.IDENTITY)
	private Long id;

	@NotBlank(message = "Fundraiser name is required")
	private String fundraiserName;
	@NotNull(message = "Target amount is required")
	@PositiveOrZero(message = "Target amount must be zero or greater")
	private Double targetAmount;
	@NotNull(message = "Amount raised is required")
	@PositiveOrZero(message = "Amount raised must be zero or greater")
	private Double amountRaised;
	@NotNull(message = "Completed status is required")
	private Boolean completed;
	public Long getId() {
		return id;
	}
	public void setId(Long id) {
		this.id = id;
	}
	public String getFundraiserName() {
		return fundraiserName;
	}
	public void setFundraiserName(String fundraiserName) {
		this.fundraiserName = fundraiserName;
	}
	public Double getTargetAmount() {
		return targetAmount;
	}
	public void setTargetAmount(Double targetAmount) {
		this.targetAmount = targetAmount;
	}
	public Double getAmountRaised() {
		return amountRaised;
	}
	public void setAmountRaised(Double amountRaised) {
		this.amountRaised = amountRaised;
	}
	public Boolean getCompleted() {
		return completed;
	}
	public void setCompleted(Boolean completed) {
		this.completed = completed;
	}
	
	

}
