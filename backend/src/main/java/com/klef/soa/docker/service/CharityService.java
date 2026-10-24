package com.klef.soa.docker.service;

import java.util.List;
import java.util.Optional;

import com.klef.soa.docker.dto.CharityDTO;

public interface CharityService {

	List<CharityDTO> displayAll();

	Optional<CharityDTO> getFundById(Long id);

	CharityDTO saveFund(CharityDTO dto);

	Optional<CharityDTO> updateFund(Long id, CharityDTO dto);

	boolean deleteFund(Long id);
}
