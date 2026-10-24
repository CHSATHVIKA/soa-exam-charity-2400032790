package com.klef.soa.docker.controller;

import java.time.Instant;
import java.util.Map;
import java.util.stream.Collectors;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.http.converter.HttpMessageNotReadableException;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.method.annotation.MethodArgumentTypeMismatchException;

import com.klef.soa.docker.dto.ErrorResponse;

@RestControllerAdvice
public class ApiExceptionHandler {

	@ExceptionHandler(MethodArgumentNotValidException.class)
	public ResponseEntity<ErrorResponse> handleValidation(MethodArgumentNotValidException ex) {
		Map<String, String> errors = ex.getBindingResult().getFieldErrors().stream()
				.collect(Collectors.toMap(
						error -> error.getField(),
						error -> error.getDefaultMessage() == null ? "Invalid value" : error.getDefaultMessage(),
						(first, second) -> first));
		return build(HttpStatus.BAD_REQUEST, "Validation failed", errors);
	}

	@ExceptionHandler(HttpMessageNotReadableException.class)
	public ResponseEntity<ErrorResponse> handleBadJson(HttpMessageNotReadableException ex) {
		return build(HttpStatus.BAD_REQUEST, "Invalid request body, check field types and JSON format", Map.of());
	}

	@ExceptionHandler(MethodArgumentTypeMismatchException.class)
	public ResponseEntity<ErrorResponse> handleBadId(MethodArgumentTypeMismatchException ex) {
		return build(HttpStatus.BAD_REQUEST, "ID must be a number", Map.of());
	}

	@ExceptionHandler(RecordNotFoundException.class)
	public ResponseEntity<ErrorResponse> handleNotFound(RecordNotFoundException ex) {
		return build(HttpStatus.NOT_FOUND, ex.getMessage(), Map.of());
	}

	private ResponseEntity<ErrorResponse> build(HttpStatus status, String message, Map<String, String> errors) {
		return ResponseEntity.status(status)
				.body(new ErrorResponse(Instant.now(), status.value(), message, errors));
	}
}
