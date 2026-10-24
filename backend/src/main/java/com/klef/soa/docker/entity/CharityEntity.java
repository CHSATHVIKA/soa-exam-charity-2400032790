package com.klef.soa.docker.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "exam_2400032790")
public class CharityEntity {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	@Column(nullable = false, length = 100)
	private String fundraiserName;

	@Column(nullable = false)
	private Double targetAmount;

	@Column(nullable = false)
	private Double amountRaised;

	@Column(nullable = false)
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
