package com.klef.soa.docker.controller;

import com.klef.soa.docker.entity.CharityEntity;
import com.klef.soa.docker.service.CharityService;

import java.util.List;
import java.util.Optional;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import jakarta.validation.Valid;

@RestController
public class CharityController {
	private CharityService service;

	public CharityController(CharityService service) {
		this.service = service;
	}

	@GetMapping("/")
	public String home() {
		return "HOME";
	}

	@PostMapping({"/Add", "/api/charities"})
	public CharityEntity add(@Valid @RequestBody CharityEntity c) {
		return service.saveFund(c);
	}

	@GetMapping({"/DisplayAll", "/api/charities"})
	public List<CharityEntity> displayAll() {
		return service.displayAll();
	}

	@GetMapping({"/Display/{id}", "/api/charities/{id}"})
	public ResponseEntity<CharityEntity> getById(@PathVariable Long id) {
		return service.getFundById(id)
				.map(ResponseEntity::ok)
				.orElseGet(() -> ResponseEntity.notFound().build());
	}

	@PutMapping({"/Update/{id}", "/api/charities/{id}"})
	public ResponseEntity<CharityEntity> update(@PathVariable Long id,
			@Valid @RequestBody CharityEntity c) {
		Optional<CharityEntity> updated = service.updateFund(id, c);
		return updated.map(ResponseEntity::ok)
				.orElseGet(() -> ResponseEntity.notFound().build());
	}

	@DeleteMapping({"/Delete/{id}", "/api/charities/{id}"})
	public ResponseEntity<String> delete(@PathVariable Long id) {
		if (!service.deleteFund(id)) {
			return ResponseEntity.notFound().build();
		}
		return ResponseEntity.ok("fund deleted successfully");
	}
}
