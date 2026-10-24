package com.klef.soa.docker.controller;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.klef.soa.docker.dto.CharityDTO;
import com.klef.soa.docker.service.CharityService;

import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;

@RestController
@Tag(name = "Charity Fundraisers")
public class CharityController {

	private final CharityService service;

	public CharityController(CharityService service) {
		this.service = service;
	}

	@GetMapping("/")
	public String home() {
		return "HOME";
	}

	@PostMapping("/Add")
	public ResponseEntity<CharityDTO> add(@Valid @RequestBody CharityDTO dto) {
		return ResponseEntity.status(HttpStatus.CREATED).body(service.saveFund(dto));
	}

	@GetMapping("/DisplayAll")
	public List<CharityDTO> displayAll() {
		return service.displayAll();
	}

	@GetMapping("/Display/{id}")
	public CharityDTO getById(@PathVariable Long id) {
		return service.getFundById(id).orElseThrow(() -> new RecordNotFoundException(id));
	}

	@PutMapping("/Update/{id}")
	public CharityDTO update(@PathVariable Long id, @Valid @RequestBody CharityDTO dto) {
		return service.updateFund(id, dto).orElseThrow(() -> new RecordNotFoundException(id));
	}

	@DeleteMapping("/Delete/{id}")
	public String delete(@PathVariable Long id) {
		if (!service.deleteFund(id)) {
			throw new RecordNotFoundException(id);
		}
		return "Fundraiser #" + id + " deleted successfully";
	}
}
