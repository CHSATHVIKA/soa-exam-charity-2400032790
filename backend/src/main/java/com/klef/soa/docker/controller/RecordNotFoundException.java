package com.klef.soa.docker.controller;

public class RecordNotFoundException extends RuntimeException {

	public RecordNotFoundException(Long id) {
		super("Fundraiser #" + id + " not found");
	}
}
